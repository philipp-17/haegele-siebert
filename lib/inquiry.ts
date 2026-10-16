type MailConfig = { apiKey?: string; from?: string; recipient: string };
const success = "Vielen Dank für Ihre Anfrage. Wir melden uns schnellstmöglich bei Ihnen.";
const maxBodyBytes = 24_000;

function reply(message: string, status = 200) {
  return Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBodyBytes) { await reader.cancel(); throw new Error("size"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function handleInquiry(request: Request, config: MailConfig, send: typeof fetch = fetch) {
  // Der Browser sendet ausschließlich an dieselbe Website.
  // Next.js kann request.url mit dem internen Servernamen statt dem Browser-Host bilden.
  const requestUrl = new URL(request.url);
  const requestHost = request.headers.get("host") || requestUrl.host;
  let expectedOrigin: string;
  try { expectedOrigin = new URL(`${requestUrl.protocol}//${requestHost}`).origin; }
  catch { return reply("Bitte senden Sie die Anfrage über das Formular auf unserer Website.", 403); }
  if (request.headers.get("origin") !== expectedOrigin) {
    return reply("Bitte senden Sie die Anfrage über das Formular auf unserer Website.", 403);
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return reply("Die Anfrage konnte nicht gelesen werden. Bitte laden Sie die Seite neu.", 415);
  }
  let raw: unknown;
  try { raw = await readBody(request); }
  catch { return reply("Die Anfrage ist ungültig oder zu lang. Bitte prüfen Sie Ihre Eingaben.", 400); }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return reply("Bitte prüfen Sie Ihre Eingaben.", 400);
  const data = raw as Record<string, unknown>;
  for (const field of ["firstName", "lastName", "email", "phone", "service", "website"]) {
    if (data[field] !== undefined && typeof data[field] !== "string") return reply("Bitte prüfen Sie Ihre Eingaben.", 400);
  }
  // Honeypot: ausgefüllte unsichtbare Felder werden ohne Versand verworfen.
  if (typeof data.website === "string" && data.website.trim()) return reply(success);
  const text = (key: string) => typeof data[key] === "string" ? (data[key] as string).trim() : "";
  const firstName = text("firstName"), lastName = text("lastName"), email = text("email");
  const phone = text("phone"), service = text("service");
  const singleLine = (value: string, max: number) => value.length <= max && !/[\u0000-\u001f\u007f]/.test(value);
  if (!firstName || !lastName || !singleLine(firstName, 60) || !singleLine(lastName, 60)) {
    return reply("Bitte geben Sie Ihren Vor- und Nachnamen an (je maximal 60 Zeichen).", 400);
  }
  if (!singleLine(email, 200) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reply("Bitte geben Sie eine gültige E-Mail-Adresse an.", 400);
  }
  if (phone && (!singleLine(phone, 60) || !/^[+\d\s()./-]+$/.test(phone) || phone.replace(/\D/g, "").length < 5)) {
    return reply("Bitte prüfen Sie Ihre Telefonnummer oder lassen Sie das optionale Feld leer.", 400);
  }
  if (service.length < 3 || service.length > 1000 || /[\u0000\u007f]/.test(service)) {
    return reply("Bitte beschreiben Sie die Dienstleistung mit 3 bis 1.000 Zeichen.", 400);
  }
  if (data.privacy !== true) return reply("Bitte bestätigen Sie, dass Sie die Datenschutzhinweise gelesen haben.", 400);
  const submissionId = text("submissionId");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) {
    return reply("Bitte laden Sie die Seite neu und versuchen Sie es erneut.", 400);
  }
  if (!config.apiKey || !config.from || config.apiKey === "replace_with_your_resend_api_key") {
    return reply("Der Versand ist momentan nicht verfügbar. Bitte kontaktieren Sie uns direkt per E-Mail oder Telefon.", 503);
  }
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `inquiry/${submissionId}` },
      body: JSON.stringify({
        from: config.from,
        to: [config.recipient],
        reply_to: email,
        subject: "Neue Anfrage zur Grundstückspflege",
        text: `Vorname: ${firstName}\nNachname: ${lastName}\nE-Mail: ${email}\nTelefon: ${phone || "Nicht angegeben"}\n\nDienstleistung:\n${service}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return reply("Ihre Anfrage konnte nicht versendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.", 502);
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id) {
      return reply("Der Versand konnte nicht bestätigt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.", 502);
    }
    return reply(success);
  } catch {
    return reply("Der Versand konnte nicht bestätigt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.", 502);
  }
}

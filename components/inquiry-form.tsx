"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const result = useRef<HTMLParagraphElement>(null);
  const submissionId = useRef("");
  const sending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    sending.current = true;
    setStatus("sending");
    setFeedback("");
    try {
      submissionId.current ||= crypto.randomUUID();
      const response = await fetch("/api/anfrage/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"), lastName: data.get("lastName"),
          email: data.get("email"), phone: data.get("phone"),
          service: data.get("service"),
          website: data.get("website"), privacy: data.get("privacy") === "on",
          submissionId: submissionId.current,
        }),
        signal: AbortSignal.timeout(20_000),
      });
      const body: unknown = await response.json();
      const message = body && typeof body === "object" && "message" in body && typeof body.message === "string" ? body.message : "Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.";
      setFeedback(message);
      setStatus(response.ok ? "success" : "error");
      if (response.ok) { form.reset(); submissionId.current = ""; }
    } catch {
      setStatus("error");
      setFeedback("Der Versand konnte nicht bestätigt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail oder Telefon.");
    } finally {
      sending.current = false;
      requestAnimationFrame(() => result.current?.focus());
    }
  }

  return <form className="inquiry-form" onSubmit={submit} aria-busy={status === "sending"} onChange={() => {
    submissionId.current = "";
    if (status !== "sending") { setStatus("idle"); setFeedback(""); }
  }}>
    <div className="form-title"><h3>Ihre Anfrage</h3><p>Felder mit * sind erforderlich.</p></div>
    <fieldset className="form-fields" disabled={status === "sending"}>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" maxLength={200} /></div>
      <div className="form-grid">
        <div className="field"><label htmlFor="firstName">Vorname *</label><input id="firstName" name="firstName" autoComplete="given-name" required maxLength={60} /></div>
        <div className="field"><label htmlFor="lastName">Nachname *</label><input id="lastName" name="lastName" autoComplete="family-name" required maxLength={60} /></div>
        <div className="field"><label htmlFor="email">E-Mail-Adresse *</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={200} /></div>
        <div className="field"><label htmlFor="phone">Telefonnummer <span>(optional)</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={60} /></div>
        <div className="field field-full"><label htmlFor="service">Dienstleistung beschreiben *</label><textarea id="service" name="service" rows={3} minLength={3} maxLength={1000} required placeholder="Welche Arbeit wünschen Sie sich, wo und wann?" /></div>
      </div>
      <label className="consent"><input type="checkbox" name="privacy" required /><span>Ich habe die <Link href="/datenschutz/">Datenschutzhinweise</Link> gelesen. *</span></label>
      <button type="submit" className="button form-submit">{status === "sending" ? "Wird gesendet …" : "Anfrage senden"}</button>
    </fieldset>
    {feedback && <p ref={result} className={`form-feedback ${status === "error" ? "form-error" : ""}`} tabIndex={-1} role={status === "error" ? "alert" : "status"}>{feedback}</p>}
  </form>;
}

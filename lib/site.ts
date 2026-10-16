// Diese Konfiguration wird ausschließlich in Server-Komponenten verwendet.
export function siteUrl(): URL | undefined {
  const value = process.env.SITE_URL?.trim();
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.pathname !== "/" || url.search || url.hash || url.hostname === "example.com" || url.hostname === "localhost" || url.hostname.endsWith(".localhost") || url.hostname === "127.0.0.1") {
    throw new Error("SITE_URL muss die tatsächliche öffentliche HTTPS-Domain ohne Pfad enthalten. Beispielwerte bitte ersetzen oder die Variable vorerst weglassen.");
  }
  return url;
}

export function allowIndexing(): boolean {
  return !!siteUrl() && process.env.NODE_ENV === "production" && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");
}

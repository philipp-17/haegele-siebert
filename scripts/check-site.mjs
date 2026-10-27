import { readFile, access } from 'node:fs/promises';
const pages = ['index.html', 'impressum.html', 'datenschutz.html'];
for (const page of pages) {
  const html = await readFile(new URL(`../.next/server/app/${page}`, import.meta.url), 'utf8');
  if (!html.includes('id="hauptinhalt"') || !html.includes('lang="de"')) throw new Error(`Unvollständige Seite: ${page}`);
  if (/Testversion|Testdaten|Musterstraße|Musterstadt|kontakt@example\.com|https?:\/\/(?:localhost|127\.0\.0\.1)|Bitte ergänzen|Vor Veröffentlichung ergänzen|Noch zu ergänzende Angaben/.test(html)) throw new Error(`Veraltete Daten oder Platzhalter: ${page}`);
  if (!html.includes('mailto:Info@haegele-siebert.de') || !html.includes('tel:01771983867')) throw new Error(`Kontaktlink fehlt: ${page}`);
  console.log(`OK: ${page}`);
}
for (const asset of ['garten.jpg', 'favicon.svg']) await access(new URL(`../public/${asset}`, import.meta.url));
const home = await readFile(new URL('../.next/server/app/index.html', import.meta.url), 'utf8');
for (const id of ['start', 'leistungen', 'ueber-uns', 'kontakt', 'anfrage']) {
  if (!home.includes(`id="${id}"`)) throw new Error(`Abschnitt fehlt: ${id}`);
}
if (home.includes('<select')) throw new Error('Veraltete Dienstleistungsauswahl');
if (!home.includes('Dienstleistung beschreiben')) throw new Error('Dienstleistungsfeld fehlt');
if (home.includes('name="message"')) throw new Error('Entferntes Nachrichtenfeld vorhanden');
for (const page of ['impressum.html', 'datenschutz.html']) {
  const html = await readFile(new URL(`../.next/server/app/${page}`, import.meta.url), 'utf8');
  for (const value of ['Chris Hägele und Philipp Siebert', 'Steinbühlweg 16', '71573 Allmersbach im Tal', 'Deutschland']) {
    if (!html.includes(value)) throw new Error(`Unternehmensangabe fehlt: ${page}: ${value}`);
  }
}
await access(new URL('../.next/server/app/api/anfrage/route.js', import.meta.url));
await access(new URL('../.next/server/app/robots.txt.body', import.meta.url));
await access(new URL('../.next/server/app/sitemap.xml.body', import.meta.url));
console.log('Seiten, Kontaktlinks, Formular, Serverroute, SEO-Dateien und Bilder vorhanden.');

# Hägele & Siebert Grundstückspflege

Bestehende Next.js-Website mit TypeScript und Tailwind CSS. Das Kontaktformular sendet serverseitig über die Resend-API an **Info@haegele-siebert.de**. Es wird keine zusätzliche E-Mail-Bibliothek benötigt.

## 1. Lokal starten

Node.js 24 LTS und npm installieren. Im Terminal in diesen Ordner (`website`) wechseln:

```sh
npm install
npm run dev
```

Die im Terminal angezeigte lokale Adresse im Browser öffnen. Unter Windows PowerShell gegebenenfalls `npm.cmd` statt `npm` verwenden, falls die Ausführung von `npm.ps1` gesperrt ist.

Prüfungen und Produktionsbetrieb:

```sh
npm run typecheck
npm test
npm run build
npm run check:site
npm start
```

`check:site` prüft die tatsächlich erzeugten Next.js-Dateien. `npm start` benötigt einen fertigen Build. Keine statische Export-Version verwenden: Der Versand benötigt die Serverroute `/api/anfrage/`.

Der Produktionsbuild verwendet ausdrücklich Webpack (`next build --webpack`). Das umgeht den auf Hostinger gemeldeten Turbopack-Abbruch bei der CSS-/PostCSS-Verarbeitung: Ein gestarteter Node-Prozess beendet sich dort vor der Verbindung zum Buildprozess. Die genaue Ursache in der Hostingumgebung ist ohne deren Panic-Log nicht nachgewiesen. Bei Hostinger als Build-Befehl `npm run build` verwenden, damit die Einstellung aus `package.json` greift. Der Startbefehl bleibt `npm start`; der lokale Entwicklungsserver bleibt unverändert.

## 2. Environment Variables

Die Datei `.env.example` nach `.env.local` kopieren und die Werte ersetzen. `.env.local` bleibt privat und wird durch `.gitignore` vom Repository ausgeschlossen. Keine Zugangsdaten in Quellcode, Chat oder GitHub eintragen.

| Variable | Verwendung |
| --- | --- |
| `RESEND_API_KEY` | Resend-Schlüssel mit Sendeberechtigung, möglichst auf die Absenderdomain beschränkt. Nur serverseitig. |
| `CONTACT_FROM_EMAIL` | Absender unter der in Resend verifizierten Domain, z. B. `Hägele & Siebert Grundstückspflege <anfragen@ihre-domain.de>`. Nur serverseitig. |
| `SITE_URL` | Öffentliche Hauptdomain mit HTTPS, ohne Pfad, z. B. `https://ihre-domain.de`. Keine Beispieladresse übernehmen. |

Wenn die Domain noch offen ist, `SITE_URL` leer lassen. Dann bleibt die Website vorerst von der Suchmaschinenindexierung ausgeschlossen, und die Sitemap enthält keine erfundenen URLs. Sobald die Domain feststeht, den Wert setzen und neu deployen. Vercel-Preview-Versionen werden ebenfalls nicht zur Indexierung freigegeben.

Keine dieser Variablen benötigt ein `NEXT_PUBLIC_`-Präfix. Nach Änderungen den lokalen Server neu starten; auf Vercel neu deployen.

## 3. E-Mail-Versand einrichten

1. Ein [Resend-Konto](https://resend.com) anlegen.
2. Eine eigene Domain oder eine eigene Versand-Subdomain in Resend hinzufügen und mit den dort angegebenen DNS-Einträgen verifizieren. Die [Resend-Domainanleitung](https://resend.com/docs/dashboard/domains/introduction) beschreibt die Einträge. Bestehende DNS-Einträge für andere Postfächer erhalten.
3. Einen API-Key mit Sendeberechtigung anlegen und als `RESEND_API_KEY` speichern.
4. `CONTACT_FROM_EMAIL` auf eine Adresse unter der verifizierten Domain setzen. Der **Empfänger** ist Info@haegele-siebert.de; die Absenderdomain muss separat in Resend verifiziert werden. Ein separates Postfach für die Absenderadresse ist für den API-Versand nicht erforderlich.
5. Server neu starten bzw. Deployment erneuern. Eine Anfrage mit eigenen Daten senden, den Eingang im Postfach Info@haegele-siebert.de einschließlich Spamordner prüfen und auf die Nachricht antworten. `Reply-To` enthält die E-Mail-Adresse des Kunden.

Ohne Zugangsdaten zeigt das Formular eine verständliche Fehlermeldung; es meldet keinen erfolgreichen Versand. Erfolg wird erst angezeigt, wenn Resend die Nachricht angenommen und eine Nachrichten-ID zurückgegeben hat. Die endgültige Zustellung ins Postfach Info@haegele-siebert.de muss bei der Einrichtung geprüft werden.

Das Formular prüft Eingaben im Browser und auf dem Server, begrenzt die Größe von Anfragen und verwendet ein Honeypot-Feld sowie eine Prüfung der Anfrageherkunft. Eine wiederholte Übermittlung desselben Versuchs erhält denselben Idempotenzschlüssel, um doppelte E-Mails bei Netzwerkproblemen zu vermeiden. Ein Honeypot ist einfacher Spam-Schutz; bei tatsächlichem Missbrauch können zusätzliche Schutzmaßnahmen am Hosting aktiviert werden.

Es werden keine echten Zugangsdaten mitgeliefert. Die automatisierten Versandtests verwenden eine simulierte Resend-Antwort und senden keine Nachrichten.

## 4. Zu GitHub hochladen

Ein privates oder öffentliches GitHub-Repository anlegen. Diesen `website`-Ordner als Projekt hochladen, einschließlich `.gitignore`, `.env.example` und `package-lock.json`. Bei Verwendung von Git:

```sh
git init
git add .
git status
git commit -m "Website für Veröffentlichung vorbereiten"
git branch -M main
git remote add origin REPOSITORY_URL_VON_GITHUB
git push -u origin main
```

Vor dem Commit die vorgemerkten Dateien prüfen. `node_modules`, `.next`, `out`, `.env.local`, Logdateien und `.vercel` gehören nicht ins Repository. Ist das Repository bereits eingerichtet, den bestehenden Workflow verwenden und nicht erneut initialisieren.

## 5. Bei Vercel veröffentlichen

1. Bei Vercel anmelden und **Add New → Project** auswählen.
2. Das GitHub-Repository importieren. Next.js als Framework verwenden. Liegt `package.json` im Unterordner `website`, diesen als **Root Directory** wählen; sonst die Repository-Wurzel verwenden.
3. Die drei Variablen unter **Settings → Environment Variables** eintragen. Den E-Mail-Schlüssel nur für die benötigten Umgebungen freigeben. Für Tests in Preview dieselben Versandzugänge nur bewusst aktivieren.
4. Standard-Einstellungen für Next.js beibehalten (`npm run build`, Ausgabe automatisch). Kein `out`-Verzeichnis als Ausgabe festlegen. Node.js 24.x verwenden.
5. Deployen. Anschließend Seiten, Bilder, Mobilmenü und eine tatsächliche Formularzustellung prüfen. Nach Änderungen an Variablen erneut deployen.

Anleitungen: [Git-Deployment](https://vercel.com/docs/git), [Environment Variables](https://vercel.com/docs/environment-variables).

## 6. Eigene Domain verbinden

Im Vercel-Projekt **Settings → Domains** öffnen und die eigene Domain hinzufügen. Beim Domainanbieter genau die von Vercel angezeigten DNS-Einträge setzen. Gegebenenfalls auch `www` hinzufügen und eine Hauptdomain mit Weiterleitung festlegen. Auf erfolgreiche DNS-Prüfung und HTTPS warten. Nicht benötigte Änderungen an bestehenden E-Mail-DNS-Einträgen vermeiden.

Dann `SITE_URL` auf die gewählte Hauptdomain setzen und neu deployen. Danach `/robots.txt`, `/sitemap.xml`, die Domainweiterleitung und den E-Mail-Eingang prüfen. Vercel-Domainkonfiguration und Resend-Absenderverifizierung sind zwei getrennte Schritte. [Vercel-Domainanleitung](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

## 7. Inhalte später ändern

- Kontaktdaten und Leistungsbeschreibungen: `lib/content.ts`. Der Formularempfänger verwendet dieselbe E-Mail-Adresse.
- Hauptseite: `app/page.tsx`.
- Formular: `components/inquiry-form.tsx`; Serverroute: `app/api/anfrage/route.ts`; Validierung und Versand: `lib/inquiry.ts`.
- Impressum und Datenschutz: `app/impressum/page.tsx` und `app/datenschutz/page.tsx`.
- SEO: `app/layout.tsx`, `lib/site.ts`, `app/robots.ts`, `app/sitemap.ts`.

## Abschlussdokumentation zur Veröffentlichung – 13. Oktober 2026

### Unternehmensangaben und Rechtstexte

Impressum und Datenschutzerklärung enthalten die bestätigte Firma, Rechtsform, Geschäftsanschrift in Allmersbach im Tal, Deutschland, beide Gesellschafter und ihre grundsätzliche gemeinschaftliche Vertretung. Registergericht, Registernummer, eGbR-Status, Steuernummer und Umsatzsteuer-ID werden nicht angegeben. Die Gesellschaft ist laut Betreiber nicht registriert; eine USt-ID wurde nicht mitgeteilt. Es wird kein Datenschutzbeauftragter behauptet.

Die sichtbaren Entwickler-Platzhalter wurden durch konkrete Texte zu Verantwortlichem, Kontaktaufnahme, Rechtsgrundlagen, Löschkriterien, Dienstleistern, Betroffenenrechten und Beschwerdemöglichkeit ersetzt. Aktuelle Anschrift der Aufsichtsbehörde: Heilbronner Straße 35, 70191 Stuttgart. Die früher verbreitete Anschrift Lautenschlagerstraße wird nicht übernommen. Die übrige Website und ihr Design bleiben erhalten.

### Technisch ermittelte Verarbeitung

- Formular: Vorname, Nachname, E-Mail-Adresse, optionale Telefonnummer, Dienstleistungsbeschreibung mit optionalen Orts-/Terminangaben. Es gibt kein separates Nachrichtenfeld; auch die Versandlogik verwendet es nicht mehr.
- Technische Angaben: Origin-Header zur Herkunftsprüfung, zufällige Versandkennung zur Idempotenz, Bestätigung der Kenntnisnahme der Datenschutzhinweise und Honeypot zur Spamabwehr. Die Kenntnisnahme ist keine Werbeeinwilligung. Die Kennung wird an Resend übermittelt; die übrigen Prüfangaben stehen nicht im E-Mail-Inhalt.
- Versandweg: Browser → eigene Serverroute → `https://api.resend.com/emails` → festes Outlook-Postfach. Der Browser erhält weder API-Key noch Absenderkonfiguration. Keine Datenbank, keine Protokollierung der Formularinhalte im Anwendungscode und keine dauerhafte Speicherung der Eingaben im Browser.
- Keine eingebundenen Analyse-, Marketing-, Karten-, Video- oder Social-Media-Dienste, keine externen Skripte, keine Google Fonts. Die Schriftarten sind Systemschriftarten des Geräts; das Gartenfoto wird als lokale Datei ausgeliefert. Instagram und Unsplash sind nur Links.
- Der eigene Anwendungscode setzt keine Cookies. Zusätzliche Vercel-Dashboard-Einstellungen, Deployment-Schutz, Toolbar, Firewall-Challenges oder später hinzugefügte Integrationen müssen am tatsächlichen öffentlichen Deployment separat kontrolliert werden. Es wurde kein Cookie-Banner hinzugefügt.
- Vertrags-/vorvertragliche Kommunikation: Art. 6 Abs. 1 lit. b DSGVO; sonstige Anfragebearbeitung sowie Betrieb und Missbrauchsabwehr: Art. 6 Abs. 1 lit. f DSGVO. Aufbewahrung gesetzlich erforderlicher Geschäftsunterlagen: Art. 6 Abs. 1 lit. c DSGVO. Die tatsächliche organisatorische Löschung muss der Betreiber umsetzen.

### Anbieter, Vertragsstatus und Drittlandverarbeitung

**Vercel:** Für das Hosting vorgesehen, noch kein ausgewählter Tarif oder Deployment nachgewiesen. Anbieteranschrift aus offiziellen Datenschutzinformationen: Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA. Die Datenschutzerklärung beschreibt das vorgesehene Hosting ausdrücklich als solches. Die DPA-Unterlagen sehen unter anderem US-Verarbeitung und EU-Standardvertragsklauseln vor. Es wird kein bereits abgeschlossener Vertrag behauptet.

Vor Betrieb einen für gewerbliche Nutzung zulässigen Tarif wählen: **Hobby ist für private, nicht kommerzielle Nutzung beschränkt**. Das aktuell veröffentlichte DPA gilt für Pro-/Enterprise-Kunden. Die Geltung/Einbeziehung des DPA im konkreten Konto dokumentieren, Verarbeitungskette und Transfergarantien prüfen. Runtime-Logs haben im Pro-Tarif laut Dokumentation einen Tag Aufbewahrung, mit Observability Plus 30 Tage; andere Logarten sind davon nicht automatisch erfasst. Ausgewählten Tarif, Zusatzfunktionen, Regionen und weitere Protokollfristen vor Freigabe bestätigen. Keine Log-Drains oder zusätzliche Analysefunktionen für dieses Projekt erforderlich.

**Resend:** Der aktive Servercode nutzt Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA. Ohne Konfiguration erfolgt kein Versand. Die veröffentlichten DPA-Unterlagen enthalten Auftragsverarbeitung und EU-Standardvertragsklauseln; Resend beschreibt primäre Verarbeitung in den USA. Für Free/Pro/Scale dokumentiert der Anbieter 30 Tage für E-Mail-/Logdaten, nach Kontobeendigung bis zu 90 Tage für verbleibende Kundendaten. Konto, Tarif, DPA-Einbeziehung und Transfergrundlage tatsächlich bestätigen. Keine Vertragssignatur oder EU-only-Verarbeitung wird behauptet. Versand ist eine reine Text-E-Mail; kein Trackingpixel oder Trackinglink wird eingebaut.

**Microsoft:** Der Betreiber bestätigt ein **privates Microsoft-Konto / Outlook.com**, kein Microsoft-365-Geschäftskonto. Für Verbraucherdienste nennt Microsoft im EWR Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irland, als Verantwortlichen. Die offizielle Erklärung beschreibt mögliche Verarbeitung außerhalb des EWR und Schutzmechanismen einschließlich EU-Standardvertragsklauseln. Für Outlook.com werden gelöschte Elemente in der Regel etwa sieben Tage im Papierkorb und nach dessen Leerung bis zu 30 Tage im System vorgehalten, vorbehaltlich gesetzlicher Ausnahmen.

**Offener Freigabepunkt:** Die datenschutzrechtliche Eignung und die Vertragsgrundlage dieses privaten Postfachs für geschäftliche Kundenanfragen sind nicht nachgewiesen. Die Microsoft-Datenschutzbestimmungen ersetzen keinen gegebenenfalls erforderlichen AV-Vertrag. Nicht einfach das Microsoft-365-DPA als Vertrag für Outlook.com annehmen. Vor öffentlicher Nutzung Rollen, Bedingungen und erforderliche Vereinbarungen klären; falls nicht ausreichend, ein geeignetes Geschäfts-Mailprodukt verwenden und Rechtstext/Empfänger entsprechend aktualisieren. Zugangsschutz, Mehrfaktor-Anmeldung, Zugriffsberechtigungen und tatsächliche Löschabläufe organisatorisch einrichten.

### Noch offen und vor Freigabe zu erledigen

1. Öffentliche Hauptdomain festlegen; `SITE_URL` mit dieser HTTPS-Domain setzen.
2. Gewerblich zulässigen Vercel-Tarif wählen und DPA/Transfergrundlage sowie tatsächliche Hosting-/Sicherheitseinstellungen bestätigen. Nach tatsächlicher Aktivierung den Hostingtext vom vorgesehenen zum eingesetzten Hosting aktualisieren.
3. Resend-Konto einrichten, Versanddomain verifizieren, DPA/Transfergrundlage bestätigen; `RESEND_API_KEY` und `CONTACT_FROM_EMAIL` serverseitig bei Vercel hinterlegen. Kein `NEXT_PUBLIC_`-Präfix verwenden. Alle drei Variablen sind oben erklärt und in `.env.example` vorbereitet.
4. Eignung des privaten Outlook.com-Postfachs für Kundendaten klären beziehungsweise geeignete geschäftliche Alternative einrichten. Löschen und gesetzliche Aufbewahrung praktisch organisieren.
5. Nach Deployment eine echte Anfrage mit eigenen Daten senden, Zustellung einschließlich Spamordner sowie Antwortfunktion prüfen. Automatisierte Tests mit simuliertem Anbieter sind kein Nachweis einer echten Zustellung.
6. Den tatsächlichen öffentlichen Betrieb auf zusätzliche Cookies, Skripte, Logs und Schutzfunktionen kontrollieren; Rechtstext mit den bestätigten Kontobedingungen und organisatorischen Abläufen abgleichen.

Der Quellcode kann technisch vorbereitet und gebaut werden. Eine uneingeschränkte öffentliche Freigabe ist erst nach Klärung dieser Punkte möglich. Es fehlen keine Namen oder Anschriften der Gesellschaft mehr. Nicht vorhandene Registerangaben und nicht mitgeteilte Umsatzsteuer-ID sind keine ausgefüllten Fantasieangaben und werden nicht veröffentlicht.

### Offizielle Quellen, geprüft am 13. Oktober 2026

- [Vercel-Datenschutzinformationen](https://vercel.com/legal/privacy-notice), [DPA](https://vercel.com/legal/dpa), [Runtime-Logs](https://vercel.com/docs/logs/runtime), [Hobby-Nutzungsbeschränkung](https://vercel.com/docs/plans/hobby).
- [Resend-DPA einschließlich Anschrift](https://resend.com/legal/dpa), [Datenschutzinformationen](https://resend.com/legal/privacy-policy), [Sicherheit und Aufbewahrung](https://resend.com/security).
- [Microsoft-Datenschutzbestimmungen, insbesondere Outlook, Speicherorte und Kontakt](https://www.microsoft.com/de-de/privacy/privacystatement).
- [LfDI Baden-Württemberg: aktuelle Anschrift und Beschwerdeweg](https://www.baden-wuerttemberg.datenschutz.de/kontakt-aufnehmen/).
- [DSGVO, insbesondere Art. 6, 13, 15–22, 28, 44 ff. und 77](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32016R0679).

### Durchgeführte Abschlussprüfungen

- `npm run build`, `npm run typecheck`, `npm test` (9 Tests) und `npm run check:site`: erfolgreich.
- Produktionsbuild im echten Chrome-Browser: Startseite, Impressum und Datenschutz bei 320, 390 und 1440 Pixeln geprüft, HTTP 200, kein horizontaler Überlauf. Screenshots von Mobil- und Desktopansicht kontrolliert. Nur auf den Rechtstextseiten wurde ein Wortumbruch ergänzt, damit lange Überschriften und Adressen auf schmalen Geräten passen.
- Alle internen Links und Abschnittsanker sowie die Footer-Rechtslinks geprüft. Sämtliche zehn unterschiedlichen externen HTTPS-Linkziele waren beim Check mit HTTP 200 erreichbar; zukünftige Verfügbarkeit liegt beim jeweiligen Anbieter.
- Mobilmenü, Eingaben, Formularanfrage gegen die echte lokale Produktionsroute und Rückmeldung bei fehlenden Versandzugängen geprüft. Erfolgsmeldung und Zurücksetzen des Formulars mit ausdrücklich simuliertem API-Erfolg geprüft; kein echter Versand erfolgt.
- Dabei eine bestehende Fehlfunktion behoben: Next.js kann die interne Request-URL mit einem anderen Servernamen als dem aufgerufenen Host bilden. Die Herkunftsprüfung berücksichtigt jetzt den tatsächlichen Host-Header; fremde Herkunft, falsches Protokoll und ungültiger Host bleiben abgewiesen. Ein Regressionstest deckt das ab.
- Im Produktionsbrowser keine eigenen Cookies, kein Local-/Session-Storage, keine externen Ressourcenanfragen und keine JavaScript-Seitenfehler festgestellt. Öffentliche HTML-/Client-JS-Dateien auf Platzhalter, bekannte API-Key-Muster und Versand-Testwerte geprüft. Keine Treffer. Es existiert lokal nur `.env.example`; die drei Betriebsvariablen waren beim Test nicht gesetzt.
- Nicht nachgewiesen: tatsächliches Vercel-Deployment und dessen zusätzliche Einstellungen, reale E-Mail-Zustellung, bestehende Anbietervereinbarungen und Eignung des privaten Microsoft-Postfachs. Diese Punkte bleiben ausdrücklich vor öffentlicher Freigabe zu klären.

import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/content";
import { siteUrl } from "@/lib/site";
const url = siteUrl();
export const metadata: Metadata = { title: "Datenschutzerklärung", ...(url && { alternates: { canonical: new URL("/datenschutz/", url).href } }) };

export default function Datenschutz() {
  return <main id="hauptinhalt" className="container legal">
    <p className="eyebrow">DATENSCHUTZ</p><h1>Datenschutzerklärung</h1>
    <p>Hier erfahren Sie, wie wir personenbezogene Daten beim Besuch dieser Website und bei einer Kontaktaufnahme verarbeiten.</p>

    <h2>Verantwortliche Stelle und Kontakt</h2>
    <p>{company.legalName}<br />{company.street}<br />{company.city}<br />{company.country}<br />Gemeinschaftlich vertreten durch {company.partners}<br />Telefon: <a href={`tel:${company.phone}`}>{company.phone}</a><br />E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a></p>
    <p>Für Fragen zum Datenschutz und zur Ausübung Ihrer Rechte wenden Sie sich bitte an diese E-Mail-Adresse.</p>

    <h2>Kontaktaufnahme und Anfrageformular</h2>
    <p>Das Formular erhebt Vorname, Nachname, E-Mail-Adresse und eine Beschreibung der gewünschten Dienstleistung. Die Telefonnummer ist freiwillig. Angaben zu Ort oder Zeitraum können Sie in die Beschreibung aufnehmen. Bei direkter Kontaktaufnahme verarbeiten wir die von Ihnen mitgeteilten Kontakt- und Inhaltsdaten.</p>
    <p>Wir nutzen diese Angaben zur Bearbeitung und Beantwortung Ihrer Anfrage sowie gegebenenfalls zur Vorbereitung oder Durchführung eines Auftrags. Vertragsbezogene Anfragen verarbeiten wir auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Bei sonstiger Kommunikation ist Art. 6 Abs. 1 lit. f DSGVO die Grundlage; unser berechtigtes Interesse ist die sachgerechte Beantwortung von Anfragen.</p>
    <p>Ohne die erforderlichen Angaben kann das Formular nicht versendet werden. Die Bestätigung, dass Sie die Datenschutzhinweise gelesen haben, ist keine Einwilligung in Werbung.</p>
    <p>Das Formular übermittelt Ihre Angaben an die Serverroute dieser Website. Dort werden sie geprüft und über Resend an unser Outlook-Postfach gesendet. Zusätzlich verarbeitet die Anwendung technische Angaben zur Anfrageherkunft, eine zufällige Kennung zur Vermeidung doppelter Sendungen und die Bestätigung der Datenschutzhinweise. Ein unsichtbares Prüffeld dient der Spamabwehr; ausgefüllte Prüffelder führen zum Verwerfen der Anfrage. Die Missbrauchsabwehr beruht auf Art. 6 Abs. 1 lit. f DSGVO und unserem Interesse an einem sicheren Betrieb.</p>
    <p>Die Anwendung führt keine Anfragedatenbank, protokolliert keine Formularinhalte und speichert Ihre Eingaben nicht in Cookies oder dauerhaft im Browserspeicher. Hosting-, Versand- und Postfachanbieter verarbeiten Daten im nachfolgend beschriebenen Umfang. Es erfolgen keine automatisierten Entscheidungen mit rechtlicher oder vergleichbar erheblicher Wirkung und kein Profiling durch unsere Anwendung.</p>

    <h2>Speicherung und Löschung von Anfragen</h2>
    <p>Wir löschen Anfragen, sobald sie für die Bearbeitung und weitere Kommunikation nicht mehr erforderlich sind. Entsteht ein Auftrag, bleiben erforderliche Geschäftsunterlagen für die gesetzlich vorgeschriebene Aufbewahrung erhalten (Art. 6 Abs. 1 lit. c DSGVO). Soweit Daten zur Geltendmachung oder Abwehr von Rechtsansprüchen erforderlich sind, speichern wir sie auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO bis dieser Zweck entfällt. Die nachfolgend genannten technischen Löschabläufe der Anbieter können zusätzlich gelten.</p>

    <h2>Hosting mit Vercel</h2>
    <p>Für die öffentliche Bereitstellung ist Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, vorgesehen. Bei Betrieb über Vercel werden Seiten und Formularanfragen über dessen Infrastruktur verarbeitet. Dabei können IP-Adresse, Zugriffszeit, angeforderte URL, Statuscode, Herkunftsseite sowie Browser- und Geräteinformationen in technischen Protokollen verarbeitet werden.</p>
    <p>Zweck ist die zuverlässige Auslieferung, Fehleranalyse und Abwehr von Angriffen. Grundlage ist Art. 6 Abs. 1 lit. f DSGVO, unser Interesse an einer sicheren und erreichbaren Website. Vercel dokumentiert für Runtime-Logs tarifabhängige Fristen: beim Pro-Tarif einen Tag, mit Observability Plus 30 Tage. Das ist keine allgemeine Frist für sämtliche Vercel-Daten. Weitere technische Daten werden nach den jeweiligen Betriebs- und Sicherheitszwecken gelöscht oder anonymisiert, sobald sie nicht mehr erforderlich sind.</p>
    <p>Vercels <a href="https://vercel.com/legal/dpa">Data Processing Addendum</a> regelt die Auftragsverarbeitung und mögliche Verarbeitungen unter anderem in den USA; es enthält EU-Standardvertragsklauseln für einschlägige Übermittlungen. Informationen: <a href="https://vercel.com/legal/privacy-notice">Vercel-Datenschutzinformationen</a> und <a href="https://vercel.com/docs/logs/runtime">Dokumentation der Runtime-Logs</a>.</p>

    <h2>E-Mail-Versand mit Resend</h2>
    <p>Die Serverroute verwendet Resend von Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA. Für den Versand verarbeitet Resend Ihre Formulardaten als E-Mail-Inhalt sowie Absender-, Empfänger- und Zustellinformationen. Die E-Mail-Adresse aus dem Formular wird als Antwortadresse übermittelt. Rechtsgrundlage ist je nach Anfrage Art. 6 Abs. 1 lit. b oder lit. f DSGVO, wie oben beschrieben.</p>
    <p>Resend verarbeitet Daten insbesondere in den USA. Das <a href="https://resend.com/legal/dpa">Data Processing Addendum</a> beschreibt Auftragsverarbeitung und EU-Standardvertragsklauseln. Laut <a href="https://resend.com/security">Resend-Sicherheitsinformationen</a> werden E-Mail- und Protokolldaten in den Tarifen Free, Pro und Scale 30 Tage gespeichert; verbleibende Kundendaten werden nach Kontobeendigung innerhalb von 90 Tagen gelöscht. Abweichende vertragliche Regelungen können für andere Tarife gelten. Weitere Informationen: <a href="https://resend.com/legal/privacy-policy">Resend-Datenschutzerklärung</a>.</p>

    <h2>Empfang und Bearbeitung über Outlook.com</h2>
    <p>Anfragen gehen an {company.email}. Dafür wird ein privates Microsoft-Konto mit Outlook.com verwendet. Microsoft verarbeitet E-Mail-Inhalte, Kontaktangaben und technische Zustellinformationen zur Bereitstellung und Absicherung des Postfachs. Wir bearbeiten die Anfragen auf den oben genannten Rechtsgrundlagen.</p>
    <p>Microsoft nennt für seine Verbraucherdienste im EWR Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irland, als Verantwortlichen. Daten können auch außerhalb des EWR, insbesondere in den USA, verarbeitet werden. Microsoft beschreibt dafür unter anderem EU-Standardvertragsklauseln in seinen <a href="https://www.microsoft.com/de-de/privacy/privacystatement">Datenschutzbestimmungen</a>.</p>
    <p>Nach Microsofts Angaben bleiben gelöschte Outlook.com-Nachrichten in der Regel etwa sieben Tage im Ordner „Gelöschte Objekte“. Nach dessen Leerung können sie noch bis zu 30 Tage im System verbleiben, vorbehaltlich gesetzlich erforderlicher längerer Aufbewahrung. Unsere Löschkriterien für Anfragen gelten ergänzend.</p>

    <h2>Cookies, Schriftarten und externe Inhalte</h2>
    <p>Die Website setzt durch ihren eigenen Anwendungscode keine Cookies und verwendet keine Analyse- oder Marketingdienste. Es werden keine Google Fonts, Karten, Videos, Social-Media-Widgets oder externen Skripte eingebunden. Die Schrift wird aus den auf Ihrem Gerät verfügbaren Systemschriftarten dargestellt. Das Gartenfoto liegt auf dem Website-Server. Ein Einwilligungsbanner ist für diese Implementierung nicht vorgesehen.</p>
    <p>Instagram und der Bildnachweis bei Unsplash sind normale externe Links. Beim Laden unserer Website werden dadurch keine Ressourcen dieser Anbieter abgerufen. Erst beim Öffnen eines Links kontaktieren Sie die jeweilige Plattform; dort gelten deren Datenschutzinformationen. Hostingseitige Schutzfunktionen können zusätzliche technische Verarbeitungen auslösen.</p>

    <h2>Ihre Rechte</h2>
    <p>Unter den gesetzlichen Voraussetzungen haben Sie ein Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung. Für automatisiert auf Grundlage eines Vertrags oder einer Einwilligung verarbeitete Daten kann Ihnen das Recht auf Datenübertragbarkeit zustehen.</p>
    <p><strong>Bei Verarbeitung auf Grundlage berechtigter Interessen können Sie aus Gründen Ihrer besonderen Situation widersprechen (Art. 21 DSGVO).</strong> Wir prüfen dann, ob die Verarbeitung beendet werden muss. Eine etwa erteilte Einwilligung können Sie jederzeit für die Zukunft widerrufen; die Rechtmäßigkeit der bisherigen Verarbeitung bleibt unberührt.</p>
    <p>Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere an Ihrem Aufenthaltsort, Arbeitsplatz oder am Ort eines vermuteten Verstoßes. Für unser Unternehmen in Baden-Württemberg ist folgende Behörde zuständig:</p>
    <p>Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />Heilbronner Straße 35<br />70191 Stuttgart<br /><a href="https://www.baden-wuerttemberg.datenschutz.de/kontakt-aufnehmen/">Kontakt und Beschwerdemöglichkeit</a></p>
    <p>Stand: 13. Oktober 2026</p>
    <Link className="text-link" href="/#anfrage">Zurück zur Anfrage</Link>
  </main>;
}

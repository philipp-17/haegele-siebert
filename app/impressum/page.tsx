import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/content";
import { siteUrl } from "@/lib/site";
const url = siteUrl();
export const metadata: Metadata = { title: "Impressum", ...(url && { alternates: { canonical: new URL("/impressum/", url).href } }) };

export default function Impressum() {
  return <main id="hauptinhalt" className="container legal">
    <p className="eyebrow">RECHTLICHE ANGABEN</p><h1>Impressum</h1>
    <h2>Unternehmen</h2><p>{company.legalName}<br />{company.street}<br />{company.city}<br />{company.country}</p>
    <p>Rechtsform: Gesellschaft bürgerlichen Rechts (GbR)<br />Sitz: Allmersbach im Tal</p>
    <h2>Vertretungsberechtigte Gesellschafter</h2><p>{company.partners}</p><p>Die Gesellschaft wird grundsätzlich durch beide Gesellschafter gemeinschaftlich vertreten. Einzelvertretungsmacht besteht grundsätzlich nicht.</p>
    <h2>Kontakt</h2><p>Telefon: <a href={`tel:${company.phone}`}>{company.phone}</a><br />E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a><br /><a href={company.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></p>
    <h2>Bildnachweis</h2><p>Gartenfoto: Colin Watts / <a href="https://unsplash.com/photos/a-large-green-lawn-with-hedges-and-a-building-in-the-background-LQzTTi9ZXUI" target="_blank" rel="noopener noreferrer">Unsplash</a>. Das Foto dient als Symbolbild und zeigt keine Referenzarbeit von Hägele & Siebert.</p>
    <Link className="text-link" href="/">Zur Startseite</Link>
  </main>;
}

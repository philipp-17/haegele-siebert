import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { InquiryForm } from "@/components/inquiry-form";
import { company, services } from "@/lib/content";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

const url = siteUrl();
export const metadata: Metadata = url ? { alternates: { canonical: url.href } } : {};

export default function Home() {
  return <main id="hauptinhalt">
    <section id="start" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">HÄGELE & SIEBERT GRUNDSTÜCKSPFLEGE</p>
          <h1>Ihr Grundstück.<br />In <em>guten Händen.</em></h1>
          <p className="hero-description">Wir pflegen Grundstück, Garten und Gebäude. Persönlich abgestimmt und sorgfältig ausgeführt.</p>
          <div className="hero-actions">
            <Link href="#anfrage" className="button">Anfrage senden</Link>
            <Link href="#leistungen" className="button button-outline">Leistungen ansehen</Link>
          </div>
        </div>
        <figure className="hero-visual">
          <Image src="/garten.jpg" alt="Gepflegte Gartenanlage mit grünem Rasen und geschnittenen Hecken" width={1600} height={1067} preload sizes="(max-width: 899px) 100vw, 50vw" className="hero-image" />
        </figure>
      </div>
    </section>
    <section id="leistungen" className="section services">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">LEISTUNGEN</p><h2>Pflege rund um Ihr Grundstück.</h2></div>
        </div>
        <div className="service-grid">
          {services.map(service => <article className="service-card" key={service.id}>
            <span className="icon-box"><Icon name={service.icon} /></span>
            <h3>{service.title}</h3><p>{service.description}</p>
          </article>)}
        </div>
      </div>
    </section>
    <section id="ueber-uns" className="section about">
      <div className="container about-grid">
        <div><p className="eyebrow">ÜBER UNS</p><h2>Persönlich für Sie da.</h2></div>
        <div className="about-copy">
          <p>Wir sind Chris Hägele und Philipp Siebert. Als kleines Unternehmen kümmern wir uns persönlich um Ihren Garten, Ihre Grünflächen und Ihr Gebäude. Wir besprechen mit Ihnen, was ansteht, und stimmen Umfang und Termine klar ab. Ob einmalige Unterstützung oder regelmäßige Pflege: Wir legen Wert auf sorgfältige Arbeit und eine unkomplizierte Zusammenarbeit.</p>
          <div className="team-names" aria-label="Ihre Ansprechpartner"><span>Chris Hägele</span><span>Philipp Siebert</span></div>
        </div>
      </div>
    </section>
    <section id="kontakt" className="section contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">KONTAKT</p><h2>Wie können wir helfen?</h2>
          <p>Beschreiben Sie kurz Ihr Anliegen. Die nächsten Schritte besprechen wir persönlich.</p>
          <dl className="contact-data">
            <div><dt>E-Mail</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
            <div><dt>Telefon</dt><dd><a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a></dd></div>
            <div><dt>Instagram</dt><dd><a href={company.instagram} target="_blank" rel="noopener noreferrer">Unser Profil ansehen ↗</a></dd></div>
          </dl>
        </div>
        <div id="anfrage" className="form-anchor"><InquiryForm /></div>
      </div>
    </section>
  </main>;
}

import Link from "next/link";
import {company} from "@/lib/content";
export function Footer(){return <footer className="site-footer"><div className="container"><div className="footer-top"><div><Link href="/#start" className="footer-brand">Hägele & Siebert<span>Grundstückspflege</span></Link></div><nav aria-label="Navigation im Fußbereich"><Link href="/#leistungen">Leistungen</Link><Link href="/#ueber-uns">Über uns</Link><Link href="/#kontakt">Kontakt</Link></nav></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {company.shortName}</p><div><Link href="/impressum/">Impressum</Link><Link href="/datenschutz/">Datenschutz</Link></div></div></div></footer>;}


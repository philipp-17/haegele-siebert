"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
const links=[["Startseite","/#start"],["Leistungen","/#leistungen"],["Über uns","/#ueber-uns"],["Kontakt","/#kontakt"]];
export function Header(){
 const [open,setOpen]=useState(false);const toggle=useRef<HTMLButtonElement>(null);const nav=useRef<HTMLElement>(null);
 useEffect(()=>{
 const close=(e:KeyboardEvent)=>{if(e.key==="Escape"&&open){setOpen(false);toggle.current?.focus();}};
 const outside=(e:PointerEvent)=>{if(open&&!nav.current?.contains(e.target as Node)&&!toggle.current?.contains(e.target as Node))setOpen(false);};
 const media=window.matchMedia("(min-width: 900px)");const resize=()=>{if(media.matches)setOpen(false);};
 document.addEventListener("keydown",close);document.addEventListener("pointerdown",outside);media.addEventListener("change",resize);
 return()=>{document.removeEventListener("keydown",close);document.removeEventListener("pointerdown",outside);media.removeEventListener("change",resize);};},[open]);
 return <header className="site-header"><div className="container header-inner"><Link href="/#start" className="brand" onClick={()=>setOpen(false)} aria-label="Hägele & Siebert Grundstückspflege – Startseite"><span className="brand-mark" aria-hidden="true">H<span>&</span>S</span><span className="brand-name">Hägele & Siebert<small>GRUNDSTÜCKSPFLEGE</small></span></Link><button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={()=>setOpen(!open)}><span aria-hidden="true">{open?"×":"☰"}</span>{open?"Schließen":"Menü"}</button><nav ref={nav} id="main-navigation" className={`main-nav ${open?"is-open":""}`} aria-label="Hauptnavigation">{links.map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}<Link className="button button-small" href="/#anfrage" onClick={()=>setOpen(false)}>Anfrage senden</Link></nav></div></header>;
}

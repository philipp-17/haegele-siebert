import type {Metadata} from "next";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";
import {allowIndexing, siteUrl} from "@/lib/site";
import "./globals.css";
const title="Hägele & Siebert Grundstückspflege";
const description="Zuverlässige Pflege rund um Grundstück, Garten und Gebäude. Grünflächenpflege, Hausmeisterservice, Gebäudereinigung und Winterdienst aus einer Hand.";
const url=siteUrl();
export const metadata:Metadata={...(url&&{metadataBase:url}),title:{default:title,template:"%s | Hägele & Siebert"},description,applicationName:title,robots:{index:allowIndexing(),follow:allowIndexing()},openGraph:{title,description,siteName:title,locale:"de_DE",type:"website",...(url&&{url:url.href,images:[{url:new URL("/garten.jpg",url).href,width:1600,height:1067,alt:"Gepflegte Gartenanlage – Hägele & Siebert Grundstückspflege"}]})},twitter:{card:url?"summary_large_image":"summary",title,description,...(url&&{images:[new URL("/garten.jpg",url).href]})},icons:{icon:[{url:"/favicon.svg",type:"image/svg+xml"}]}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="de"><body><a className="skip-link" href="#hauptinhalt">Zum Inhalt springen</a><Header/>{children}<Footer/></body></html>;}

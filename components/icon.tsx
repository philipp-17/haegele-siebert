import type { SVGProps, ReactNode } from "react";
type Name = "leaf"|"sprout"|"house"|"sparkle"|"snow"|"tools"|"check";
const paths: Record<Name, ReactNode> = {
 leaf:<><path d="M20 4c-8-1-16 2-16 9a7 7 0 0 0 7 7c7 0 10-8 9-16Z"/><path d="m4 20 11-11"/></>,
 sprout:<path d="M12 21v-9M12 14C5 14 3 10 3 5c6 0 9 3 9 9ZM12 11c0-6 3-9 9-9 0 6-3 9-9 9Z"/>,
 house:<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>,
 sparkle:<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4M18 4h4"/>,
 snow:<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3"/>,
 tools:<path d="m4 20 7-7M14 3a6 6 0 0 0-6 8l5 5a6 6 0 0 0 8-6l-4 3-4-4 3-4-2-2Z"/>,
 check:<path d="m5 12 4 4L19 6"/>,
};
export function Icon({name,...props}: SVGProps<SVGSVGElement>&{name:Name}) {return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;}

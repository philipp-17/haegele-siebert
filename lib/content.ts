export const company = {
  name: "Hägele & Siebert Grundstückspflege",
  shortName: "Hägele & Siebert",
  legalName: "Hägele & Siebert Grundstückspflege GbR",
  street: "Steinbühlweg 16",
  city: "71573 Allmersbach im Tal",
  country: "Deutschland",
  partners: "Chris Hägele und Philipp Siebert",
  email: "Info@haegele-siebert.de",
  phone: "01771983867",
  instagram: "https://www.instagram.com/grundstuckspflegesieberthagele?utm_source=ig_web_button_share_sheet&dlrf=ZDNlZDc0MzIxNw==",
};
export const services = [
  { id: "grundstueck", title: "Grundstücks- & Grünflächenpflege", description: "Rasen mähen, Laub entfernen und Außenanlagen gepflegt halten.", icon: "leaf" },
  { id: "garten", title: "Garten- & Landschaftspflege", description: "Wir pflegen Hecken, Sträucher und Beete – passend zur Jahreszeit.", icon: "sprout" },
  { id: "hausmeister", title: "Hausmeisterservice", description: "Kleine Arbeiten rund um Haus und Grundstück nach Absprache.", icon: "house" },
  { id: "reinigung", title: "Gebäudereinigung", description: "Sorgfältige Reinigung von Eingängen durch Entfernen von Schmutz.", icon: "sparkle" },
  { id: "winter", title: "Winterdienst", description: "Wir räumen und streuen die vereinbarten Wege und Zugänge.", icon: "snow" },
  { id: "weiteres", title: "Weitere Dienstleistungen", description: "Weitere Arbeiten rund um Ihr Grundstück stimmen wir individuell mit Ihnen ab.", icon: "tools" },
] as const;

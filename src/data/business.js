const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

export const BUSINESS = {
  name: "Piink Tea Studio",
  address: "3736 Monticello Plaza, Weldon Spring, MO 63304",
  phone: "(636) 244-1032",
  phoneHref: "tel:+16362441032",
  instagram: "https://www.instagram.com/piinkteastudio/",
  facebook: "https://www.facebook.com/p/Piink-Tea-Studio-61584456963164/",
  doordash: "https://www.doordash.com/store/piink-tea-studio---3736-monticello-ofallon-mo-63368-weldon-spring-41926793/",
  ubereats: "https://www.ubereats.com/store/piink-tea-studio/aRty0MhHTH-nePI5T8AHGA",
  mapEmbed: "https://maps.google.com/maps?q=3736%20Monticello%20Plaza%2C%20Weldon%20Spring%2C%20MO%2063304&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=3736+Monticello+Plaza+Weldon+Spring+MO+63304",
};

export const HOURS = [
  { day: "Monday", time: "11:00 AM – 8:00 PM" },
  { day: "Tuesday", time: "11:00 AM – 8:00 PM" },
  { day: "Wednesday", time: "11:00 AM – 8:00 PM" },
  { day: "Thursday", time: "11:00 AM – 8:00 PM" },
  { day: "Friday", time: "11:00 AM – 8:00 PM" },
  { day: "Saturday", time: "11:00 AM – 8:00 PM" },
  { day: "Sunday", time: "11:00 AM – 8:00 PM" },
];

export const NAV_LINKS = [
  { label: "Menu", path: "/menu" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Reviews", path: "/reviews" },
  { label: "Order", path: "/order" },
];

export const IMAGES = {
  heroFrames: [
    "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1570781899832-4f8fd5a37d40?auto=format&fit=crop&w=1200&q=80",
  ],
  heroCup: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1400&q=80",
  strawberryMatcha: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1400&q=80",
  brownSugar: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1400&q=80",
  ubeLatte: "https://images.unsplash.com/photo-1570781899832-4f8fd5a37d40?auto=format&fit=crop&w=1400&q=80",
  interior1: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80",
  interior2: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  ingredients: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1400&q=80",
  splash: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=1400&q=80",
  lineup: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
  pour: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
};

export const GALLERY_IMAGES = [
  { src: IMAGES.heroCup, alt: "Signature hot pink boba milk tea" },
  { src: IMAGES.strawberryMatcha, alt: "Strawberry milk matcha with popping boba" },
  { src: IMAGES.brownSugar, alt: "Toasted brown sugar milk tea with boba" },
  { src: IMAGES.ubeLatte, alt: "Ube latte" },
  { src: IMAGES.interior1, alt: "Piink Tea Studio interior" },
  { src: IMAGES.interior2, alt: "Piink Tea Studio ordering counter" },
  { src: IMAGES.ingredients, alt: "Fresh matcha, boba pearls and strawberries" },
  { src: IMAGES.splash, alt: "Boba pearls in motion" },
  { src: IMAGES.lineup, alt: "Lineup of colorful boba teas" },
  { src: IMAGES.pour, alt: "Tea pouring over ice and boba" },
];
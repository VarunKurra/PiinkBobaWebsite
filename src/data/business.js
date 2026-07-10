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
    "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/880f95ff2_generated_image.png",
    "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/53fdfc188_generated_image.png",
    "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/6c976184a_generated_image.png",
    "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/8a1e043d0_generated_image.png",
  ],
  heroCup: "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/17742f711_generated_image.png",
  strawberryMatcha: "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/aa51f3019_generated_image.png",
  brownSugar: "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/d5e026bac_generated_image.png",
  ubeLatte: "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/55edd68af_generated_image.png",
  interior1: "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/0ab0d6b44_generated_image.png",
  interior2: "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/896bd5490_generated_image.png",
  ingredients: "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/95c06b6bb_generated_image.png",
  splash: "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/bd5dbc0be_generated_image.png",
  lineup: "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/bb5a0eee8_generated_image.png",
  pour: "https://media.db.com/images/public/6a515e62ecd0be8c62ca3761/9869ecfb4_generated_image.png",
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
import { IMAGES } from "./business";

export const MENU = [
  {
    category: "Signature Series",
    items: [
      { name: "Toasted Brown Sugar Milk Tea + Boba", price: 10.20, description: "Torched brown sugar, fresh milk, chewy boba, brûléed top.", image: IMAGES.brownSugar },
      { name: "Strawberry Milk Matcha", price: 9.80, description: "Hand-whisked grade A matcha layered with strawberry purée, popping boba.", image: IMAGES.strawberryMatcha },
      { name: "Crème Brûlée Biscuit Milk Tea + Boba", price: 10.50, description: "Silky black tea, biscuit crumble, torched sugar top, boba.", image: IMAGES.heroCup },
      { name: "Ube Latte", price: 9.60, description: "Purple yam latte, creamy and lightly sweet.", image: IMAGES.ubeLatte },
    ],
  },
  {
    category: "Energy Series",
    items: [
      { name: "Pink Dragon Refresher", price: 8.50, description: "Dragonfruit, lychee, sparkling energy base.", image: null },
      { name: "Electric Peach Boost", price: 8.50, description: "Peach, guava, energy boost, popping boba.", image: null },
      { name: "Blue Razz Rocket", price: 8.75, description: "Blue raspberry, lemonade, energy blend.", image: null },
    ],
  },
  {
    category: "Fruit + Tea Series",
    items: [
      { name: "Passion Fruit Green Tea", price: 7.50, description: "Bright passion fruit over hand-brewed green tea.", image: null },
      { name: "Mango Pomelo Sago", price: 8.20, description: "Mango, pomelo, sago pearls, coconut cream.", image: null },
      { name: "Peach Oolong", price: 7.50, description: "Roasted oolong, ripe peach.", image: null },
      { name: "Lychee Rose Black Tea", price: 7.75, description: "Lychee, rose, classic black tea.", image: null },
    ],
  },
  {
    category: "Matcha & Lattes",
    items: [
      { name: "Classic Grade A Matcha Latte", price: 7.80, description: "Hand-whisked ceremonial-grade matcha, fresh milk.", image: null },
      { name: "Brown Sugar Matcha", price: 8.40, description: "Matcha layered with toasted brown sugar.", image: null },
      { name: "Vanilla Bean Latte", price: 6.50, description: "House espresso, real vanilla bean.", image: null },
      { name: "Cookies & Cream Latte", price: 8.00, description: "Crushed cookies, creamy espresso base.", image: null },
    ],
  },
  {
    category: "Food & Treats",
    items: [
      { name: "Korean Fried Chicken Bites", price: 8.95, description: "Crispy double-fried chicken, sweet-spicy glaze.", image: null },
      { name: "Spicy Chicken Sando Bites", price: 9.25, description: "Crispy chicken, pickles, spicy mayo, mini bun.", image: null },
      { name: "Biscuit Cookie", price: 3.50, description: "Buttery biscuit cookie, house-baked daily.", image: null },
      { name: "Mini Egg Waffle", price: 6.50, description: "Hong Kong style egg waffle, warm and fluffy.", image: null },
    ],
  },
];
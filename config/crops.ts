export interface CropConfig {
  id: string;
  nameBn: string;
  nameEn: string;
  icon: string;
  imageUrl: string;
  color: string;
  commonInBangladesh: boolean;
}

export const CROPS: CropConfig[] = [
  {
    id: "rice",
    nameBn: "ধান",
    nameEn: "Rice / Paddy",
    icon: "Wheat",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=360&h=360&fit=crop&auto=format&q=80",
    color: "#8E9A28",
    commonInBangladesh: true,
  },
  {
    id: "potato",
    nameBn: "আলু",
    nameEn: "Potato",
    icon: "CircleDot",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=360&h=360&fit=crop&auto=format&q=80",
    color: "#B88942",
    commonInBangladesh: true,
  },
  {
    id: "tomato",
    nameBn: "টমেটো",
    nameEn: "Tomato",
    icon: "Apple",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=360&h=360&fit=crop&auto=format&q=80",
    color: "#D32F2F",
    commonInBangladesh: true,
  },
  {
    id: "eggplant",
    nameBn: "বেগুন",
    nameEn: "Eggplant",
    icon: "Egg",
    imageUrl: "/crops/eggplant.jpg",
    color: "#6A1B9A",
    commonInBangladesh: true,
  },
  {
    id: "chili",
    nameBn: "মরিচ",
    nameEn: "Chili Pepper",
    icon: "Flame",
    imageUrl: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=360&h=360&fit=crop&auto=format&q=80",
    color: "#E53935",
    commonInBangladesh: true,
  },
  {
    id: "jute",
    nameBn: "পাট",
    nameEn: "Jute",
    icon: "Sprout",
    imageUrl: "/crops/jute.jpg",
    color: "#43A047",
    commonInBangladesh: true,
  },
  {
    id: "maize",
    nameBn: "ভুট্টা",
    nameEn: "Maize / Corn",
    icon: "Sun",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=360&h=360&fit=crop&auto=format&q=80",
    color: "#FBC02D",
    commonInBangladesh: true,
  },
  {
    id: "mustard",
    nameBn: "সরিষা",
    nameEn: "Mustard",
    icon: "Flower2",
    imageUrl: "/crops/mustard.jpg",
    color: "#FDD835",
    commonInBangladesh: true,
  },
  {
    id: "onion",
    nameBn: "পেঁয়াজ",
    nameEn: "Onion",
    icon: "Disc",
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=360&h=360&fit=crop&auto=format&q=80",
    color: "#AD1457",
    commonInBangladesh: true,
  },
  {
    id: "cabbage",
    nameBn: "বাঁধাকপি/ফুলকপি",
    nameEn: "Cabbage & Cauliflower",
    icon: "Shrub",
    imageUrl: "https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?w=360&h=360&fit=crop&auto=format&q=80",
    color: "#388E3C",
    commonInBangladesh: true,
  },
  {
    id: "gourd",
    nameBn: "লাউ/কুমড়া",
    nameEn: "Bottle Gourd / Pumpkin",
    icon: "Circle",
    imageUrl: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=360&h=360&fit=crop&auto=format&q=80",
    color: "#558B2F",
    commonInBangladesh: true,
  },
  {
    id: "other",
    nameBn: "অন্য ফসল",
    nameEn: "Other Crops",
    icon: "PlusCircle",
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=360&h=360&fit=crop&auto=format&q=80",
    color: "#1F6B3A",
    commonInBangladesh: false,
  },
];

export function getCropById(cropId: string): CropConfig {
  const found = CROPS.find((c) => c.id === cropId);
  if (found) return found;

  return {
    id: "other",
    nameBn: "অন্য ফসল",
    nameEn: "Other Crops",
    icon: "PlusCircle",
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=360&h=360&fit=crop&auto=format&q=80",
    color: "#1F6B3A",
    commonInBangladesh: false,
  };
}

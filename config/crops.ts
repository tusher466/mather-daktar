export interface CropConfig {
  id: string;
  nameBn: string;
  icon: string;
  imageUrl: string;
  color: string;
  commonInBangladesh: boolean;
}

export const CROPS: CropConfig[] = [
  {
    id: "rice",
    nameBn: "ধান",
    icon: "Wheat",
    imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#8E9A28",
    commonInBangladesh: true,
  },
  {
    id: "potato",
    nameBn: "আলু",
    icon: "CircleDot",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#B88942",
    commonInBangladesh: true,
  },
  {
    id: "tomato",
    nameBn: "টমেটো",
    icon: "Apple",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#D32F2F",
    commonInBangladesh: true,
  },
  {
    id: "eggplant",
    nameBn: "বেগুন",
    icon: "Egg",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#6A1B9A",
    commonInBangladesh: true,
  },
  {
    id: "chili",
    nameBn: "মরিচ",
    icon: "Flame",
    imageUrl: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#E53935",
    commonInBangladesh: true,
  },
  {
    id: "jute",
    nameBn: "পাট",
    icon: "Sprout",
    imageUrl: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#43A047",
    commonInBangladesh: true,
  },
  {
    id: "maize",
    nameBn: "ভুট্টা",
    icon: "Sun",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#FBC02D",
    commonInBangladesh: true,
  },
  {
    id: "mustard",
    nameBn: "সরিষা",
    icon: "Flower2",
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df57036475b?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#FDD835",
    commonInBangladesh: true,
  },
  {
    id: "onion",
    nameBn: "পেঁয়াজ",
    icon: "Disc",
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#AD1457",
    commonInBangladesh: true,
  },
  {
    id: "cabbage",
    nameBn: "বাঁধাকপি/ফুলকপি",
    icon: "Shrub",
    imageUrl: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#388E3C",
    commonInBangladesh: true,
  },
  {
    id: "gourd",
    nameBn: "লাউ/কুমড়া",
    icon: "Circle",
    imageUrl: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#558B2F",
    commonInBangladesh: true,
  },
  {
    id: "other",
    nameBn: "অন্য ফসল",
    icon: "PlusCircle",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=160&h=160&fit=crop&auto=format&q=80",
    color: "#616161",
    commonInBangladesh: false,
  },
];

export const DEFAULT_CROP_ID = "rice";

export function getCropById(id: string): CropConfig {
  return CROPS.find((c) => c.id === id) || CROPS[0];
}

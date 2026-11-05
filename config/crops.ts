export interface CropConfig {
  id: string;
  nameBn: string;
  icon: string; // Identifier for rendering an icon
  color: string;
  commonInBangladesh: boolean;
}

export const CROPS: CropConfig[] = [
  { id: "rice", nameBn: "ধান", icon: "Wheat", color: "#8E9A28", commonInBangladesh: true },
  { id: "potato", nameBn: "আলু", icon: "CircleDot", color: "#B88942", commonInBangladesh: true },
  { id: "tomato", nameBn: "টমেটো", icon: "Apple", color: "#D32F2F", commonInBangladesh: true },
  { id: "eggplant", nameBn: "বেগুন", icon: "Egg", color: "#6A1B9A", commonInBangladesh: true },
  { id: "chili", nameBn: "মরিচ", icon: "Flame", color: "#E53935", commonInBangladesh: true },
  { id: "jute", nameBn: "পাট", icon: "Sprout", color: "#43A047", commonInBangladesh: true },
  { id: "maize", nameBn: "ভুট্টা", icon: "Sun", color: "#FBC02D", commonInBangladesh: true },
  { id: "mustard", nameBn: "সরিষা", icon: "Flower2", color: "#FDD835", commonInBangladesh: true },
  { id: "onion", nameBn: "পেঁয়াজ", icon: "Disc", color: "#AD1457", commonInBangladesh: true },
  { id: "cabbage", nameBn: "বাঁধাকপি/ফুলকপি", icon: "Shrub", color: "#388E3C", commonInBangladesh: true },
  { id: "gourd", nameBn: "লাউ/কুমড়া", icon: "Circle", color: "#558B2F", commonInBangladesh: true },
  { id: "other", nameBn: "অন্য ফসল", icon: "PlusCircle", color: "#616161", commonInBangladesh: false },
];

export const DEFAULT_CROP_ID = "rice";

export function getCropById(id: string): CropConfig {
  return CROPS.find((c) => c.id === id) || CROPS[0];
}

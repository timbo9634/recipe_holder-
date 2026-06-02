import { Recipe } from "./types";

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "番茄牛腩",
    sourceText: "牛腩焯水，番茄炒出汁，加水炖煮 90 分钟。",
    myNotes: "我多加了一点番茄膏，最后收汁更浓。",
    images: ["/mock/tomato-beef.svg"],
    tags: ["牛肉", "下饭", "炖菜"],
    createdAt: "2026-06-01",
  },
  {
    id: "2",
    title: "照烧鸡腿饭",
    sourceText: "鸡腿去骨煎熟，加入酱油、味淋、糖收汁。",
    myNotes: "鸡皮先朝下小火煎久一点，皮更脆。",
    images: ["/mock/teriyaki-chicken.svg"],
    tags: ["鸡肉", "便当", "快手菜"],
    createdAt: "2026-05-28",
  },
  {
    id: "3",
    title: "蒜蓉虾仁意面",
    sourceText: "橄榄油炒香蒜末，加入虾仁和意面，最后撒欧芹。",
    myNotes: "我加了一点辣椒碎和柠檬汁，味道更清爽。",
    images: ["/mock/shrimp-pasta.svg"],
    tags: ["意面", "海鲜", "晚餐"],
    createdAt: "2026-05-20",
  }
];

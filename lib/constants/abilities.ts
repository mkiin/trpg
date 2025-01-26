export const ABILITIES = [
  { name: "STR", nameJp: "筋力", description: "(筋力)" },
  { name: "CON", nameJp: "体力", description: "(体力)" },
  { name: "POW", nameJp: "精神力", description: "(精神力)" },
  { name: "DEX", nameJp: "敏捷性", description: "(敏捷性)" },
  { name: "APP", nameJp: "外見", description: "(外見)" },
  { name: "SIZ", nameJp: "体格", description: "(体格)" },
  { name: "INT", nameJp: "知性", description: "(知性)" },
  { name: "EDU", nameJp: "教育", description: "(教育)" },
  { name: "年収", nameJp: "年収", description: "財産" },
] as const;

export const DICE_COUNTS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 20];
export const DICE_FACES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 100];

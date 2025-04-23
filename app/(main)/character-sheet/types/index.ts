// キャラクターシートの型定義

// 基本情報
export interface CharacterBasicInfo {
  name: string;
  occupation: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  birthplace: string;
  background: string;
  behavior: string;
}

// 能力値
export interface CharacterAbilities {
  // ダイスにより決定するもの
  strength: number;       // 筋力 (3d6)
  constitution: number;   // 体力 (3d6)
  power: number;          // 精神力 (3d6)
  dexterity: number;      // 機敏 (3d6)
  appearance: number;     // 外見的な魅力 (3d6)
  size: number;           // 体格 (2d6+6)
  intelligence: number;   // 知性 (2d6+6)
  education: number;      // 教養 (3d6+3)

  // 計算されるパラメータ
  san: number;                   // 正気度 (power * 5)
  fortune: number;               // 幸運 (power * 5)
  idea: number;                  // アイデア (intelligence * 5)
  knowledge: number;             // 知識 (education * 5)
  durability: number;            // 耐久力 ((constitution + size) / 2)
  magic_point: number;           // マジックポイント (power * 1)
  vocational_skill_points: number; // 職業技能ポイント (education * 20)
  hobby_skill_points: number;    // 趣味技能ポイント (intelligence * 10)
  damage_bonus: number;          // ダメージボーナス (strength + size)
}

// 技能
export interface CharacterSkills {
  // 戦闘技能
  combat: {
    dodge: number;           // 回避 (DEX×2%)
    kick: number;            // キック (25)
    grapple: number;         // 組付き (25)
    punch: number;           // こぶし(パンチ) (50)
    headbutt: number;        // 頭突き (10)
    throw: number;           // 投擲 (25)
    martialArts: number;     // マーシャルアーツ (1)
    handgun: number;         // 拳銃 (20)
    submachineGun: number;   // サブマシンガン (15)
    shotgun: number;         // ショットガン (30)
    machineGun: number;      // マシンガン (15)
    rifle: number;           // ライフル (25)
  };

  // 探索技能
  investigation: {
    firstAid: number;        // 応急手当 (30)
    locksmith: number;       // 鍵開け (1)
    hide: number;            // 隠す (15)
    conceal: number;         // 隠れる (10)
    listen: number;          // 聞き耳 (25)
    sneak: number;           // 忍び歩き (10)
    photography: number;     // 写真術 (10)
    psychoanalysis: number;  // 精神分析 (1)
    track: number;           // 追跡 (10)
    climb: number;           // 登攀 (40)
    library: number;         // 図書館 (25)
    spot: number;            // 目星 (25)
  };

  // 行動技能
  action: {
    drive: number;           // 運転 (20)
    mechanicalRepair: number; // 機械修理 (20)
    operateHeavyMachinery: number; // 重機械操作 (1)
    ride: number;            // 乗馬 (5)
    swim: number;            // 水泳 (25)
    craft: number;           // 製作 (5)
    pilot: number;           // 操縦 (1)
    jump: number;            // 跳躍 (25)
    electricalRepair: number; // 電気修理 (10)
    navigate: number;        // ナビゲート (10)
    disguise: number;        // 変装 (1)
  };

  // 交渉技能
  negotiation: {
    fastTalk: number;        // 言いくるめ (5)
    credit: number;          // 信用 (15)
    persuade: number;        // 説得 (15)
    bargain: number;         // 値切り (5)
    nativeLanguage: number;  // 母国語 (EDU×5%)
    otherLanguage: number;   // 他の言語 (1%)
  };

  // 知識技能
  knowledge: {
    medicine: number;        // 医学 (5)
    occult: number;          // オカルト (5)
    chemistry: number;       // 化学 (1)
    cthulhuMythos: number;   // クトゥルフ神話 (0)
    art: number;             // 芸術 (5)
    accounting: number;      // 経理 (10)
    archaeology: number;     // 考古学 (1)
    computer: number;        // コンピュータ (1)
    psychology: number;      // 心理学 (5)
    anthropology: number;    // 人類学 (1)
    biology: number;         // 生物学 (1)
    geology: number;         // 地質学 (1)
    electronics: number;     // 電子工学 (1)
    astronomy: number;       // 天文学 (1)
    naturalHistory: number;  // 博物学 (10)
    physics: number;         // 物理学 (1)
    law: number;             // 法律 (5)
    pharmacy: number;        // 薬学 (1)
    history: number;         // 歴史 (20)
  };
}

// キャラクターシート全体
export interface CharacterSheet {
  id: string;
  basicInfo: CharacterBasicInfo;
  abilities: CharacterAbilities;
  skills: CharacterSkills;
  createdAt: Date;
  updatedAt: Date;
}

// フォームのステップ
export enum CharacterSheetStep {
  BASIC_INFO = 0,
  ABILITIES = 1,
  SKILLS = 2,
  RESULT = 3,
}

// 職業リスト
export const OCCUPATION_GROUPS = [
  {
    label: "医師",
    options: [
      "医師",
      "アニマルセラピスト",
      "看護師",
      "救急救命士",
      "形成外科医",
      "精神科医",
      "闇医者",
    ],
  },
  {
    // labelなし (単独項目)
    options: ["エンジニア"],
  },
  {
    // labelなし (単独項目)
    options: ["狂信者"],
  },
  {
    label: "警察官",
    options: [
      "警察官",
      "海上保安官",
      "科学捜査研究員",
      "山岳救助隊員",
      "消防士",
    ],
  },
  {
    label: "芸術家",
    options: [
      "芸術家",
      "芸術家（基本）",
      "ダンサー",
      "デザイナー",
      "ファッション系芸術家",
    ],
  },
  {
    options: ["古物研究科"],
  },
  {
    options: ["コンピューター技術者"],
  },
  {
    options: ["作家"],
  },
  {
    label: "自衛官",
    options: [
      "自衛官",
      "陸上自衛隊員",
      "海上自衛隊員（艦上勤務）",
      "自衛隊パイロット（陸海空）",
      "民間軍事会社メンバー",
    ],
  },
  {
    options: ["ジャーナリスト"],
  },
  {
    options: ["宗教家"],
  },
  {
    options: ["商店主／店員"],
  },
  {
    options: ["私立探偵"],
  },
  {
    options: ["水産業従事者"],
  },
  {
    options: ["スポーツ選手"],
  },
  {
    label: "大学教授",
    options: [
      "大学教授",
      "冒険家教授",
      "評論家",
    ],
  },
  {
    label: "タレント",
    options: [
      "タレント",
      "アイドル、音楽タレント",
      "アナウンサー",
      "コメディアン",
      "スポーツタレント",
      "テレビ・コメンテーター",
      "俳優",
      "プロデューサー、マネージャー",
    ],
  },
  {
    label: "超心理学者",
    options: [
      "超心理学者",
      "ゴーストハンター",
      "占い師、スピリチュアリスト、霊媒師",
    ],
  },
  {
    options: ["ディレッタント"],
  },
  {
    options: ["ドライバー"],
  },
  {
    options: ["農林業従事者"],
  },
  {
    options: ["パイロット"],
  },
  {
    label: "ビジネスマン",
    options: [
      "ビジネスマン",
      "執事・メイド",
      "セールスマン",
    ],
  },
  {
    options: ["法律家"],
  },
  {
    options: ["放浪者"],
  },
  {
    options: ["暴力団組員"],
  },
  {
    options: ["ミュージシャン"],
  },
  {
    options: ["メンタルセラピスト"],
  },
]; // 型推論を強化

// (オプション) すべての職業名をフラットなリストとして取得
export const ALL_OCCUPATIONS = OCCUPATION_GROUPS.flatMap(group => group.options);

// (オプション) すべての職業名のUnion型を定義
export type Occupation = typeof ALL_OCCUPATIONS[number];
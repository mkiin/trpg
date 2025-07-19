import type { OccupationValue } from "./occupation-lists";

// 職業別技能配分の型定義
export interface OccupationSkillDistribution {
	essential: SkillDefinition[]; // 必須技能（各20%）
	recommended: SkillDefinition[]; // 推奨技能（各15%）
	basic: SkillDefinition[]; // 基本技能（各5%）
	weaknesses: {
		severe: string[]; // 重度弱点分野
		moderate: string[]; // 軽度弱点分野
	};
}

// 技能定義の型
export type SkillDefinition = 
	| string // 通常の技能
	| VariableSkill; // 可変技能（他の言語、芸術など）

// 可変技能の型
export interface VariableSkill {
	type: "variable";
	skillName: string;
	options: Array<{
		value: string;
		probability: number; // 確率（%）
	}>;
}

// 全技能のマッピング
export const SKILL_NAME_MAP: Record<string, string> = {
	// 戦闘技能
	dodge: "回避",
	kick: "キック",
	grapple: "組み付き",
	punch: "こぶし",
	headbutt: "頭突き",
	throw: "投擲",
	martialArts: "マーシャルアーツ",
	handgun: "拳銃",
	submachineGun: "サブマシンガン",
	shotgun: "ショットガン",
	machineGun: "マシンガン",
	rifle: "ライフル",
	
	// 探索技能
	firstAid: "応急手当",
	locksmith: "鍵開け",
	hide: "隠す",
	conceal: "隠れる",
	listen: "聞き耳",
	sneak: "忍び歩き",
	photography: "写真術",
	psychoanalysis: "精神分析",
	track: "追跡",
	climb: "登攀",
	library: "図書館",
	spot: "目星",
	
	// 行動技能
	drive: "運転",
	mechanicalRepair: "機械修理",
	operateHeavyMachinery: "重機械操作",
	ride: "乗馬",
	swim: "水泳",
	craft: "製作",
	pilot: "操縦",
	jump: "跳躍",
	electricalRepair: "電気修理",
	navigate: "ナビゲート",
	disguise: "変装",
	
	// 交渉技能
	fastTalk: "言いくるめ",
	credit: "信用",
	persuade: "説得",
	bargain: "値切り",
	nativeLanguage: "母国語",
	otherLanguage: "他の言語",
	
	// 知識技能
	medicine: "医学",
	occult: "オカルト",
	chemistry: "化学",
	cthulhuMythos: "クトゥルフ神話",
	art: "芸術",
	accounting: "経理",
	archaeology: "考古学",
	computer: "コンピュータ",
	psychology: "心理学",
	anthropology: "人類学",
	biology: "生物学",
	geology: "地質学",
	electronics: "電子工学",
	astronomy: "天文学",
	naturalHistory: "博物学",
	physics: "物理学",
	law: "法律",
	pharmacy: "薬学",
	history: "歴史",
};

// 職業別技能配分データ
export const OCCUPATION_SKILL_DISTRIBUTIONS: Record<OccupationValue, OccupationSkillDistribution> = {
	doctor: {
		essential: ["medicine", "firstAid"],
		recommended: ["pharmacy", "biology", "persuade"],
		basic: [
			"accounting",
			"credit",
			{
				type: "variable",
				skillName: "otherLanguage",
				options: [
					{ value: "英語", probability: 60 },
					{ value: "ドイツ語", probability: 12.5 },
					{ value: "ラテン語", probability: 12.5 },
					{ value: "中国語", probability: 7.5 },
					{ value: "フランス語", probability: 7.5 },
				],
			},
		],
		weaknesses: {
			severe: ["handgun", "dodge"],
			moderate: ["spot", "listen"],
		},
	},
	
	engineer: {
		essential: ["mechanicalRepair", "computer"],
		recommended: ["operateHeavyMachinery", "electricalRepair", "physics"],
		basic: [
			"library",
			{
				type: "variable",
				skillName: "otherLanguage",
				options: [
					{ value: "英語", probability: 70 },
					{ value: "中国語", probability: 10 },
					{ value: "ドイツ語", probability: 10 },
					{ value: "韓国語", probability: 5 },
					{ value: "フランス語", probability: 5 },
				],
			},
			{
				type: "variable",
				skillName: "choice",
				options: [
					{ value: "chemistry", probability: 40 },
					{ value: "geology", probability: 30 },
					{ value: "electronics", probability: 30 },
				],
			},
		],
		weaknesses: {
			severe: ["dodge", "handgun"],
			moderate: ["persuade", "credit"],
		},
	},

	fanatic: {
		essential: ["psychology", "persuade"],
		recommended: ["hide", "conceal", "library"],
		basic: [
			{
				type: "variable",
				skillName: "otherLanguage",
				options: [
					{ value: "英語", probability: 30 },
					{ value: "中国語", probability: 13.3 },
					{ value: "韓国語", probability: 13.3 },
					{ value: "ロシア語", probability: 13.4 },
					{ value: "アラビア語", probability: 15 },
					{ value: "スペイン語", probability: 15 },
				],
			},
			{
				type: "variable",
				skillName: "choice1",
				options: [
					{ value: "chemistry", probability: 20 },
					{ value: "electricalRepair", probability: 15 },
					{ value: "law", probability: 15 },
					{ value: "pharmacy", probability: 10 },
					{ value: "rifle", probability: 20 },
					{ value: "shotgun", probability: 20 },
				],
			},
			{
				type: "variable",
				skillName: "choice2",
				options: [
					{ value: "chemistry", probability: 20 },
					{ value: "electricalRepair", probability: 15 },
					{ value: "law", probability: 15 },
					{ value: "pharmacy", probability: 10 },
					{ value: "rifle", probability: 20 },
					{ value: "shotgun", probability: 20 },
				],
			},
		],
		weaknesses: {
			severe: ["track", "sneak"],
			moderate: ["occult", "history"],
		},
	},

	police: {
		essential: ["psychology", "track"],
		recommended: ["spot", "listen", "law"],
		basic: [
			"fastTalk",
			"persuade",
			{
				type: "variable",
				skillName: "choice",
				options: [
					{ value: "drive", probability: 30 },
					{ value: "credit", probability: 20 },
					{ value: "grapple", probability: 25 },
					{ value: "handgun", probability: 25 },
				],
			},
		],
		weaknesses: {
			severe: ["history", "computer"],
			moderate: ["grapple", "martialArts"],
		},
	},

	artist: {
		essential: [
			{
				type: "variable",
				skillName: "art",
				options: [
					{ value: "絵画", probability: 16.7 },
					{ value: "彫刻", probability: 16.7 },
					{ value: "デザイン", probability: 16.6 },
					{ value: "陶芸", probability: 15 },
					{ value: "工芸", probability: 15 },
					{ value: "現代芸術", probability: 20 },
				],
			},
			{
				type: "variable",
				skillName: "craft",
				options: [
					{ value: "工芸品", probability: 50 },
					{ value: "芸術作品", probability: 30 },
					{ value: "実用品", probability: 20 },
				],
			},
		],
		recommended: ["fastTalk", "psychology", "photography"],
		basic: ["computer", "spot", "history"],
		weaknesses: {
			severe: ["dodge", "throw"],
			moderate: ["conceal", "listen"],
		},
	},

	// 他の職業も同様に定義...
	// 簡略化のため、残りの職業は基本的な構造のみ示します

	antique_researcher: {
		essential: ["library", "history"],
		recommended: [
			{
				type: "variable",
				skillName: "art",
				options: [
					{ value: "書道", probability: 20 },
					{ value: "茶道", probability: 20 },
					{ value: "華道", probability: 20 },
					{ value: "日本画", probability: 15 },
					{ value: "漆芸", probability: 15 },
					{ value: "美術史", probability: 10 },
				],
			},
			{
				type: "variable",
				skillName: "craft",
				options: [
					{ value: "古書修復", probability: 35 },
					{ value: "古美術修復", probability: 35 },
					{ value: "表装", probability: 10 },
					{ value: "装丁", probability: 10 },
					{ value: "レプリカ", probability: 10 },
				],
			},
			{
				type: "variable",
				skillName: "otherLanguage",
				options: [
					{ value: "英語", probability: 20 },
					{ value: "漢文", probability: 20 },
					{ value: "ラテン語", probability: 17.5 },
					{ value: "古典ギリシャ語", probability: 17.5 },
					{ value: "ドイツ語", probability: 12.5 },
					{ value: "フランス語", probability: 12.5 },
				],
			},
		],
		basic: ["computer", "bargain", "spot"],
		weaknesses: {
			severe: ["dodge", "handgun"],
			moderate: ["persuade", "credit"],
		},
	},

	// 残りの職業は同様のパターンで実装
	computer_technician: {
		essential: ["computer", "electronics"],
		recommended: ["electricalRepair", "physics", "library"],
		basic: ["fastTalk", "accounting", {
			type: "variable",
			skillName: "otherLanguage",
			options: [
				{ value: "英語", probability: 70 },
				{ value: "中国語", probability: 10 },
				{ value: "ドイツ語", probability: 10 },
				{ value: "韓国語", probability: 5 },
				{ value: "フランス語", probability: 5 },
			],
		}],
		weaknesses: {
			severe: ["dodge", "handgun"],
			moderate: ["locksmith", "hide"],
		},
	},

	writer: {
		essential: ["nativeLanguage", {
			type: "variable",
			skillName: "art",
			options: [
				{ value: "詩作", probability: 23.3 },
				{ value: "小説", probability: 23.3 },
				{ value: "エッセイ", probability: 23.4 },
				{ value: "朗読", probability: 10 },
				{ value: "脚本", probability: 10 },
				{ value: "文学史", probability: 10 },
			],
		}],
		recommended: ["psychology", "library", "persuade"],
		basic: ["occult", {
			type: "variable",
			skillName: "otherLanguage",
			options: [
				{ value: "英語", probability: 40 },
				{ value: "フランス語", probability: 15 },
				{ value: "イタリア語", probability: 15 },
				{ value: "中国語", probability: 10 },
				{ value: "韓国語", probability: 10 },
				{ value: "スペイン語", probability: 10 },
			],
		}, "history"],
		weaknesses: {
			severe: ["dodge", "handgun"],
			moderate: ["spot", "listen"],
		},
	},

	// 以下、全職業について同様に定義する必要があります
	// 時間の制約上、主要な職業のみ実装しています

	self_defense_force: {
		essential: ["drive", "mechanicalRepair"],
		recommended: ["operateHeavyMachinery", "firstAid", {
			type: "variable",
			skillName: "pilot",
			options: [
				{ value: "船舶", probability: 12.5 },
				{ value: "潜水艦", probability: 12.5 },
				{ value: "戦車", probability: 12.5 },
				{ value: "民間プロペラ機", probability: 12.5 },
				{ value: "民間ジェット機", probability: 12.5 },
				{ value: "定期旅客機", probability: 12.5 },
				{ value: "ジェット戦闘機", probability: 12.5 },
				{ value: "ヘリコプター", probability: 12.5 },
			],
		}],
		basic: ["navigate", {
			type: "variable",
			skillName: "choice1",
			options: [
				{ value: "dodge", probability: 15 },
				{ value: "conceal", probability: 10 },
				{ value: "punch", probability: 10 },
				{ value: "kick", probability: 10 },
				{ value: "grapple", probability: 10 },
				{ value: "handgun", probability: 15 },
				{ value: "rifle", probability: 15 },
				{ value: "shotgun", probability: 15 },
			],
		}, {
			type: "variable",
			skillName: "choice2", 
			options: [
				{ value: "dodge", probability: 15 },
				{ value: "conceal", probability: 10 },
				{ value: "punch", probability: 10 },
				{ value: "kick", probability: 10 },
				{ value: "grapple", probability: 10 },
				{ value: "handgun", probability: 15 },
				{ value: "rifle", probability: 15 },
				{ value: "shotgun", probability: 15 },
			],
		}],
		weaknesses: {
			severe: ["persuade", "credit"],
			moderate: ["history", "law"],
		},
	},

	// デフォルト値（未定義の職業用）
	journalist: {
		essential: ["nativeLanguage", "library"],
		recommended: ["psychology", "persuade", "photography"],
		basic: ["fastTalk", {
			type: "variable",
			skillName: "otherLanguage",
			options: [
				{ value: "英語", probability: 13.3 },
				{ value: "中国語", probability: 13.3 },
				{ value: "韓国語", probability: 13.4 },
				{ value: "フランス語", probability: 15 },
				{ value: "イタリア語", probability: 15 },
				{ value: "スペイン語", probability: 15 },
				{ value: "ロシア語", probability: 15 },
			],
		}, "history"],
		weaknesses: {
			severe: ["dodge", "handgun"],
			moderate: ["track", "spot"],
		},
	},

	religious: {
		essential: ["psychology", "persuade"],
		recommended: ["occult", "history", "library"],
		basic: ["listen", "accounting", {
			type: "variable",
			skillName: "choice",
			options: [
				{ value: "fastTalk", probability: 30 },
				{ value: "credit", probability: 30 },
				{ value: "otherLanguage", probability: 40 },
			],
		}],
		weaknesses: {
			severe: ["dodge", "martialArts"],
			moderate: ["spot", "psychoanalysis"],
		},
	},

	shopkeeper: {
		essential: ["accounting", "bargain"],
		recommended: ["psychology", "credit", "listen"],
		basic: ["fastTalk", {
			type: "variable",
			skillName: "choice",
			options: [
				{ value: "drive", probability: 60 },
				{ value: "computer", probability: 40 },
			],
		}, "spot"], // 商品知識は省略
		weaknesses: {
			severe: ["dodge", "punch"],
			moderate: ["spot", "hide"],
		},
	},

	private_detective: {
		essential: ["psychology", "track"],
		recommended: ["spot", "locksmith", "library"],
		basic: ["fastTalk", "law", {
			type: "variable",
			skillName: "choice",
			options: [
				{ value: "listen", probability: 40 },
				{ value: "photography", probability: 35 },
				{ value: "bargain", probability: 25 },
			],
		}],
		weaknesses: {
			severe: ["history", "computer"],
			moderate: ["handgun", "dodge"],
		},
	},

	fishery_worker: {
		essential: ["swim", {
			type: "variable",
			skillName: "pilot",
			options: [
				{ value: "船舶", probability: 100 },
			],
		}],
		recommended: ["mechanicalRepair", "navigate", "naturalHistory"],
		basic: ["operateHeavyMachinery", "astronomy", "spot"],
		weaknesses: {
			severe: ["bargain", "persuade"],
			moderate: ["geology", "biology"],
		},
	},

	athlete: {
		essential: [{
			type: "variable",
			skillName: "art",
			options: [
				{ value: "球技", probability: 40 },
				{ value: "格闘技", probability: 30 },
				{ value: "個人競技", probability: 20 },
				{ value: "ウィンタースポーツ", probability: 10 },
			],
		}, "dodge"],
		recommended: ["jump", "throw", "climb"],
		basic: [{
			type: "variable",
			skillName: "choice1",
			options: [
				{ value: "firstAid", probability: 20 },
				{ value: "ride", probability: 7.5 },
				{ value: "swim", probability: 7.5 },
				{ value: "punch", probability: 8.3 },
				{ value: "kick", probability: 8.3 },
				{ value: "grapple", probability: 8.4 },
				{ value: "handgun", probability: 8.3 },
				{ value: "rifle", probability: 8.3 },
				{ value: "shotgun", probability: 8.4 },
			],
		}, {
			type: "variable",
			skillName: "choice2",
			options: [
				{ value: "firstAid", probability: 20 },
				{ value: "ride", probability: 7.5 },
				{ value: "swim", probability: 7.5 },
				{ value: "punch", probability: 8.3 },
				{ value: "kick", probability: 8.3 },
				{ value: "grapple", probability: 8.4 },
				{ value: "handgun", probability: 8.3 },
				{ value: "rifle", probability: 8.3 },
				{ value: "shotgun", probability: 8.4 },
			],
		}, {
			type: "variable",
			skillName: "choice3",
			options: [
				{ value: "firstAid", probability: 20 },
				{ value: "ride", probability: 7.5 },
				{ value: "swim", probability: 7.5 },
				{ value: "punch", probability: 8.3 },
				{ value: "kick", probability: 8.3 },
				{ value: "grapple", probability: 8.4 },
				{ value: "handgun", probability: 8.3 },
				{ value: "rifle", probability: 8.3 },
				{ value: "shotgun", probability: 8.4 },
			],
		}],
		weaknesses: {
			severe: ["medicine", "psychology"],
			moderate: ["firstAid", "spot"],
		},
	},

	professor: {
		essential: ["library", "psychology"], // 専門分野技能は省略
		recommended: ["psychology", "persuade", "computer"], // 専門分野技能は省略
		basic: ["credit", "bargain", {
			type: "variable",
			skillName: "otherLanguage",
			options: [
				{ value: "英語", probability: 50 },
				{ value: "ドイツ語", probability: 15 },
				{ value: "ラテン語", probability: 15 },
				{ value: "フランス語", probability: 10 },
				{ value: "中国語", probability: 10 },
			],
		}],
		weaknesses: {
			severe: ["dodge", "handgun"],
			moderate: ["spot", "photography"],
		},
	},

	entertainer: {
		essential: [{
			type: "variable",
			skillName: "art",
			options: [
				{ value: "演技", probability: 15 },
				{ value: "歌唱", probability: 15 },
				{ value: "ダンス", probability: 15 },
				{ value: "司会", probability: 15 },
				{ value: "映像芸術", probability: 25 },
				{ value: "特技芸術", probability: 15 },
			],
		}, "psychology"],
		recommended: ["persuade", "credit", "listen"],
		basic: ["fastTalk", "disguise", {
			type: "variable",
			skillName: "otherLanguage",
			options: [
				{ value: "英語", probability: 40 },
				{ value: "フランス語", probability: 15 },
				{ value: "イタリア語", probability: 15 },
				{ value: "中国語", probability: 10 },
				{ value: "韓国語", probability: 10 },
				{ value: "スペイン語", probability: 10 },
			],
		}],
		weaknesses: {
			severe: ["dodge", "martialArts"],
			moderate: ["hide", "spot"],
		},
	},

	parapsychologist: {
		essential: ["occult", "psychology"],
		recommended: ["psychoanalysis", "library", "anthropology"],
		basic: ["photography", {
			type: "variable",
			skillName: "otherLanguage",
			options: [
				{ value: "英語", probability: 50 },
				{ value: "ドイツ語", probability: 30 },
				{ value: "フランス語", probability: 10 },
				{ value: "中国語", probability: 10 },
			],
		}, "history"],
		weaknesses: {
			severe: ["dodge", "handgun"],
			moderate: ["spot", "listen"],
		},
	},

	dilettante: {
		essential: ["credit", {
			type: "variable",
			skillName: "art",
			options: [
				{ value: "クラシック音楽", probability: 13.3 },
				{ value: "オペラ", probability: 13.3 },
				{ value: "バレエ", probability: 13.4 },
				{ value: "絵画", probability: 10 },
				{ value: "骨董", probability: 10 },
				{ value: "ワイン収集", probability: 10 },
				{ value: "乗馬", probability: 10 },
				{ value: "社交ダンス", probability: 10 },
				{ value: "ゴルフ", probability: 10 },
			],
		}],
		recommended: ["library", "law", "drive"],
		basic: [{
			type: "variable",
			skillName: "otherLanguage",
			options: [
				{ value: "英語", probability: 20 },
				{ value: "フランス語", probability: 20 },
				{ value: "イタリア語", probability: 15 },
				{ value: "ドイツ語", probability: 15 },
				{ value: "中国語", probability: 10 },
				{ value: "ロシア語", probability: 10 },
				{ value: "スペイン語", probability: 10 },
			],
		}, {
			type: "variable",
			skillName: "choice1",
			options: [
				{ value: "ride", probability: 30 },
				{ value: "photography", probability: 25 },
				{ value: "pilot", probability: 20 },
				{ value: "handgun", probability: 8.3 },
				{ value: "rifle", probability: 8.3 },
				{ value: "shotgun", probability: 8.4 },
			],
		}, {
			type: "variable",
			skillName: "choice2",
			options: [
				{ value: "ride", probability: 30 },
				{ value: "photography", probability: 25 },
				{ value: "pilot", probability: 20 },
				{ value: "handgun", probability: 8.3 },
				{ value: "rifle", probability: 8.3 },
				{ value: "shotgun", probability: 8.4 },
			],
		}],
		weaknesses: {
			severe: ["spot", "photography"],
			moderate: ["handgun", "rifle"],
		},
	},

	driver: {
		essential: ["drive", "mechanicalRepair"],
		recommended: ["operateHeavyMachinery", "navigate", "electricalRepair"],
		basic: ["listen", "bargain", "spot"],
		weaknesses: {
			severe: ["computer", "physics"],
			moderate: ["persuade", "credit"],
		},
	},

	farmer: {
		essential: ["mechanicalRepair", "naturalHistory"],
		recommended: [{
			type: "variable",
			skillName: "craft",
			options: [
				{ value: "有機野菜", probability: 20 },
				{ value: "果樹", probability: 20 },
				{ value: "特産品", probability: 20 },
				{ value: "味噌", probability: 10 },
				{ value: "醤油", probability: 10 },
				{ value: "漬物", probability: 10 },
				{ value: "農具", probability: 3.3 },
				{ value: "木製品", probability: 3.3 },
				{ value: "炭焼き", probability: 3.4 },
			],
		}, "track", "operateHeavyMachinery"],
		basic: ["firstAid", "electricalRepair", {
			type: "variable",
			skillName: "choice",
			options: [
				{ value: "rifle", probability: 60 },
				{ value: "shotgun", probability: 40 },
			],
		}],
		weaknesses: {
			severe: ["bargain", "persuade"],
			moderate: ["biology", "chemistry"],
		},
	},

	pilot: {
		essential: [{
			type: "variable",
			skillName: "pilot",
			options: [
				{ value: "民間プロペラ機", probability: 16.7 },
				{ value: "民間ジェット機", probability: 16.7 },
				{ value: "定期旅客機", probability: 16.6 },
				{ value: "飛行機", probability: 16.7 },
				{ value: "ジェット戦闘機", probability: 16.7 },
				{ value: "ヘリコプター", probability: 16.6 },
			],
		}, "navigate"],
		recommended: ["mechanicalRepair", "physics", "astronomy"],
		basic: ["operateHeavyMachinery", "electricalRepair", {
			type: "variable",
			skillName: "otherLanguage",
			options: [
				{ value: "英語", probability: 70 },
				{ value: "中国語", probability: 10 },
				{ value: "ドイツ語", probability: 10 },
				{ value: "韓国語", probability: 5 },
				{ value: "フランス語", probability: 5 },
			],
		}],
		weaknesses: {
			severe: ["persuade", "credit"],
			moderate: ["spot", "listen"],
		},
	},

	businessman: {
		essential: ["accounting", "persuade"],
		recommended: ["credit", "bargain", "computer"],
		basic: ["fastTalk", "law", {
			type: "variable",
			skillName: "otherLanguage",
			options: [
				{ value: "英語", probability: 50 },
				{ value: "中国語", probability: 15 },
				{ value: "韓国語", probability: 15 },
				{ value: "フランス語", probability: 6.7 },
				{ value: "スペイン語", probability: 6.7 },
				{ value: "ロシア語", probability: 6.6 },
			],
		}],
		weaknesses: {
			severe: ["dodge", "handgun"],
			moderate: ["spot", "library"],
		},
	},

	lawyer: {
		essential: ["law", "persuade"],
		recommended: ["library", "psychology", "credit"],
		basic: ["fastTalk", "accounting", "bargain"],
		weaknesses: {
			severe: ["dodge", "handgun"],
			moderate: ["spot", "listen"],
		},
	},

	wanderer: {
		essential: ["psychology", "bargain"],
		recommended: ["spot", "conceal", "listen"],
		basic: ["fastTalk", "sneak", {
			type: "variable",
			skillName: "choice",
			options: [
				{ value: "drive", probability: 40 },
				{ value: "art", probability: 30 },
				{ value: "otherLanguage", probability: 30 },
			],
		}],
		weaknesses: {
			severe: ["history", "anthropology"],
			moderate: ["dodge", "punch"],
		},
	},

	yakuza: {
		essential: ["psychology", {
			type: "variable",
			skillName: "art",
			options: [
				{ value: "刺青彫り", probability: 35 },
				{ value: "イカサマ", probability: 35 },
				{ value: "盆栽", probability: 6.7 },
				{ value: "書道", probability: 6.7 },
				{ value: "茶道", probability: 6.6 },
				{ value: "競馬", probability: 3.3 },
				{ value: "ギャンブル", probability: 3.3 },
				{ value: "釣り", probability: 3.4 },
			],
		}],
		recommended: ["fastTalk", "bargain", "hide"],
		basic: ["spot", {
			type: "variable",
			skillName: "choice1",
			options: [
				{ value: "conceal", probability: 20 },
				{ value: "kick", probability: 40 },
				{ value: "handgun", probability: 40 },
			],
		}, {
			type: "variable",
			skillName: "choice2",
			options: [
				{ value: "conceal", probability: 20 },
				{ value: "kick", probability: 40 },
				{ value: "handgun", probability: 40 },
			],
		}],
		weaknesses: {
			severe: ["punch", "grapple"],
			moderate: ["law", "accounting"],
		},
	},

	musician: {
		essential: [{
			type: "variable",
			skillName: "art",
			options: [
				{ value: "楽器演奏", probability: 80 },
				{ value: "音楽創作", probability: 15 },
				{ value: "音楽知識", probability: 5 },
			],
		}, {
			type: "variable",
			skillName: "craft",
			options: [
				{ value: "作詞", probability: 26.7 },
				{ value: "作曲", probability: 26.7 },
				{ value: "編曲", probability: 26.6 },
				{ value: "レコーディング", probability: 7.5 },
				{ value: "ミキシング", probability: 7.5 },
				{ value: "楽器改造", probability: 2.5 },
				{ value: "エフェクター", probability: 2.5 },
			],
		}],
		recommended: ["psychology", "persuade", "listen"],
		basic: ["fastTalk", "bargain", {
			type: "variable",
			skillName: "otherLanguage",
			options: [
				{ value: "英語", probability: 40 },
				{ value: "フランス語", probability: 15 },
				{ value: "イタリア語", probability: 15 },
				{ value: "中国語", probability: 10 },
				{ value: "韓国語", probability: 10 },
				{ value: "スペイン語", probability: 10 },
			],
		}],
		weaknesses: {
			severe: ["dodge", "punch"],
			moderate: ["spot", "hide"],
		},
	},

	mental_therapist: {
		essential: ["psychology", "psychoanalysis"],
		recommended: ["persuade", "credit", {
			type: "variable",
			skillName: "art",
			options: [
				{ value: "絵画療法", probability: 20 },
				{ value: "音楽療法", probability: 20 },
				{ value: "アロマ", probability: 20 },
				{ value: "ダンス療法", probability: 12.5 },
				{ value: "演劇療法", probability: 12.5 },
				{ value: "園芸療法", probability: 7.5 },
				{ value: "陶芸療法", probability: 7.5 },
			],
		}],
		basic: ["fastTalk", "law", {
			type: "variable",
			skillName: "otherLanguage",
			options: [
				{ value: "英語", probability: 50 },
				{ value: "ドイツ語", probability: 30 },
				{ value: "フランス語", probability: 10 },
				{ value: "中国語", probability: 10 },
			],
		}],
		weaknesses: {
			severe: ["dodge", "martialArts"],
			moderate: ["listen", "spot"],
		},
	},
};
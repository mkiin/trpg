//職業リスト

import { SkillKey } from "../types/character-sheet-types";

export const OCCUPATION_GROUPS = [
	{
		label: "医師", // グループの表示名 (日本語)
		options: [
			{ label: "医師", value: "doctor" },
			{ label: "アニマルセラピスト", value: "animal_therapist" },
			{ label: "看護師", value: "nurse" },
			{ label: "救急救命士", value: "paramedic" },
			{ label: "形成外科医", value: "plastic_surgeon" },
			{ label: "精神科医", value: "psychiatrist" },
			{ label: "闇医者", value: "underground_doctor" },
		],
	},
	{
		options: [{ label: "エンジニア", value: "engineer" }],
	},
	{
		options: [{ label: "狂信者", value: "fanatic" }],
	},
	{
		label: "警察官",
		options: [
			{ label: "警察官", value: "police_officer" },
			{ label: "海上保安官", value: "coast_guard_officer" },
			{ label: "科学捜査研究員", value: "forensic_scientist" },
			{ label: "山岳救助隊員", value: "mountain_rescue_member" },
			{ label: "消防士", value: "firefighter" },
		],
	},
	{
		label: "芸術家",
		options: [
			{ label: "芸術家（基本）", value: "artist_basic" },
			{ label: "ダンサー", value: "dancer" },
			{ label: "デザイナー", value: "designer" },
			{ label: "ファッション系芸術家", value: "fashion_artist" },
		],
	},
	{
		options: [{ label: "古物研究科", value: "antiquarian" }],
	},
	{
		options: [{ label: "コンピューター技術者", value: "computer_technician" }],
	},
	{
		options: [{ label: "作家", value: "writer" }],
	},
	{
		label: "自衛官",
		options: [
			{ label: "自衛官", value: "self_defense_official" },
			{ label: "陸上自衛隊員", value: "jgsdf_personnel" },
			{ label: "海上自衛隊員", value: "jmsdf_shipboard_personnel" },
			{ label: "自衛隊パイロット", value: "jsdf_pilot" },
			{ label: "民間軍事会社メンバー", value: "pmc_member" },
		],
	},
	{
		options: [{ label: "ジャーナリスト", value: "journalist" }],
	},
	{
		options: [{ label: "宗教家", value: "religious_figure" }],
	},
	{
		options: [{ label: "商店主／店員", value: "shopkeeper_clerk" }],
	},
	{
		options: [{ label: "私立探偵", value: "private_detective" }],
	},
	{
		options: [{ label: "水産業従事者", value: "fishery_worker" }],
	},
	{
		options: [{ label: "スポーツ選手", value: "athlete" }],
	},
	{
		label: "大学教授",
		options: [
			{ label: "大学教授", value: "university_professor" },
			{ label: "冒険家教授", value: "adventurer_professor" },
			{ label: "評論家", value: "critic" },
		],
	},
	{
		label: "タレント",
		options: [
			{ label: "タレント", value: "talent" }, // 日本の文脈での「タレント」
			{ label: "アイドル、音楽タレント", value: "idol_music_talent" },
			{ label: "アナウンサー", value: "announcer" },
			{ label: "コメディアン", value: "comedian" },
			{ label: "スポーツタレント", value: "sports_talent" },
			{ label: "テレビ・コメンテーター", value: "tv_commentator" },
			{ label: "俳優", value: "actor" },
			{ label: "プロデューサー、マネージャー", value: "producer_manager" },
		],
	},
	{
		label: "超心理学者",
		options: [
			{ label: "超心理学者", value: "parapsychologist" },
			{ label: "ゴーストハンター", value: "ghost_hunter" },
			{
				label: "占い師、スピリチュアリスト、霊媒師",
				value: "fortune_teller_spiritualist_medium",
			},
		],
	},
	{
		options: [{ label: "ディレッタント", value: "dilettante" }],
	},
	{
		options: [{ label: "ドライバー", value: "driver" }],
	},
	{
		options: [{ label: "農林業従事者", value: "agriculture_forestry_worker" }],
	},
	{
		options: [{ label: "パイロット", value: "pilot" }],
	},
	{
		label: "ビジネスマン",
		options: [
			{ label: "ビジネスマン", value: "businessman" }, // business_person も検討可
			{ label: "執事・メイド", value: "butler_maid" },
			{ label: "セールスマン", value: "salesman" }, // salesperson も検討可
		],
	},
	{
		// labelなし (単独項目)
		options: [{ label: "法律家", value: "legal_professional" }], // lawyer より広義
	},
	{
		// labelなし (単独項目)
		options: [{ label: "放浪者", value: "wanderer" }],
	},
	{
		// labelなし (単独項目)
		options: [{ label: "暴力団組員", value: "gang_member" }], // yakuza_member も文脈により可
	},
	{
		// labelなし (単独項目)
		options: [{ label: "ミュージシャン", value: "musician" }],
	},
	{
		// labelなし (単独項目)
		options: [{ label: "メンタルセラピスト", value: "mental_therapist" }],
	},
];

/* 職業ごとの職業技能マッピング */
export type OccupationValue =
	(typeof OCCUPATION_GROUPS)[number]["options"][number]["value"];

/** 任意の値を持つ技能のキー (例: 運転の種類、言語の種類など) */
export type CustomizableSkillKey =
	| "drive"
	| "craft"
	| "pilot"
	| "survival"
	| "art"
	| "otherLanguage";

/**
 * 1. 固定された基本技能 (詳細指定が不要なもの)
 * 例: 医学 (medicine), 回避 (dodge)
 */
export interface FixedSkill {
	type: "fixed";
	skill: Exclude<SkillKey, CustomizableSkillKey>;
	label: string;
}

/**
 * 2. 固定された詳細を持つカスタマイズ可能技能
 * 例: 運転(自動車) (drive, specification: "自動車"), 芸術(ダンス) (art, specification: "ダンス")
 */
export interface FixedSpecificSkill {
	type: "fixedSpecific";
	skill: CustomizableSkillKey;
	label: string;
	specificLabels: Array<string>;
}

/**
 * 3. ユーザーが詳細を指定するカスタマイズ可能技能
 * 例: 芸術(任意) (art), 他の言語(英語など) (otherLanguage)
 */
export interface CustomizableSkill {
	type: "customizable";
	skill: CustomizableSkillKey;
	label: string;
	examples?: string[];
}

/**
 * 4. 選択肢の中から指定された数を選ぶ技能
 * 例: (言いくるめ or 説得), (＋次の技能から２つ選択)
 */
export interface ChoiceSkill {
	type: "choice";
	label: string;
	options: Array<FixedSkill | CustomizableSkill | FixedSpecificSkill>;
	count: number;
}

/**
 * 5. 任意の技能を指定された数だけ選ぶ (個人的な関心など)
 */
export interface FreeChoiceSkill {
	type: "free_choice";
	label: string;
	count: number;
}

/** 職業技能の各項目の詳細を表現する型 */
export type SkillDefinition =
	| FixedSkill
	| FixedSpecificSkill
	| CustomizableSkill
	| ChoiceSkill
	| FreeChoiceSkill;

/** 職業ごとの技能リストをマッピングする型 */
export type OccupationSkillsMapType = Record<
	OccupationValue,
	SkillDefinition[]
>;

export const OCCUPATION_SKILL_MAP: OccupationSkillsMapType = {
	// 医師グループ
	doctor: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語", "ラテン語", "ドイツ語"],
		},
	],
	// アニマルセラピスト
	animal_therapist: [
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "psychoanalysis", label: "精神分析" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "track", label: "追跡" },
		{ type: "fixed", skill: "naturalHistory", label: "博物学" },
		{ type: "free_choice", label: "個人的な関心のある技能１つ", count: 1 },
	],
	// 看護師
	nurse: [
		{ type: "fixed", skill: "chemistry", label: "化学" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{
			type: "choice",
			label: "言いくるめ or 説得",
			options: [
				{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
				{ type: "fixed", skill: "persuade", label: "説得" },
			],
			count: 1,
		},
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "spot", label: "目星" },
	],
	// 救急救命士
	paramedic: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "chemistry", label: "化学" },
		{ type: "fixed", skill: "locksmith", label: "鍵開け" },
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "climb", label: "登攀" },
	],
	// 形成外科医
	plastic_surgeon: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語"],
		},
	],
	// 精神科医
	psychiatrist: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "chemistry", label: "化学" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "psychoanalysis", label: "精神分析" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{ type: "customizable", skill: "otherLanguage", label: "その他の言語" },
	],
	// 闇医者
	underground_doctor: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "law", label: "法律" },
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{ type: "customizable", skill: "otherLanguage", label: "その他の言語" },
		{ type: "free_choice", label: "個人的な関心のある技能１つ", count: 1 },
	],

	// エンジニア
	engineer: [
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "computer", label: "コンピューター" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "physics", label: "物理学" },
		{
			type: "fixedSpecific",
			skill: "otherLanguage",
			label: "その他の言語",
			specificLabels: ["英語"],
		},
		{
			type: "choice",
			label: "次の技能から１つ選択",
			options: [
				{ type: "fixed", skill: "chemistry", label: "化学" },
				{ type: "fixed", skill: "geology", label: "地質学" },
				{ type: "fixed", skill: "electronics", label: "電子工学" },
			],
			count: 1,
		},
	],

	// 狂信者
	fanatic: [
		{ type: "fixed", skill: "hide", label: "隠す" },
		{ type: "fixed", skill: "conceal", label: "隠れる" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語", "中国語", "朝鮮語", "ロシア語"],
		},
		{
			type: "choice",
			label: "次の技能から２つ選択",
			options: [
				{ type: "fixed", skill: "chemistry", label: "化学" },
				{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
				{ type: "fixed", skill: "law", label: "法律" },
				{ type: "fixed", skill: "pharmacy", label: "薬学" },
				{ type: "fixed", skill: "rifle", label: "ライフル" },
				{ type: "fixed", skill: "shotgun", label: "ショットガン" },
			],
			count: 2,
		},
	],

	// 警察官
	police_officer: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "track", label: "追跡" },
		{ type: "fixed", skill: "law", label: "法律" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{
			type: "choice",
			label: "次の技能から１つ選択",
			options: [
				{
					type: "customizable",
					skill: "drive",
					label: "運転",
					examples: ["自動車", "二輪車"],
				},
				{ type: "fixed", skill: "credit", label: "信用" },
				{ type: "fixed", skill: "grapple", label: "組みつき" },
				{
					type: "fixed",
					skill: "budo",
					label: "武道",
				},
				{ type: "fixed", skill: "handgun", label: "拳銃" },
				{ type: "fixed", skill: "katana", label: "日本刀" },
				{ type: "fixed", skill: "staff", label: "杖" },
			],
			count: 1,
		},
	],
	//海上保安官
	coast_guard_officer: [
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{
			type: "fixedSpecific",
			skill: "pilot",
			label: "操縦",
			specificLabels: ["船舶"],
		},
		{ type: "fixed", skill: "climb", label: "登攀" },
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{ type: "fixed", skill: "law", label: "法律" },
		{
			type: "fixedSpecific",
			skill: "survival",
			label: "サバイバル",
			specificLabels: ["海"],
		},
	],
	// 科学捜査研究員
	forensic_scientist: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "chemistry", label: "化学" },
		{ type: "fixed", skill: "computer", label: "コンピューター" },
		{ type: "fixed", skill: "photography", label: "写真術" },
		{ type: "fixed", skill: "anthropology", label: "人類学" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "law", label: "法律" },
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
	],
	// 山岳救助隊員
	mountain_rescue_member: [
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "track", label: "追跡" },
		{ type: "fixed", skill: "climb", label: "登攀" },
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{
			type: "fixedSpecific",
			skill: "survival",
			label: "サバイバル（山）",
			specificLabels: ["山"],
		},
		{ type: "customizable", skill: "otherLanguage", label: "その他の言語" },
	],
	// 消防士
	firefighter: [
		{
			type: "fixedSpecific",
			skill: "drive",
			label: "運転 (自動車)",
			specificLabels: ["自動車"],
		},
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "dodge", label: "回避" },
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "throw", label: "投擲" },
		{ type: "fixed", skill: "climb", label: "登攀" },
	],
	// 芸術家
	artist: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "customizable", skill: "art", label: "芸術（任意）" },
		{ type: "fixed", skill: "computer", label: "コンピューター" },
		{ type: "fixed", skill: "photography", label: "写真術" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "customizable", skill: "craft", label: "製作（任意）" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{ type: "fixed", skill: "history", label: "歴史" },
	],
	// 芸術家 基本
	artist_basic: [
		{
			type: "choice",
			label: "言いくるめ or 説得",
			options: [
				{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
				{ type: "fixed", skill: "persuade", label: "説得" },
			],
			count: 1,
		},
		{
			type: "choice",
			label: "芸術（任意）or 製作（任意）",
			options: [
				{ type: "customizable", skill: "art", label: "芸術（任意）" },
				{ type: "customizable", skill: "craft", label: "製作（任意）" },
			],
			count: 1,
		},
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{
			type: "choice",
			label: "歴史 or 博物学",
			options: [
				{ type: "fixed", skill: "history", label: "歴史" },
				{ type: "fixed", skill: "naturalHistory", label: "博物学" },
			],
			count: 1,
		},
		{
			type: "choice",
			label: "次の技能から３つ選択",
			options: [
				{ type: "fixed", skill: "computer", label: "コンピューター" },
				{ type: "fixed", skill: "photography", label: "写真術" },
				{ type: "fixed", skill: "biology", label: "生物学" },
				{ type: "fixed", skill: "astronomy", label: "天文学" },
				{ type: "customizable", skill: "art", label: "芸術（任意）" },
				{ type: "customizable", skill: "craft", label: "製作（任意）" },
			],
			count: 3,
		},
	],
	// ダンサー
	dancer: [
		{ type: "fixed", skill: "dodge", label: "回避" },
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術 (ダンス)",
			specificLabels: ["ダンス"],
		},
		{ type: "fixed", skill: "sneak", label: "忍び歩き" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "climb", label: "登攀" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{ type: "free_choice", label: "個人的な関心のある技能２つ", count: 2 },
	],
	// デザイナー
	designer: [
		{
			type: "choice",
			label: "言いくるめ or 説得",
			options: [
				{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
				{ type: "fixed", skill: "persuade", label: "説得" },
			],
			count: 1,
		},
		{
			type: "choice",
			label: "芸術（任意） or 製作（任意）",
			options: [
				{ type: "customizable", skill: "art", label: "芸術（任意）" },
				{ type: "customizable", skill: "craft", label: "製作（任意）" },
			],
			count: 1,
		},
		{ type: "fixed", skill: "computer", label: "コンピューター" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{ type: "free_choice", label: "個人的な関心のある技能２つ", count: 2 },
	],
	//ファッション系芸術家
	fashion_artist: [
		{
			type: "choice",
			label: "言いくるめ or 説得",
			options: [
				{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
				{ type: "fixed", skill: "persuade", label: "説得" },
			],
			count: 1,
		},
		{
			type: "choice",
			label: "芸術（任意） or 製作（任意）",
			options: [
				{ type: "customizable", skill: "art", label: "芸術（任意）" },
				{ type: "customizable", skill: "craft", label: "製作（任意）" },
			],
			count: 1,
		},
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "disguise", label: "変装" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{ type: "free_choice", label: "個人的な関心のある技能２つ", count: 2 },
	],
	// 古物研究科
	antiquarian: [
		{ type: "fixed", skill: "computer", label: "コンピューター" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{ type: "fixed", skill: "history", label: "歴史" },
		{
			type: "customizable",
			skill: "craft",
			label: "製作",
			examples: ["古書修復", "古美術修復"],
		},
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語", "漢文", "ラテン語"],
		},
		{ type: "customizable", skill: "art", label: "芸術（任意）" },
	],
	// コンピュータ技術者
	computer_technician: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "computer", label: "コンピューター" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "electronics", label: "電子工学" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "physics", label: "物理学" },
		{
			type: "fixedSpecific",
			skill: "otherLanguage",
			label: "その他の言語",
			specificLabels: ["英語"],
		},
	],
	// 作家
	writer: [
		{ type: "fixed", skill: "occult", label: "オカルト" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "history", label: "歴史" },
		{ type: "fixed", skill: "nativeLanguage", label: "母国語" },
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術（トリビア知識、詩的表現）",
			specificLabels: ["トリビア知識", "詩的表現"],
		},
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語"],
		},
	],
	// 自衛官
	self_defense_official: [
		{
			type: "fixedSpecific",
			skill: "drive",
			label: "運転",
			specificLabels: ["自動車"],
		},
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{
			type: "fixedSpecific",
			skill: "pilot",
			label: "操縦",
			specificLabels: [
				"船舶",
				"潜水艦",
				"戦車",
				"民間プロペラ機",
				"民間ジェット機",
				"定期旅客機",
				"ジェット戦闘機",
				"ヘリコプター",
			],
		},
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{
			type: "choice",
			label: "次の技能から２つ選択",
			options: [
				{ type: "fixed", skill: "dodge", label: "回避" },
				{ type: "fixed", skill: "conceal", label: "隠れる" },
				{ type: "fixed", skill: "listen", label: "聞き耳" },
				{ type: "fixed", skill: "accounting", label: "経理" },
				{ type: "fixed", skill: "sneak", label: "忍び歩き" },
				{ type: "fixed", skill: "credit", label: "信用" },
				{ type: "fixed", skill: "persuade", label: "説得" },
				{ type: "fixed", skill: "bargain", label: "値切り" },
				{ type: "fixed", skill: "law", label: "法律" },
				{ type: "fixed", skill: "punch", label: "こぶし/パンチ" },
				{ type: "fixed", skill: "kick", label: "キック" },
				{ type: "fixed", skill: "grapple", label: "組みつき" },
				{ type: "fixed", skill: "submachineGun", label: "サブマシンガン" },
				{ type: "fixed", skill: "rifle", label: "ライフル" },
				{ type: "fixed", skill: "handgun", label: "拳銃" },
				{ type: "fixed", skill: "budo", label: "武道" },
				{
					type: "customizable",
					skill: "otherLanguage",
					label: "その他の言語",
					examples: ["英語"],
				},
				{ type: "fixed", skill: "cannon", label: "砲" },
			],
			count: 2,
		},
	],
	// 陸上自衛隊
	jgsdf_personnel: [
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "dodge", label: "回避" },
		{ type: "fixed", skill: "conceal", label: "隠れる" },
		{
			type: "fixedSpecific",
			skill: "survival",
			label: "サバイバル（山・砂漠）",
			specificLabels: ["山", "砂漠"],
		},
		{ type: "fixed", skill: "knife", label: "ナイフ" },
		{ type: "fixed", skill: "rifle", label: "ライフル" },
		{
			type: "choice",
			label: "次の技能から２つ選択",
			options: [
				{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
				{ type: "fixed", skill: "sneak", label: "忍び歩き" },
				{ type: "fixed", skill: "swim", label: "水泳" },
				{ type: "fixed", skill: "climb", label: "登攀" },
				{
					type: "customizable",
					skill: "otherLanguage",
					label: "その他の言語",
					examples: ["英語", "中国語"],
				},
				{ type: "fixed", skill: "parachute", label: "パラシュート" },
				{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
				{ type: "fixed", skill: "cannon", label: "砲" },
			],
			count: 2,
		},
	],
	// 海上自衛隊 (艦上勤務)
	jmsdf_shipboard_personnel: [
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "swim", label: "水泳" },
		{
			type: "fixedSpecific",
			skill: "pilot",
			label: "操縦 (ボート)",
			specificLabels: ["ボート"],
		},
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{
			type: "fixedSpecific",
			skill: "survival",
			label: "サバイバル（海）",
			specificLabels: ["海"],
		},
		{
			type: "choice",
			label: "次の技能から２つ選択",
			options: [
				{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
				{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
				{ type: "fixed", skill: "knife", label: "ナイフ" },
				{ type: "fixed", skill: "rifle", label: "ライフル" },
				{ type: "fixed", skill: "cannon", label: "砲" },
			],
			count: 2,
		},
	],
	// 自衛隊パイロット (陸海空)
	jsdf_pilot: [
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{
			type: "fixedSpecific",
			skill: "pilot",
			label: "操縦 (戦闘機, 大型機, ヘリコプター)",
			specificLabels: ["戦闘機", "大型機", "ヘリコプター"],
		},
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "astronomy", label: "天文学" },
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{ type: "fixed", skill: "parachute", label: "パラシュート" },
		{ type: "free_choice", label: "個人的な関心のある技能１つ", count: 1 },
	],
	// 民間軍事会社メンバー
	pmc_member: [
		{ type: "fixed", skill: "dodge", label: "回避" },
		{ type: "fixed", skill: "conceal", label: "隠れる" },
		{ type: "fixed", skill: "sneak", label: "忍び歩き" },
		{
			type: "choice",
			label: "水泳 or 登攀",
			options: [
				{ type: "fixed", skill: "swim", label: "水泳" },
				{ type: "fixed", skill: "climb", label: "登攀" },
			],
			count: 1,
		},
		{ type: "fixed", skill: "knife", label: "ナイフ" },
		{ type: "fixed", skill: "rifle", label: "ライフル" },
		{
			type: "choice",
			label: "次の技能から２つ選択",
			options: [
				{ type: "fixed", skill: "firstAid", label: "応急手当" },
				{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
				{
					type: "fixedSpecific",
					skill: "survival",
					label: "サバイバル（山、砂漠）",
					specificLabels: ["山", "砂漠"],
				},
				{
					type: "customizable",
					skill: "otherLanguage",
					label: "その他の言語",
					examples: ["英語"],
				},
			],
			count: 2,
		},
	],
	// ジャーナリスト
	journalist: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "photography", label: "写真術" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語"],
		},
		{ type: "fixed", skill: "history", label: "歴史" },
	],
	// 宗教家
	religious_figure: [
		{ type: "fixed", skill: "occult", label: "オカルト" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "history", label: "歴史" },
		{
			type: "choice",
			label: "次の技能から１つ選択",
			options: [
				{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
				{ type: "fixed", skill: "credit", label: "信用" },
				{
					type: "customizable",
					skill: "otherLanguage",
					label: "その他の言語",
					examples: ["漢文", "ラテン語"],
				},
			],
			count: 1,
		},
	],
	// 商店主／店員
	shopkeeper_clerk: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{
			type: "choice",
			label: "次の技能から１つ選択",
			options: [
				{ type: "fixed", skill: "computer", label: "コンピューター" },
				{
					type: "fixedSpecific",
					skill: "drive",
					label: "運転 (自動車, 二輪車)",
					specificLabels: ["自動車", "二輪車"],
				},
			],
			count: 1,
		},
		{ type: "free_choice", label: "商品知識から好きな技能を１つ", count: 1 },
	],
	// 私立探偵
	private_detective: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "locksmith", label: "鍵開け" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "track", label: "追跡" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "law", label: "法律" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{
			type: "choice",
			label: "次の技能から１つ選択",
			options: [
				{ type: "fixed", skill: "listen", label: "聞き耳" },
				{ type: "fixed", skill: "photography", label: "写真術" },
				{ type: "fixed", skill: "bargain", label: "値切り" },
			],
			count: 1,
		},
	],
	// 水産業従事者
	fishery_worker: [
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "swim", label: "水泳" },
		{
			type: "fixedSpecific",
			skill: "pilot",
			label: "操縦 (船舶)",
			specificLabels: ["船舶"],
		},
		{ type: "fixed", skill: "astronomy", label: "天文学" },
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{ type: "fixed", skill: "naturalHistory", label: "博物学" },
		{ type: "fixed", skill: "spot", label: "目星" },
	],
	// スポーツ選手
	athlete: [
		{ type: "fixed", skill: "dodge", label: "回避" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "throw", label: "投擲" },
		{ type: "fixed", skill: "climb", label: "登攀" },
		{
			type: "customizable",
			skill: "art",
			label: "芸術（任意のスポーツ）",
			examples: ["サッカー", "陸上"],
		},
		{
			type: "choice",
			label: "次の技能から３つ選択",
			options: [
				{ type: "fixed", skill: "firstAid", label: "応急手当" },
				{ type: "fixed", skill: "ride", label: "乗馬" },
				{ type: "fixed", skill: "swim", label: "水泳" },
				{ type: "fixed", skill: "punch", label: "こぶし/パンチ" },
				{ type: "fixed", skill: "kick", label: "キック" },
				{ type: "fixed", skill: "grapple", label: "組みつき" },
				{ type: "fixed", skill: "handgun", label: "拳銃" },
				{ type: "fixed", skill: "rifle", label: "ライフル" },
				{ type: "fixed", skill: "shotgun", label: "ショットガン" },
				{
					type: "fixed",
					skill: "budo",
					label: "武道",
				},
				{ type: "fixed", skill: "katana", label: "日本刀" },
				{ type: "fixed", skill: "naginata", label: "薙刀" },
				{ type: "fixed", skill: "staff", label: "杖" },
				{ type: "fixed", skill: "bow", label: "弓" },
				{
					type: "fixed",
					skill: "competitionArchery",
					label: "競技用アーチェリー",
				},
			],
			count: 3,
		},
	],
	// 大学教授
	university_professor: [
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語"],
		},
		{
			type: "choice",
			label: "次の技能から専門的研究分野として２つ選択",
			options: [
				{ type: "fixed", skill: "medicine", label: "医学" },
				{ type: "fixed", skill: "chemistry", label: "化学" },
				{ type: "fixed", skill: "archaeology", label: "考古学" },
				{ type: "fixed", skill: "anthropology", label: "人類学" },
				{ type: "fixed", skill: "biology", label: "生物学" },
				{ type: "fixed", skill: "geology", label: "地質学" },
				{ type: "fixed", skill: "electronics", label: "電子工学" },
				{ type: "fixed", skill: "astronomy", label: "天文学" },
				{ type: "fixed", skill: "naturalHistory", label: "博物学" },
				{ type: "fixed", skill: "physics", label: "物理学" },
				{ type: "fixed", skill: "law", label: "法律" },
				{ type: "fixed", skill: "history", label: "歴史" },
			],
			count: 2,
		},
	],
	// 冒険家教授
	adventurer_professor: [
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "climb", label: "登攀" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語"],
		},
		{
			type: "choice",
			label: "次の技能から専門的研究分野として２つ選択",
			options: [
				{ type: "fixed", skill: "archaeology", label: "考古学" },
				{ type: "fixed", skill: "geology", label: "地質学" },
				{ type: "fixed", skill: "history", label: "歴史" },
			],
			count: 2,
		},
	],
	//評論家
	critic: [
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "nativeLanguage", label: "母国語" },
		{
			type: "choice",
			label: "次の技能から専門的研究分野として２つ選択",
			options: [
				{ type: "fixed", skill: "occult", label: "オカルト" },
				{ type: "fixed", skill: "naturalHistory", label: "博物学" },
				{ type: "fixed", skill: "history", label: "歴史" },
			],
			count: 2,
		},
	],
	// タレント
	talent: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{
			type: "customizable",
			skill: "art",
			label: "芸術（何かの音楽演奏、歌唱、ダンス、演技、司会など）",
			examples: ["歌唱", "ダンス", "演技", "司会"],
		},
		{ type: "fixed", skill: "disguise", label: "変装" },
		{
			type: "fixedSpecific",
			skill: "otherLanguage",
			label: "その他の言語",
			specificLabels: ["英語"],
		},
	],
	// アイドル・音楽タレント
	idol_music_talent: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術 (歌唱 or ダンス)",
			specificLabels: ["歌唱", "ダンス"],
		},
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "disguise", label: "変装" },
		{ type: "free_choice", label: "個人的な関心のある技能２つ", count: 3 },
	],
	// アナウンサー
	announcer: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術 (アナウンス) ",
			specificLabels: ["アナウンス"],
		},
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "nativeLanguage", label: "母国語" },
		{ type: "free_choice", label: "個人的な関心のある技能１つ", count: 1 },
	],
	// コメディアン
	comedian: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術 (物語 or 演劇)",
			specificLabels: ["物語", "演劇"],
		},
		{ type: "fixed", skill: "disguise", label: "変装" },
		{ type: "free_choice", label: "個人的な関心のある技能２つ", count: 3 },
	],
	// スポーツタレント
	sports_talent: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術",
			specificLabels: ["演劇"],
		},
		{
			type: "choice",
			label: "跳躍 or 登攀",
			options: [
				{ type: "fixed", skill: "jump", label: "跳躍" },
				{ type: "fixed", skill: "climb", label: "登攀" },
			],
			count: 1,
		},
		{ type: "fixed", skill: "disguise", label: "変装" },
		{ type: "fixed", skill: "punch", label: "こぶし" },
		{ type: "free_choice", label: "個人的な関心のある技能２つ", count: 2 },
	],
	//テレビ・コメンテーター
	tv_commentator: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "free_choice", label: "＋個人的な専門の技能１つ", count: 1 },
	],
	// 俳優
	actor: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{
			type: "fixedSpecific",
			skill: "drive",
			label: "運転",
			specificLabels: ["自動車"],
		},
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術",
			specificLabels: ["演劇"],
		},
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "disguise", label: "変装" },
		{ type: "free_choice", label: "個人的な関心のある技能２つ", count: 2 },
	],
	// プロデューサー・マネージャー
	producer_manager: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{
			type: "fixedSpecific",
			skill: "drive",
			label: "運転",
			specificLabels: ["自動車"],
		},
		{ type: "fixed", skill: "conceal", label: "隠れる" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "sneak", label: "忍び歩き" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "law", label: "法律" },
		{ type: "free_choice", label: "個人的な関心のある技能１つ", count: 1 },
	],
	// 超心理学者
	parapsychologist: [
		{ type: "fixed", skill: "occult", label: "オカルト" },
		{ type: "fixed", skill: "anthropology", label: "人類学" },
		{ type: "fixed", skill: "photography", label: "写真術" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "psychoanalysis", label: "精神分析" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語", "ラテン語"],
		},
		{ type: "fixed", skill: "history", label: "歴史" },
	],
	// ゴーストハンター
	ghost_hunter: [
		{ type: "fixed", skill: "occult", label: "オカルト" },
		{ type: "fixed", skill: "chemistry", label: "化学" },
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "photography", label: "写真術" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "physics", label: "物理学" },
	],
	// 占い師・スピリチュアリスト・霊媒師
	fortune_teller_spiritualist_medium: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "occult", label: "オカルト" },
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術",
			specificLabels: ["演劇"],
		},
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "free_choice", label: "個人的な関心のある技能１つ", count: 1 },
	],
	// ディレッタント
	dilettante: [
		{
			type: "fixedSpecific",
			skill: "drive",
			label: "運転",
			specificLabels: ["自動車"],
		},
		{
			type: "customizable",
			skill: "art",
			label: "芸術",
			examples: ["音楽", "美術", "文学", "ダンス"],
		},
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "law", label: "法律" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語"],
		},
		{
			type: "choice",
			label: "次の技能から２つ選択",
			options: [
				{ type: "fixed", skill: "ride", label: "乗馬" },
				{ type: "fixed", skill: "photography", label: "写真術" },
				{
					type: "fixedSpecific",
					skill: "pilot",
					label: "操縦 (航空機 or 船舶)",
					specificLabels: ["航空機", "船舶"],
				},
				{ type: "fixed", skill: "handgun", label: "拳銃" },
				{ type: "fixed", skill: "rifle", label: "ライフル" },
				{ type: "fixed", skill: "shotgun", label: "ショットガン" },
				{ type: "fixed", skill: "budo", label: "武道" },
			],
			count: 2,
		},
	],
	// ドライバー
	driver: [
		{
			type: "fixedSpecific",
			skill: "drive",
			label: "運転（自動車 or 二輪車）",
			specificLabels: ["自動車", "二輪車"],
		},
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "spot", label: "目星" },
	],
	// 農林業従業者
	agriculture_forestry_worker: [
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{
			type: "customizable",
			skill: "craft",
			label: "製作",
			examples: ["農作物", "畜産", "養蜂"],
		},
		{ type: "fixed", skill: "track", label: "追跡" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "naturalHistory", label: "博物学" },
		{
			type: "choice",
			label: "次の技能から１つ選択",
			options: [
				{ type: "fixed", skill: "rifle", label: "ライフル" },
				{ type: "fixed", skill: "shotgun", label: "ショットガン" },
				{ type: "fixed", skill: "staff", label: "杖" },
			],
			count: 1,
		},
	],
	// パイロット
	pilot: [
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{
			type: "fixedSpecific",
			skill: "pilot",
			label: "操縦",
			specificLabels: [
				"民間プロペラ機",
				"民間ジェット機",
				"定期旅客機",
				"ジェット戦闘機",
				"ヘリコプター",
				"飛行機",
			],
		},
		{ type: "fixed", skill: "astronomy", label: "天文学" },
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{ type: "fixed", skill: "physics", label: "物理学" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語"],
		},
	],
	// ビジネスマン
	businessman: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "computer", label: "コンピューター" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "law", label: "法律" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語"],
		},
	],
	// メイド
	butler_maid: [
		{
			type: "choice",
			label: "言いくるめ or 説得",
			options: [
				{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
				{ type: "fixed", skill: "persuade", label: "説得" },
			],
			count: 1,
		},
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術 (ワインの鑑定 or 料理 ...)",
			specificLabels: ["ワインの鑑定", "料理", "裁縫", "掃除"],
		},
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語"],
		},
	],
	// セールスマン
	salesman: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{
			type: "fixedSpecific",
			skill: "drive",
			label: "運転",
			specificLabels: ["自動車"],
		},
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術",
			specificLabels: ["演劇"],
		},
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "free_choice", label: "個人的な関心のある技能１つ", count: 1 },
	],
	// 法律家
	legal_professional: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "law", label: "法律" },
	],
	// 放浪者
	wanderer: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "conceal", label: "隠れる" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "sneak", label: "忍び歩き" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{
			type: "choice",
			label: "次の技能から１つ選択",
			options: [
				{
					type: "fixedSpecific",
					skill: "drive",
					label: "運転",
					specificLabels: ["自動車", "二輪車"],
				},
				{
					type: "fixedSpecific",
					skill: "art",
					label: "芸術",
					specificLabels: ["ギャンブル"],
				},
				{
					type: "customizable",
					skill: "otherLanguage",
					label: "その他の言語",
					examples: ["英語"],
				},
			],
			count: 1,
		},
	],
	// 暴力団員
	gang_member: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "hide", label: "隠す" },
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術（刺青彫 or イカサマ）",
			specificLabels: ["刺青彫り", "イカサマ"],
		},
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{
			type: "choice",
			label: "次の技能から２つ選択",
			options: [
				{ type: "fixed", skill: "conceal", label: "隠れる" },
				{ type: "fixed", skill: "punch", label: "こぶし/パンチ" },
				{ type: "fixed", skill: "kick", label: "キック" },
				{ type: "fixed", skill: "grapple", label: "組みつき" },
				{ type: "fixed", skill: "handgun", label: "拳銃" },
				{ type: "fixed", skill: "budo", label: "武道" },
				{ type: "fixed", skill: "katana", label: "日本刀" },
				{ type: "fixed", skill: "knife", label: "ナイフ" },
			],
			count: 2,
		},
	],
	// ミュージシャン
	musician: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{
			type: "customizable",
			skill: "art",
			label: "芸術（歌唱 or 何かの音楽演奏）",
			examples: ["歌唱"],
		},
		{
			type: "fixedSpecific",
			skill: "craft",
			label: "製作",
			specificLabels: ["作詞", "作曲"],
		},
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語"],
		},
	],
	// メンタルセラピスト
	mental_therapist: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{
			type: "fixedSpecific",
			skill: "art",
			label: "芸術（絵画、音楽演奏、歌唱、アロマなど）",
			specificLabels: ["絵画", "音楽演奏", "歌唱", "アロマ"],
		},
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "psychoanalysis", label: "精神分析" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "law", label: "法律" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語", "ドイツ語"],
		},
	],
};

export const MOCK_OCCUPATION_SKILL_MAP: OccupationSkillsMapType = {
	doctor: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" }, // 元のマークダウンでは occult になっていましたが、firstAid が適切と思われます
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "その他の言語",
			examples: ["英語", "ラテン語", "ドイツ語"],
		},
	],
	nurse: [
		{ type: "fixed", skill: "chemistry", label: "化学" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{
			type: "choice",
			label: "言いくるめ or 説得",
			options: [
				{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
				{ type: "fixed", skill: "persuade", label: "説得" },
			],
			count: 1,
		},
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "spot", label: "目星" },
	],
	underground_doctor: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "law", label: "法律" },
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{ type: "customizable", skill: "otherLanguage", label: "その他の言語" },
		{ type: "free_choice", label: "個人的な関心のある技能１つ", count: 1 },
	],
};

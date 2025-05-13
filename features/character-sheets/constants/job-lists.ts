//職業リスト

import { CharacterSkills } from "../types/character-sheet-types";

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
			{ label: "芸術家", value: "artist" },
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
			{ label: "海上自衛隊員（艦上勤務）", value: "jmsdf_shipboard_personnel" },
			{ label: "自衛隊パイロット（陸海空）", value: "jsdf_pilot" },
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
			{ label: "俳優", value: "actor" }, // actor_actress も可
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
	| "otherLanguage"
	| "drive"
	| "craft"
	| "pilot"
	| "art";

export type SkillKey =
	| keyof CharacterSkills["combat"]
	| keyof CharacterSkills["investigation"]
	| keyof CharacterSkills["action"]
	| keyof CharacterSkills["negotiation"]
	| keyof CharacterSkills["knowledge"];

/**
 * 1. 固定された基本技能 (詳細指定が不要なもの)
 * 例: 医学 (medicine), 回避 (dodge)
 */
export interface FixedSkill {
	type: "fixed";
	/** 技能の英語キー */
	skill: Exclude<SkillKey, CustomizableSkillKey>;
	/** 技能の日本語名 (UI表示用) */
	label: string;
}

/**
 * 2. 固定された詳細を持つカスタマイズ可能技能
 * 例: 運転(自動車) (drive, specification: "自動車"), 芸術(ダンス) (art, specification: "ダンス")
 */
export interface FixedSpecificSkill {
	type: "fixed_specific";
	skill: CustomizableSkillKey;
	label: string;
	/** 固定された詳細 (例: "自動車", "ダンス") */
	specification: string;
}

/**
 * 3. ユーザーが詳細を指定するカスタマイズ可能技能
 * 例: 芸術(任意) (art), 他の言語(英語など) (otherLanguage)
 */
export interface CustomizableSkill {
	type: "customizable";
	/** 技能の英語キー */
	skill: CustomizableSkillKey;
	/** UI表示用の説明 (例: "芸術（任意）", "ほかの言語（英語、ラテン語など）") */
	label: string;
	/** 任意指定の場合の入力例 (UIでサジェストなどに使用) */
	examples?: string[];
}

/**
 * 4. 選択肢の中から指定された数を選ぶ技能
 * 例: (言いくるめ or 説得), (＋次の技能から２つ選択)
 */
export interface ChoiceSkill {
	type: "choice";
	/** UI表示用の説明 (例: "言いくるめ or 説得", "＋次の技能から２つ選択") */
	label: string;
	/** 選択肢の配列 */
	options: Array<
		FixedSkill | FixedSpecificSkill | CustomizableSkill | OtherSkill
	>;
	/** 選択する数 */
	count: number;
}

/**
 * 5. 任意の技能を指定された数だけ選ぶ (個人的な関心など)
 */
export interface FreeChoiceSkill {
	type: "free_choice";
	/** UI表示用の説明 (例: "＋個人的な関心のある技能１つ") */
	label: string;
	/** 選択する数 */
	count: number;
}

/**
 * 6. CharacterSkills に定義されていないその他の技能 (ハウスルールや特定の武器など)
 * 例: 日本刀, サバイバル（海）
 */
export interface OtherSkill {
	type: "other";
	/** 技能の日本語名 (UI表示用) */
	label: string;
}

/** 職業技能の各項目の詳細を表現する型 */
export type SkillDefinition =
	| FixedSkill
	| FixedSpecificSkill
	| CustomizableSkill
	| ChoiceSkill
	| FreeChoiceSkill
	| OtherSkill;

/** 職業ごとの技能リストをマッピングする型 */
export type OccupationSkillsMapType = Record<
	OccupationValue,
	SkillDefinition[]
>;

export const OCCUPATION_SKILL_MAP: OccupationSkillsMapType = {
	// 医師グループ
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
			label: "ほかの言語（英語、ラテン語、ドイツ語）",
			examples: ["英語", "ラテン語", "ドイツ語"],
		},
	],
	animal_therapist: [
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "psychoanalysis", label: "精神分析" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "track", label: "追跡" },
		{ type: "fixed", skill: "naturalHistory", label: "博物学" },
		{ type: "free_choice", label: "＋個人的な関心のある技能１つ", count: 1 },
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
	paramedic: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "chemistry", label: "化学" },
		{ type: "fixed", skill: "locksmith", label: "鍵開け" },
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "climb", label: "登攀" },
	],
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
			label: "ほかの言語（英語）",
			examples: ["英語"],
		},
	],
	psychiatrist: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "chemistry", label: "化学" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "psychoanalysis", label: "精神分析" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{ type: "customizable", skill: "otherLanguage", label: "ほかの言語" },
	],
	underground_doctor: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "law", label: "法律" },
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{ type: "customizable", skill: "otherLanguage", label: "ほかの言語" },
		{ type: "free_choice", label: "＋個人的な関心のある技能１つ", count: 1 },
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
			type: "customizable",
			skill: "otherLanguage",
			label: "ほかの言語（英語）",
			examples: ["英語"],
		},
		{
			type: "choice",
			label: "＋次の技能から１つ選択：化学、地質学、電子工学",
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
			label: "ほかの言語（英語、中国語、朝鮮語、ロシア語など）",
			examples: ["英語", "中国語", "朝鮮語", "ロシア語"],
		},
		{
			type: "choice",
			label:
				"＋次の技能から２つ選択：化学、電気修理、法律、薬学、ライフル、ショットガン、スタンガン",
			options: [
				{ type: "fixed", skill: "chemistry", label: "化学" },
				{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
				{ type: "fixed", skill: "law", label: "法律" },
				{ type: "fixed", skill: "pharmacy", label: "薬学" },
				{ type: "fixed", skill: "rifle", label: "ライフル" },
				{ type: "fixed", skill: "shotgun", label: "ショットガン" },
				{ type: "other", label: "スタンガン" },
			],
			count: 2,
		},
	],

	// 警察官グループ
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
			label:
				"＋次の技能から１つ選択：運転（自動車、二輪車）、信用、組みつき、武道（柔道）、日本刀、拳銃、杖",
			options: [
				{
					type: "fixed_specific",
					skill: "drive",
					label: "運転（自動車）",
					specification: "自動車",
				},
				{
					type: "fixed_specific",
					skill: "drive",
					label: "運転（二輪車）",
					specification: "二輪車",
				},
				{ type: "fixed", skill: "credit", label: "信用" },
				{ type: "fixed", skill: "grapple", label: "組みつき" },
				{
					type: "fixed_specific",
					skill: "art",
					label: "芸術（武道：柔道）",
					specification: "柔道",
				}, // 武道（柔道）を芸術技能として解釈
				{ type: "other", label: "日本刀" },
				{ type: "fixed", skill: "handgun", label: "拳銃" },
				{ type: "other", label: "杖" },
			],
			count: 1,
		},
	],
	coast_guard_officer: [
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{
			type: "fixed_specific",
			skill: "pilot",
			label: "操縦（船舶）",
			specification: "船舶",
		},
		{ type: "fixed", skill: "climb", label: "登攀" },
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{ type: "fixed", skill: "law", label: "法律" },
		{ type: "other", label: "サバイバル（海）" },
	],
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
	mountain_rescue_member: [
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "track", label: "追跡" },
		{ type: "fixed", skill: "climb", label: "登攀" },
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{ type: "other", label: "サバイバル（山）" },
		{ type: "customizable", skill: "otherLanguage", label: "ほかの言語" },
	],
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
			label: "＋次の技能から１つ選択：聞き耳、写真術、値切り、スタンガン",
			options: [
				{ type: "fixed", skill: "listen", label: "聞き耳" },
				{ type: "fixed", skill: "photography", label: "写真術" },
				{ type: "fixed", skill: "bargain", label: "値切り" },
				{ type: "other", label: "スタンガン" },
			],
			count: 1,
		},
	],
	firefighter: [
		{
			type: "fixed_specific",
			skill: "drive",
			label: "運転（自動車）",
			specification: "自動車",
		},
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "dodge", label: "回避" },
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "throw", label: "投擲" },
		{ type: "fixed", skill: "climb", label: "登攀" },
	],

	// 芸術家グループ
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
			label: "芸術（任意） or 製作（任意）",
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
			label:
				"＋次の技能から３つ選択：コンピューター、写真術、生物学、天文学、芸術（任意） or 製作（任意）",
			options: [
				{ type: "fixed", skill: "computer", label: "コンピューター" },
				{ type: "fixed", skill: "photography", label: "写真術" },
				{ type: "fixed", skill: "biology", label: "生物学" },
				{ type: "fixed", skill: "astronomy", label: "天文学" },
				{ type: "customizable", skill: "art", label: "芸術（任意）" }, // 選択肢内でさらに任意指定
				{ type: "customizable", skill: "craft", label: "製作（任意）" }, // 選択肢内でさらに任意指定
			],
			count: 3,
		},
	],
	dancer: [
		{ type: "fixed", skill: "dodge", label: "回避" },
		{
			type: "fixed_specific",
			skill: "art",
			label: "芸術（ダンス）",
			specification: "ダンス",
		},
		{ type: "fixed", skill: "sneak", label: "忍び歩き" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "climb", label: "登攀" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{ type: "free_choice", label: "＋個人的な関心のある技能２つ", count: 2 },
	],
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
		{ type: "free_choice", label: "＋個人的な関心のある技能２つ", count: 2 },
	],
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
		{ type: "free_choice", label: "＋個人的な関心のある技能２つ", count: 2 },
	],
	// 自衛官
	self_defense_official: [
		{
			type: "fixed_specific",
			skill: "drive",
			label: "運転（自動車）",
			specification: "自動車",
		},
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{
			type: "customizable",
			skill: "pilot",
			label:
				"操縦（船舶、潜水艦、戦車、民間プロペラ機、民間ジェット機、定期旅客機、ジェット戦闘機、ヘリコプター）",
			examples: [
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
			label:
				"＋次の技能から２つ選択：回避、隠れる、聞き耳、経理、忍び歩き、信用、説得、値切り、法律、ほかの言語（英語など）、こぶし/パンチ、キック、組みつき、武道（任意）、サブマシンガン、ライフル、グレネード・ランチャー、砲、拳銃",
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
				{
					type: "customizable",
					skill: "otherLanguage",
					label: "ほかの言語（英語など）",
					examples: ["英語"],
				},
				{ type: "fixed", skill: "punch", label: "こぶし/パンチ" },
				{ type: "fixed", skill: "kick", label: "キック" },
				{ type: "fixed", skill: "grapple", label: "組みつき" },
				{ type: "customizable", skill: "art", label: "芸術（武道：任意）" }, // 武道（任意）
				{ type: "fixed", skill: "submachineGun", label: "サブマシンガン" },
				{ type: "fixed", skill: "rifle", label: "ライフル" },
				{ type: "other", label: "グレネード・ランチャー" },
				{ type: "other", label: "砲" },
				{ type: "fixed", skill: "handgun", label: "拳銃" },
			],
			count: 2,
		},
	],

	// スポーツ選手
	athlete: [
		{ type: "fixed", skill: "dodge", label: "回避" },
		{ type: "customizable", skill: "art", label: "芸術（任意のスポーツ競技）" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "throw", label: "投擲" },
		{ type: "fixed", skill: "climb", label: "登攀" },
		{
			type: "choice",
			label:
				"＋次の技能から３つ選択：応急手当、乗馬、水泳、こぶし/パンチ、キック、組みつき、武道（任意）、日本刀、薙刀、杖、弓、競技用アーチェリー、拳銃、ライフル、ショットガン",
			options: [
				{ type: "fixed", skill: "firstAid", label: "応急手当" },
				{ type: "fixed", skill: "ride", label: "乗馬" },
				{ type: "fixed", skill: "swim", label: "水泳" },
				{ type: "fixed", skill: "punch", label: "こぶし/パンチ" },
				{ type: "fixed", skill: "kick", label: "キック" },
				{ type: "fixed", skill: "grapple", label: "組みつき" },
				{ type: "customizable", skill: "art", label: "芸術（武道：任意）" }, // 武道（任意）
				{ type: "other", label: "日本刀" },
				{ type: "other", label: "薙刀" },
				{ type: "other", label: "杖" },
				{ type: "other", label: "弓" },
				{ type: "other", label: "競技用アーチェリー" },
				{ type: "fixed", skill: "handgun", label: "拳銃" },
				{ type: "fixed", skill: "rifle", label: "ライフル" },
				{ type: "fixed", skill: "shotgun", label: "ショットガン" },
			],
			count: 3,
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
			label: "＋次の技能から１つ選択：運転（自動車、二輪車）、コンピューター",
			options: [
				{
					type: "fixed_specific",
					skill: "drive",
					label: "運転（自動車）",
					specification: "自動車",
				},
				{
					type: "fixed_specific",
					skill: "drive",
					label: "運転（二輪車）",
					specification: "二輪車",
				},
				{ type: "fixed", skill: "computer", label: "コンピューター" },
			],
			count: 1,
		},
		{ type: "free_choice", label: "＋商品知識から好きな技能を１つ", count: 1 }, // 商品知識は自由選択として解釈
	],

	antiquarian: [
		{ type: "customizable", skill: "art", label: "芸術（任意）" },
		{ type: "fixed", skill: "computer", label: "コンピューター" },
		{
			type: "customizable",
			skill: "craft",
			label: "製作（古書修復、古美術修復）",
			examples: ["古書修復", "古美術修復"],
		},
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "ほかの言語（英語、漢文、ラテン語など）",
			examples: ["英語", "漢文", "ラテン語"],
		},
		{ type: "fixed", skill: "spot", label: "目星" },
		{ type: "fixed", skill: "history", label: "歴史" },
	],
	computer_technician: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "computer", label: "コンピューター" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "electronics", label: "電子工学" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "physics", label: "物理学" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "ほかの言語（英語、その他）",
			examples: ["英語"],
		},
	],
	writer: [
		{ type: "fixed", skill: "occult", label: "オカルト" },
		{
			type: "customizable",
			skill: "art",
			label: "芸術（トリビア知識、詩的表現など）",
			examples: ["トリビア知識", "詩的表現"],
		},
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "ほかの言語（英語など）",
			examples: ["英語"],
		},
		{ type: "fixed", skill: "nativeLanguage", label: "母国語" },
		{ type: "fixed", skill: "history", label: "歴史" },
	],
	jgsdf_personnel: [
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "dodge", label: "回避" },
		{ type: "fixed", skill: "conceal", label: "隠れる" },
		{ type: "other", label: "サバイバル（山、砂漠）" }, // 「山」と「砂漠」を別々のOtherSkillにするか、まとめて1つにするか。ここでは1つに。
		{ type: "other", label: "任意の近接戦技能" }, // CharacterSkillsから選ぶか、OtherSkillとするか。ここではOtherとしてプレイヤー指定。
		{ type: "other", label: "任意の火器技能" }, // 同上
		{
			type: "choice",
			label:
				"＋次の技能から２つ選択：機械修理、忍び歩き、水泳、登攀、ほかの言語、パラシュート、重機械操作、砲",
			options: [
				{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
				{ type: "fixed", skill: "sneak", label: "忍び歩き" },
				{ type: "fixed", skill: "swim", label: "水泳" },
				{ type: "fixed", skill: "climb", label: "登攀" },
				{ type: "customizable", skill: "otherLanguage", label: "ほかの言語" },
				{ type: "other", label: "パラシュート" },
				{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
				{ type: "other", label: "砲" },
			],
			count: 2,
		},
	],
	jmsdf_shipboard_personnel: [
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "swim", label: "水泳" },
		{
			type: "fixed_specific",
			skill: "pilot",
			label: "操縦（ボート）",
			specification: "ボート",
		},
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{ type: "other", label: "サバイバル（海）" },
		{
			type: "choice",
			label:
				"＋次の技能から２つ選択：機械修理、電気修理、任意の近接戦技能、任意の火器技能、砲",
			options: [
				{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
				{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
				{ type: "other", label: "任意の近接戦技能" },
				{ type: "other", label: "任意の火器技能" },
				{ type: "other", label: "砲" },
			],
			count: 2,
		},
	],
	jsdf_pilot: [
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{
			type: "customizable",
			skill: "pilot",
			label: "操縦（戦闘機、大型機、ヘリコプターなど）",
			examples: ["戦闘機", "大型機", "ヘリコプター"],
		},
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "astronomy", label: "天文学" },
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{ type: "other", label: "パラシュート" },
		{ type: "free_choice", label: "＋個人的な関心のある技能１つ", count: 1 },
	],
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
		{ type: "other", label: "任意の近接戦技能" },
		{ type: "other", label: "任意の火器技能" },
		{
			type: "choice",
			label:
				"＋次の技能から２つ選択：応急手当、機械修理、サバイバル（山、砂漠）、ほかの言語",
			options: [
				{ type: "fixed", skill: "firstAid", label: "応急手当" },
				{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
				{ type: "other", label: "サバイバル（山、砂漠）" },
				{ type: "customizable", skill: "otherLanguage", label: "ほかの言語" },
			],
			count: 2,
		},
	],
	journalist: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "photography", label: "写真術" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "nativeLanguage", label: "母国語" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "ほかの言語（英語など）",
			examples: ["英語"],
		},
		{ type: "fixed", skill: "history", label: "歴史" },
	],
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
			label:
				"＋次の技能から１つ選択：言いくるめ、信用、ほかの言語（漢文、ラテン語など）",
			options: [
				{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
				{ type: "fixed", skill: "credit", label: "信用" },
				{
					type: "customizable",
					skill: "otherLanguage",
					label: "ほかの言語（漢文、ラテン語など）",
					examples: ["漢文", "ラテン語"],
				},
			],
			count: 1,
		},
	],
	fishery_worker: [
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "swim", label: "水泳" },
		{
			type: "fixed_specific",
			skill: "pilot",
			label: "操縦（船舶）",
			specification: "船舶",
		},
		{ type: "fixed", skill: "astronomy", label: "天文学" },
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{ type: "fixed", skill: "naturalHistory", label: "博物学" },
		{ type: "fixed", skill: "spot", label: "目星" },
	],
	university_professor: [
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "ほかの言語（英語など）",
			examples: ["英語"],
		},
		{
			type: "choice",
			label:
				"＋次の技能から専門的研究分野として２つ選択：医学、化学、考古学、人類学、生物学、地質学、電子工学、天文学、博物学、物理学、法律、歴史",
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
	adventurer_professor: [
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "jump", label: "跳躍" },
		{ type: "fixed", skill: "climb", label: "登攀" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "customizable", skill: "otherLanguage", label: "ほかの言語" },
		{
			type: "choice",
			label:
				"＋次の技能から専門的研究分野として２つ選択：考古学、地質学、歴史など",
			options: [
				{ type: "fixed", skill: "archaeology", label: "考古学" },
				{ type: "fixed", skill: "geology", label: "地質学" },
				{ type: "fixed", skill: "history", label: "歴史" },
				// 「など」があるので、FreeChoiceSkillを1つ含めることも検討できるが、ここでは明示されたもののみ
			],
			count: 2, // 「など」の部分はプレイヤーがKPと相談して上記以外の知識技能を選べる、という解釈も可
		},
	],
	critic: [
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "nativeLanguage", label: "母国語" },
		{
			type: "choice",
			label:
				"＋次の技能から専門的研究分野として２つ選択：オカルト、博物学、歴史など",
			options: [
				{ type: "fixed", skill: "occult", label: "オカルト" },
				{ type: "fixed", skill: "naturalHistory", label: "博物学" },
				{ type: "fixed", skill: "history", label: "歴史" },
			],
			count: 2,
		},
	],
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
			examples: ["音楽演奏", "歌唱", "ダンス", "演技", "司会"],
		},
		{ type: "fixed", skill: "disguise", label: "変装" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "ほかの言語（英語）",
			examples: ["英語"],
		},
	],
	idol_music_talent: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{
			type: "fixed_specific",
			skill: "art",
			label: "芸術（歌唱）",
			specification: "歌唱",
		},
		{
			type: "fixed_specific",
			skill: "art",
			label: "芸術（ダンス）",
			specification: "ダンス",
		},
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "disguise", label: "変装" },
		{ type: "free_choice", label: "＋個人的な関心のある技能２つ", count: 2 },
	],
	announcer: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{
			type: "fixed_specific",
			skill: "art",
			label: "芸術（アナウンス）",
			specification: "アナウンス",
		},
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "nativeLanguage", label: "母国語" },
		{ type: "free_choice", label: "＋個人的な関心のある技能１つ", count: 1 },
	],
	comedian: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{
			type: "fixed_specific",
			skill: "art",
			label: "芸術（物語）",
			specification: "物語",
		}, // または「話術」など
		{
			type: "fixed_specific",
			skill: "art",
			label: "芸術（演劇）",
			specification: "演劇",
		},
		{ type: "fixed", skill: "disguise", label: "変装" },
		{ type: "free_choice", label: "＋個人的な関心のある技能２つ", count: 2 },
	],
	sports_talent: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{
			type: "fixed_specific",
			skill: "art",
			label: "芸術（演劇）",
			specification: "演劇",
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
		{ type: "other", label: "任意の素手の近接戦技能" }, // punch, kick, grapple などから選択 or その他
		{ type: "free_choice", label: "＋個人的な関心のある技能２つ", count: 2 },
	],
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
	actor: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{
			type: "fixed_specific",
			skill: "drive",
			label: "運転（自動車）",
			specification: "自動車",
		},
		{
			type: "fixed_specific",
			skill: "art",
			label: "芸術（演劇）",
			specification: "演劇",
		},
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "disguise", label: "変装" },
		{ type: "free_choice", label: "＋個人的な関心のある技能２つ", count: 2 },
	],
	producer_manager: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{
			type: "fixed_specific",
			skill: "drive",
			label: "運転（自動車）",
			specification: "自動車",
		},
		{ type: "fixed", skill: "conceal", label: "隠れる" }, // 元は「隠す」hide だが、文脈的に「隠れる」conceal か。要確認。ここでは conceal。
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "sneak", label: "忍び歩き" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "law", label: "法律" },
		{ type: "free_choice", label: "＋個人的な関心のある技能１つ", count: 1 },
	],
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
			label: "ほかの言語（英語、ラテン語など）",
			examples: ["英語", "ラテン語"],
		},
		{ type: "fixed", skill: "history", label: "歴史" },
	],
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
	fortune_teller_spiritualist_medium: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "occult", label: "オカルト" },
		{
			type: "fixed_specific",
			skill: "art",
			label: "芸術（演劇）",
			specification: "演劇",
		},
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "free_choice", label: "＋個人的な関心のある技能１つ", count: 1 },
	],
	dilettante: [
		{
			type: "fixed_specific",
			skill: "drive",
			label: "運転（自動車）",
			specification: "自動車",
		},
		{
			type: "customizable",
			skill: "art",
			label: "芸術（音楽、美術、文学、ダンス、何かのスポーツ）",
			examples: ["音楽", "美術", "文学", "ダンス", "スポーツ"],
		},
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "library", label: "図書館" },
		{ type: "fixed", skill: "law", label: "法律" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "ほかの言語（英語など）",
			examples: ["英語"],
		},
		{
			type: "choice",
			label:
				"＋次の技能から２つ選択：乗馬、写真術、操縦（航空機、船舶）、拳銃、ライフル、ショットガン、武道（任意）",
			options: [
				{ type: "fixed", skill: "ride", label: "乗馬" },
				{ type: "fixed", skill: "photography", label: "写真術" },
				{
					type: "customizable",
					skill: "pilot",
					label: "操縦（航空機、船舶）",
					examples: ["航空機", "船舶"],
				},
				{ type: "fixed", skill: "handgun", label: "拳銃" },
				{ type: "fixed", skill: "rifle", label: "ライフル" },
				{ type: "fixed", skill: "shotgun", label: "ショットガン" },
				{ type: "customizable", skill: "art", label: "芸術（武道：任意）" },
			],
			count: 2,
		},
	],
	driver: [
		{
			type: "customizable",
			skill: "drive",
			label: "運転（自動車、二輪車）",
			examples: ["自動車", "二輪車"],
		},
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "navigate", label: "ナビゲート" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "spot", label: "目星" },
	],
	agriculture_forestry_worker: [
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{
			type: "customizable",
			skill: "craft",
			label: "製作（農作物、畜産、養蜂など）",
			examples: ["農作物", "畜産", "養蜂"],
		},
		{ type: "fixed", skill: "track", label: "追跡" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{ type: "fixed", skill: "naturalHistory", label: "博物学" },
		{
			type: "choice",
			label: "＋次の技能から１つ選択：杖、ライフル、ショットガン、チェーンソー",
			options: [
				{ type: "other", label: "杖" },
				{ type: "fixed", skill: "rifle", label: "ライフル" },
				{ type: "fixed", skill: "shotgun", label: "ショットガン" },
				{ type: "other", label: "チェーンソー" },
			],
			count: 1,
		},
	],
	pilot: [
		// civilian pilot
		{ type: "fixed", skill: "mechanicalRepair", label: "機械修理" },
		{ type: "fixed", skill: "operateHeavyMachinery", label: "重機械操作" },
		{ type: "fixed", skill: "electricalRepair", label: "電気修理" },
		{
			type: "customizable",
			skill: "pilot",
			label:
				"操縦（民間プロペラ機、民間ジェット機、定期旅客機、ジェット戦闘機、ヘリコプター、飛行機）",
			examples: [
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
			label: "ほかの言語（英語、その他）",
			examples: ["英語"],
		},
	],
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
			label: "ほかの言語（英語、その他ビジネス相手の国の言語）",
			examples: ["英語"],
		},
	],
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
			type: "choice",
			label: "芸術 or 製作（ワインの鑑定、料理、裁縫、掃除など）",
			options: [
				{
					type: "customizable",
					skill: "art",
					label: "芸術（ワイン鑑定、料理など）",
					examples: ["ワイン鑑定", "料理"],
				}, // 例を追加
				{
					type: "customizable",
					skill: "craft",
					label: "製作（裁縫、掃除など）",
					examples: ["裁縫", "掃除"],
				}, // 例を追加
			],
			count: 1,
		},
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{ type: "customizable", skill: "otherLanguage", label: "ほかの言語" },
	],
	salesman: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{
			type: "fixed_specific",
			skill: "drive",
			label: "運転（自動車）",
			specification: "自動車",
		},
		{
			type: "fixed_specific",
			skill: "art",
			label: "芸術（演劇）",
			specification: "演劇",
		},
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "free_choice", label: "＋個人的な関心のある技能１つ", count: 1 },
	],
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
			label:
				"＋次の技能から１つ選択：運転（自動車、二輪車）、芸術（ギャンブル）、ほかの言語（英語など）",
			options: [
				{
					type: "customizable",
					skill: "drive",
					label: "運転（自動車、二輪車）",
					examples: ["自動車", "二輪車"],
				},
				{
					type: "fixed_specific",
					skill: "art",
					label: "芸術（ギャンブル）",
					specification: "ギャンブル",
				},
				{
					type: "customizable",
					skill: "otherLanguage",
					label: "ほかの言語（英語など）",
					examples: ["英語"],
				},
			],
			count: 1,
		},
	],
	gang_member: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "hide", label: "隠す" },
		{
			type: "customizable",
			skill: "art",
			label: "芸術（刺青彫り、イカサマ）",
			examples: ["刺青彫り", "イカサマ"],
		},
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{ type: "fixed", skill: "spot", label: "目星" },
		{
			type: "choice",
			label:
				"＋次の技能から２つ選択：隠れる、こぶし/パンチ、キック、組みつき、武道（任意）、日本刀、ナイフ、拳銃",
			options: [
				{ type: "fixed", skill: "conceal", label: "隠れる" },
				{ type: "fixed", skill: "punch", label: "こぶし/パンチ" },
				{ type: "fixed", skill: "kick", label: "キック" },
				{ type: "fixed", skill: "grapple", label: "組みつき" },
				{ type: "customizable", skill: "art", label: "芸術（武道：任意）" },
				{ type: "other", label: "日本刀" },
				{ type: "other", label: "ナイフ" }, // CharacterSkills に knife があれば FixedSkill に
				{ type: "fixed", skill: "handgun", label: "拳銃" },
			],
			count: 2,
		},
	],
	musician: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{
			type: "customizable",
			skill: "art",
			label: "芸術（歌唱、何かの音楽演奏）",
			examples: ["歌唱", "音楽演奏"],
		},
		{
			type: "customizable",
			skill: "craft",
			label: "製作（作詞、作曲）",
			examples: ["作詞", "作曲"],
		},
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "bargain", label: "値切り" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "ほかの言語（英語など）",
			examples: ["英語"],
		},
	],
	mental_therapist: [
		{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
		{
			type: "customizable",
			skill: "art",
			label: "芸術（絵画、音楽演奏、歌唱、アロマなど）",
			examples: ["絵画", "音楽演奏", "歌唱", "アロマ"],
		},
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "psychoanalysis", label: "精神分析" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "law", label: "法律" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "ほかの言語（英語、ドイツ語など）",
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
			label: "ほかの言語（英語、ラテン語、ドイツ語）",
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
		{ type: "customizable", skill: "otherLanguage", label: "ほかの言語" },
		{ type: "free_choice", label: "＋個人的な関心のある技能１つ", count: 1 },
	],
};

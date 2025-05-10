//職業リスト

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
			{ label: "芸術家（基本）", value: "artist_basic" }, // または general_artist など
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
		// labelなし (単独項目)
		options: [{ label: "宗教家", value: "religious_figure" }],
	},
	{
		// labelなし (単独項目)
		options: [{ label: "商店主／店員", value: "shopkeeper_clerk" }],
	},
	{
		// labelなし (単独項目)
		options: [{ label: "私立探偵", value: "private_detective" }],
	},
	{
		// labelなし (単独項目)
		options: [{ label: "水産業従事者", value: "fishery_worker" }],
	},
	{
		// labelなし (単独項目)
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
		// labelなし (単独項目)
		options: [{ label: "ディレッタント", value: "dilettante" }],
	},
	{
		// labelなし (単独項目)
		options: [{ label: "ドライバー", value: "driver" }],
	},
	{
		// labelなし (単独項目)
		options: [{ label: "農林業従事者", value: "agriculture_forestry_worker" }],
	},
	{
		// labelなし (単独項目)
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

// 職業ごとの職業技能マッピング
export const occupationSkillsMap: Record<string, string[]> = {
	医師: [
		"medicine",
		"firstAid",
		"accounting",
		"credit",
		"biology",
		"persuade",
		"pharmacy",
		"otherLanguage",
	],
	アニマルセラピスト: [
		"listen",
		"psychology",
		"psychoanalysis",
		"biology",
		"jump",
		"track",
		"naturalHistory",
	],
	看護師: [
		"chemistry",
		"biology",
		"firstAid",
		"fastTalk",
		"persuade",
		"pharmacy",
		"psychology",
		"spot",
	],
	救急救命士: [
		"medicine",
		"firstAid",
		"chemistry",
		"locksmith",
		"mechanicalRepair",
		"electricalRepair",
		"climb",
	],
	形成外科医: [
		"medicine",
		"firstAid",
		"accounting",
		"psychology",
		"persuade",
		"bargain",
		"pharmacy",
		"otherLanguage",
	],
	精神科医: [
		"medicine",
		"chemistry",
		"psychology",
		"psychoanalysis",
		"biology",
		"persuade",
		"pharmacy",
		"otherLanguage",
	],
	闇医者: [
		"medicine",
		"firstAid",
		"accounting",
		"persuade",
		"law",
		"pharmacy",
		"otherLanguage",
	],
	// 他の職業も同様に追加
};

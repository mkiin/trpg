// 職業リスト
export const OCCUPATIONS = [
	{ value: "doctor", label: "医師" },
	{ value: "engineer", label: "エンジニア" },
	{ value: "fanatic", label: "狂信者" },
	{ value: "police", label: "警察官" },
	{ value: "artist", label: "芸術家" },
	{ value: "antique_researcher", label: "古物研究家" },
	{ value: "computer_technician", label: "コンピューター技術者" },
	{ value: "writer", label: "作家" },
	{ value: "self_defense_force", label: "自衛官" },
	{ value: "journalist", label: "ジャーナリスト" },
	{ value: "religious", label: "宗教家" },
	{ value: "shopkeeper", label: "商店主／店員" },
	{ value: "private_detective", label: "私立探偵" },
	{ value: "fishery_worker", label: "水産業従事者" },
	{ value: "athlete", label: "スポーツ選手" },
	{ value: "professor", label: "大学教授" },
	{ value: "entertainer", label: "タレント" },
	{ value: "parapsychologist", label: "超心理学者" },
	{ value: "dilettante", label: "ディレッタント" },
	{ value: "driver", label: "ドライバー" },
	{ value: "farmer", label: "農林業従事者" },
	{ value: "pilot", label: "パイロット" },
	{ value: "businessman", label: "ビジネスマン" },
	{ value: "lawyer", label: "法律家" },
	{ value: "wanderer", label: "放浪者" },
	{ value: "yakuza", label: "暴力団組員" },
	{ value: "musician", label: "ミュージシャン" },
	{ value: "mental_therapist", label: "メンタルセラピスト" },
] as const;

export type OccupationValue = (typeof OCCUPATIONS)[number]["value"];
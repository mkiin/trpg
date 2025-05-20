// カテゴリの種類
export type SKILL_POINT_ALLOCATION_CATEGORY = "high" | "medium" | "low";

// ラベルの種類
export type SKILL_POINT_ALLOCATION_LABEL = "高" | "中" | "小";

// ラベルからカテゴリの取得を行う型
type GetCategoryFromLabel<L extends SKILL_POINT_ALLOCATION_LABEL> =
	L extends "高"
		? "high"
		: L extends "中"
			? "medium"
			: L extends "小"
				? "low"
				: never;

// ユーザーが設定する、各カテゴリに対応する具体的なポイント数
export type SkillPointAllocationValues = {
	[L in SKILL_POINT_ALLOCATION_LABEL]: {
		category: GetCategoryFromLabel<L>;
		label: L;
		value: string;
	};
}[SKILL_POINT_ALLOCATION_LABEL];

// 初期値として保持するポイント数
export const SKILL_POINT_ALLOCATION_VALUES: SkillPointAllocationValues[] = [
	{ category: "high", label: "高", value: "50" },
	{ category: "medium", label: "中", value: "30" },
	{ category: "low", label: "小", value: "10" },
];

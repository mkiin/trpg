export type SKILL_POINT_ALLOCATION_CATEGORY =
	| "high"
	| "medium"
	| "low"
	| "none";

// ユーザーが設定する、各カテゴリに対応する具体的なポイント数
export type SkillPointAllocationValues = {
	high: number;
	medium: number;
	low: number;
};

// デフォルト/初期値として保持するポイント数
export const DEFAULT_SKILL_POINT_ALLOCATION_VALUES: SkillPointAllocationValues =
	{
		high: 50,
		medium: 30,
		low: 10,
	};

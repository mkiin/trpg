import type {
	Skills,
	Abilities,
	BasicInfo,
	CombatSkills,
	InvestigationSkills,
	ActionSkills,
	NegotiationSkills,
	KnowledgeSkills,
} from "../types/character-sheet-types";
import type { SkillDetails } from "../types/skill-details-types";
import {
	OCCUPATION_SKILL_DISTRIBUTIONS,
	type VariableSkill,
	type SkillDefinition,
	SKILL_NAME_MAP,
} from "../constants/occupation-skill-distributions";
import type { OccupationValue } from "../constants/occupation-lists";

// 技能値の最大値
const MAX_SKILL_VALUE = 80;

// 技能の初期値を定義
const SKILL_INITIAL_VALUES: Skills = {
	combat: {
		dodge: 0, // DEX×2で計算
		kick: 25,
		grapple: 25,
		punch: 50,
		headbutt: 10,
		throw: 25,
		martialArts: 1,
		handgun: 20,
		submachineGun: 15,
		shotgun: 30,
		machineGun: 15,
		rifle: 25,
	},
	investigation: {
		firstAid: 30,
		locksmith: 1,
		hide: 15,
		conceal: 10,
		listen: 25,
		sneak: 10,
		photography: 10,
		psychoanalysis: 1,
		track: 10,
		climb: 40,
		library: 25,
		spot: 25,
	},
	action: {
		drive: 20,
		mechanicalRepair: 20,
		operateHeavyMachinery: 1,
		ride: 5,
		swim: 25,
		craft: 5,
		pilot: 1,
		jump: 25,
		electricalRepair: 10,
		navigate: 10,
		disguise: 1,
	},
	negotiation: {
		fastTalk: 5,
		credit: 15,
		persuade: 15,
		bargain: 5,
		nativeLanguage: 0, // EDU×5で計算
		otherLanguage: 1,
	},
	knowledge: {
		medicine: 5,
		occult: 5,
		chemistry: 1,
		cthulhuMythos: 0,
		art: 5,
		accounting: 10,
		archaeology: 1,
		computer: 1,
		psychology: 5,
		anthropology: 1,
		biology: 1,
		geology: 1,
		electronics: 1,
		astronomy: 1,
		naturalHistory: 10,
		physics: 1,
		law: 5,
		pharmacy: 1,
		history: 20,
	},
};

// 可変技能を解決する
function resolveVariableSkill(skill: VariableSkill): {
	skillName: string;
	detail?: string;
} {
	const random = Math.random() * 100;
	let cumulative = 0;

	for (const option of skill.options) {
		cumulative += option.probability;
		if (random <= cumulative) {
			// 特殊なケース：art、craft、pilot、otherLanguage、driveなど
			if (
				["art", "craft", "pilot", "otherLanguage", "drive"].includes(skill.skillName)
			) {
				return {
					skillName: skill.skillName,
					detail: option.value,
				};
			}
			return {
				skillName: option.value,
			};
		}
	}

	// フォールバック
	if (
		["art", "craft", "pilot", "otherLanguage", "drive"].includes(skill.skillName)
	) {
		return {
			skillName: skill.skillName,
			detail: skill.options[0].value,
		};
	}
	return {
		skillName: skill.options[0].value,
	};
}

// 技能名からカテゴリとキーを取得
function getSkillCategoryAndKey(skillName: string): {
	category: keyof Skills;
	key: string;
} | null {
	const categories: Array<keyof Skills> = [
		"combat",
		"investigation",
		"action",
		"negotiation",
		"knowledge",
	];

	for (const category of categories) {
		if (skillName in SKILL_INITIAL_VALUES[category]) {
			return { category, key: skillName };
		}
	}

	return null;
}

// 職業技能ポイントを配分
export function allocateVocationalSkillPoints(
	occupation: OccupationValue,
	vocationalSkillPoints: number,
	abilities: Abilities,
): { skills: Partial<Skills>; skillDetails: SkillDetails } {
	const distribution = OCCUPATION_SKILL_DISTRIBUTIONS[occupation];
	if (!distribution) {
		console.warn(`職業 ${occupation} の技能配分が定義されていません`);
		return { skills: {}, skillDetails: {} };
	}

	const allocatedSkills: Partial<Skills> = JSON.parse(
		JSON.stringify(SKILL_INITIAL_VALUES),
	);
	const skillDetails: SkillDetails = {};

	// 回避とnativeLanguageの初期値を設定
	if (allocatedSkills.combat) {
		allocatedSkills.combat.dodge = abilities.dexterity * 2;
	}
	if (allocatedSkills.negotiation) {
		allocatedSkills.negotiation.nativeLanguage = abilities.education * 5;
	}

	let totalOverflow = 0;

	// 必須技能（各20%）
	const essentialPoints = Math.floor(vocationalSkillPoints * 0.2);
	for (const skill of distribution.essential) {
		const overflow = allocatePointsWithDetails(allocatedSkills, skill, essentialPoints, skillDetails);
		totalOverflow += overflow;
	}

	// 推奨技能（各15%）
	const recommendedPoints = Math.floor(vocationalSkillPoints * 0.15);
	for (const skill of distribution.recommended) {
		const overflow = allocatePointsWithDetails(allocatedSkills, skill, recommendedPoints, skillDetails);
		totalOverflow += overflow;
	}

	// 基本技能（各5%）
	const basicPoints = Math.floor(vocationalSkillPoints * 0.05);
	for (const skill of distribution.basic) {
		const overflow = allocatePointsWithDetails(allocatedSkills, skill, basicPoints, skillDetails);
		totalOverflow += overflow;
	}

	// オーバーフローポイントがある場合、他の技能に再配分
	if (totalOverflow > 0) {
		// 必須→推奨→基本の順で再配分を試行
		const allSkills = [...distribution.essential, ...distribution.recommended, ...distribution.basic];
		redistributeOverflowPoints(allocatedSkills, skillDetails, totalOverflow, allSkills);
	}

	return { skills: allocatedSkills, skillDetails };
}

// 興味技能ポイントを配分
export function allocateHobbySkillPoints(
	occupation: OccupationValue,
	hobbySkillPoints: number,
	_basicInfo: BasicInfo,
	currentSkills: Partial<Skills>,
): Partial<Skills> {
	const distribution = OCCUPATION_SKILL_DISTRIBUTIONS[occupation];
	if (!distribution) {
		return currentSkills;
	}

	const allocatedSkills = JSON.parse(JSON.stringify(currentSkills));
	let totalOverflow = 0;
	const redistributionSkills: string[] = [];

	// 弱点補完技能1（40%）
	const weakness1Points = Math.floor(hobbySkillPoints * 0.4);
	if (distribution.weaknesses.severe.length > 0) {
		const selectedSkill =
			distribution.weaknesses.severe[
				Math.floor(Math.random() * distribution.weaknesses.severe.length)
			];
		const overflow = allocatePoints(allocatedSkills, selectedSkill, weakness1Points);
		totalOverflow += overflow;
		redistributionSkills.push(...distribution.weaknesses.severe);
	}

	// 弱点補完技能2（40%）
	const weakness2Points = Math.floor(hobbySkillPoints * 0.4);
	if (distribution.weaknesses.moderate.length > 0) {
		const selectedSkill =
			distribution.weaknesses.moderate[
				Math.floor(Math.random() * distribution.weaknesses.moderate.length)
			];
		const overflow = allocatePoints(allocatedSkills, selectedSkill, weakness2Points);
		totalOverflow += overflow;
		redistributionSkills.push(...distribution.weaknesses.moderate);
	}

	// 背景関連技能（20%）
	const backgroundPoints = Math.floor(hobbySkillPoints * 0.2);
	// ここではランダムに選択（実際はAIで背景に基づいて選択すべき）
	const allSkills = Object.entries(SKILL_NAME_MAP).map(([key]) => key);
	const randomSkill = allSkills[Math.floor(Math.random() * allSkills.length)];
	const backgroundOverflow = allocatePoints(allocatedSkills, randomSkill, backgroundPoints);
	totalOverflow += backgroundOverflow;
	redistributionSkills.push(...allSkills);

	// オーバーフローポイントがある場合、他の技能に再配分
	if (totalOverflow > 0) {
		// 利用可能な全ての技能から再配分
		const allAvailableSkills = [...new Set(redistributionSkills)]; // 重複を除去
		redistributeOverflowPoints(allocatedSkills, {}, totalOverflow, allAvailableSkills);
	}

	return allocatedSkills;
}


// オーバーフローポイントを他の技能に再配分する関数
function redistributeOverflowPoints(
	skills: Partial<Skills>,
	_skillDetails: SkillDetails,
	overflowPoints: number,
	skillList: SkillDefinition[],
): void {
	if (overflowPoints <= 0) return;

	// 配分可能な技能をシャッフルして順序をランダム化
	const shuffledSkills = [...skillList].sort(() => Math.random() - 0.5);
	let remainingPoints = overflowPoints;

	for (const skillDef of shuffledSkills) {
		if (remainingPoints <= 0) break;

		let skillName: string;
		if (typeof skillDef === "string") {
			skillName = skillDef;
		} else {
			const resolved = resolveVariableSkill(skillDef);
			skillName = resolved.skillName;
		}

		const categoryAndKey = getSkillCategoryAndKey(skillName);
		if (!categoryAndKey) continue;

		const { category, key } = categoryAndKey;
		
		// 現在の値を取得
		let currentValue = 0;
		if (category === "combat" && skills.combat) {
			const combatKey = key as keyof CombatSkills;
			currentValue = skills.combat[combatKey] || 0;
		} else if (category === "investigation" && skills.investigation) {
			const investigationKey = key as keyof InvestigationSkills;
			currentValue = skills.investigation[investigationKey] || 0;
		} else if (category === "action" && skills.action) {
			const actionKey = key as keyof ActionSkills;
			currentValue = skills.action[actionKey] || 0;
		} else if (category === "negotiation" && skills.negotiation) {
			const negotiationKey = key as keyof NegotiationSkills;
			currentValue = skills.negotiation[negotiationKey] || 0;
		} else if (category === "knowledge" && skills.knowledge) {
			const knowledgeKey = key as keyof KnowledgeSkills;
			currentValue = skills.knowledge[knowledgeKey] || 0;
		}

		// まだ配分可能な場合のみ配分
		if (currentValue < MAX_SKILL_VALUE) {
			const maxAllowablePoints = MAX_SKILL_VALUE - currentValue;
			const pointsToAllocate = Math.min(remainingPoints, maxAllowablePoints);
			
			// 再帰的にallocatePointsWithDetailsを呼ばず、直接値を更新
			if (category === "combat" && skills.combat) {
				const combatKey = key as keyof CombatSkills;
				skills.combat[combatKey] = currentValue + pointsToAllocate;
			} else if (category === "investigation" && skills.investigation) {
				const investigationKey = key as keyof InvestigationSkills;
				skills.investigation[investigationKey] = currentValue + pointsToAllocate;
			} else if (category === "action" && skills.action) {
				const actionKey = key as keyof ActionSkills;
				skills.action[actionKey] = currentValue + pointsToAllocate;
			} else if (category === "negotiation" && skills.negotiation) {
				const negotiationKey = key as keyof NegotiationSkills;
				skills.negotiation[negotiationKey] = currentValue + pointsToAllocate;
			} else if (category === "knowledge" && skills.knowledge) {
				const knowledgeKey = key as keyof KnowledgeSkills;
				skills.knowledge[knowledgeKey] = currentValue + pointsToAllocate;
			}

			remainingPoints -= pointsToAllocate;
		}
	}
}

// ポイントを配分する補助関数（詳細情報付き）
function allocatePointsWithDetails(
	skills: Partial<Skills>,
	skillDef: SkillDefinition,
	points: number,
	skillDetails: SkillDetails,
): number {
	let skillName: string;
	let detail: string | undefined;

	if (typeof skillDef === "string") {
		skillName = skillDef;
	} else {
		// 可変技能の場合
		const resolved = resolveVariableSkill(skillDef);
		skillName = resolved.skillName;
		detail = resolved.detail;

		// 詳細情報をskillDetailsに保存
		if (detail) {
			if (skillName === "drive") {
				skillDetails.drive = detail;
			} else if (skillName === "pilot") {
				skillDetails.pilot = detail;
			} else if (skillName === "art") {
				skillDetails.art = detail;
			} else if (skillName === "craft") {
				skillDetails.craft = detail;
			} else if (skillName === "otherLanguage") {
				skillDetails.otherLanguage = detail;
			}
		}
	}

	const categoryAndKey = getSkillCategoryAndKey(skillName);
	if (!categoryAndKey) {
		console.warn(`技能 ${skillName} が見つかりません`);
		return 0;
	}

	const { category, key } = categoryAndKey;
	if (!skills[category]) {
		// カテゴリごとに適切な初期値を設定
		if (category === "combat") {
			skills[category] = { ...SKILL_INITIAL_VALUES.combat };
		} else if (category === "investigation") {
			skills[category] = { ...SKILL_INITIAL_VALUES.investigation };
		} else if (category === "action") {
			skills[category] = { ...SKILL_INITIAL_VALUES.action };
		} else if (category === "negotiation") {
			skills[category] = { ...SKILL_INITIAL_VALUES.negotiation };
		} else if (category === "knowledge") {
			skills[category] = { ...SKILL_INITIAL_VALUES.knowledge };
		}
	}

	// 現在の値を取得し、80を超えないように調整
	let currentValue = 0;
	if (category === "combat" && skills.combat) {
		const combatKey = key as keyof CombatSkills;
		currentValue = skills.combat[combatKey] || 0;
	} else if (category === "investigation" && skills.investigation) {
		const investigationKey = key as keyof InvestigationSkills;
		currentValue = skills.investigation[investigationKey] || 0;
	} else if (category === "action" && skills.action) {
		const actionKey = key as keyof ActionSkills;
		currentValue = skills.action[actionKey] || 0;
	} else if (category === "negotiation" && skills.negotiation) {
		const negotiationKey = key as keyof NegotiationSkills;
		currentValue = skills.negotiation[negotiationKey] || 0;
	} else if (category === "knowledge" && skills.knowledge) {
		const knowledgeKey = key as keyof KnowledgeSkills;
		currentValue = skills.knowledge[knowledgeKey] || 0;
	}

	// 最大値チェック
	const maxAllowablePoints = MAX_SKILL_VALUE - currentValue;
	const actualPoints = Math.min(points, maxAllowablePoints);
	const overflowPoints = points - actualPoints;

	// 実際に加算
	if (category === "combat" && skills.combat) {
		const combatKey = key as keyof CombatSkills;
		skills.combat[combatKey] = currentValue + actualPoints;
	} else if (category === "investigation" && skills.investigation) {
		const investigationKey = key as keyof InvestigationSkills;
		skills.investigation[investigationKey] = currentValue + actualPoints;
	} else if (category === "action" && skills.action) {
		const actionKey = key as keyof ActionSkills;
		skills.action[actionKey] = currentValue + actualPoints;
	} else if (category === "negotiation" && skills.negotiation) {
		const negotiationKey = key as keyof NegotiationSkills;
		skills.negotiation[negotiationKey] = currentValue + actualPoints;
	} else if (category === "knowledge" && skills.knowledge) {
		const knowledgeKey = key as keyof KnowledgeSkills;
		skills.knowledge[knowledgeKey] = currentValue + actualPoints;
	}

	return overflowPoints;
}

// 完全な技能セットを生成
export function generateSkills(
	occupation: OccupationValue,
	abilities: Abilities,
	basicInfo: BasicInfo,
): { skills: Skills; skillDetails: SkillDetails } {
	// 職業技能ポイントを配分
	const vocationalResult = allocateVocationalSkillPoints(
		occupation,
		abilities.vocationalSkillPoints,
		abilities,
	);

	// 興味技能ポイントを配分
	const finalSkills = allocateHobbySkillPoints(
		occupation,
		abilities.hobbySkillPoints,
		basicInfo,
		vocationalResult.skills,
	);

	// 完全なSkillsオブジェクトを返す
	return {
		skills: finalSkills as Skills,
		skillDetails: vocationalResult.skillDetails,
	};
}

// ポイントを配分する補助関数（詳細情報なし、後方互換性のため）
function allocatePoints(
	skills: Partial<Skills>,
	skillDef: SkillDefinition,
	points: number,
): number {
	let skillName: string;

	if (typeof skillDef === "string") {
		skillName = skillDef;
	} else {
		// 可変技能の場合
		const resolved = resolveVariableSkill(skillDef);
		skillName = resolved.skillName;
	}

	const categoryAndKey = getSkillCategoryAndKey(skillName);
	if (!categoryAndKey) {
		console.warn(`技能 ${skillName} が見つかりません`);
		return 0;
	}

	const { category, key } = categoryAndKey;
	if (!skills[category]) {
		// カテゴリごとに適切な初期値を設定
		if (category === "combat") {
			skills[category] = { ...SKILL_INITIAL_VALUES.combat };
		} else if (category === "investigation") {
			skills[category] = { ...SKILL_INITIAL_VALUES.investigation };
		} else if (category === "action") {
			skills[category] = { ...SKILL_INITIAL_VALUES.action };
		} else if (category === "negotiation") {
			skills[category] = { ...SKILL_INITIAL_VALUES.negotiation };
		} else if (category === "knowledge") {
			skills[category] = { ...SKILL_INITIAL_VALUES.knowledge };
		}
	}

	// 現在の値を取得し、80を超えないように調整
	let currentValue = 0;
	if (category === "combat" && skills.combat) {
		const combatKey = key as keyof CombatSkills;
		currentValue = skills.combat[combatKey] || 0;
	} else if (category === "investigation" && skills.investigation) {
		const investigationKey = key as keyof InvestigationSkills;
		currentValue = skills.investigation[investigationKey] || 0;
	} else if (category === "action" && skills.action) {
		const actionKey = key as keyof ActionSkills;
		currentValue = skills.action[actionKey] || 0;
	} else if (category === "negotiation" && skills.negotiation) {
		const negotiationKey = key as keyof NegotiationSkills;
		currentValue = skills.negotiation[negotiationKey] || 0;
	} else if (category === "knowledge" && skills.knowledge) {
		const knowledgeKey = key as keyof KnowledgeSkills;
		currentValue = skills.knowledge[knowledgeKey] || 0;
	}

	// 最大値チェック
	const maxAllowablePoints = MAX_SKILL_VALUE - currentValue;
	const actualPoints = Math.min(points, maxAllowablePoints);
	const overflowPoints = points - actualPoints;

	// 実際に加算
	if (category === "combat" && skills.combat) {
		const combatKey = key as keyof CombatSkills;
		skills.combat[combatKey] = currentValue + actualPoints;
	} else if (category === "investigation" && skills.investigation) {
		const investigationKey = key as keyof InvestigationSkills;
		skills.investigation[investigationKey] = currentValue + actualPoints;
	} else if (category === "action" && skills.action) {
		const actionKey = key as keyof ActionSkills;
		skills.action[actionKey] = currentValue + actualPoints;
	} else if (category === "negotiation" && skills.negotiation) {
		const negotiationKey = key as keyof NegotiationSkills;
		skills.negotiation[negotiationKey] = currentValue + actualPoints;
	} else if (category === "knowledge" && skills.knowledge) {
		const knowledgeKey = key as keyof KnowledgeSkills;
		skills.knowledge[knowledgeKey] = currentValue + actualPoints;
	}

	return overflowPoints;
}

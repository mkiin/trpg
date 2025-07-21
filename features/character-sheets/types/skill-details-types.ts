import type { BasicInfo, Abilities, Skills } from "./character-sheet-types";

// 技能の詳細情報を格納する型
export interface SkillDetails {
	drive?: string; // 運転の対象（自動車、バイクなど）
	pilot?: string; // 操縦の対象（船舶、飛行機など）
	art?: string; // 芸術の分野（絵画、音楽など）
	craft?: string; // 製作の対象（工芸品、料理など）
	otherLanguage?: string; // 他の言語の種類（英語、中国語など）
}

// 完全なキャラクターシート（技能詳細付き）
export interface CharacterSheetWithDetails {
	basic: BasicInfo;
	ability: Abilities;
	skills: Skills;
	skillDetails: SkillDetails;
}
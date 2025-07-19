// 基本情報
export interface BasicInfo {
	name: string;
	occupation: string;
	age: number;
	gender: "man" | "woman" | "else";
	height: number;
	weight: number;
	birthplace: string;
	background: string;
	behavior: string;
}

// 能力値
export interface Abilities {
	strength: number;
	constitution: number;
	power: number;
	dexterity: number;
	appearance: number;
	size: number;
	intelligence: number;
	education: number;
	san: number;
	fortune: number;
	idea: number;
	knowledge: number;
	durability: number;
	magicPoint: number;
	vocationalSkillPoints: number;
	hobbySkillPoints: number;
	damageBonus: number;
}

// 技能
export interface Skills {
	combat: CombatSkills;
	investigation: InvestigationSkills;
	action: ActionSkills;
	negotiation: NegotiationSkills;
	knowledge: KnowledgeSkills;
}

export interface CombatSkills {
	dodge: number;
	kick: number;
	grapple: number;
	punch: number;
	headbutt: number;
	throw: number;
	martialArts: number;
	handgun: number;
	submachineGun: number;
	shotgun: number;
	machineGun: number;
	rifle: number;
}

export interface InvestigationSkills {
	firstAid: number;
	locksmith: number;
	hide: number;
	conceal: number;
	listen: number;
	sneak: number;
	photography: number;
	psychoanalysis: number;
	track: number;
	climb: number;
	library: number;
	spot: number;
}

export interface ActionSkills {
	drive: number;
	mechanicalRepair: number;
	operateHeavyMachinery: number;
	ride: number;
	swim: number;
	craft: number;
	pilot: number;
	jump: number;
	electricalRepair: number;
	navigate: number;
	disguise: number;
}

export interface NegotiationSkills {
	fastTalk: number;
	credit: number;
	persuade: number;
	bargain: number;
	nativeLanguage: number;
	otherLanguage: number;
}

export interface KnowledgeSkills {
	medicine: number;
	occult: number;
	chemistry: number;
	cthulhuMythos: number;
	art: number;
	accounting: number;
	archaeology: number;
	computer: number;
	psychology: number;
	anthropology: number;
	biology: number;
	geology: number;
	electronics: number;
	astronomy: number;
	naturalHistory: number;
	physics: number;
	law: number;
	pharmacy: number;
	history: number;
}

// 完全なキャラクターシート
export interface CharacterSheet {
	basic: BasicInfo;
	ability: Abilities;
	skills: Skills;
}

// フォーム用の型
export interface CharacterGenerationFormData {
	occupation: string;
}

// 職業の技能配分
export interface OccupationSkillDistribution {
	essential: string[]; // 必須技能（各20%）
	recommended: string[]; // 推奨技能（各15%）
	basic: string[]; // 基本技能（各5%）
	weaknesses: {
		severe: string[]; // 重度弱点分野
		moderate: string[]; // 軽度弱点分野
	};
}
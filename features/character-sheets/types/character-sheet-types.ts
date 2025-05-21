// キャラクターシートの型定義

import { OccupationValue } from "../constants/occupation-lists";

// 基本情報
export type CharacterBasicInfo = {
	name: string;
	height: number;
	weight: number;
	birthplace: string;
	background: string;
	behavior: string;
} & CharacterBasicInfoForm;

// 基本情報のフォーム入力
export type CharacterBasicInfoForm = {
	occupation: OccupationValue;
	age: number;
	gender: "man" | "woman" | "else";
};

// 能力値
export type CharacterAbilities = {
	// ダイスにより決定するもの
	strength: number; // 筋力 (3d6)
	constitution: number; // 体力 (3d6)
	power: number; // 精神力 (3d6)
	dexterity: number; // 機敏 (3d6)
	appearance: number; // 外見的な魅力 (3d6)
	size: number; // 体格 (2d6+6)
	intelligence: number; // 知性 (2d6+6)
	education: number; // 教養 (3d6+3)

	// 計算されるパラメータ
	san: number; // 正気度 (power * 5)
	fortune: number; // 幸運 (power * 5)
	idea: number; // アイデア (intelligence * 5)
	knowledge: number; // 知識 (education * 5)
	durability: number; // 耐久力 ((constitution + size) / 2)
	magicPoint: number; // マジックポイント (power * 1)
	vocationalSkillPoints: number; // 職業技能ポイント (education * 20)
	hobbySkillPoints: number; // 趣味技能ポイント (intelligence * 10)
	damageBonus: number; // ダメージボーナス (strength + size)
};

// 技能
export type CharacterSkills = {
	// 戦闘技能
	combat: {
		dodge: number; // 回避 (DEX×2%)
		kick: number; // キック (25)
		grapple: number; // 組付き (25)
		punch: number; // こぶし(パンチ) (50)
		headbutt: number; // 頭突き (10)
		throw: number; // 投擲 (25)
		martialArts: number; // マーシャルアーツ (1)
		handgun: number; // 拳銃 (20)
		submachineGun: number; // サブマシンガン (15)
		shotgun: number; // ショットガン (30)
		machineGun: number; // マシンガン (15)
		rifle: number; // ライフル (25)
	};

	// 探索技能
	investigation: {
		firstAid: number; // 応急手当 (30)
		locksmith: number; // 鍵開け (1)
		hide: number; // 隠す (15)
		conceal: number; // 隠れる (10)
		listen: number; // 聞き耳 (25)
		sneak: number; // 忍び歩き (10)
		photography: number; // 写真術 (10)
		psychoanalysis: number; // 精神分析 (1)
		track: number; // 追跡 (10)
		climb: number; // 登攀 (40)
		library: number; // 図書館 (25)
		spot: number; // 目星 (25)
	};

	// 行動技能
	action: {
		drive: {
			label: string;
			customString: string;
			value: number;
		}; // 運転 (20)
		mechanicalRepair: number; // 機械修理 (20)
		operateHeavyMachinery: number; // 重機械操作 (1)
		ride: number; // 乗馬 (5)
		swim: number; // 水泳 (25)
		craft: {
			label: string;
			customString: string;
			value: number;
		}; // 製作 (5)
		pilot: {
			label: string;
			customString: string;
			value: number;
		}; // 操縦 (1)
		jump: number; // 跳躍 (25)
		electricalRepair: number; // 電気修理 (10)
		navigate: number; // ナビゲート (10)
		disguise: number; // 変装 (1)
	};

	// 交渉技能
	negotiation: {
		fastTalk: number; // 言いくるめ (5)
		credit: number; // 信用 (15)
		persuade: number; // 説得 (15)
		bargain: number; // 値切り (5)
		nativeLanguage: {
			label: string;
			customString: string;
			value: number;
		};
	};

	// 知識技能
	knowledge: {
		medicine: number; // 医学 (5)
		occult: number; // オカルト (5)
		chemistry: number; // 化学 (1)
		cthulhuMythos: number; // クトゥルフ神話 (0)
		art: {
			label: string;
			customString: string;
			value: number;
		}; // 芸術 (5)
		accounting: number; // 経理 (10)
		archaeology: number; // 考古学 (1)
		computer: number; // コンピュータ (1)
		psychology: number; // 心理学 (5)
		anthropology: number; // 人類学 (1)
		biology: number; // 生物学 (1)
		geology: number; // 地質学 (1)
		electronics: number; // 電子工学 (1)
		astronomy: number; // 天文学 (1)
		naturalHistory: number; // 博物学 (10)
		physics: number; // 物理学 (1)
		law: number; // 法律 (5)
		pharmacy: number; // 薬学 (1)
		history: number; // 歴史 (20)
	};
	other: Array<{ skill: string; value: number }>;
};

// キャラクターシート全体
export type CharacterSheet = {
	id: string;
	basicInfo: CharacterBasicInfo;
	abilities: CharacterAbilities;
	skills: CharacterSkills;
	createdAt: Date;
	updatedAt: Date;
};

// フォームのステップ
export enum CharacterSheetStep {
	BASIC_INFO = 1,
	ABILITIES = 2,
	SKILLS = 3,
	RESULT = 4,
}

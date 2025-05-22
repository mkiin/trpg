import { CharacterSkills } from "../types/character-sheet-types";
import { SkillKey } from "./occupation-lists";

type SkillCategory = Exclude<keyof CharacterSkills, "other">;

type SkillListDetail = {
	skill: SkillKey;
	label: string;
};

type SkillList = {
	readonly [CategoryKey in SkillCategory]: ReadonlyArray<SkillListDetail>;
};

// スキルカテゴリから対応するラベル名を取得する型関数
type GetLabelFromCategory<L extends SkillCategory> = L extends "combat"
	? "戦闘技能"
	: L extends "investigation"
		? "探索技能"
		: L extends "action"
			? "行動技能"
			: L extends "negotiation"
				? "交渉技能"
				: L extends "knowledge"
					? "知識技能"
					: never;

type SkillCategoryList = {
	readonly [category in SkillCategory]: {
		category: category;
		label: GetLabelFromCategory<category>;
	};
}[SkillCategory];

// スキルのカテゴリをリストで定義
export const SKILL_CATEGORY_LIST = [
	{ category: "combat", label: "戦闘技能" },
	{ category: "investigation", label: "探索技能" },
	{ category: "action", label: "行動技能" },
	{ category: "negotiation", label: "交渉技能" },
	{ category: "knowledge", label: "知識技能" },
] as const satisfies SkillCategoryList[];

// 全スキルを種類ごとに定義
// labelはUI表示に使用
export const SKILL_LIST = {
	combat: [
		{ skill: "dodge", label: "回避" },
		{ skill: "kick", label: "キック" },
		{ skill: "grapple", label: "組みつき" },
		{ skill: "punch", label: "こぶし(パンチ)" },
		{ skill: "headbutt", label: "頭突き" },
		{ skill: "throw", label: "投擲" },
		{ skill: "staff", label: "杖" },
		{ skill: "knife", label: "ナイフ" },
		{ skill: "naginata", label: "薙刀" },
		{ skill: "katana", label: "刀" },
		{ skill: "budo", label: "武道" },
		{ skill: "martialArts", label: "マーシャルアーツ" },
		{ skill: "handgun", label: "拳銃" },
		{ skill: "submachineGun", label: "サブマシンガン" },
		{ skill: "shotgun", label: "ショットガン" },
		{ skill: "machineGun", label: "マシンガン" },
		{ skill: "rifle", label: "ライフル" },
		{ skill: "competitionArchery", label: "競技用アーチェリー" },
		{ skill: "cannon", label: "砲" },
		{ skill: "bow", label: "弓" },
	],
	investigation: [
		{ skill: "firstAid", label: "応急手当" },
		{ skill: "locksmith", label: "鍵開け" },
		{ skill: "hide", label: "隠す" },
		{ skill: "conceal", label: "隠れる" },
		{ skill: "listen", label: "聞き耳" },
		{ skill: "sneak", label: "忍び歩き" },
		{ skill: "photography", label: "写真術" },
		{ skill: "psychoanalysis", label: "精神分析" },
		{ skill: "track", label: "追跡" },
		{ skill: "climb", label: "登攀" },
		{ skill: "library", label: "図書館" },
		{ skill: "spot", label: "目星 " },
	],
	action: [
		{ skill: "drive", label: "運転" },
		{ skill: "mechanicalRepair", label: "機械修理" },
		{ skill: "operateHeavyMachinery", label: "重機械操作" },
		{ skill: "ride", label: "乗馬" },
		{ skill: "swim", label: "水泳" },
		{ skill: "craft", label: "製作" },
		{ skill: "pilot", label: "操縦" },
		{ skill: "jump", label: "跳躍" },
		{ skill: "electricalRepair", label: "電気修理" },
		{ skill: "navigate", label: "ナビゲート" },
		{ skill: "disguise", label: "変装" },
		{ skill: "survival", label: "サバイバル" },
	],
	negotiation: [
		{ skill: "fastTalk", label: "言いくるめ" },
		{ skill: "credit", label: "信用" },
		{ skill: "persuade", label: "説得" },
		{ skill: "bargain", label: "値切り" },
		{ skill: "nativeLanguage", label: "母国語" },
	],
	knowledge: [
		{ skill: "medicine", label: "医学" },
		{ skill: "occult", label: "オカルト" },
		{ skill: "chemistry", label: "化学" },
		{ skill: "cthulhuMythos", label: "クトゥルフ神話" },
		{ skill: "art", label: "芸術" },
		{ skill: "accounting", label: "経理" },
		{ skill: "archaeology", label: "考古学" },
		{ skill: "computer", label: "コンピュータ" },
		{ skill: "psychology", label: "心理学" },
		{ skill: "anthropology", label: "人類学" },
		{ skill: "biology", label: "生物学" },
		{ skill: "geology", label: "地質学" },
		{ skill: "electronics", label: "電子工学" },
		{ skill: "astronomy", label: "天文学" },
		{ skill: "naturalHistory", label: "博物学" },
		{ skill: "physics", label: "物理学" },
		{ skill: "law", label: "法律" },
		{ skill: "pharmacy", label: "薬学" },
		{ skill: "history", label: "歴史" },
	],
} as const satisfies SkillList;

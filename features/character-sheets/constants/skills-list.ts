import { CharacterSkills } from "../types/character-sheet-types";
import { SkillKey } from "../types/character-sheet-types";

type SkillCategory = Exclude<keyof CharacterSkills, "other">;

type SkillListDetail = {
	id: SkillKey;
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
		{ id: "dodge", label: "回避" },
		{ id: "kick", label: "キック" },
		{ id: "grapple", label: "組みつき" },
		{ id: "punch", label: "こぶし(パンチ)" },
		{ id: "headbutt", label: "頭突き" },
		{ id: "throw", label: "投擲" },
		{ id: "staff", label: "杖" },
		{ id: "knife", label: "ナイフ" },
		{ id: "naginata", label: "薙刀" },
		{ id: "katana", label: "刀" },
		{ id: "budo", label: "武道" },
		{ id: "martialArts", label: "マーシャルアーツ" },
		{ id: "handgun", label: "拳銃" },
		{ id: "submachineGun", label: "サブマシンガン" },
		{ id: "shotgun", label: "ショットガン" },
		{ id: "machineGun", label: "マシンガン" },
		{ id: "rifle", label: "ライフル" },
		{ id: "competitionArchery", label: "競技用アーチェリー" },
		{ id: "cannon", label: "砲" },
		{ id: "bow", label: "弓" },
	],
	investigation: [
		{ id: "firstAid", label: "応急手当" },
		{ id: "locksmith", label: "鍵開け" },
		{ id: "hide", label: "隠す" },
		{ id: "conceal", label: "隠れる" },
		{ id: "listen", label: "聞き耳" },
		{ id: "sneak", label: "忍び歩き" },
		{ id: "photography", label: "写真術" },
		{ id: "psychoanalysis", label: "精神分析" },
		{ id: "track", label: "追跡" },
		{ id: "climb", label: "登攀" },
		{ id: "library", label: "図書館" },
		{ id: "spot", label: "目星 " },
	],
	action: [
		{ id: "drive", label: "運転" },
		{ id: "mechanicalRepair", label: "機械修理" },
		{ id: "operateHeavyMachinery", label: "重機械操作" },
		{ id: "ride", label: "乗馬" },
		{ id: "swim", label: "水泳" },
		{ id: "craft", label: "製作" },
		{ id: "pilot", label: "操縦" },
		{ id: "jump", label: "跳躍" },
		{ id: "electricalRepair", label: "電気修理" },
		{ id: "navigate", label: "ナビゲート" },
		{ id: "disguise", label: "変装" },
		{ id: "survival", label: "サバイバル" },
	],
	negotiation: [
		{ id: "fastTalk", label: "言いくるめ" },
		{ id: "credit", label: "信用" },
		{ id: "persuade", label: "説得" },
		{ id: "bargain", label: "値切り" },
		{ id: "nativeLanguage", label: "母国語" },
	],
	knowledge: [
		{ id: "medicine", label: "医学" },
		{ id: "occult", label: "オカルト" },
		{ id: "chemistry", label: "化学" },
		{ id: "cthulhuMythos", label: "クトゥルフ神話" },
		{ id: "art", label: "芸術" },
		{ id: "accounting", label: "経理" },
		{ id: "archaeology", label: "考古学" },
		{ id: "computer", label: "コンピュータ" },
		{ id: "psychology", label: "心理学" },
		{ id: "anthropology", label: "人類学" },
		{ id: "biology", label: "生物学" },
		{ id: "geology", label: "地質学" },
		{ id: "electronics", label: "電子工学" },
		{ id: "astronomy", label: "天文学" },
		{ id: "naturalHistory", label: "博物学" },
		{ id: "physics", label: "物理学" },
		{ id: "law", label: "法律" },
		{ id: "pharmacy", label: "薬学" },
		{ id: "history", label: "歴史" },
	],
} as const satisfies SkillList;

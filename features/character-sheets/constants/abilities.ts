import { JSX } from "react";
import { CharacterAbilities } from "../types/character-sheet-types";

type AbilitiesKey = keyof CharacterAbilities;

type AbilitiesInfoItem = {
	id: AbilitiesKey;
	label: string;
	shortLabel: string;
	colSpan?: 1 | 2;
	displayFormatter?: (value: number) => string | JSX.Element;
};

type AbilitiesInfo = {
	basic: AbilitiesInfoItem[];
	derived: AbilitiesInfoItem[];
};

// 能力値を表示するコンポーネントで使用
export type AbilityDisplayItemProps = {
	label: string;
	shortLabel: string;
	value: string | number | JSX.Element;
	colSpan?: 1 | 2;
};

// 能力値の情報をまとめた定数
export const ABILITIES_INFO: AbilitiesInfo = {
	basic: [
		{ id: "strength", label: "筋力", shortLabel: "STR" },
		{ id: "constitution", label: "体力", shortLabel: "CON" },
		{ id: "power", label: "精神力", shortLabel: "POW" },
		{ id: "dexterity", label: "機敏", shortLabel: "DEX" },
		{ id: "appearance", label: "外見", shortLabel: "APP" },
		{ id: "size", label: "体格", shortLabel: "SIZ" },
		{ id: "intelligence", label: "知性", shortLabel: "INT" },
		{ id: "education", label: "教養", shortLabel: "EDU" },
	],
	derived: [
		{ id: "san", label: "正気度", shortLabel: "SAN" },
		{ id: "fortune", label: "幸運", shortLabel: "LUCK" },
		{ id: "idea", label: "アイデア", shortLabel: "IDEA" },
		{ id: "knowledge", label: "知識", shortLabel: "KNOW" },
		{ id: "durability", label: "耐久力", shortLabel: "HP" },
		{ id: "magicPoint", label: "マジックポイント", shortLabel: "MP" }, // shortLabelなし
		{
			id: "damageBonus",
			label: "ダメージボーナス",
			shortLabel: "DB",
			colSpan: 2,
			displayFormatter: (value) => (value <= 0 ? "なし" : `+${value}D4`),
		},
	],
};

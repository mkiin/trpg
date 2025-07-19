"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { basicInfoSchema } from "../types/schemas/basic-info-schema";
import type { Abilities, BasicInfo } from "../types/character-sheet-types";
import { OCCUPATIONS } from "../constants/occupation-lists";
import { createCharacterBasicInfoPrompt } from "../constants/character-sheet-prompts";

// ダイスロール関数
function rollDice(count: number, sides: number): number {
	let total = 0;
	for (let i = 0; i < count; i++) {
		total += Math.floor(Math.random() * sides) + 1;
	}
	return total;
}

// 能力値を自動生成
export async function generateAbilities(): Promise<Abilities> {
	const strength = rollDice(3, 6);
	const constitution = rollDice(3, 6);
	const power = rollDice(3, 6);
	const dexterity = rollDice(3, 6);
	const appearance = rollDice(3, 6);
	const size = rollDice(2, 6) + 6;
	const intelligence = rollDice(2, 6) + 6;
	const education = rollDice(3, 6) + 3;

	// 計算値
	const san = power * 5;
	const fortune = power * 5;
	const idea = intelligence * 5;
	const knowledge = education * 5;
	const durability = Math.floor((constitution + size) / 2);
	const magicPoint = power;
	const vocationalSkillPoints = education * 20;
	const hobbySkillPoints = intelligence * 10;

	// ダメージボーナスの計算
	const strPlusSize = strength + size;
	let damageBonus = 0;
	if (strPlusSize <= 12) damageBonus = -1.4;
	else if (strPlusSize <= 16) damageBonus = -1;
	else if (strPlusSize <= 24) damageBonus = 0;
	else if (strPlusSize <= 32) damageBonus = 1;
	else if (strPlusSize <= 40) damageBonus = 1.4;
	else damageBonus = 2; // 41以上

	return {
		strength,
		constitution,
		power,
		dexterity,
		appearance,
		size,
		intelligence,
		education,
		san,
		fortune,
		idea,
		knowledge,
		durability,
		magicPoint,
		vocationalSkillPoints,
		hobbySkillPoints,
		damageBonus,
	};
}

// 基本情報をAIで生成
export async function generateBasicInfo(
	occupation: string,
): Promise<BasicInfo> {
	try {
		const occupationLabel =
			OCCUPATIONS.find((occ) => occ.value === occupation)?.label || occupation;

		const prompt = createCharacterBasicInfoPrompt(occupationLabel);

		const result = await generateObject({
			model: google("gemini-1.5-flash"),
			schema: basicInfoSchema,
			prompt,
		});

		return {
			name: result.object.name,
			age: result.object.age,
			gender: result.object.gender,
			height: result.object.height,
			weight: result.object.weight,
			birthplace: result.object.birthplace,
			background: result.object.background,
			behavior: result.object.behavior,
			occupation,
		};
	} catch (error) {
		console.error("基本情報生成エラー:", error);
		throw new Error("キャラクター基本情報の生成に失敗しました");
	}
}

// キャラクターシート全体を生成するサーバーアクション
export async function generateCharacterSheet(formData: FormData) {
	try {
		const occupation = formData.get("occupation") as string;

		if (!occupation) {
			return {
				success: false,
				error: "職業を選択してください",
			};
		}

		// 基本情報と能力値を並行して生成
		const [basicInfo, abilities] = await Promise.all([
			generateBasicInfo(occupation),
			generateAbilities(),
		]);

		// TODO: スキルの自動割り振りを実装
		// 現時点では初期値のみを返す
		const skills = {
			combat: {
				dodge: abilities.dexterity * 2, // DEX×2
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
				nativeLanguage: abilities.education * 5, // EDU×5
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

		return {
			success: true,
			data: {
				basic: basicInfo,
				ability: abilities,
				skills,
			},
		};
	} catch (error) {
		console.error("キャラクターシート生成エラー:", error);
		return {
			success: false,
			error: "キャラクターシートの生成に失敗しました",
		};
	}
}

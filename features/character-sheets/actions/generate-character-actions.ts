"use server";

import { google } from "@/lib/ai";
import { generateObject, generateText } from "ai";
import { generateUUID } from "@/lib/utils";
import { rollDice } from "../utils/dice";

import {
	CharacterAbilities,
	CharacterBasicInfo,
	CharacterSheet,
	CharacterSkills,
	Occupation,
} from "../types/character-sheet-types";
import {
	characterBasicInfoPrompt,
	characterSkillsPrompt,
} from "../constants/character-sheet-prompts";
import { extractJsonFromMarkdown } from "../utils/helpers";
import { basicInfoSchema } from "../types/schemas/basic-info-schema";

// 能力値を生成する関数
export async function generateAbilities(): Promise<CharacterAbilities> {
	// ダイスロールで基本能力値を生成
	const strength = rollDice(3, 6);
	const constitution = rollDice(3, 6);
	const power = rollDice(3, 6);
	const dexterity = rollDice(3, 6);
	const appearance = rollDice(3, 6);
	const size = rollDice(2, 6, 6);
	const intelligence = rollDice(2, 6, 6);
	const education = rollDice(3, 6, 3);

	// 派生能力値を計算
	const san = power * 5;
	const fortune = power * 5;
	const idea = intelligence * 5;
	const knowledge = education * 5;
	const durability = Math.floor((constitution + size) / 2);
	const magic_point = power;
	const vocational_skill_points = education * 20;
	const hobby_skill_points = intelligence * 10;
	const damage_bonus = strength + size;

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
		magic_point,
		vocational_skill_points,
		hobby_skill_points,
		damage_bonus,
	};
}

// 基本情報を生成する関数
export async function generateBasicInfo(
	occupation: Occupation,
	age: number,
	gender: string,
): Promise<CharacterBasicInfo> {
	try {
		const prompt = characterBasicInfoPrompt
			.replace("{occupation}", occupation)
			.replace("{age}", age.toString())
			.replace("{gender}", gender);

		const { object } = await generateObject({
			model: google("gemini-2.0-flash-lite-preview-02-05"),
			schema: basicInfoSchema,
			prompt,
			mode: "json",
		});

		const basicInfo = object;
		return basicInfo;
	} catch (error) {
		console.error("Error generating basic info:", error);
		throw new Error("キャラクターの基本情報の生成に失敗しました。");
	}
}

// 技能を生成する関数
export async function generateSkills(
	basicInfo: CharacterBasicInfo,
	abilities: CharacterAbilities,
): Promise<CharacterSkills> {
	try {
		const prompt = characterSkillsPrompt
			.replace("{basicInfo}", JSON.stringify(basicInfo, null, 2))
			.replace("{abilities}", JSON.stringify(abilities, null, 2))
			.replace("{occupation}", basicInfo.occupation)
			.replace(
				"{vocationalSkillPoints}",
				abilities.vocational_skill_points.toString(),
			)
			.replace("{hobbySkillPoints}", abilities.hobby_skill_points.toString());

		// generateTextを使用してテキストを取得し、JSONを抽出
		const response = await generateText({
			model: google("gemini-2.0-flash-001"),
			prompt,
			temperature: 0.7,
			maxTokens: 2048,
		});

		// マークダウンからJSONを抽出
		const jsonText = extractJsonFromMarkdown(response.text);
		const skills = JSON.parse(jsonText) as CharacterSkills;

		return skills;
	} catch (error) {
		console.error("Error generating skills:", error);
		throw new Error("キャラクターの技能の生成に失敗しました。");
	}
}

// キャラクターシート全体を生成する関数
export async function generateCharacterSheet(
	occupation: Occupation,
	age: number,
	gender: string,
): Promise<CharacterSheet> {
	// IDを生成
	const id = generateUUID();

	// 能力値を生成
	const abilities = await generateAbilities();

	// 基本情報を生成
	const basicInfo = await generateBasicInfo(occupation, age, gender);

	// 技能を生成
	const skills = await generateSkills(basicInfo, abilities);

	// 現在の日時
	const now = new Date();

	// キャラクターシートを作成
	const characterSheet: CharacterSheet = {
		id,
		basicInfo,
		abilities,
		skills,
		createdAt: now,
		updatedAt: now,
	};

	return characterSheet;
}

"use server";

import { google } from "@/lib/ai/google-ai";
import { generateObject } from "ai";
import { generateUUID } from "@/lib/utils";
import { rollDice } from "../utils/dice";

import {
	CharacterAbilities,
	CharacterBasicInfo,
	CharacterSheet,
	CharacterSkills,
	Occupation,
	// OCCUPATION_SKILLS_MAP,
} from "../types/character-sheet-types";
import {
	characterBasicInfoPrompt,
	characterSkillsPrompt,
} from "../constants/character-sheet-prompts";
import { basicInfoSchema } from "../types/schemas/basic-info-schema";
// import { skillSchema } from "../types/schemas/skill-schema";

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
		// 職業に基づいて職業技能のリストを取得
		const occupation = basicInfo.occupation;
		const vocationalSkills = OCCUPATION_SKILLS_MAP[occupation] || [];

		// 職業技能と趣味技能の情報をプロンプトに追加
		const vocationalSkillsText =
			vocationalSkills.length > 0
				? `職業技能: ${vocationalSkills.join(", ")}`
				: "職業技能: 特定の職業技能はありません";

		const prompt = characterSkillsPrompt
			.replace("{basicInfo}", JSON.stringify(basicInfo, null, 2))
			.replace("{abilities}", JSON.stringify(abilities, null, 2))
			.replace("{occupation}", basicInfo.occupation)
			.replace(
				"{vocationalSkillPoints}",
				abilities.vocational_skill_points.toString(),
			)
			.replace("{hobbySkillPoints}", abilities.hobby_skill_points.toString())
			.replace("{vocationalSkillsText}", vocationalSkillsText);

		// generateObjectを使用してJSONを取得
		const { object } = await generateObject({
			model: google("gemini-2.0-flash-lite-preview-02-05"),
			schema: skillSchema,
			prompt,
			mode: "json",
		});

		// 職業技能ポイントと趣味技能ポイントの制限を確認
		const skills = object;

		// 技能ポイントの合計使用量を確認
		const totalAvailablePoints =
			abilities.vocational_skill_points + abilities.hobby_skill_points;

		if (
			skills.totalPointsUsed &&
			skills.totalPointsUsed > totalAvailablePoints
		) {
			console.warn(
				`技能ポイントが超過しています: ${skills.totalPointsUsed} > ${totalAvailablePoints}`,
			);
			// ここで調整ロジックを追加することも可能
		}

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

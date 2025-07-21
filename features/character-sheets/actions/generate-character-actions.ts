"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { basicInfoSchema } from "../types/schemas/basic-info-schema";
import type { Abilities, BasicInfo } from "../types/character-sheet-types";
import {
	OCCUPATIONS,
	type OccupationValue,
} from "../constants/occupation-lists";
import { createCharacterBasicInfoPrompt } from "../constants/character-sheet-prompts";
import { generateSkills } from "../utils/skill-allocation";
import type { SkillDetails } from "../types/skill-details-types";

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

// フォールバック用の基本情報生成
function generateFallbackBasicInfo(
	occupation: string,
	abilities?: Abilities,
): BasicInfo {
	const occupationLabel =
		OCCUPATIONS.find((occ) => occ.value === occupation)?.label || occupation;

	// ランダムな基本情報を生成（多様な文化背景）
	const names = [
		"田中太郎", "佐藤花子", "鈴木一郎", "高橋美咲", "渡辺健太",
		"John Smith", "Emily Johnson", "Maria Rodriguez", "Ahmed Hassan", "Li Wei",
		"Anna Kowalski", "Jean Dubois", "Olga Petrov", "Marco Rossi", "Kim Min-jun"
	];
	const genders: Array<"man" | "woman" | "else"> = ["man", "woman"];
	const cities = [
		"東京", "大阪", "名古屋", "横浜", "神戸", "福岡", "札幌", "仙台",
		"ニューヨーク", "ロンドン", "パリ", "ベルリン", "シドニー", "トロント", "モスクワ", "ソウル"
	];
	
	const selectedGender = genders[Math.floor(Math.random() * genders.length)];
	const baseHeight = selectedGender === "man" ? 170 : 160;
	const height = baseHeight + Math.floor(Math.random() * 20) - 10;
	const weight = Math.floor(height * 0.7) + Math.floor(Math.random() * 20) - 10;

	return {
		name: names[Math.floor(Math.random() * names.length)],
		age: 25 + Math.floor(Math.random() * 30),
		gender: selectedGender,
		height,
		weight,
		birthplace: cities[Math.floor(Math.random() * cities.length)],
		background: `${occupationLabel}として活動している。詳細な背景情報は後で設定してください。`,
		behavior: "一般的な性格。詳細な行動パターンは後で設定してください。",
		occupation,
	};
}

// 基本情報をAIで生成（フォールバック付き）
export async function generateBasicInfo(
	occupation: string,
	abilities?: Abilities,
	skillDetails?: SkillDetails,
	additionalContext?: string,
): Promise<BasicInfo> {
	try {
		const occupationLabel =
			OCCUPATIONS.find((occ) => occ.value === occupation)?.label || occupation;

		const prompt = createCharacterBasicInfoPrompt(
			occupationLabel,
			abilities,
			skillDetails,
			additionalContext,
		);

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
		console.log("フォールバック基本情報を使用します");
		
		// APIエラーの場合はフォールバック情報を返す
		return generateFallbackBasicInfo(occupation, abilities);
	}
}

// キャラクターシート全体を生成するサーバーアクション
export async function generateCharacterSheet(formData: FormData) {
	try {
		const occupation = formData.get("occupation") as string;
		const additionalContext = formData.get("additionalContext") as string | null;

		if (!occupation) {
			return {
				success: false,
				error: "職業を選択してください",
			};
		}

		// まず能力値を生成
		const abilities = await generateAbilities();

		// 次にスキルを生成
		const skillsResult = generateSkills(
			occupation as OccupationValue,
			abilities,
			{
				name: "",
				occupation,
				age: 30,
				gender: "man",
				height: 170,
				weight: 60,
				birthplace: "",
				background: "",
				behavior: "",
			}, // 仮の基本情報
		);

		// 最後に能力値と技能情報を基に基本情報を生成
		const basicInfo = await generateBasicInfo(
			occupation,
			abilities,
			skillsResult.skillDetails,
			additionalContext || undefined,
		);

		return {
			success: true,
			data: {
				basic: basicInfo,
				ability: abilities,
				skills: skillsResult.skills,
				skillDetails: skillsResult.skillDetails,
			},
		};
	} catch (error) {
		console.error("キャラクターシート生成エラー:", error);
		
		// 重要なエラー（能力値生成やスキル生成の失敗）の場合はthrow
		if (error instanceof Error && 
			(error.message.includes("能力値") || error.message.includes("スキル"))) {
			throw error; // Error Boundaryに捕捉させる
		}
		
		// それ以外は通常のエラーレスポンス
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "キャラクターシートの生成に失敗しました",
		};
	}
}

"use server";

import { google } from "@/lib/ai";
import { generateObject, generateText } from "ai";
import { generateUUID } from "@/lib/utils";
import { rollDice } from "../utils/dice";
import { z } from "zod";

// マークダウンのコードブロックからJSONを抽出するヘルパー関数
function extractJsonFromMarkdown(text: string): string {
  // マークダウンのコードブロックを削除
  const jsonRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
  const match = text.match(jsonRegex);

  if (match && match[1]) {
    return match[1].trim();
  }

  // コードブロックがない場合は元のテキストを返す
  return text.trim();
}
import {
  CharacterAbilities,
  CharacterBasicInfo,
  CharacterSheet,
  CharacterSkills,
  Occupation
} from "../types";
import { characterBasicInfoPrompt, characterSkillsPrompt } from "./prompts";


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
    damage_bonus
  };
}

// 基本情報を生成する関数
export async function generateBasicInfo(
  occupation: Occupation,
  age: number,
  gender: string
): Promise<CharacterBasicInfo> {
  try {
    const prompt = characterBasicInfoPrompt
      .replace("{occupation}", occupation)
      .replace("{age}", age.toString())
      .replace("{gender}", gender);

    // generateTextを使用してテキストを取得し、JSONを抽出
    const response = await generateText({
      model: google("gemini-2.0-flash-001"),
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      maxTokens: 1024,
    });

    // マークダウンからJSONを抽出
    const jsonText = extractJsonFromMarkdown(response.text);
    const basicInfo = JSON.parse(jsonText) as CharacterBasicInfo;

    return basicInfo;
  } catch (error) {
    console.error("Error generating basic info:", error);
    throw new Error("キャラクターの基本情報の生成に失敗しました。");
  }
}

// 技能を生成する関数
export async function generateSkills(
  basicInfo: CharacterBasicInfo,
  abilities: CharacterAbilities
): Promise<CharacterSkills> {
  try {
    const prompt = characterSkillsPrompt
      .replace("{basicInfo}", JSON.stringify(basicInfo, null, 2))
      .replace("{abilities}", JSON.stringify(abilities, null, 2))
      .replace("{occupation}", basicInfo.occupation)
      .replace("{vocationalSkillPoints}", abilities.vocational_skill_points.toString())
      .replace("{hobbySkillPoints}", abilities.hobby_skill_points.toString());

    // generateTextを使用してテキストを取得し、JSONを抽出
    const response = await generateText({
      model: google("gemini-2.0-flash-001"),
      messages: [{ role: "user", content: prompt }],
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
  gender: string
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
    updatedAt: now
  };

  return characterSheet;
}
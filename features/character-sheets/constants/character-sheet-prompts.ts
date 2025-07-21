import type { Abilities } from "../types/character-sheet-types";
import type { SkillDetails } from "../types/skill-details-types";

// キャラクターシート生成のためのAIプロンプト

export const createCharacterBasicInfoPrompt = (
	occupationLabel: string,
	abilities?: Abilities,
	skillDetails?: SkillDetails,
	additionalContext?: string,
) => `
あなたはTRPGのキャラクターシート作成を支援するAIアシスタントです。
以下の職業に基づいて、クトゥルフ神話TRPGのキャラクターの基本情報を生成してください。

職業: ${occupationLabel}

${
	abilities
		? `
能力値情報:
- STR（筋力）: ${abilities.strength}
- CON（体力）: ${abilities.constitution}
- POW（精神力）: ${abilities.power}
- DEX（機敏）: ${abilities.dexterity}
- APP（外見）: ${abilities.appearance}
- SIZ（体格）: ${abilities.size}
- INT（知性）: ${abilities.intelligence}
- EDU（教養）: ${abilities.education}
`
		: ""
}

${
	skillDetails
		? `
特徴的な技能:
${skillDetails.drive ? `- 運転: ${skillDetails.drive}` : ""}
${skillDetails.pilot ? `- 操縦: ${skillDetails.pilot}` : ""}
${skillDetails.art ? `- 芸術: ${skillDetails.art}` : ""}
${skillDetails.craft ? `- 製作: ${skillDetails.craft}` : ""}
${skillDetails.otherLanguage ? `- 外国語: ${skillDetails.otherLanguage}` : ""}
`
		: ""
}

${additionalContext ? `
追加指定事項:
${additionalContext}
` : ""}

生成する項目：
- 名前: 多様な文化背景を持つ名前（姓名）
- 年齢: 職業に適した年齢（20-60歳の範囲）
- 性別: man, woman, elseのいずれか
- 身長: 平均的な身長（cm）
- 体重: 身長に対して適切な体重（kg）
- 出身地: 世界各地の都市や地域
- 背景情報: キャラクターの生い立ちや経歴、職業に就いた理由など（180-320文字程度）
- 行動パターン: 性格や行動の特徴、癖など（80-220文字程度）

職業に合った現実的で説得力のあるキャラクターを作成してください。
上記の能力値と技能情報を参考にして、一貫性のあるキャラクター設定を作成してください。
多様な文化的背景を持つキャラクターを生成し、バラエティ豊かな設定にしてください。

重要：
- 背景情報は必ず180文字以上320文字以内で記述してください
- 行動パターンは必ず80文字以上220文字以内で記述してください
`;

// キャラクターシート生成のためのAIプロンプト

export const characterBasicInfoPrompt = `
あなたはTRPGのキャラクターシート作成を支援するAIアシスタントです。
以下の情報を元に、TRPGのキャラクターの基本情報を生成してください。

職業: {occupation}
年齢: {age}
性別: {gender}

以下の形式でJSON形式で回答してください。回答は必ずJSON形式のみにしてください。

{
  "name": "キャラクターの名前（日本人名）",
  "occupation": "職業",
  "age": 年齢（数値）,
  "gender": "性別 (man or woman)",
  "height": 身長（cm、数値）,
  "weight": 体重（kg、数値）,
  "birthplace": "出身地",
  "background": "背景情報（200-300文字程度）",
  "behavior": "行動パターン・性格（100-200文字程度）"
}
`;

export const characterSkillsPrompt = `
あなたはTRPGのキャラクターシート作成を支援するAIアシスタントです。
以下の情報を元に、TRPGのキャラクターの技能値を生成してください。

基本情報:
{basicInfo}

能力値:
{abilities}

職業技能ポイント: {vocationalSkillPoints}
趣味技能ポイント: {hobbySkillPoints}

{vocationalSkillsText}

職業「{occupation}」に適した技能にポイントを割り振ってください。
キャラクターの背景や性格に合った技能にもポイントを割り振ってください。
技能の初期値に加算する形で値を設定してください。

職業技能ポイント（{vocationalSkillPoints}）と趣味技能ポイント（{hobbySkillPoints}）の合計が上限を超えないようにしてください。

以下の形式でJSON形式で回答してください。回答は必ずJSON形式のみにしてください。

職業 「{basicInfo.occupation}」に関連する技能に適切なポイントを割りふってください.

{
  "combat": {
    "dodge": 値,
    "kick": 値,
    "grapple": 値,
    "punch": 値,
    "headbutt": 値,
    "throw": 値,
    "martialArts": 値,
    "handgun": 値,
    "submachineGun": 値,
    "shotgun": 値,
    "machineGun": 値,
    "rifle": 値
  },
  "investigation": {
    "firstAid": 値,
    "locksmith": 値,
    "hide": 値,
    "conceal": 値,
    "listen": 値,
    "sneak": 値,
    "photography": 値,
    "psychoanalysis": 値,
    "track": 値,
    "climb": 値,
    "library": 値,
    "spot": 値
  },
  "action": {
    "drive": 値,
    "mechanicalRepair": 値,
    "operateHeavyMachinery": 値,
    "ride": 値,
    "swim": 値,
    "craft": 値,
    "pilot": 値,
    "jump": 値,
    "electricalRepair": 値,
    "navigate": 値,
    "disguise": 値
  },
  "negotiation": {
    "fastTalk": 値,
    "credit": 値,
    "persuade": 値,
    "bargain": 値,
    "nativeLanguage": 値,
    "otherLanguage": 値
  },
  "knowledge": {
    "medicine": 値,
    "occult": 値,
    "chemistry": 値,
    "cthulhuMythos": 値,
    "art": 値,
    "accounting": 値,
    "archaeology": 値,
    "computer": 値,
    "psychology": 値,
    "anthropology": 値,
    "biology": 値,
    "geology": 値,
    "electronics": 値,
    "astronomy": 値,
    "naturalHistory": 値,
    "physics": 値,
    "law": 値,
    "pharmacy": 値,
    "history": 値
  }
}
`;

import { z } from "zod";

// 基本的なスキルスキーマの定義
export const baseSkillSchema = z.object({
	combat: z.object({
		dodge: z.number(),
		kick: z.number(),
		grapple: z.number(),
		punch: z.number(),
		headbutt: z.number(),
		throw: z.number(),
		martialArts: z.number(),
		handgun: z.number(),
		submachineGun: z.number(),
		shotgun: z.number(),
		machineGun: z.number(),
		rifle: z.number(),
	}),
	investigation: z.object({
		firstAid: z.number(),
		locksmith: z.number(),
		hide: z.number(),
		conceal: z.number(),
		listen: z.number(),
		sneak: z.number(),
		photography: z.number(),
		psychoanalysis: z.number(),
		track: z.number(),
		climb: z.number(),
		library: z.number(),
		spot: z.number(),
	}),
	action: z.object({
		drive: z.number(),
		mechanicalRepair: z.number(),
		operateHeavyMachinery: z.number(),
		ride: z.number(),
		swim: z.number(),
		craft: z.number(),
		pilot: z.number(),
		jump: z.number(),
		electricalRepair: z.number(),
		navigate: z.number(),
		disguise: z.number(),
	}),
	negotiation: z.object({
		fastTalk: z.number(),
		credit: z.number(),
		persuade: z.number(),
		bargain: z.number(),
		nativeLanguage: z.number(),
		otherLanguage: z.number(),
	}),
	knowledge: z.object({
		medicine: z.number(),
		occult: z.number(),
		chemistry: z.number(),
		cthulhuMythos: z.number(),
		art: z.number(),
		accounting: z.number(),
		archaeology: z.number(),
		computer: z.number(),
		psychology: z.number(),
		anthropology: z.number(),
		biology: z.number(),
		geology: z.number(),
		electronics: z.number(),
		astronomy: z.number(),
		naturalHistory: z.number(),
		physics: z.number(),
		law: z.number(),
		pharmacy: z.number(),
		history: z.number(),
	}),
	// 技能ポイントの情報を追加
	skillsUsed: z.array(z.string()).optional(),
	totalPointsUsed: z.number().optional(),
});

// 職業ごとの必須スキルを定義するスキーマ
// 医師
export const doctorSkillSchema = z.object({
	knowledge: z.object({
		medicine: z.number().min(1), // 必須スキル
		biology: z.number().min(1),
		pharmacy: z.number().min(1),
		accounting: z.number().min(1),
	}),
	investigation: z.object({
		firstAid: z.number().min(1),
	}),
	negotiation: z.object({
		credit: z.number().min(1),
		persuade: z.number().min(1),
		otherLanguage: z.number().min(1),
	}),
});

// アニマルセラピスト
export const animalTherapistSkillSchema = z.object({
	investigation: z.object({
		listen: z.number().min(1),
		psychoanalysis: z.number().min(1),
		track: z.number().min(1),
	}),
	knowledge: z.object({
		psychology: z.number().min(1),
		biology: z.number().min(1),
		naturalHistory: z.number().min(1),
	}),
	action: z.object({
		jump: z.number().min(1),
	}),
	// 個人的な関心のある技能1つは任意のスキルで対応
});

// 看護師
export const nurseSkillSchema = z.object({
	knowledge: z.object({
		chemistry: z.number().min(1),
		biology: z.number().min(1),
		pharmacy: z.number().min(1),
		psychology: z.number().min(1),
	}),
	investigation: z.object({
		firstAid: z.number().min(1),
		listen: z.number().min(1),
		spot: z.number().min(1),
	}),
	// 言いくるめ or 説得 のどちらかが必要
	negotiation: z
		.object({
			fastTalk: z.number(),
			persuade: z.number(),
		})
		.refine((data) => data.fastTalk > 0 || data.persuade > 0, {
			message: "言いくるめまたは説得のいずれかが必要です",
			path: ["fastTalkOrPersuade"],
		}),
});

// 救急救命士
export const paramedicSkillSchema = z.object({
	knowledge: z.object({
		medicine: z.number().min(1),
		chemistry: z.number().min(1),
	}),
	investigation: z.object({
		firstAid: z.number().min(1),
		locksmith: z.number().min(1),
		climb: z.number().min(1),
	}),
	action: z.object({
		mechanicalRepair: z.number().min(1),
		electricalRepair: z.number().min(1),
	}),
});

// 形成外科医
export const plasticSurgeonSkillSchema = z.object({
	knowledge: z.object({
		medicine: z.number().min(1),
		accounting: z.number().min(1),
		psychology: z.number().min(1),
		pharmacy: z.number().min(1),
	}),
	investigation: z.object({
		firstAid: z.number().min(1),
	}),
	negotiation: z.object({
		persuade: z.number().min(1),
		bargain: z.number().min(1),
		otherLanguage: z.number().min(1),
	}),
});

// 精神科医
export const psychiatristSkillSchema = z.object({
	knowledge: z.object({
		medicine: z.number().min(1),
		chemistry: z.number().min(1),
		psychology: z.number().min(1),
		biology: z.number().min(1),
		pharmacy: z.number().min(1),
	}),
	investigation: z.object({
		psychoanalysis: z.number().min(1),
	}),
	negotiation: z.object({
		persuade: z.number().min(1),
		otherLanguage: z.number().min(1),
	}),
});

// 闇医者
export const blackMarketDoctorSkillSchema = z.object({
	knowledge: z.object({
		medicine: z.number().min(1),
		accounting: z.number().min(1),
		law: z.number().min(1),
		pharmacy: z.number().min(1),
	}),
	investigation: z.object({
		firstAid: z.number().min(1),
	}),
	negotiation: z.object({
		persuade: z.number().min(1),
		otherLanguage: z.number().min(1),
	}),
	// 個人的な関心のある技能1つは任意のスキルで対応
});

// 職業名とスキーマのマッピング
export const occupationSkillSchemas: Record<string, z.ZodTypeAny> = {
	医師: doctorSkillSchema,
	アニマルセラピスト: animalTherapistSkillSchema,
	看護師: nurseSkillSchema,
	救急救命士: paramedicSkillSchema,
	形成外科医: plasticSurgeonSkillSchema,
	精神科医: psychiatristSkillSchema,
	闇医者: blackMarketDoctorSkillSchema,
	// 他の職業も同様に追加
};

// 職業に基づいてスキーマを選択する関数
export const getSkillSchemaForOccupation = (
	occupation: string,
): z.ZodTypeAny => {
	return occupationSkillSchemas[occupation] || baseSkillSchema;
};

// 最終的なスキルスキーマ（基本スキーマと職業別スキーマの組み合わせ）
export const skillSchema = baseSkillSchema;

// 個人的な関心のある技能を選択するためのヘルパー関数
export const validatePersonalInterestSkill = (
	skills: ,
	requiredSkillCount = 1,
): boolean => {
	// すべてのカテゴリのすべてのスキルを平坦化
	const allSkills = [
		...Object.values(skills.combat || {}),
		...Object.values(skills.investigation || {}),
		...Object.values(skills.action || {}),
		...Object.values(skills.negotiation || {}),
		...Object.values(skills.knowledge || {}),
	].filter((value) => typeof value === "number" && value > 0);

	// 必須スキル以外に、指定された数の個人的関心スキルがあるか確認
	return allSkills.length >= requiredSkillCount;
};

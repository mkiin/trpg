# スキルフォームの実装定義
スキルタイプが
- 「fixed」,「fixed_specific」, 「other」は 必ず補正値を選択する
- 「customizable」は label値を入力し、補正値を必ず選択する
- 「choice」はcount値の個数示されたスキル一覧から選択する. 選択したスキルは補正値を必ず選択する.示されたスキル一覧に「customizable」がある場合はlabel値を入力する
- 「free choice」はcount値の個数分、全スキルから選択する. 選択したスキルは補正値を必ず選択する.示されたスキル一覧に「customizable」がある場合はlabel値を入力する

- 「free choice」,「choice」は Accordionでクリックするとスキル一覧が表示されるようにする。


## ラジオボタンで選択する補正値の種類
```typescript
export type SKILL_POINT_ALLOCATION_CATEGORY = "high" | "medium" | "low";
```


## jotaiによる状態変数
```typescript
export const skillsAtom = atomWithStorage<CharacterSkills>("character-skill", {
	combat: {
		dodge: 0,
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
		drive: {
			label: "",
			value: 20,
		},
		mechanicalRepair: 20,
		operateHeavyMachinery: 1,
		ride: 5,
		swim: 25,
		craft: {
			label: "",
			value: 5,
		},
		pilot: {
			label: "",
			value: 1,
		},
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
		nativeLanguage: 0,
		otherLanguage: {
			label: "",
			value: 1,
		},
	},
	knowledge: {
		medicine: 5,
		occult: 5,
		chemistry: 1,
		cthulhuMythos: 0,
		art: {
			label: "",
			value: 5,
		},
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
});
```

## スキルフォームで使用するカスタムフォーム
```typescript
import { useSafeForm } from "@/hooks/use-safe-form";
import { skillsAtom } from "@/features/character-sheets/atoms/character-sheet-atoms";
import { useAtom } from "jotai/react";

export function useSkillForm() {
	const [skills, setSkills] = useAtom(skillsAtom);
	const [form, fields] = useSafeForm<skillsFormSchema>({
		id: "skills-form",
		constraint: getZodConstraint(skillsFormSchema),
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: skillsFormSchema });
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
		onSubmit(event, context) {
			event.preventDefault();
			if (context.submission && context.submission.status === "success") {
				setSkills({
					...skills,
					...context.submission.value,
				});
			}
		},
	});

	return {
		skills,
		setSkills,
    form,
    fields
	};
}

```

## 職業リストのマッピングデータ
型定義
```typescript
/* 職業ごとの職業技能マッピング */
export type OccupationValue =
	(typeof OCCUPATION_GROUPS)[number]["options"][number]["value"];

/** 任意の値を持つ技能のキー (例: 運転の種類、言語の種類など) */
export type CustomizableSkillKey =
	| "otherLanguage"
	| "drive"
	| "craft"
	| "pilot"
	| "art";

export type SkillKey =
	| keyof CharacterSkills["combat"]
	| keyof CharacterSkills["investigation"]
	| keyof CharacterSkills["action"]
	| keyof CharacterSkills["negotiation"]
	| keyof CharacterSkills["knowledge"];

/**
 * 1. 固定された基本技能 (詳細指定が不要なもの)
 * 例: 医学 (medicine), 回避 (dodge)
 */
export interface FixedSkill {
	type: "fixed";
	skill: Exclude<SkillKey, CustomizableSkillKey>;
	label: string;
}

/**
 * 2. 固定された詳細を持つカスタマイズ可能技能
 * 例: 運転(自動車) (drive, specification: "自動車"), 芸術(ダンス) (art, specification: "ダンス")
 */
export interface FixedSpecificSkill {
	type: "fixed_specific";
	skill: CustomizableSkillKey;
	label: string;
	specification: string;
}

/**
 * 3. ユーザーが詳細を指定するカスタマイズ可能技能
 * 例: 芸術(任意) (art), 他の言語(英語など) (otherLanguage)
 */
export interface CustomizableSkill {
	type: "customizable";
	skill: CustomizableSkillKey;
	label: string;
	examples?: string[];
}

/**
 * 4. 選択肢の中から指定された数を選ぶ技能
 * 例: (言いくるめ or 説得), (＋次の技能から２つ選択)
 */
export interface ChoiceSkill {
	type: "choice";
	label: string;
	options: Array<
		FixedSkill | FixedSpecificSkill | CustomizableSkill | OtherSkill
	>;
	count: number;
}

/**
 * 5. 任意の技能を指定された数だけ選ぶ (個人的な関心など)
 */
export interface FreeChoiceSkill {
	type: "free_choice";
	label: string;
	count: number;
}

/**
 * 6. CharacterSkills に定義されていないその他の技能 (ハウスルールや特定の武器など)
 * 例: 日本刀, サバイバル（海）
 */
export interface OtherSkill {
	type: "other";
	label: string;
}

/** 職業技能の各項目の詳細を表現する型 */
export type SkillDefinition =
	| FixedSkill
	| FixedSpecificSkill
	| CustomizableSkill
	| ChoiceSkill
	| FreeChoiceSkill
	| OtherSkill;

/** 職業ごとの技能リストをマッピングする型 */
export type OccupationSkillsMapType = Record<
	OccupationValue,
	SkillDefinition[]
>;
```

モック用データ
```typescript
export const MOCK_OCCUPATION_SKILL_MAP: OccupationSkillsMapType = {
	doctor: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "credit", label: "信用" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{
			type: "customizable",
			skill: "otherLanguage",
			label: "ほかの言語（英語、ラテン語、ドイツ語）",
			examples: ["英語", "ラテン語", "ドイツ語"],
		},
	],
	nurse: [
		{ type: "fixed", skill: "chemistry", label: "化学" },
		{ type: "fixed", skill: "biology", label: "生物学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{
			type: "choice",
			label: "言いくるめ or 説得",
			options: [
				{ type: "fixed", skill: "fastTalk", label: "言いくるめ" },
				{ type: "fixed", skill: "persuade", label: "説得" },
			],
			count: 1,
		},
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{ type: "fixed", skill: "psychology", label: "心理学" },
		{ type: "fixed", skill: "listen", label: "聞き耳" },
		{ type: "fixed", skill: "spot", label: "目星" },
	],
	underground_doctor: [
		{ type: "fixed", skill: "medicine", label: "医学" },
		{ type: "fixed", skill: "firstAid", label: "応急手当" },
		{ type: "fixed", skill: "accounting", label: "経理" },
		{ type: "fixed", skill: "persuade", label: "説得" },
		{ type: "fixed", skill: "law", label: "法律" },
		{ type: "fixed", skill: "pharmacy", label: "薬学" },
		{ type: "customizable", skill: "otherLanguage", label: "ほかの言語" },
		{ type: "free_choice", label: "＋個人的な関心のある技能１つ", count: 1 },
	],
};

```


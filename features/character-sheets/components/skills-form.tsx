import { CustomizableSkill, FixedSkill, FixedSpecificSkill, SkillDefinition } from "../constants/occupation-lists";
import { useCharacterSheet } from "../hooks/use-character-sheet";
import { NavigationButton } from "./navigation-button";
import { useSkillForm } from "../hooks/use-skill-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";

import { getFormProps } from "@conform-to/react";
import { SKILL_POINT_ALLOCATION_VALUES } from "../constants/skill-correction-value";
import { Input } from "@/components/ui/input";

export function SkillsForm() {
  const { nextStep, prevStep } = useCharacterSheet();
  const { definedOccupationSkills, form, fields } = useSkillForm();


  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">スキルフォーム</CardTitle>
        <CardDescription>スキルポイントを自動生成する際に使用する補正値を選択してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form {...getFormProps(form)} className="space-y-6">
          {definedOccupationSkills.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              職業が選択されていないです。基本情報フォームで職業を選択してください
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 職業スキルを grid 形式で表示する */}
              {/* 固定スキル */}
              {definedOccupationSkills.map((skillDefinition, index) => {
                const key = `${skillDefinition.type}-${skillDefinition.label}-${index}`;

                switch (skillDefinition.type) {
                  case "fixed":
                  case "fixed_specific":
                    return <FixedSkillItem key={key} fixedSkill={skillDefinition} />
                  case "customizable":
                    return <CustomizableSkillItem key={key} customizableSkill={skillDefinition} />
                  case "other":
                    return <OtherSKillItem key={key} />
                  case "choice":
                    return <ChoiceSkillModal key={key} />
                  case "free_choice":
                    return <FreeChoiceSkillModal key={key} />
                  default:
                    return null;
                }
              })}

            </div>
          )}
        </form>
      </CardContent>

      <NavigationButton nextStep={nextStep} prevStep={prevStep} />
    </Card>
  );
}


// 固定スキルを表示するアイテムコンポーネント
/*
  スキル名を表示するラベル
  補正値を選択するラジオボタン
 */
function FixedSkillItem({ fixedSkill }: { fixedSkill: FixedSkill | FixedSpecificSkill }) {
  /** skill id にはskill nameを指定
   *  1つの職業でskill nameは重複しないため
   */
  return (
    <Card>
      <CardHeader>
        <CardTitle>{fixedSkill.label}</CardTitle>
      </CardHeader>
      <CardContent><SkillPointAllocationSelector skillId={fixedSkill.label} /></CardContent>
    </Card>
  )
}


// カスタムスキルを表示するコンポーネント
/**
 * スキル名を表示するラベル
 * 
 */
function CustomizableSkillItem({ customizableSkill }: { customizableSkill: CustomizableSkill }) {
  let exampleText = "";
  for (const example of customizableSkill.examples ?? "") {
    exampleText += example;
    exampleText += " "
  }
  return (
    <Card>
      <CardHeader><CardTitle>{customizableSkill.label}</CardTitle></CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label htmlFor={customizableSkill.skill}>カスタム値を入力</Label>
          <Input id={customizableSkill.skill} placeholder={exampleText} />
        </div>
      </CardContent>
    </Card>
  )
}

// その他スキルを表示するコンポーネント
function OtherSKillItem() {
  return (
    <div>その他スキル</div>
  )
}

// 選択スキルを表示するコンポーネント(モーダル)
function ChoiceSkillModal() {
  return (
    <div>選択スキル</div>
  )
}


// 全スキルを選択するコンポーネント(モーダル)
function FreeChoiceSkillModal() {
  return (
    <div>自由選択スキル</div>
  )
}

// 全スキルで使用する補正値選択のラジオボタン
function SkillPointAllocationSelector({ skillId }: { skillId: string }) {
  return (
    // 画面がmdより大きい場合は3列で, それ以外は1列で表示
    <RadioGroup name={`skill-${skillId}`} defaultChecked defaultValue="medium">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {SKILL_POINT_ALLOCATION_VALUES.map((skillPoint) => {
          const id = `${skillId}-${skillPoint.category}`;
          return (
            <div className="flex items-center space-x-2" key={skillPoint.category}>
              <RadioGroupItem value={skillPoint.category} id={id} />
              <Label htmlFor={id}>{skillPoint.label}</Label>
            </div>
          )
        })}
      </div>
    </RadioGroup>
  )
}
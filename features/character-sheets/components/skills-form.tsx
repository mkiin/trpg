import { useSafeForm } from "@/hooks/use-safe-form";
import { OCCUPATION_SKILL_MAP, SkillDefinition } from "../constants/occupation-lists";
import { useCharacterSheet } from "../hooks/use-character-sheet"
import { NavigationButton } from "./navigation-button";
import { useBasicForm } from "../hooks/use-basic-form";
import { useSkillForm } from "../hooks/use-skill-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFormProps } from "@conform-to/react";

export function SkillsForm() {


  const { nextStep, prevStep } = useCharacterSheet();
  const { basicInfo } = useBasicForm(); // 選択した職業を取得目的
  const { skills, setSkills, form, fields } = useSkillForm(); // 

  // 選択した職業の割り振り可能スキル
  const availableSkills = OCCUPATION_SKILL_MAP[basicInfo.occupation];

  return (

    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">スキルフォーム</CardTitle>
        <CardDescription >スキルポイントを自動生成する際に使用する補正値を選択してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form {...getFormProps(form)} className="space-y-6">
          {/* 職業スキルを grid 形式で表示する */}
          <div className="grid grid-cols-2">

          </div>
        </form>
      </CardContent>
    </Card>

  )
}

type SkillDisplayItemProps = {} & SkillDefinition

function SkillDisplayItem(props: SkillDisplayItemProps) {
  return (
    
  )
}
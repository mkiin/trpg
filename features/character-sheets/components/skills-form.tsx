import { OCCUPATION_SKILL_MAP, SkillDefinition } from "../constants/occupation-lists";
import { useCharacterSheet } from "../hooks/use-character-sheet";
import { NavigationButton } from "./navigation-button";
import { useBasicForm } from "../hooks/use-basic-form";
import { useSkillForm } from "../hooks/use-skill-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFormProps } from "@conform-to/react";
import { useMemo } from "react";

export function SkillsForm() {
  const { nextStep, prevStep } = useCharacterSheet();
  const { basicInfo } = useBasicForm(); // 選択した職業を取得目的
  const { skills, setSkills, form, fields } = useSkillForm();

  // 選択した職業の割り振り可能スキルをメモ化
  const availableSkills = useMemo(() => {
    // 職業が選択されていない場合は空配列を返す
    if (!basicInfo?.occupation) return [];
    return OCCUPATION_SKILL_MAP[basicInfo.occupation];
  }, [basicInfo?.occupation]);

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">スキルフォーム</CardTitle>
        <CardDescription>スキルポイントを自動生成する際に使用する補正値を選択してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form {...getFormProps(form)} className="space-y-6">
          {availableSkills.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              職業が選択されていないか、選択された職業に割り当て可能なスキルがありません。
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 職業スキルを grid 形式で表示する */}
              {availableSkills.map((skill) => (
                <SkillDisplayItem
                  key={`${skill.type}-${skill.label}`}
                  skillDefinition={skill}
                  formField={fields[typeof skill.skill === 'string' ? skill.skill : '']}
                  value={typeof skill.skill === 'string' ?
                    getSkillValue(skills, skill) : 0}
                  onChange={(value) => updateSkillValue(skills, setSkills, skill, value)}
                />
              ))}
            </div>
          )}
        </form>
      </CardContent>

      <NavigationButton nextStep={nextStep} prevStep={prevStep} />
    </Card>
  );
}


type SkillDisplayItemProps = {
  skillDefinition: SkillDefinition;
  formField?: unknown; // フォームフィールドの型は実際の実装に合わせて調整
  value: number;
  onChange: (value: number) => void;
}

function SkillDisplayItem(skillDefinition: SkillDisplayItemProps) {
  const { type, label } = skillDefinition;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{label}</CardTitle>
        <CardDescription>
          {type === 'fixed_specific' && skillDefinition &&
            `(${skillDefinition.specification})`}
          {type === 'customizable' && skillDefinition.examples &&
            `例: ${skillDefinition.examples.join(', ')}`}
        </CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  );
}
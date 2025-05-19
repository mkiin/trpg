import { CategorizedOccupationSkills, OCCUPATION_SKILL_MAP, SkillDefinition } from "../constants/occupation-lists";
import { useCharacterSheet } from "../hooks/use-character-sheet";
import { NavigationButton } from "./navigation-button";
import { useSkillForm } from "../hooks/use-skill-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFormProps } from "@conform-to/react";

export function SkillsForm() {
  const { nextStep, prevStep } = useCharacterSheet();
  const { skills, setSkills, rawOccupationSkills, categorizedOccupationSkills, form, fields } = useSkillForm();


  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">スキルフォーム</CardTitle>
        <CardDescription>スキルポイントを自動生成する際に使用する補正値を選択してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form {...getFormProps(form)} className="space-y-6">
          {rawOccupationSkills.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              職業が選択されていないです。基本情報フォームで職業を選択してください
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 職業スキルを grid 形式で表示する */}
              {/* 固定スキル */}
              {categorizedOccupationSkills.fixedSkills.length > 0 && (

                <section className="space-y-4 p-4 border rounded-lg shadow-md md:col-span-1">
                  {categorizedOccupationSkills.fixedSkills.map((skill) => {
                    return (

                      <FixedSkillItem />
                    )
                  })}
                </section>
              )}
              {/* カスタマイズ可能スキル */}
              {categorizedOccupationSkills.customizableSkills.length > 0 && (
                <section className="space-y-4 p-4 border rounded-lg shadow-md md:col-span-1">
                  {categorizedOccupationSkills.customizableSkills.map((skill) => {
                    return (
                      <CustomizableSkillItem />
                    )
                  })}
                </section>
              )}
              {/* その他スキル */}
              {categorizedOccupationSkills.otherSkills.length > 0 && (
                <section className="space-y-4 p-4 border rounded-lg shadow-md md:col-span-1">
                  {categorizedOccupationSkills.otherSkills.map((skill) => {
                    return (
                      <OtherSKillItem />
                    )
                  })}
                </section>
              )}
              {/* 選択スキル */}
              {categorizedOccupationSkills.choiceSkills.length > 0 && (
                <section className="space-y-4 p-4 border rounded-lg shadow-md md:col-span-1">
                  {categorizedOccupationSkills.choiceSkills.map((skill) => {
                    return (
                      <ChoiceSkillModal />
                    )
                  })}
                </section>
              )}
              {/* 自由選択スキル */}
              {categorizedOccupationSkills.freeChoiceSkills.length > 0 && (
                <section className="space-y-4 p-4 border rounded-lg shadow-md md:col-span-1">
                  {categorizedOccupationSkills.freeChoiceSkills.map((skill) => {
                    return (
                      <FreeChoiceSkillModa />
                    )
                  })}
                </section>
              )}

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
function FixedSkillItem() {

}


// カスタマイズ可能なスキルを表示するコンポーネント
function CustomizableSkillItem() {

}

// その他スキルを表示するコンポーネント
function OtherSKillItem() {

}

// 選択スキルを表示するコンポーネント(モーダル)
function ChoiceSkillModal() {

}


// 全スキルを選択するコンポーネント(モーダル)
function FreeChoiceSkillModa() {

}

// 
import { ChoiceSkill, CustomizableSkill, FixedSkill, OtherSkill, SkillDefinition } from "../constants/occupation-lists";
import { useCharacterSheet } from "../hooks/use-character-sheet";
import { NavigationButton } from "./navigation-button";
import { useSkillForm } from "../hooks/use-skill-form";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import { getFormProps } from "@conform-to/react";
import { SKILL_POINT_ALLOCATION_VALUES } from "../constants/skill-correction-value";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { SKILL_CATEGORY_LIST, SKILL_LIST } from "../constants/skills-list";

export function SkillsForm() {
  const { nextStep, prevStep } = useCharacterSheet();
  const { definedOccupationSkills, form, fields } = useSkillForm();


  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader >
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
              {definedOccupationSkills.map((skillDefinition, index) => {
                return (
                  <SkillCard key={`${skillDefinition.type}-${index}`} skillDefinition={skillDefinition}>{GetSkillItemByType(skillDefinition)}</SkillCard>
                )
              })}

            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <NavigationButton nextStep={nextStep} prevStep={prevStep} />
      </CardFooter>
    </Card>
  );
}


// 固定スキルを表示するアイテムコンポーネント
/*
  スキル名を表示するラベル
  補正値を選択するラジオボタン
 */
function FixedSkillItem({ fixedSkill }: { fixedSkill: FixedSkill }) {
  /** skill id にはskill nameを指定
   *  1つの職業でskill nameは重複しないため
   */
  return (
    <SkillPointAllocationSelector skillId={fixedSkill.skill} />
  )
}


// カスタムスキルを表示するコンポーネント
/**
 * スキル名を表示するラベル
 * 
 */
function CustomizableSkillItem({ customizableSkill }: { customizableSkill: CustomizableSkill }) {

  // placeholderに表示する文字
  let exampleText = "";
  for (const example of customizableSkill.examples ?? "") {
    exampleText += example;
    exampleText += " "
  }
  return (
    <div className="grid sm:grid-cols-2">
      {/* 補正値選択部分 */}
      <SkillPointAllocationSelector skillId={customizableSkill.skill} />
      {/* カスタム値を入力する部分 */}
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor={customizableSkill.skill}>カスタム値を入力</Label>
        <Input id={customizableSkill.skill} placeholder={exampleText} />
      </div>

    </div>
  )
}

// その他スキルを表示するコンポーネント
function OtherSKillItem({ otherSkill }: { otherSkill: OtherSkill }) {
  return (
    <SkillPointAllocationSelector skillId={otherSkill.label} />
  )
}

// 選択スキルを表示するコンポーネント(モーダル)
/* 
   - label 
 * - optionプロパティ内のスキルごとの表示
   - count分、optionプロパティ内のスキルを選択
   - 選択したスキルのみ、ラジオボタンによって補正値、カスタムスキルの内容を保持するようにしたい。

 * 
 */
function ChoiceSkillItem({ choiceSkill }: { choiceSkill: ChoiceSkill }) {
  const [selectedSkills, setSelectedSkills] = useState<ChoiceSkill["options"][0][]>([]);

  // スキルが選択されているかチェックする関数  
  const isSelected = (skill: ChoiceSkill["options"][0]) => {
    return selectedSkills.some(selected => selected.label === skill.label);
  };

  // チェックボックスの状態変更ハンドラー  
  const handleCheckedChange = (checked: boolean, skill: ChoiceSkill["options"][0]) => {
    if (checked) {
      // 選択上限をチェック  
      if (selectedSkills.length < choiceSkill.count) {
        setSelectedSkills([...selectedSkills, skill]);
      }
    } else {
      setSelectedSkills(selectedSkills.filter(selected => selected.label !== skill.label));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <span className="truncate">スキルを選択してください</span>
          <span className="ml-auto text-xs text-muted-foreground">0/{choiceSkill.count}</span>
        </Button>
      </DialogTrigger>
      {/* ダイアログのコンテンツ */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>スキル選択</DialogTitle>
          <DialogDescription>{choiceSkill.label}から{choiceSkill.count}つ選択してください</DialogDescription>
        </DialogHeader>
        {/* スキルを選択するスクロールエリア */}
        <ScrollArea className="h-[300px] p-3">
          <div className="space-y-2">
            {choiceSkill.options.map((optionSkill, index) => {
              const isChecked = isSelected(optionSkill);
              return (
                <div className="rounded-md border p-3" key={`${optionSkill.label}-${index}`}>
                  <div className="flex">
                    {/* 左側: チェックボックスとラベル */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-option-${index}`}
                        checked={isSelected(optionSkill)}
                        onCheckedChange={(checked) =>
                          handleCheckedChange(!!checked, optionSkill)
                        }
                      />
                      <Label htmlFor={`skill-option-${index}`} className="text-sm font-medium cursor-pointer">
                        {optionSkill.label}
                      </Label>
                    </div>

                    {/* 右側: チェックされた場合のスキル設定部分 */}
                    {isChecked && (
                      <div className="pl-4">
                        {GetSkillItemByType(optionSkill)}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
        {/* ダイアログのフッター */}
        <DialogFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">選択済み 0 / ...</div>
          <Button type="button">選択を確定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


// 全スキルを選択するコンポーネント(モーダル)
function FreeChoiceSkillModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <span className="truncate">スキルを選択してください</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {/* dialogではtitleを入れないとエラーが出るため */}
        <DialogHeader><DialogTitle /></DialogHeader>
        {/* タブによりスキル表示 */}
        {FreeChoiceSkillTabs()}
      </DialogContent>
    </Dialog>
  )
}

// タブ表示でスキル選択
/**
 * 戦闘技能,探索技能,行動技能,交渉技能,知識技能の5つのタブ
 * スロールエリアによりスキル表示
 * checkboxによりスキル選択
 * 選択されたスキルは補正, カスタムスキルの場合追加でカスタム値を入力できる
 */
function FreeChoiceSkillTabs() {

  return (
    <Tabs>
      <TabsList>
        {/* 切り替えタブ (戦闘技能,探索技能,行動技能,交渉技能,知識技能) */}
        {SKILL_CATEGORY_LIST.map((skillCategory) => {
          return (<TabsTrigger value={skillCategory.category} key={skillCategory.category}>{skillCategory.label}</TabsTrigger>)
        })}
      </TabsList>
      {/* タブのコンテンツ */}
      {SKILL_CATEGORY_LIST.map((skillCategory) => {
        return (
          <TabsContent key={skillCategory.category} value={skillCategory.category}>
            <ScrollArea className="h-[300px] p-3">
              <div className="space-y-2">
                {SKILL_LIST[skillCategory.category].map((skill, index) => {
                  return (
                    // 各スキルのラベルと各種入力項目のボックス
                    // チェックボックス, ラベル
                    <div key={`${skillCategory.category}-${skill.id}`} className="border rounded-md p-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${skillCategory.category}-${skill.id}`}
                        />
                        <Label htmlFor={`skill-option-${index}`} className="text-sm font-medium cursor-pointer">
                          {skill.label}
                        </Label>
                      </div>

                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}

// 各スキルを表示する際に使用する共通カードコンポーネント
function SkillCard({ children, skillDefinition }: { children: React.ReactNode; skillDefinition: SkillDefinition }) {
  return (
    <Card className="overflow-hidden hover:shadow transition-shadow">
      <CardHeader className="bg-muted/30 py-3 px-4">
        <CardTitle className="flex items-center">
          {skillDefinition.label}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

// 全スキルで使用する補正値選択のラジオボタン
function SkillPointAllocationSelector({ skillId }: { skillId: string }) {
  return (
    // 画面がmdより大きい場合は3列で, それ以外は1列で表示
    <RadioGroup name={`skill-${skillId}`} defaultChecked defaultValue="medium">
      <div className="grid grid-cols-3">
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

// スキルタイプに応じたコンポーネントを表示する関数
function GetSkillItemByType(skillDefinition: SkillDefinition) {
  switch (skillDefinition.type) {
    case "fixed":
      return <FixedSkillItem fixedSkill={skillDefinition} />
    case "customizable":
      return <CustomizableSkillItem customizableSkill={skillDefinition} />
    case "other":
      return <OtherSKillItem otherSkill={skillDefinition} />
    case "choice":
      return <ChoiceSkillItem choiceSkill={skillDefinition} />
    case "free_choice":
      return <FreeChoiceSkillModal />
    default:
      return null;
  }
}

// // スキルタイプに応じたバッジ名を取得する関数
// function GetBudgeNameByType(skillDefinitionType: SkillDefinition["type"]) {
//   switch (skillDefinitionType) {
//     case "fixed":
//       return "固定";
//     case "customizable":
//       return "カスタム"
//     case "other":
//       return "その他";
//     case "choice":
//       return "選択"
//     case "free_choice":
//       return "自由選択"
//     default:
//       return "";
//   }
// }
import { ChoiceSkill, CustomizableSkill, FixedSkill, OtherSkill } from "../constants/occupation-lists";
import { useCharacterSheet } from "../hooks/use-character-sheet";
import { NavigationButton } from "./navigation-button";
import { useSkillForm } from "../hooks/use-skill-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

import { getFormProps } from "@conform-to/react";
import { SKILL_POINT_ALLOCATION_VALUES } from "../constants/skill-correction-value";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

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
                    return <FixedSkillItem key={key} fixedSkill={skillDefinition} />
                  case "customizable":
                    return <CustomizableSkillItem key={key} customizableSkill={skillDefinition} />
                  case "other":
                    return <OtherSKillItem key={key} otherSkill={skillDefinition} />
                  case "choice":
                    return <ChoiceSkillItem key={key} choiceSkill={skillDefinition} />
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
function FixedSkillItem({ fixedSkill }: { fixedSkill: FixedSkill }) {
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

  // placeholderに表示する文字
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
function OtherSKillItem({ otherSkill }: { otherSkill: OtherSkill }) {
  return (
    <Card>
      <CardHeader><CardTitle>{otherSkill.label}</CardTitle></CardHeader>
      <SkillPointAllocationSelector skillId={otherSkill.label} />
    </Card>
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{choiceSkill.label}</CardTitle>
      </CardHeader>
      <CardContent>
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
                  return (
                    <div className="flex items-center space-x-2 rounded-md border p-3" key={`${optionSkill.label}-${index}`} >
                      <Checkbox
                        id={`skill-option-${index}`}
                        checked={isSelected(optionSkill)}
                        onCheckedChange={ }
                      />
                      <div className="flex-1">
                        <Label htmlFor={`skill-option-${index}`} className="text-sm font-medium cursor-pointer" >
                          {optionSkill.label}
                        </Label>
                      </div>
                      {/* チェックされたスキルに応じたコンポーネントを表示するエリア */}
                      {isChecked && (
                        <div className="flex w-full ">
                          {(() => {
                            switch (optionSkill.type) {
                              case "fixed":
                                return <FixedSkillItem fixedSkill={optionSkill} />
                              case "customizable":
                                return <CustomizableSkillItem customizableSkill={optionSkill} />
                              case "other":
                                return <OtherSKillItem otherSkill={optionSkill} />
                              default:
                                return null;
                            }
                          })()}
                        </div>
                      )}
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
      </CardContent>
    </Card>
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
"use client";

import { useCharacterSheet } from "./character-sheet-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { ABILITIES_INFO, AbilityDisplayItemProps } from "../constants/abilities";
import { NavigationButton } from "./navigation-button";

export function AbilitiesForm() {
  const {
    abilities,
    generateAbilitiesAction,
    nextStep,
    prevStep
  } = useCharacterSheet();

  // コンポーネントがマウントされたときに能力値を生成
  useEffect(() => {
    if (!abilities) {
      // 非同期関数を呼び出す
      const generateAbilities = async () => {
        await generateAbilitiesAction();
      };
      generateAbilities();
    }
  }, [abilities, generateAbilitiesAction]);

  // 能力値を再生成
  const handleRegenerate = async () => {
    await generateAbilitiesAction();
  };

  if (!abilities) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">能力値生成中...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">能力値</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 基本能力値と派生能力値を左右に並べるgrid */}
          <div className="grid grid-cols-2 gap-2">
            {/* 左カラム */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">基本能力値</h3>
              <div className="grid grid-cols-2 gap-2">
                {ABILITIES_INFO.basic.map((abilitiesInfo) => {
                  const abilityValue = abilities[abilitiesInfo.id];
                  return (
                    <AbilityDisplayItem
                      key={abilitiesInfo.id}
                      label={abilitiesInfo.label}
                      shortLabel={abilitiesInfo.shortLabel}
                      value={abilityValue}
                    />
                  )
                })}
              </div>
            </div>
            {/* {右カラム} */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">派生能力値</h3>
              <div className="grid grid-cols-2 gap-2">
                {ABILITIES_INFO.derived.map((abilitiesInfo) => {
                  const rawValue = abilities[abilitiesInfo.id];
                  const displayValue = abilitiesInfo.displayFormatter ? abilitiesInfo.displayFormatter(rawValue) : rawValue;
                  return (
                    <AbilityDisplayItem
                      key={abilitiesInfo.id}
                      label={abilitiesInfo.label}
                      shortLabel={abilitiesInfo.shortLabel}
                      value={displayValue}
                      colSpan={abilitiesInfo.colSpan}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-blue-700">技能ポイント</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <div className="text-sm text-blue-600">職業技能ポイント</div>
                <div className="text-xl font-bold text-primary-foreground">{abilities.vocational_skill_points}</div>
              </div>
              <div>
                <div className="text-sm text-blue-600">趣味技能ポイント</div>
                <div className="text-xl font-bold text-primary-foreground" >{abilities.hobby_skill_points}</div>
              </div>
            </div>
          </div>

          <NavigationButton
            nextStep={nextStep}
            prevStep={prevStep}
          >
            <Button variant="outline" onClick={handleRegenerate}>
              能力値を再生成
            </Button>
          </NavigationButton>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        <p>
          能力値はランダムに生成されます。気に入らない場合は再生成ボタンを押してください。
        </p>
      </CardFooter>
    </Card >
  );
}

const AbilityDisplayItem: React.FC<AbilityDisplayItemProps> = ({
  label,
  shortLabel,
  value,
  colSpan = 1
}) => {
  return (
    <div className={`bg-gray-100 p-3 rounded-md ${colSpan === 2 ? 'col-span-2' : ''}`}>
      <div className="text-gray-600">
        {label} {shortLabel}
      </div>
      <div className="text-xl font-bold text-primary-foreground">
        {value}
      </div>
    </div>
  )
}
"use client";

import { useCharacterSheet } from "./character-sheet-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

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

  // 次のステップへ
  const handleNext = () => {
    nextStep();
  };

  // 前のステップへ
  const handlePrev = () => {
    prevStep();
  };

  if (!abilities) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">能力値生成中...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">基本能力値</h3>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">筋力 (STR)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.strength}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">体力 (CON)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.constitution}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">精神力 (POW)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.power}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">機敏 (DEX)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.dexterity}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">外見 (APP)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.appearance}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">体格 (SIZ)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.size}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">知性 (INT)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.intelligence}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">教養 (EDU)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.education}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">派生能力値</h3>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">正気度 (SAN)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.san}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">幸運 (LUCK)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.fortune}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">アイデア (IDEA)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.idea}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">知識 (KNOW)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.knowledge}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">耐久力 (HP)</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.durability}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="text-sm text-gray-600">MP</div>
                  <div className="text-xl font-bold text-primary-foreground">{abilities.magic_point}</div>
                </div>

                <div className="bg-gray-100 p-3 rounded-md col-span-2">
                  <div className="text-sm text-gray-600">ダメージボーナス (DB)</div>
                  <div className="text-xl font-bold text-primary-foreground">
                    {abilities.damage_bonus <= 0 ? "なし" : `+${abilities.damage_bonus}D4`}
                  </div>
                </div>
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

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handlePrev}>
              戻る
            </Button>
            <Button variant="outline" onClick={handleRegenerate}>
              能力値を再生成
            </Button>
            <Button onClick={handleNext}>
              次へ
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        <p>
          能力値はランダムに生成されます。気に入らない場合は再生成ボタンを押してください。
        </p>
      </CardFooter>
    </Card>
  );
}
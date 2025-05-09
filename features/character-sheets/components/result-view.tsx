"use client";

import { useCharacterSheet } from "./character-sheet-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export function ResultView() {
  const {
    characterSheet,
    resetForm,
    prevStep
  } = useCharacterSheet();

  const [activeTab, setActiveTab] = useState<'profile' | 'abilities' | 'skills'>('profile');

  if (!characterSheet) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">エラー</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">キャラクターシートが生成されていません。</p>
          <Button onClick={resetForm} className="mt-4">
            最初からやり直す
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { basicInfo, abilities, skills } = characterSheet;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{basicInfo.name}</CardTitle>
        <div className="text-gray-500">
          {basicInfo.occupation} / {basicInfo.age}歳 / {basicInfo.gender}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* タブナビゲーション */}
          <div className="flex border-b">
            <Button
              className={`px-4 py-2 font-medium ${activeTab === 'profile'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
                }`}
              onClick={() => setActiveTab('profile')}
            >
              プロフィール
            </Button>
            <Button
              className={`px-4 py-2 font-medium ${activeTab === 'abilities'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
                }`}
              onClick={() => setActiveTab('abilities')}
            >
              能力値
            </Button>
            <Button
              className={`px-4 py-2 font-medium ${activeTab === 'skills'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
                }`}
              onClick={() => setActiveTab('skills')}
            >
              技能
            </Button>
          </div>

          {/* プロフィールタブ */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">身長</h3>
                  <p>{basicInfo.height} cm</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">体重</h3>
                  <p>{basicInfo.weight} kg</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">出身</h3>
                  <p>{basicInfo.birthplace}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">背景情報</h3>
                <p className="mt-1 whitespace-pre-wrap">{basicInfo.background}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">行動パターン</h3>
                <p className="mt-1 whitespace-pre-wrap">{basicInfo.behavior}</p>
              </div>
            </div>
          )}

          {/* 能力値タブ */}
          {activeTab === 'abilities' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">基本能力値</h3>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">筋力 (STR)</div>
                      <div className="text-xl font-bold">{abilities.strength}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">体力 (CON)</div>
                      <div className="text-xl font-bold">{abilities.constitution}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">精神力 (POW)</div>
                      <div className="text-xl font-bold">{abilities.power}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">機敏 (DEX)</div>
                      <div className="text-xl font-bold">{abilities.dexterity}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">外見 (APP)</div>
                      <div className="text-xl font-bold">{abilities.appearance}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">体格 (SIZ)</div>
                      <div className="text-xl font-bold">{abilities.size}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">知性 (INT)</div>
                      <div className="text-xl font-bold">{abilities.intelligence}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">教養 (EDU)</div>
                      <div className="text-xl font-bold">{abilities.education}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">派生能力値</h3>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">正気度 (SAN)</div>
                      <div className="text-xl font-bold">{abilities.san}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">幸運 (LUCK)</div>
                      <div className="text-xl font-bold">{abilities.fortune}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">アイデア (IDEA)</div>
                      <div className="text-xl font-bold">{abilities.idea}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">知識 (KNOW)</div>
                      <div className="text-xl font-bold">{abilities.knowledge}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">耐久力 (HP)</div>
                      <div className="text-xl font-bold">{abilities.durability}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md">
                      <div className="text-sm text-gray-600">MP</div>
                      <div className="text-xl font-bold">{abilities.magic_point}</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-md col-span-2">
                      <div className="text-sm text-gray-600">ダメージボーナス (DB)</div>
                      <div className="text-xl font-bold">
                        {abilities.damage_bonus <= 0 ? "なし" : `+${abilities.damage_bonus}D4`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 技能タブ */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {/* 戦闘技能 */}
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">戦闘技能</h3>
                <div className="grid grid-cols-3 gap-3">
                  <SkillItem name="回避" value={skills.combat.dodge} />
                  <SkillItem name="キック" value={skills.combat.kick} />
                  <SkillItem name="組付き" value={skills.combat.grapple} />
                  <SkillItem name="こぶし" value={skills.combat.punch} />
                  <SkillItem name="頭突き" value={skills.combat.headbutt} />
                  <SkillItem name="投擲" value={skills.combat.throw} />
                  <SkillItem name="マーシャルアーツ" value={skills.combat.martialArts} />
                  <SkillItem name="拳銃" value={skills.combat.handgun} />
                  <SkillItem name="サブマシンガン" value={skills.combat.submachineGun} />
                  <SkillItem name="ショットガン" value={skills.combat.shotgun} />
                  <SkillItem name="マシンガン" value={skills.combat.machineGun} />
                  <SkillItem name="ライフル" value={skills.combat.rifle} />
                </div>
              </div>

              {/* 探索技能 */}
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">探索技能</h3>
                <div className="grid grid-cols-3 gap-3">
                  <SkillItem name="応急手当" value={skills.investigation.firstAid} />
                  <SkillItem name="鍵開け" value={skills.investigation.locksmith} />
                  <SkillItem name="隠す" value={skills.investigation.hide} />
                  <SkillItem name="隠れる" value={skills.investigation.conceal} />
                  <SkillItem name="聞き耳" value={skills.investigation.listen} />
                  <SkillItem name="忍び歩き" value={skills.investigation.sneak} />
                  <SkillItem name="写真術" value={skills.investigation.photography} />
                  <SkillItem name="精神分析" value={skills.investigation.psychoanalysis} />
                  <SkillItem name="追跡" value={skills.investigation.track} />
                  <SkillItem name="登攀" value={skills.investigation.climb} />
                  <SkillItem name="図書館" value={skills.investigation.library} />
                  <SkillItem name="目星" value={skills.investigation.spot} />
                </div>
              </div>

              {/* 行動技能 */}
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">行動技能</h3>
                <div className="grid grid-cols-3 gap-3">
                  <SkillItem name="運転" value={skills.action.drive} />
                  <SkillItem name="機械修理" value={skills.action.mechanicalRepair} />
                  <SkillItem name="重機械操作" value={skills.action.operateHeavyMachinery} />
                  <SkillItem name="乗馬" value={skills.action.ride} />
                  <SkillItem name="水泳" value={skills.action.swim} />
                  <SkillItem name="製作" value={skills.action.craft} />
                  <SkillItem name="操縦" value={skills.action.pilot} />
                  <SkillItem name="跳躍" value={skills.action.jump} />
                  <SkillItem name="電気修理" value={skills.action.electricalRepair} />
                  <SkillItem name="ナビゲート" value={skills.action.navigate} />
                  <SkillItem name="変装" value={skills.action.disguise} />
                </div>
              </div>

              {/* 交渉技能 */}
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">交渉技能</h3>
                <div className="grid grid-cols-3 gap-3">
                  <SkillItem name="言いくるめ" value={skills.negotiation.fastTalk} />
                  <SkillItem name="信用" value={skills.negotiation.credit} />
                  <SkillItem name="説得" value={skills.negotiation.persuade} />
                  <SkillItem name="値切り" value={skills.negotiation.bargain} />
                  <SkillItem name="母国語" value={skills.negotiation.nativeLanguage} />
                  <SkillItem name="他の言語" value={skills.negotiation.otherLanguage} />
                </div>
              </div>

              {/* 知識技能 */}
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">知識技能</h3>
                <div className="grid grid-cols-3 gap-3">
                  <SkillItem name="医学" value={skills.knowledge.medicine} />
                  <SkillItem name="オカルト" value={skills.knowledge.occult} />
                  <SkillItem name="化学" value={skills.knowledge.chemistry} />
                  <SkillItem name="クトゥルフ神話" value={skills.knowledge.cthulhuMythos} />
                  <SkillItem name="芸術" value={skills.knowledge.art} />
                  <SkillItem name="経理" value={skills.knowledge.accounting} />
                  <SkillItem name="考古学" value={skills.knowledge.archaeology} />
                  <SkillItem name="コンピュータ" value={skills.knowledge.computer} />
                  <SkillItem name="心理学" value={skills.knowledge.psychology} />
                  <SkillItem name="人類学" value={skills.knowledge.anthropology} />
                  <SkillItem name="生物学" value={skills.knowledge.biology} />
                  <SkillItem name="地質学" value={skills.knowledge.geology} />
                  <SkillItem name="電子工学" value={skills.knowledge.electronics} />
                  <SkillItem name="天文学" value={skills.knowledge.astronomy} />
                  <SkillItem name="博物学" value={skills.knowledge.naturalHistory} />
                  <SkillItem name="物理学" value={skills.knowledge.physics} />
                  <SkillItem name="法律" value={skills.knowledge.law} />
                  <SkillItem name="薬学" value={skills.knowledge.pharmacy} />
                  <SkillItem name="歴史" value={skills.knowledge.history} />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={prevStep}>
              戻る
            </Button>
            <Button variant="outline" onClick={resetForm}>
              最初からやり直す
            </Button>
            <Button onClick={() => window.print()}>
              印刷する
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        <p>
          キャラクターシートが完成しました。印刷ボタンを押すと印刷できます。
        </p>
      </CardFooter>
    </Card>
  );
}

// 技能項目コンポーネント
function SkillItem({ name, value }: { name: string; value: number }) {
  // 技能値によって背景色を変える
  const getBgColor = (value: number) => {
    if (value >= 70) return "bg-green-100";
    if (value >= 50) return "bg-blue-50";
    if (value >= 30) return "bg-gray-100";
    return "bg-gray-50";
  };

  return (
    <div className={`p-2 rounded-md ${getBgColor(value)}`}>
      <div className="text-sm">{name}</div>
      <div className="text-lg font-bold">{value}%</div>
    </div>
  );
}
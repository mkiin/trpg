"use client";

import { useCharacterSheet } from "../hooks/use-character-sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export function SkillsForm() {
  const {
    occupation,
    abilities,
    characterSheet,
    generateCharacterSheetAction,
    nextStep,
    prevStep,
    isLoading
  } = useCharacterSheet();

  const [error, setError] = useState<string | null>(null);

  // 各カテゴリーの展開状態を管理
  const [expandedCategories, setExpandedCategories] = useState({
    combat: true,      // 戦闘技能
    investigation: true, // 探索技能
    action: true,      // 行動技能
    negotiation: true, // 交渉技能
    knowledge: true,   // 知識技能
  });

  // カテゴリーの展開/収納を切り替える関数
  const toggleCategory = (category: keyof typeof expandedCategories) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // コンポーネントがマウントされたときにキャラクターシートを生成
  useEffect(() => {
    const generateSheet = async () => {
      if (!characterSheet && abilities) {
        try {
          await generateCharacterSheetAction();
        } catch (err) {
          console.error(err);
          setError("キャラクターシートの生成に失敗しました。もう一度お試しください。");
        }
      }
    };

    generateSheet();
  }, [characterSheet, abilities, generateCharacterSheetAction]);

  // 技能を再生成
  const handleRegenerate = async () => {
    try {
      await generateCharacterSheetAction();
      setError(null);
    } catch (err) {
      console.error(err);
      setError("キャラクターシートの生成に失敗しました。もう一度お試しください。");
    }
  };

  // 次のステップへ
  const handleNext = () => {
    if (!characterSheet) {
      setError("キャラクターシートが生成されていません。");
      return;
    }

    nextStep();
  };

  // 前のステップへ
  const handlePrev = () => {
    prevStep();
  };

  if (isLoading || !characterSheet) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">技能生成中...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4" />
            <p className="text-gray-500">AIがキャラクターの技能を生成しています...</p>
          </div>
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}
        </CardContent>
      </Card>
    );
  }

  const { skills } = characterSheet;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">技能</CardTitle>
        <p className="text-muted-foreground">職業: {occupation}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 戦闘技能 */}
          <div className="border rounded-md overflow-hidden">
            <Button
              className="w-full flex items-center justify-between p-3 bg-secondary/50 hover:bg-secondary/70 transition-colors"
              onClick={() => toggleCategory('combat')}
            >
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                {expandedCategories.combat ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                戦闘技能
              </h3>
              <span className="text-sm text-muted-foreground">{Object.keys(skills.combat).length}項目</span>
            </Button>
            {expandedCategories.combat && (
              <div className="p-3">
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
            )}
          </div>

          {/* 探索技能 */}
          <div className="border rounded-md overflow-hidden">
            <Button
              className="w-full flex items-center justify-between p-3 bg-secondary/50 hover:bg-secondary/70 transition-colors"
              onClick={() => toggleCategory('investigation')}
            >
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                {expandedCategories.investigation ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                探索技能
              </h3>
              <span className="text-sm text-muted-foreground">{Object.keys(skills.investigation).length}項目</span>
            </Button>
            {expandedCategories.investigation && (
              <div className="p-3">
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
            )}
          </div>

          {/* 行動技能 */}
          <div className="border rounded-md overflow-hidden">
            <Button
              className="w-full flex items-center justify-between p-3 bg-secondary/50 hover:bg-secondary/70 transition-colors"
              onClick={() => toggleCategory('action')}
            >
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                {expandedCategories.action ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                行動技能
              </h3>
              <span className="text-sm text-muted-foreground">{Object.keys(skills.action).length}項目</span>
            </Button>
            {expandedCategories.action && (
              <div className="p-3">
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
            )}
          </div>

          {/* 交渉技能 */}
          <div className="border rounded-md overflow-hidden">
            <Button
              className="w-full flex items-center justify-between p-3 bg-secondary/50 hover:bg-secondary/70 transition-colors"
              onClick={() => toggleCategory('negotiation')}
            >
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                {expandedCategories.negotiation ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                交渉技能
              </h3>
              <span className="text-sm text-muted-foreground">{Object.keys(skills.negotiation).length}項目</span>
            </Button>
            {expandedCategories.negotiation && (
              <div className="p-3">
                <div className="grid grid-cols-3 gap-3">
                  <SkillItem name="言いくるめ" value={skills.negotiation.fastTalk} />
                  <SkillItem name="信用" value={skills.negotiation.credit} />
                  <SkillItem name="説得" value={skills.negotiation.persuade} />
                  <SkillItem name="値切り" value={skills.negotiation.bargain} />
                  <SkillItem name="母国語" value={skills.negotiation.nativeLanguage} />
                  <SkillItem name="他の言語" value={skills.negotiation.otherLanguage} />
                </div>
              </div>
            )}
          </div>

          {/* 知識技能 */}
          <div className="border rounded-md overflow-hidden">
            <Button
              className="w-full flex items-center justify-between p-3 bg-secondary/50 hover:bg-secondary/70 transition-colors"
              onClick={() => toggleCategory('knowledge')}
            >
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                {expandedCategories.knowledge ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                知識技能
              </h3>
              <span className="text-sm text-muted-foreground">{Object.keys(skills.knowledge).length}項目</span>
            </Button>
            {expandedCategories.knowledge && (
              <div className="p-3">
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
            )}
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handlePrev}>
              戻る
            </Button>
            <Button variant="outline" onClick={handleRegenerate}>
              技能を再生成
            </Button>
            <Button onClick={handleNext}>
              次へ
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>
          技能はAIによって職業「{occupation}」に適した値が設定されています。
        </p>
      </CardFooter>
    </Card>
  );
}

// 技能項目コンポーネント
function SkillItem({ name, value }: { name: string; value: number }) {
  // 技能値によって背景色を変える（ダークモード対応）
  const getBgColorClass = (value: number) => {
    if (value >= 70) return "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100";
    if (value >= 50) return "bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100";
    if (value >= 30) return "bg-gray-100 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100";
    return "bg-gray-50 dark:bg-gray-900/30 text-gray-900 dark:text-gray-300";
  };

  return (
    <div className={`p-2 rounded-md ${getBgColorClass(value)}`}>
      <div className="text-sm">{name}</div>
      <div className="text-lg font-bold">{value}%</div>
    </div>
  );
}
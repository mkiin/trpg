"use client";

import { useCharacterSheet } from "./character-sheet-context";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ALL_OCCUPATIONS, Occupation, OCCUPATION_GROUPS } from "../types";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function BasicInfoForm() {
  const {
    occupation,
    setOccupation,
    age,
    setAge,
    gender,
    setGender,
    nextStep
  } = useCharacterSheet();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    if (!occupation) {
      setError("職業を選択してください");
      return;
    }

    if (!age || age < 15 || age > 90) {
      setError("年齢は15〜90の間で入力してください");
      return;
    }

    if (!gender) {
      setError("性別を選択してください");
      return;
    }

    // エラーをクリア
    setError(null);

    // 次のステップへ
    nextStep();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">基本情報</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 職業選択 */}
          <Select
            value={occupation}
            onValueChange={(value) => setOccupation(value as Occupation)}
          >
            <Label htmlFor="occupation" className="block text-sm font-medium">職業選択</Label>
            <SelectTrigger className="">
              <SelectValue placeholder="職業を選択してください。" />
            </SelectTrigger>
            <SelectContent>
              {OCCUPATION_GROUPS.map((group, groupIndex) => (
                <SelectGroup key={group.label ?? `group-${groupIndex}`}>
                  {group.label && <SelectLabel>{group.label}</SelectLabel>}
                  {group.options.map((occupation) => (
                    <SelectItem key={occupation} value={occupation}>
                      {occupation}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>


          {/* 年齢入力 */}
          <div className="space-y-2">
            <Label htmlFor="age" className="block text-sm font-medium">
              年齢
            </Label>
            <Input
              id="age"
              type="number"
              min={15}
              max={90}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md text-primary"
            />
          </div>

          {/* 性別選択 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">性別</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="男性"
                  checked={gender === "男性"}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                />
                男性
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="女性"
                  checked={gender === "女性"}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                />
                女性
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="その他"
                  checked={gender === "その他"}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                />
                その他
              </label>
            </div>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="pt-4">
            <Button type="submit" className="w-full">
              次へ
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        <p>
          基本情報を入力すると、AIがキャラクターの詳細を生成します。
        </p>
      </CardFooter>
    </Card>
  );
}
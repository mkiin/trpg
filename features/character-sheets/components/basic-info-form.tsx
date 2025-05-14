"use client";

import { useBasicForm } from "../hooks/use-basic-form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { OCCUPATION_GROUPS } from "../constants/job-lists";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getInputProps, getFormProps } from "@conform-to/react";

export function BasicInfoForm() {
  const { form, fields } = useBasicForm();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">基本情報</CardTitle>
      </CardHeader>
      <CardContent>
        <form {...getFormProps(form)} className="space-y-6">
          {/* フォームエラー表示 */}
          {form.errors && (
            <div className="text-red-500 text-sm" id={form.errorId}>{form.errors}</div>
          )}

          {/* 職業選択 */}
          <div>
            <Label htmlFor={fields.occupation.id} className="block text-sm font-medium">職業選択</Label>
            <Select
              defaultValue={fields.occupation.initialValue}
              onValueChange={(value) => {
                form.update({ name: fields.occupation.name, value });
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="職業を選択してください。" />
              </SelectTrigger>
              <SelectContent>
                {OCCUPATION_GROUPS.map((group, groupIndex) => (
                  group.label ? (
                    <SelectGroup key={`${group.options}-${groupIndex}`}>
                      <SelectLabel>{group.label}</SelectLabel>
                      {group.options.map(option => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ) : (
                    group.options.map(option => (
                      <SelectItem value={option.value} key={option.value}>
                        {option.label}
                      </SelectItem>
                    ))
                  )
                ))}
              </SelectContent>
            </Select>
            {fields.occupation.errors && (
              <div className="text-red-500 text-sm" id={fields.occupation.errorId}>
                {fields.occupation.errors}
              </div>
            )}
          </div>

          {/* 年齢入力 */}
          <div className="space-y-2">
            <Label htmlFor={fields.age.id} className="block text-sm font-medium">
              年齢
            </Label>
            <Input
              {...getInputProps(fields.age, { type: "number" })}
              min={15}
              max={90}
              className="w-full p-2 border border-gray-300 rounded-md text-primary"
            />
            {fields.age.errors && (
              <div className="text-red-500 text-sm" id={fields.age.errorId}>
                {fields.age.errors}
              </div>
            )}
          </div>

          {/* 性別選択 */}
          <div className="space-y-2">
            <Label className="block text-sm font-medium">性別</Label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={fields.gender.name}
                  value="man"
                  defaultChecked={fields.gender.initialValue === "man"}
                  className="mr-2"
                />
                男性
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={fields.gender.name}
                  value="woman"
                  defaultChecked={fields.gender.initialValue === "woman"}
                  className="mr-2"
                />
                女性
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={fields.gender.name}
                  value="その他"
                  defaultChecked={fields.gender.initialValue === "その他"}
                  className="mr-2"
                />
                その他
              </label>
            </div>
            {fields.gender.errors && (
              <div className="text-red-500 text-sm" id={fields.gender.errorId}>
                {fields.gender.errors}
              </div>
            )}
          </div>

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
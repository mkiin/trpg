"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { autoGenerationFormSchema } from "../types/schemas/auto-generation-schema";
import { OCCUPATIONS } from "../constants/occupation-lists";
import { generateCharacterSheet } from "../actions/generate-character-actions";
import type { CharacterSheet } from "../types/character-sheet-types";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function CharacterSheetForm() {
	const [generatedCharacter, setGeneratedCharacter] =
		useState<CharacterSheet | null>(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsGenerating(true);
		setError(null);

		const formData = new FormData(e.currentTarget);
		
		try {
			const result = await generateCharacterSheet(formData);
			if (result.success && result.data) {
				setGeneratedCharacter(result.data);
			} else {
				setError(result.error || "生成に失敗しました");
			}
		} catch (err) {
			console.error("エラー:", err);
			setError("予期しないエラーが発生しました");
		} finally {
			setIsGenerating(false);
		}
	};

	const [form, fields] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: autoGenerationFormSchema });
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	});

	return (
		<div className="container mx-auto p-4 max-w-6xl">
			<Card>
				<CardHeader>
					<CardTitle>キャラクターシート自動生成</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						id={form.id}
						onSubmit={handleSubmit}
						className="space-y-6"
					>
						<div className="space-y-2">
							<Label htmlFor={fields.occupation.id}>職業</Label>
							<Select
								name={fields.occupation.name}
								defaultValue={fields.occupation.initialValue || ""}
							>
								<SelectTrigger id={fields.occupation.id}>
									<SelectValue placeholder="職業を選択してください" />
								</SelectTrigger>
								<SelectContent>
									{OCCUPATIONS.map((occupation) => (
										<SelectItem key={occupation.value} value={occupation.value}>
											{occupation.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{fields.occupation.errors && (
								<p className="text-sm text-red-500">
									{fields.occupation.errors[0]}
								</p>
							)}
						</div>

						{error && (
							<p className="text-sm text-red-500">{error}</p>
						)}

						<Button type="submit" disabled={isGenerating} className="w-full">
							{isGenerating ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									生成中...
								</>
							) : (
								"キャラクターを生成"
							)}
						</Button>
					</form>

					{generatedCharacter && (
						<div className="mt-8 space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>基本情報</CardTitle>
								</CardHeader>
								<CardContent>
									<dl className="grid grid-cols-2 gap-4">
										<div>
											<dt className="font-semibold">名前</dt>
											<dd>{generatedCharacter.basic.name}</dd>
										</div>
										<div>
											<dt className="font-semibold">職業</dt>
											<dd>
												{OCCUPATIONS.find(
													(o) => o.value === generatedCharacter.basic.occupation,
												)?.label || generatedCharacter.basic.occupation}
											</dd>
										</div>
										<div>
											<dt className="font-semibold">年齢</dt>
											<dd>{generatedCharacter.basic.age}歳</dd>
										</div>
										<div>
											<dt className="font-semibold">性別</dt>
											<dd>
												{generatedCharacter.basic.gender === "man"
													? "男性"
													: generatedCharacter.basic.gender === "woman"
													? "女性"
													: "その他"}
											</dd>
										</div>
										<div>
											<dt className="font-semibold">身長</dt>
											<dd>{generatedCharacter.basic.height}cm</dd>
										</div>
										<div>
											<dt className="font-semibold">体重</dt>
											<dd>{generatedCharacter.basic.weight}kg</dd>
										</div>
										<div>
											<dt className="font-semibold">出身地</dt>
											<dd>{generatedCharacter.basic.birthplace}</dd>
										</div>
									</dl>
									<div className="mt-4 space-y-4">
										<div>
											<h4 className="font-semibold">背景情報</h4>
											<p className="mt-1 text-sm">
												{generatedCharacter.basic.background}
											</p>
										</div>
										<div>
											<h4 className="font-semibold">行動パターン</h4>
											<p className="mt-1 text-sm">
												{generatedCharacter.basic.behavior}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>能力値</CardTitle>
								</CardHeader>
								<CardContent>
									<dl className="grid grid-cols-3 gap-4">
										<div>
											<dt className="font-semibold">STR（筋力）</dt>
											<dd>{generatedCharacter.ability.strength}</dd>
										</div>
										<div>
											<dt className="font-semibold">CON（体力）</dt>
											<dd>{generatedCharacter.ability.constitution}</dd>
										</div>
										<div>
											<dt className="font-semibold">POW（精神力）</dt>
											<dd>{generatedCharacter.ability.power}</dd>
										</div>
										<div>
											<dt className="font-semibold">DEX（機敏）</dt>
											<dd>{generatedCharacter.ability.dexterity}</dd>
										</div>
										<div>
											<dt className="font-semibold">APP（外見）</dt>
											<dd>{generatedCharacter.ability.appearance}</dd>
										</div>
										<div>
											<dt className="font-semibold">SIZ（体格）</dt>
											<dd>{generatedCharacter.ability.size}</dd>
										</div>
										<div>
											<dt className="font-semibold">INT（知性）</dt>
											<dd>{generatedCharacter.ability.intelligence}</dd>
										</div>
										<div>
											<dt className="font-semibold">EDU（教養）</dt>
											<dd>{generatedCharacter.ability.education}</dd>
										</div>
										<div>
											<dt className="font-semibold">SAN（正気度）</dt>
											<dd>{generatedCharacter.ability.san}</dd>
										</div>
										<div>
											<dt className="font-semibold">幸運</dt>
											<dd>{generatedCharacter.ability.fortune}</dd>
										</div>
										<div>
											<dt className="font-semibold">アイデア</dt>
											<dd>{generatedCharacter.ability.idea}</dd>
										</div>
										<div>
											<dt className="font-semibold">知識</dt>
											<dd>{generatedCharacter.ability.knowledge}</dd>
										</div>
										<div>
											<dt className="font-semibold">耐久力</dt>
											<dd>{generatedCharacter.ability.durability}</dd>
										</div>
										<div>
											<dt className="font-semibold">MP</dt>
											<dd>{generatedCharacter.ability.magicPoint}</dd>
										</div>
										<div>
											<dt className="font-semibold">ダメージボーナス</dt>
											<dd>{generatedCharacter.ability.damageBonus}</dd>
										</div>
									</dl>
									<div className="mt-4 pt-4 border-t">
										<dl className="grid grid-cols-2 gap-4">
											<div>
												<dt className="font-semibold">職業技能ポイント</dt>
												<dd>{generatedCharacter.ability.vocationalSkillPoints}</dd>
											</div>
											<div>
												<dt className="font-semibold">趣味技能ポイント</dt>
												<dd>{generatedCharacter.ability.hobbySkillPoints}</dd>
											</div>
										</dl>
									</div>
								</CardContent>
							</Card>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
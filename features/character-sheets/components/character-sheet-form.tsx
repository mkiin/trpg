"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	getFormProps,
	getTextareaProps,
	useForm,
	useInputControl,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { generateCharacterSheet } from "../actions/generate-character-actions";
import { OCCUPATIONS } from "../constants/occupation-lists";
import { autoGenerationFormSchema } from "../types/schemas/auto-generation-schema";
import type { CharacterSheetWithDetails } from "../types/skill-details-types";

// 結果表示コンポーネントを動的インポート
const CharacterSheetResult = dynamic(
	() =>
		import("./character-sheet-result").then((mod) => ({
			default: mod.CharacterSheetResult,
		})),
	{
		loading: () => (
			<div className="mt-8 flex items-center justify-center p-8">
				<Loader2 className="h-6 w-6 animate-spin" />
				<span className="ml-2">結果を読み込み中...</span>
			</div>
		),
		ssr: false,
	},
);

export function CharacterSheetForm() {
	const [generatedCharacter, setGeneratedCharacter] =
		useState<CharacterSheetWithDetails | null>(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [form, fields] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: autoGenerationFormSchema });
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
		onSubmit: async (_event, { formData }) => {


			setIsGenerating(true);
			setError(null);
			setGeneratedCharacter(null); // 前の結果をクリア

			try {
				const result = await generateCharacterSheet(formData);
				if (result.success && result.data) {
					setGeneratedCharacter(result.data);
					// AIが利用できない場合の警告を表示
					if (result.data.basic.background.includes("後で設定してください")) {
						setError(
							"⚠️ AI生成サービスが一時的に利用できないため、基本的な情報のみ生成されました。背景情報は後で編集してください。",
						);
					}
				} else {
					setError(result.error || "生成に失敗しました");
					return { status: "error", error: result.error || "生成に失敗しました" };
				}
			} catch (err) {
				const errorMessage = err instanceof Error
					? `エラーが発生しました: ${err.message}`
					: "予期しないエラーが発生しました";
				setError(errorMessage);
				return { status: "error", error: errorMessage };
			} finally {
				setIsGenerating(false);
			}

			return { status: "success" };
		},
	});

	const occupationControl = useInputControl(fields.occupation);
	const isSubmitDisabled = isGenerating || !occupationControl.value;

	console.log("Form props:", getFormProps(form));

	return (
		<div className="container mx-auto p-4 max-w-6xl">
			<Card>
				<CardHeader>
					<CardTitle>キャラクターシート自動生成</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						{...getFormProps(form)}
						onSubmit={(e) => {
							e.preventDefault()
							form.onSubmit(e)
						}}
						className="space-y-6"
					>
						<div className="space-y-2">
							<Label htmlFor={fields.occupation.id}>職業</Label>
							<Select
								name={fields.occupation.name}
								defaultValue={fields.occupation.initialValue || ""}
								onValueChange={occupationControl.change}
								value={occupationControl.value || ""}
							>
								<SelectTrigger id={fields.occupation.id}>
									<SelectValue placeholder="職業を選択してください" />
								</SelectTrigger>
								<SelectContent>
									{OCCUPATIONS.map((occupation) => (
										<SelectItem
											key={occupation.value}
											value={occupation.value}
										>
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

						<div className="space-y-2">
							<Label htmlFor={fields.additionalContext.id}>
								追加コンテキスト（任意）
							</Label>
							<Textarea
								{...getTextareaProps(fields.additionalContext)}
								placeholder="特定の背景、国籍、性格特徴など、キャラクター生成に反映したい追加情報があれば入力してください"
								className="min-h-[80px]"
							/>
							{fields.additionalContext.errors && (
								<p className="text-sm text-red-500">
									{fields.additionalContext.errors[0]}
								</p>
							)}
						</div>

						{error && (
							<div
								className={`p-3 rounded-md border text-sm ${error.startsWith("⚠️")
									? "bg-yellow-50 border-yellow-200 text-yellow-800"
									: "bg-red-50 border-red-200 text-red-800"
									}`}
							>
								{error}
							</div>
						)}

						<Button
							type="submit"
							disabled={isSubmitDisabled}
							className="w-full"
						>
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
						<Suspense
							fallback={
								<div className="mt-8 flex items-center justify-center p-8">
									<Loader2 className="h-6 w-6 animate-spin" />
									<span className="ml-2">結果を読み込み中...</span>
								</div>
							}
						>
							<CharacterSheetResult character={generatedCharacter} />
						</Suspense>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

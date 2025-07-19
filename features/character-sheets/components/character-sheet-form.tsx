"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { autoGenerationFormSchema } from "../types/schemas/auto-generation-schema";
import { OCCUPATIONS } from "../constants/occupation-lists";
import { generateCharacterSheet } from "../actions/generate-character-actions";
import type { CharacterSheetWithDetails } from "../types/skill-details-types";
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
		useState<CharacterSheetWithDetails | null>(null);
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

							{generatedCharacter.skills && (
								<Card>
									<CardHeader>
										<CardTitle>技能</CardTitle>
									</CardHeader>
									<CardContent className="space-y-6">
										<div>
											<h4 className="font-semibold mb-3">戦闘技能</h4>
											<dl className="grid grid-cols-3 gap-3">
												<div>
													<dt className="text-sm text-gray-600">回避</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.dodge}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">キック</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.kick}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">組み付き</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.grapple}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">こぶし</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.punch}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">頭突き</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.headbutt}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">投擲</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.throw}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">マーシャルアーツ</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.martialArts}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">拳銃</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.handgun}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">サブマシンガン</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.submachineGun}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">ショットガン</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.shotgun}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">マシンガン</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.machineGun}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">ライフル</dt>
													<dd className="font-medium">{generatedCharacter.skills.combat.rifle}</dd>
												</div>
											</dl>
										</div>

										<div>
											<h4 className="font-semibold mb-3">探索技能</h4>
											<dl className="grid grid-cols-3 gap-3">
												<div>
													<dt className="text-sm text-gray-600">応急手当</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.firstAid}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">鍵開け</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.locksmith}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">隠す</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.hide}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">隠れる</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.conceal}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">聞き耳</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.listen}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">忍び歩き</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.sneak}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">写真術</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.photography}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">精神分析</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.psychoanalysis}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">追跡</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.track}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">登攀</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.climb}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">図書館</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.library}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">目星</dt>
													<dd className="font-medium">{generatedCharacter.skills.investigation.spot}</dd>
												</div>
											</dl>
										</div>

										<div>
											<h4 className="font-semibold mb-3">行動技能</h4>
											<dl className="grid grid-cols-3 gap-3">
												<div>
													<dt className="text-sm text-gray-600">
														運転
														{generatedCharacter.skillDetails.drive && (
															<span className="text-blue-600">（{generatedCharacter.skillDetails.drive}）</span>
														)}
													</dt>
													<dd className="font-medium">{generatedCharacter.skills.action.drive}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">機械修理</dt>
													<dd className="font-medium">{generatedCharacter.skills.action.mechanicalRepair}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">重機械操作</dt>
													<dd className="font-medium">{generatedCharacter.skills.action.operateHeavyMachinery}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">乗馬</dt>
													<dd className="font-medium">{generatedCharacter.skills.action.ride}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">水泳</dt>
													<dd className="font-medium">{generatedCharacter.skills.action.swim}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">
														製作
														{generatedCharacter.skillDetails.craft && (
															<span className="text-blue-600">（{generatedCharacter.skillDetails.craft}）</span>
														)}
													</dt>
													<dd className="font-medium">{generatedCharacter.skills.action.craft}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">
														操縦
														{generatedCharacter.skillDetails.pilot && (
															<span className="text-blue-600">（{generatedCharacter.skillDetails.pilot}）</span>
														)}
													</dt>
													<dd className="font-medium">{generatedCharacter.skills.action.pilot}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">跳躍</dt>
													<dd className="font-medium">{generatedCharacter.skills.action.jump}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">電気修理</dt>
													<dd className="font-medium">{generatedCharacter.skills.action.electricalRepair}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">ナビゲート</dt>
													<dd className="font-medium">{generatedCharacter.skills.action.navigate}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">変装</dt>
													<dd className="font-medium">{generatedCharacter.skills.action.disguise}</dd>
												</div>
											</dl>
										</div>

										<div>
											<h4 className="font-semibold mb-3">交渉技能</h4>
											<dl className="grid grid-cols-3 gap-3">
												<div>
													<dt className="text-sm text-gray-600">言いくるめ</dt>
													<dd className="font-medium">{generatedCharacter.skills.negotiation.fastTalk}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">信用</dt>
													<dd className="font-medium">{generatedCharacter.skills.negotiation.credit}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">説得</dt>
													<dd className="font-medium">{generatedCharacter.skills.negotiation.persuade}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">値切り</dt>
													<dd className="font-medium">{generatedCharacter.skills.negotiation.bargain}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">母国語</dt>
													<dd className="font-medium">{generatedCharacter.skills.negotiation.nativeLanguage}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">
														他の言語
														{generatedCharacter.skillDetails.otherLanguage && (
															<span className="text-blue-600">（{generatedCharacter.skillDetails.otherLanguage}）</span>
														)}
													</dt>
													<dd className="font-medium">{generatedCharacter.skills.negotiation.otherLanguage}</dd>
												</div>
											</dl>
										</div>

										<div>
											<h4 className="font-semibold mb-3">知識技能</h4>
											<dl className="grid grid-cols-3 gap-3">
												<div>
													<dt className="text-sm text-gray-600">医学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.medicine}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">オカルト</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.occult}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">化学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.chemistry}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">クトゥルフ神話</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.cthulhuMythos}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">
														芸術
														{generatedCharacter.skillDetails.art && (
															<span className="text-blue-600">（{generatedCharacter.skillDetails.art}）</span>
														)}
													</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.art}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">経理</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.accounting}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">考古学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.archaeology}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">コンピュータ</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.computer}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">心理学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.psychology}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">人類学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.anthropology}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">生物学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.biology}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">地質学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.geology}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">電子工学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.electronics}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">天文学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.astronomy}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">博物学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.naturalHistory}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">物理学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.physics}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">法律</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.law}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">薬学</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.pharmacy}</dd>
												</div>
												<div>
													<dt className="text-sm text-gray-600">歴史</dt>
													<dd className="font-medium">{generatedCharacter.skills.knowledge.history}</dd>
												</div>
											</dl>
										</div>
									</CardContent>
								</Card>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
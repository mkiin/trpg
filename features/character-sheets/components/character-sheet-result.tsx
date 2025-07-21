"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OCCUPATIONS } from "../constants/occupation-lists";
import type { CharacterSheetWithDetails } from "../types/skill-details-types";

interface CharacterSheetResultProps {
	character: CharacterSheetWithDetails;
}

export function CharacterSheetResult({ character }: CharacterSheetResultProps) {
	// 職業ラベルをメモ化
	const occupationLabel = useMemo(
		() =>
			OCCUPATIONS.find((o) => o.value === character.basic.occupation)?.label ||
			character.basic.occupation,
		[character.basic.occupation],
	);

	// 性別表示をメモ化
	const genderLabel = useMemo(() => {
		switch (character.basic.gender) {
			case "man":
				return "男性";
			case "woman":
				return "女性";
			default:
				return "その他";
		}
	}, [character.basic.gender]);

	return (
		<div className="mt-8 space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>基本情報</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid grid-cols-2 gap-4">
						<div>
							<dt className="font-semibold">名前</dt>
							<dd>{character.basic.name}</dd>
						</div>
						<div>
							<dt className="font-semibold">職業</dt>
							<dd>{occupationLabel}</dd>
						</div>
						<div>
							<dt className="font-semibold">年齢</dt>
							<dd>{character.basic.age}歳</dd>
						</div>
						<div>
							<dt className="font-semibold">性別</dt>
							<dd>{genderLabel}</dd>
						</div>
						<div>
							<dt className="font-semibold">身長</dt>
							<dd>{character.basic.height}cm</dd>
						</div>
						<div>
							<dt className="font-semibold">体重</dt>
							<dd>{character.basic.weight}kg</dd>
						</div>
						<div>
							<dt className="font-semibold">出身地</dt>
							<dd>{character.basic.birthplace}</dd>
						</div>
					</dl>
					<div className="mt-4 space-y-4">
						<div>
							<h4 className="font-semibold">背景情報</h4>
							<p className="mt-1 text-sm">{character.basic.background}</p>
						</div>
						<div>
							<h4 className="font-semibold">行動パターン</h4>
							<p className="mt-1 text-sm">{character.basic.behavior}</p>
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
							<dd>{character.ability.strength}</dd>
						</div>
						<div>
							<dt className="font-semibold">CON（体力）</dt>
							<dd>{character.ability.constitution}</dd>
						</div>
						<div>
							<dt className="font-semibold">POW（精神力）</dt>
							<dd>{character.ability.power}</dd>
						</div>
						<div>
							<dt className="font-semibold">DEX（機敏）</dt>
							<dd>{character.ability.dexterity}</dd>
						</div>
						<div>
							<dt className="font-semibold">APP（外見）</dt>
							<dd>{character.ability.appearance}</dd>
						</div>
						<div>
							<dt className="font-semibold">SIZ（体格）</dt>
							<dd>{character.ability.size}</dd>
						</div>
						<div>
							<dt className="font-semibold">INT（知性）</dt>
							<dd>{character.ability.intelligence}</dd>
						</div>
						<div>
							<dt className="font-semibold">EDU（教養）</dt>
							<dd>{character.ability.education}</dd>
						</div>
						<div>
							<dt className="font-semibold">SAN（正気度）</dt>
							<dd>{character.ability.san}</dd>
						</div>
						<div>
							<dt className="font-semibold">幸運</dt>
							<dd>{character.ability.fortune}</dd>
						</div>
						<div>
							<dt className="font-semibold">アイデア</dt>
							<dd>{character.ability.idea}</dd>
						</div>
						<div>
							<dt className="font-semibold">知識</dt>
							<dd>{character.ability.knowledge}</dd>
						</div>
						<div>
							<dt className="font-semibold">耐久力</dt>
							<dd>{character.ability.durability}</dd>
						</div>
						<div>
							<dt className="font-semibold">MP</dt>
							<dd>{character.ability.magicPoint}</dd>
						</div>
						<div>
							<dt className="font-semibold">ダメージボーナス</dt>
							<dd>{character.ability.damageBonus}</dd>
						</div>
					</dl>
					<div className="mt-4 pt-4 border-t">
						<dl className="grid grid-cols-2 gap-4">
							<div>
								<dt className="font-semibold">職業技能ポイント</dt>
								<dd>{character.ability.vocationalSkillPoints}</dd>
							</div>
							<div>
								<dt className="font-semibold">趣味技能ポイント</dt>
								<dd>{character.ability.hobbySkillPoints}</dd>
							</div>
						</dl>
					</div>
				</CardContent>
			</Card>

			{character.skills && (
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
									<dd className="font-medium">{character.skills.combat.dodge}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">キック</dt>
									<dd className="font-medium">{character.skills.combat.kick}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">組み付き</dt>
									<dd className="font-medium">{character.skills.combat.grapple}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">こぶし</dt>
									<dd className="font-medium">{character.skills.combat.punch}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">頭突き</dt>
									<dd className="font-medium">{character.skills.combat.headbutt}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">投擲</dt>
									<dd className="font-medium">{character.skills.combat.throw}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">マーシャルアーツ</dt>
									<dd className="font-medium">{character.skills.combat.martialArts}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">拳銃</dt>
									<dd className="font-medium">{character.skills.combat.handgun}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">サブマシンガン</dt>
									<dd className="font-medium">{character.skills.combat.submachineGun}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">ショットガン</dt>
									<dd className="font-medium">{character.skills.combat.shotgun}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">マシンガン</dt>
									<dd className="font-medium">{character.skills.combat.machineGun}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">ライフル</dt>
									<dd className="font-medium">{character.skills.combat.rifle}</dd>
								</div>
							</dl>
						</div>

						<div>
							<h4 className="font-semibold mb-3">探索技能</h4>
							<dl className="grid grid-cols-3 gap-3">
								<div>
									<dt className="text-sm text-gray-600">応急手当</dt>
									<dd className="font-medium">{character.skills.investigation.firstAid}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">鍵開け</dt>
									<dd className="font-medium">{character.skills.investigation.locksmith}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">隠す</dt>
									<dd className="font-medium">{character.skills.investigation.hide}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">隠れる</dt>
									<dd className="font-medium">{character.skills.investigation.conceal}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">聞き耳</dt>
									<dd className="font-medium">{character.skills.investigation.listen}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">忍び歩き</dt>
									<dd className="font-medium">{character.skills.investigation.sneak}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">写真術</dt>
									<dd className="font-medium">{character.skills.investigation.photography}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">精神分析</dt>
									<dd className="font-medium">{character.skills.investigation.psychoanalysis}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">追跡</dt>
									<dd className="font-medium">{character.skills.investigation.track}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">登攀</dt>
									<dd className="font-medium">{character.skills.investigation.climb}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">図書館</dt>
									<dd className="font-medium">{character.skills.investigation.library}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">目星</dt>
									<dd className="font-medium">{character.skills.investigation.spot}</dd>
								</div>
							</dl>
						</div>

						<div>
							<h4 className="font-semibold mb-3">行動技能</h4>
							<dl className="grid grid-cols-3 gap-3">
								<div>
									<dt className="text-sm text-gray-600">
										運転
										{character.skillDetails.drive && (
											<span className="text-blue-600">（{character.skillDetails.drive}）</span>
										)}
									</dt>
									<dd className="font-medium">{character.skills.action.drive}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">機械修理</dt>
									<dd className="font-medium">{character.skills.action.mechanicalRepair}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">重機械操作</dt>
									<dd className="font-medium">{character.skills.action.operateHeavyMachinery}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">乗馬</dt>
									<dd className="font-medium">{character.skills.action.ride}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">水泳</dt>
									<dd className="font-medium">{character.skills.action.swim}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">
										製作
										{character.skillDetails.craft && (
											<span className="text-blue-600">（{character.skillDetails.craft}）</span>
										)}
									</dt>
									<dd className="font-medium">{character.skills.action.craft}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">
										操縦
										{character.skillDetails.pilot && (
											<span className="text-blue-600">（{character.skillDetails.pilot}）</span>
										)}
									</dt>
									<dd className="font-medium">{character.skills.action.pilot}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">跳躍</dt>
									<dd className="font-medium">{character.skills.action.jump}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">電気修理</dt>
									<dd className="font-medium">{character.skills.action.electricalRepair}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">ナビゲート</dt>
									<dd className="font-medium">{character.skills.action.navigate}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">変装</dt>
									<dd className="font-medium">{character.skills.action.disguise}</dd>
								</div>
							</dl>
						</div>

						<div>
							<h4 className="font-semibold mb-3">交渉技能</h4>
							<dl className="grid grid-cols-3 gap-3">
								<div>
									<dt className="text-sm text-gray-600">言いくるめ</dt>
									<dd className="font-medium">{character.skills.negotiation.fastTalk}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">信用</dt>
									<dd className="font-medium">{character.skills.negotiation.credit}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">説得</dt>
									<dd className="font-medium">{character.skills.negotiation.persuade}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">値切り</dt>
									<dd className="font-medium">{character.skills.negotiation.bargain}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">母国語</dt>
									<dd className="font-medium">{character.skills.negotiation.nativeLanguage}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">
										他の言語
										{character.skillDetails.otherLanguage && (
											<span className="text-blue-600">（{character.skillDetails.otherLanguage}）</span>
										)}
									</dt>
									<dd className="font-medium">{character.skills.negotiation.otherLanguage}</dd>
								</div>
							</dl>
						</div>

						<div>
							<h4 className="font-semibold mb-3">知識技能</h4>
							<dl className="grid grid-cols-3 gap-3">
								<div>
									<dt className="text-sm text-gray-600">医学</dt>
									<dd className="font-medium">{character.skills.knowledge.medicine}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">オカルト</dt>
									<dd className="font-medium">{character.skills.knowledge.occult}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">化学</dt>
									<dd className="font-medium">{character.skills.knowledge.chemistry}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">クトゥルフ神話</dt>
									<dd className="font-medium">{character.skills.knowledge.cthulhuMythos}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">
										芸術
										{character.skillDetails.art && (
											<span className="text-blue-600">（{character.skillDetails.art}）</span>
										)}
									</dt>
									<dd className="font-medium">{character.skills.knowledge.art}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">経理</dt>
									<dd className="font-medium">{character.skills.knowledge.accounting}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">考古学</dt>
									<dd className="font-medium">{character.skills.knowledge.archaeology}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">コンピュータ</dt>
									<dd className="font-medium">{character.skills.knowledge.computer}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">心理学</dt>
									<dd className="font-medium">{character.skills.knowledge.psychology}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">人類学</dt>
									<dd className="font-medium">{character.skills.knowledge.anthropology}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">生物学</dt>
									<dd className="font-medium">{character.skills.knowledge.biology}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">地質学</dt>
									<dd className="font-medium">{character.skills.knowledge.geology}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">電子工学</dt>
									<dd className="font-medium">{character.skills.knowledge.electronics}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">天文学</dt>
									<dd className="font-medium">{character.skills.knowledge.astronomy}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">博物学</dt>
									<dd className="font-medium">{character.skills.knowledge.naturalHistory}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">物理学</dt>
									<dd className="font-medium">{character.skills.knowledge.physics}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">法律</dt>
									<dd className="font-medium">{character.skills.knowledge.law}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">薬学</dt>
									<dd className="font-medium">{character.skills.knowledge.pharmacy}</dd>
								</div>
								<div>
									<dt className="text-sm text-gray-600">歴史</dt>
									<dd className="font-medium">{character.skills.knowledge.history}</dd>
								</div>
							</dl>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
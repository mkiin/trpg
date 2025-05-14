import { useAtom } from "jotai/react";
import { abilitiesAtom } from "../atoms/character-sheet-atoms";
import { generateAbilities } from "../actions/generate-character-actions";

export function useAbilityForm() {
	const [abilities, setAbilities] = useAtom(abilitiesAtom);

	// 能力生成ボタンを押した際のハンドラー
	const handleGenerateAbility = async () => {
		const newAbilities = await generateAbilities();
		setAbilities({
			...abilities,
			...newAbilities,
		});
	};

	return {
		abilities,
		handleGenerateAbility,
	};
}

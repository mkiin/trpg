import { useSafeForm } from "@/hooks/use-safe-form";
import { OCCUPATION_SKILL_MAP } from "../constants/occupation-lists";
import { useCharacterSheet } from "../hooks/use-character-sheet"
import { NavigationButton } from "./navigation-button";
import { useBasicForm } from "../hooks/use-basic-form";
import { useSkillForm } from "../hooks/use-skill-form";

export function SkillsForm() {


  const { nextStep, prevStep } = useCharacterSheet();
  const { basicInfo } = useBasicForm(); // 選択した職業を取得目的
  const { skills, setSkills, form, fields } = useSkillForm(); // 

  // 選択した職業の割り振り可能スキル
  const availableSkills = OCCUPATION_SKILL_MAP[basicInfo.occupation];

  return (

    <div>

      <NavigationButton
        nextStep={nextStep}
        prevStep={prevStep}
      >
      </NavigationButton>
    </div>

  )
}
import { useSafeForm } from "@/hooks/use-safe-form";
import { OCCUPATION_SKILL_MAP } from "../constants/job-lists";
import { useCharacterSheetContext } from "./character-sheet-context"
import { NavigationButton } from "./navigation-button";

export function SkillsForm() {


  const { nextStep, prevStep, abilities, occupation } = useCharacterSheetContext();
  // const [form, fields] = useSafeForm();
  // 選択した職業の割り振り可能スキル
  const availableSkills = OCCUPATION_SKILL_MAP[occupation];
  console.log(availableSkills);

  return (

    <div>
      {availableSkills.map((skill) => (
        skill.type === "fixed" && skill.type === "fixed" && (
          <div>
            {skill.label}
          </div>
        )
      ))}
      <NavigationButton
        nextStep={nextStep}
        prevStep={prevStep}
      >
      </NavigationButton>
    </div>

  )
}
import { useSafeForm } from "@/hooks/use-safe-form";
import { OCCUPATION_SKILL_MAP } from "../constants/job-lists";
import { useCharacterSheet } from "../hooks/use-character-sheet"
import { NavigationButton } from "./navigation-button";
import { useBasicForm } from "../hooks/use-basic-form";
import { useSkillForm } from "../hooks/use-skill-form";

export function SkillsForm() {


  const { nextStep, prevStep } = useCharacterSheet();
  const { basicInfo } = useBasicForm(); // 選択した職業を取得目的
  const { skills } = useSkillForm(); // 
  // const [form, fields] = useSafeForm();
  // 選択した職業の割り振り可能スキル
  const availableSkills = OCCUPATION_SKILL_MAP[basicInfo.occupation];

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
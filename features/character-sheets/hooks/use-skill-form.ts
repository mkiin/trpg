import { useSafeForm } from "@/hooks/use-safe-form";
import 
import { skillsAtom } from "@/features/character-sheets/atoms/character-sheet-atoms";
import { useAtom } from "jotai/react";

export function useSkillForm() {
  const [skills, setSkills] = useAtom(skillsAtom);

  return {
    skills,
    setSkills
  }
}

import { CharacterSheetProvider } from "@/features/character-sheets/components/character-sheet-context";
import { CharacterSheetForm } from "@/features/character-sheets/components/character-sheet-form";

export const metadata = {
  title: "キャラクターシート作成 | TRPG",
  description: "TRPGのキャラクターシートをAIを用いて自動生成します。",
};

export default function CharacterSheetPage() {
  return (
    <CharacterSheetProvider>
      <CharacterSheetForm />
    </CharacterSheetProvider>
  );
}

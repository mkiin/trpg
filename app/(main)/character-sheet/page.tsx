import { CharacterSheetProvider } from "./components/character-sheet-context";
import { CharacterSheetForm } from "./components/character-sheet-form";

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

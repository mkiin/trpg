// マークダウンのコードブロックからJSONを抽出するヘルパー関数
export function extractJsonFromMarkdown(text: string): string {
  // マークダウンのコードブロックを削除
  const jsonRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
  const match = text.match(jsonRegex);

  if (match && match[1]) {
    return match[1].trim();
  }

  // コードブロックがない場合は元のテキストを返す
  return text.trim();
}
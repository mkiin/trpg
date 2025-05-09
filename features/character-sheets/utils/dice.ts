// ダイスロール関数
export function rollDice(numDice: number, sides: number, modifier: number = 0): number {
  let result = 0;
  for (let i = 0; i < numDice; i++) {
    result += Math.floor(Math.random() * sides) + 1;
  }
  return result + modifier;
}
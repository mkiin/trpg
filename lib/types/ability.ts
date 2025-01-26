export interface Ability {
  name: string;
  nameJp: string;
  description: string;
  diceCount: number;
  diceFaces: number;
  modifier: number;
}

export interface AbilityRow extends Ability {
  roll: () => void;
}

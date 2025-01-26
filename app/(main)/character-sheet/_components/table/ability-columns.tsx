import { ColumnDef } from "@tanstack/react-table";
import { Ability } from "@/lib/types/ability";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DICE_COUNTS, DICE_FACES } from "@/lib/constants/abilities";
import React from "react";

export const abilityColumns: ColumnDef<Ability>[] = [
  {
    accessorKey: "name",
    header: "能力",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.name}
        <br />
        <span className="text-sm text-muted-foreground">
          {row.original.description}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "dice",
    header: "ダイス",
    cell: ({ row, table }) => {
      const ability = row.original;
      const index = table.getRowModel().rows.findIndex((r) => r.id === row.id);

      const handleDiceCountChange = (value: string) => {
        const newAbilities = [...table.options.data];
        newAbilities[index].diceCount = Number.parseInt(value);
        table.options.data = newAbilities;
      };

      const handleDiceFacesChange = (value: string) => {
        const newAbilities = [...table.options.data];
        newAbilities[index].diceFaces = Number.parseInt(value);
        table.options.data = newAbilities;
      };

      const handleModifierChange = (value: string) => {
        const newAbilities = [...table.options.data];
        newAbilities[index].modifier = Number.parseInt(value) || 0;
        table.options.data = newAbilities;
      };

      const rollDice = () => {
        let total = 0;
        for (let i = 0; i < ability.diceCount; i++) {
          total += Math.floor(Math.random() * ability.diceFaces) + 1;
        }
        total += ability.modifier;
      };

      return (
        <div className="flex items-center space-x-2">
          <Select
            value={ability.diceCount.toString()}
            onValueChange={handleDiceCountChange}>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DICE_COUNTS.map((count) => (
                <SelectItem key={count} value={count.toString()}>
                  {count}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>D</span>
          <Select
            value={ability.diceFaces.toString()}
            onValueChange={handleDiceFacesChange}>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DICE_FACES.map((faces) => (
                <SelectItem key={faces} value={faces.toString()}>
                  {faces}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>+</span>
          <Input
            type="number"
            min={-100}
            max={100}
            value={ability.modifier}
            onChange={(e) => handleModifierChange(e.target.value)}
            className="w-[80px]"
          />
          <Button variant="outline" size="sm" onClick={() => rollDice()}>
            個別ロール
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "abilityValue",
    header: "能力値",
    cell: () => {
      return <div className="text-right">-</div>;
    },
  },
];

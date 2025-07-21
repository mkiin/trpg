import type { FieldName } from "@conform-to/react";
import type { ReactNode } from "react";

/**
 * input要素に入力可能な値の型
 */
export type Inputtable = string | string[] | number | boolean | (string | undefined)[] | undefined;

/**
 * フィールドのプロパティ
 */
export interface FieldProps<T extends Inputtable = Inputtable> {
  /** フィールド名 Conformの`field.fieldName.name`を使用する */
  name?: FieldName<T, Record<string, unknown>, string[]>;
  /** ヘルパーメッセージ */
  helperMessage?: string;
  /** ラベル */
  label?: ReactNode;
}

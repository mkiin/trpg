import { type DefaultValue, type FieldMetadata, useFormMetadata } from "@conform-to/react";
import { type ReactNode, useCallback } from "react";

/**
 * Conformの配列のフィールドを子要素に割り当てる
 */
export const FieldArray = <T extends FieldMetadata<Item[]>, Item>({
  field,
  children,
}: {
  field: T;
  children: (props: {
    /**
     * フィールドのメタデータ
     * @see {@link FieldMetadata}
     */
    field: ReturnType<T["getFieldList"]>[number];
    /**
     * フィールドのインデックス
     */
    index: number;
    /**
     * フィールド追加用の関数
     * @param defaultValue 追加した際のデフォルト値
     * @param index 追加対象インデックス
     */
    insert: (defaultValue?: DefaultValue<Item>, index?: number) => void;
    /**
     * フィールドコピー用の関数
     */
    copy: () => void;
    /**
     * フィールド削除用の関数
     */
    remove: () => void;
  }) => ReactNode;
}) => {
  const form = useFormMetadata();
  const insert = useCallback(
    (defaultValue?: DefaultValue<Item>, index?: number) =>
      form.insert({ name: field.name, defaultValue, index }),
    [form, field.name],
  );
  const copy = useCallback(
    (index: number) => {
      const item = field.getFieldList()[index]?.value;
      // @ts-expect-error
      form.insert({ name: field.name, defaultValue: item, index: index + 1 });
    },
    [form, field.name, field.getFieldList],
  );
  const remove = useCallback(
    (index: number) => form.remove({ name: field.name, index }),
    [form, field.name],
  );
  return field
    .getFieldList()
    .map((f, i) =>
      children({ field: f, index: i, insert, copy: () => copy(i), remove: () => remove(i) }),
    );
};

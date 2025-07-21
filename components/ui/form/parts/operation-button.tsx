import { type DefaultValue, type FieldMetadata, useFormMetadata } from "@conform-to/react";
import { Button, type ButtonProps } from "@yamada-ui/react";
import { type FC, useCallback } from "react";

/**
 * Formの値をリセットするボタン
 */
export const ResetButton: FC<ButtonProps> = ({ children = "リセット", ...props }) => {
  const form = useFormMetadata();
  const isPristine = !form.dirty;
  const handleReset = useCallback(() => {
    form.reset();
  }, [form]);
  return (
    <Button onClick={handleReset} disabled={isPristine} {...props}>
      {children}
    </Button>
  );
};

/**
 * 配列の要素を追加するボタン
 */
export const AddArrayItemButton = <T,>({
  field,
  children = "追加",
  defaultValue,
  ...props
}: {
  /** Conformの配列metadata */ field: FieldMetadata<T[]>;
  defaultValue?: DefaultValue<T>;
} & Omit<ButtonProps, "defaultValue">) => {
  const form = useFormMetadata();
  const handleAdd = useCallback(() => {
    form.insert({ name: field.name, defaultValue });
  }, [form, field.name, defaultValue]);
  return (
    <Button onClick={handleAdd} {...props}>
      {children}
    </Button>
  );
};

/**
 * 配列の要素を削除するボタン
 */
export const RemoveArrayItemButton: FC<
  {
    /** Conformの配列metadata */ field: FieldMetadata<unknown[]>;
    /** 削除する行番号 */ index: number;
  } & ButtonProps
> = ({ field, index, children = "削除", ...props }) => {
  const form = useFormMetadata();
  const handleRemove = useCallback(() => {
    form.remove({ name: field.name, index });
  }, [form, field.name, index]);
  return (
    <Button onClick={handleRemove} {...props}>
      {children}
    </Button>
  );
};

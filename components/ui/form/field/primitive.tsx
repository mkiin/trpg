"use client";

import { getInputProps, getTextareaProps, useField } from "@conform-to/react";
import {
  Checkbox,
  type CheckboxProps,
  type HTMLProps,
  Input,
  type InputProps,
  Label,
  NumberInput,
  type NumberInputProps,
  Textarea,
  type TextareaProps,
  VisuallyHidden,
} from "@yamada-ui/react";
import type { ComponentProps, FC, ReactNode, Ref } from "react";
import { CustomFormControl } from "./form-control";
import type { FieldProps } from "./types";
import { getFieldErrorProps } from "./utils";

interface TextFieldProps extends FieldProps<string>, Omit<InputProps, "name"> {
  ref?: Ref<HTMLInputElement>;
}

/**
 * テキストフィールド
 * @param props - input要素のprops
 */
export const TextField: FC<TextFieldProps> = ({ name = "", label, helperMessage, ...props }) => {
  const [fieldMeta] = useField(name);
  return (
    <CustomFormControl {...{ label, helperMessage }} {...getFieldErrorProps(fieldMeta)}>
      <Input {...props} {...getInputProps(fieldMeta, { type: "text" })} key={fieldMeta.key} />
    </CustomFormControl>
  );
};

interface NumberFieldProps
  extends FieldProps<number>,
    Omit<NumberInputProps, "name">,
    Omit<ComponentProps<"input">, keyof NumberInputProps> {}

export const NumberField: FC<NumberFieldProps> = ({
  name = "",
  label,
  helperMessage,
  ...props
}) => {
  const [fieldMeta] = useField(name);
  return (
    <CustomFormControl {...{ label, helperMessage }} {...getFieldErrorProps(fieldMeta)}>
      {/* @ts-expect-error max type not match */}
      <NumberInput
        {...props}
        {...getInputProps(fieldMeta, { type: "number" })}
        key={fieldMeta.key}
      />
    </CustomFormControl>
  );
};

interface TextareaFieldProps extends FieldProps<string>, Omit<TextareaProps, "name"> {}

export const TextareaField: FC<TextareaFieldProps> = ({
  name = "",
  label,
  helperMessage,
  ...props
}) => {
  const [fieldMeta] = useField(name);
  return (
    <CustomFormControl {...{ label, helperMessage }} {...getFieldErrorProps(fieldMeta)}>
      <Textarea {...props} {...getTextareaProps(fieldMeta)} key={fieldMeta.key} resize="vertical" />
    </CustomFormControl>
  );
};

interface CheckboxFieldProps extends FieldProps<boolean>, Omit<CheckboxProps, "name"> {}

/**
 * チェックボックス
 * @param props - input要素のprops
 */
export const CheckboxField: FC<CheckboxFieldProps> = ({
  name = "",
  label,
  helperMessage,
  ...props
}) => {
  const [fieldMeta] = useField(name);
  return (
    <CustomFormControl {...{ label, helperMessage }} {...getFieldErrorProps(fieldMeta)}>
      <Checkbox
        {...props}
        {...getInputProps(fieldMeta, { type: "checkbox" })}
        key={fieldMeta.key}
      />
    </CustomFormControl>
  );
};

interface SwitchFieldProps extends FieldProps<boolean>, Omit<HTMLProps<"input">, "name"> {
  children: ReactNode;
}

export const CustomSwitchField: FC<SwitchFieldProps> = ({ name = "", children, ...props }) => {
  const [fieldMeta] = useField(name);
  return (
    <Label>
      <VisuallyHidden
        as="input"
        {...props}
        {...getInputProps(fieldMeta, { type: "checkbox" })}
        key={fieldMeta.key}
      />
      {children}
    </Label>
  );
};

interface HiddenFieldProps extends Pick<FieldProps<string | number | boolean>, "name"> {}

/**
 * 隠しフィールド
 */
export const HiddenField: FC<HiddenFieldProps> = ({ name = "", ...props }) => {
  const [fieldMeta] = useField(name);
  return (
    <VisuallyHidden
      as="input"
      {...getInputProps(fieldMeta, { type: "hidden" })}
      {...props}
      key={fieldMeta.key}
    />
  );
};

"use client";
import {
	type FormMetadata,
	FormProvider,
	FormStateInput,
	getFormProps,
	useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { type UIProps, ui } from "@yamada-ui/react";
import type { ComponentProps, JSX, ReactNode } from "react";
import type { ZodTypeAny } from "zod/v3";
import * as z3 from "zod/v3";

// Zodスキーマから入力型を抽出
type input<T extends ZodTypeAny> = T["_input"];

// Zodスキーマから出力型を抽出
type output<T extends ZodTypeAny> = T["_output"];

interface UseFormReturn<
	TInput extends Record<string, unknown>,
	TOutput extends Record<string, unknown>,
> extends ReturnType<typeof useForm<TInput, TOutput, string[]>> {}

interface FormMeta<
	TInput extends Record<string, unknown>,
	TOutput extends Record<string, unknown>,
> {
	form: FormMetadata<TInput, string[]>;
	field: UseFormReturn<TInput, TOutput>[1];
}

/**
 * デフォルトの挙動を設定
 * @param schema バリデーションスキーマ
 * @param defaultValue デフォルト値
 */
const useCustomForm = <T extends ZodTypeAny>(
	schema: T,
	options: Parameters<typeof useForm<input<T>, output<T>, string[]>>[0] = {},
): FormMeta<input<T>, output<T>> => {
	const {
		shouldValidate = "onBlur",
		shouldRevalidate = "onInput",
		constraint = getZodConstraint(schema),
		onValidate = ({ formData }) => parseWithZod(formData, { schema }),
		...rest
	} = options;
	const [form, field] = useForm<input<T>, output<T>, string[]>({
		shouldValidate,
		shouldRevalidate,
		constraint,
		onValidate,
		...rest,
	});
	return { form, field };
};

interface FormProps<T extends ZodTypeAny>
	extends Omit<
			ComponentProps<"form">,
			| keyof ReturnType<typeof getFormProps>
			| "children"
			| "color"
			| "content"
			| "translate"
		>,
		UIProps {
	schema?: T;
	options?: NoInfer<Parameters<typeof useForm<input<T>>>[0]>;
	children?: ((props: FormMeta<input<T>, output<T>>) => ReactNode) | ReactNode;
}

/**
 * Conformの機能を統合したFormコンポーネント
 * schemaに渡されたバリデーションスキーマを元にフォームの入力欄meta情報をchildrenに渡す
 */
export const Form = <T extends ZodTypeAny>({
	schema,
	options,
	children,
	...props
}: FormProps<T>): JSX.Element => {
	const { form, field } = useCustomForm(
		schema ?? (z3.object({}) as any),
		options,
	);

	return (
		<FormProvider context={form.context}>
			<ui.form {...props} {...getFormProps(form)}>
				{typeof children === "function" ? children({ form, field }) : children}
			</ui.form>
			<FormStateInput />
		</FormProvider>
	);
};

export * from "./field";
export * from "./parts";
export type { FormState } from "./types";

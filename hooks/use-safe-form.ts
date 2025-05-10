import { useForm } from "@conform-to/react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type FieldValues<T extends Record<string, any>> = Parameters<
	typeof useForm<T>
>[0];

/**
 *  optionsの型の操作について
 *  omitをして, defaultValueプロパティが無い型を作成
 *  Pickをして、DefaultValueプロパティしかない型を作成し, Requiredを指定する
 *  &をつけて合成する。
 **/

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const useSafeForm = <T extends Record<string, any>>(
	options: Omit<FieldValues<T>, "defaultValue"> &
		Required<Pick<FieldValues<T>, "defaultValue">>,
): ReturnType<typeof useForm<T>> => useForm<T>(options);

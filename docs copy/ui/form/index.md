# Form Component

## 概要

`Form`コンポーネントは、Conformの機能を統合したReactフォームコンポーネントです。Valibot スキーマベースのバリデーションとConformの状態管理を組み合わせて、型安全なフォーム実装を提供します。

## ファイルパス
`src/ui/form/index.tsx`

## 主要な依存関係
- `@conform-to/react`: フォーム状態管理
- `@conform-to/valibot`: Valibotとの統合
- `@yamada-ui/react`: UIコンポーネント
- `valibot`: バリデーションスキーマ

## エクスポート

### コンポーネント
- `Form`: メインのフォームコンポーネント

### 型定義
- `FormState`: フォームの状態を表す型（types.tsから）

### Re-exports
- `./field`からすべてエクスポート
- `./parts`からすべてエクスポート

## Form コンポーネント

### Props

```typescript
interface FormProps<TInput extends Record<string, unknown>, TOutput extends Record<string, unknown>>
  extends Omit<ComponentProps<"form">, keyof ReturnType<typeof getFormProps> | "children" | "color" | "content" | "translate">,
    UIProps {
  schema?: GenericSchema<TInput>;
  options?: NoInfer<Parameters<typeof useForm<TInput>>[0]>;
  children?: ((props: FormMeta<TInput, TOutput>) => ReactNode) | ReactNode;
}
```

### 機能

1. **バリデーションスキーマの統合**
   - `schema`プロパティでValibotスキーマを受け取る
   - 自動的にフォームバリデーションを設定

2. **Conformとの統合**
   - `FormProvider`でConformのコンテキストを提供
   - `FormStateInput`で隠しフィールドを自動生成

3. **デフォルトの動作設定**
   - `shouldValidate`: "onBlur"（フォーカスが外れた時に検証）
   - `shouldRevalidate`: "onInput"（入力時に再検証）

4. **Render Props パターン**
   - `children`関数で`form`と`field`のメタデータにアクセス可能

### 使用例

```tsx
const schema = v.object({
  name: v.string([v.minLength(1, "名前は必須です")]),
  email: v.string([v.email("有効なメールアドレスを入力してください")])
});

<Form schema={schema}>
  {({ form, field }) => (
    <>
      <TextField name={field.name.name} label="名前" />
      <TextField name={field.email.name} label="メールアドレス" />
      <button type="submit">送信</button>
    </>
  )}
</Form>
```

## 内部実装

### useCustomForm フック

Conformの`useForm`フックをラップし、デフォルト値を設定：

- バリデーションのタイミングを制御
- Valibotスキーマとの統合を自動化
- フォームとフィールドのメタデータを返却

### FormMeta 型

```typescript
interface FormMeta<TInput, TOutput> {
  form: FormMetadata<TInput, string[]>;
  field: UseFormReturn<TInput, TOutput>[1];
}
```

フォーム全体のメタデータとフィールド個別のメタデータへのアクセスを提供します。
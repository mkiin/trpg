# Primitive Field Components

## 概要

基本的な入力フィールドコンポーネント群です。ConformとYamada UIを統合し、統一的なインターフェースを提供します。

## ファイルパス
`src/ui/form/field/primitive.tsx`

## コンポーネント一覧

### TextField

テキスト入力フィールドコンポーネント。

#### Props
```typescript
interface TextFieldProps extends FieldProps<string>, Omit<InputProps, "name"> {
  ref?: Ref<HTMLInputElement>;
}
```

#### 使用例
```tsx
<TextField 
  name={field.email.name} 
  label="メールアドレス" 
  placeholder="example@email.com"
  helperMessage="有効なメールアドレスを入力してください"
/>
```

### NumberField

数値入力フィールドコンポーネント。

#### Props
```typescript
interface NumberFieldProps
  extends FieldProps<number>,
    Omit<NumberInputProps, "name">,
    Omit<ComponentProps<"input">, keyof NumberInputProps> {}
```

#### 使用例
```tsx
<NumberField
  name={field.age.name}
  label="年齢"
  min={0}
  max={120}
  step={1}
/>
```

#### 注意点
- `@ts-expect-error`コメントがあるが、これはNumberInputPropsとinput要素のmax属性の型の不一致による

### TextareaField

複数行テキスト入力フィールドコンポーネント。

#### Props
```typescript
interface TextareaFieldProps extends FieldProps<string>, Omit<TextareaProps, "name"> {}
```

#### 特徴
- `resize="vertical"`がデフォルトで設定される
- 縦方向のリサイズのみ可能

#### 使用例
```tsx
<TextareaField
  name={field.description.name}
  label="説明"
  rows={4}
  placeholder="詳細を入力してください"
/>
```

### CheckboxField

チェックボックスフィールドコンポーネント。

#### Props
```typescript
interface CheckboxFieldProps extends FieldProps<boolean>, Omit<CheckboxProps, "name"> {}
```

#### 使用例
```tsx
<CheckboxField
  name={field.agree.name}
  label="利用規約に同意する"
>
  利用規約に同意します
</CheckboxField>
```

### CustomSwitchField

カスタムスイッチフィールドコンポーネント。見た目をカスタマイズ可能なチェックボックス。

#### Props
```typescript
interface SwitchFieldProps extends FieldProps<boolean>, Omit<HTMLProps<"input">, "name"> {
  children: ReactNode;
}
```

#### 特徴
- `VisuallyHidden`でinput要素を非表示
- childrenで自由なUIを実装可能

#### 使用例
```tsx
<CustomSwitchField name={field.notifications.name}>
  <Switch />
</CustomSwitchField>
```

### HiddenField

隠しフィールドコンポーネント。

#### Props
```typescript
interface HiddenFieldProps extends Pick<FieldProps<string | number | boolean>, "name"> {}
```

#### 使用例
```tsx
<HiddenField name={field.userId.name} />
```

## 共通の実装パターン

すべてのコンポーネントで以下のパターンが使用されています：

1. **useField フックの使用**
   ```tsx
   const [fieldMeta] = useField(name);
   ```

2. **CustomFormControl でのラップ**
   ```tsx
   <CustomFormControl {...{ label, helperMessage }} {...getFieldErrorProps(fieldMeta)}>
     {/* 入力要素 */}
   </CustomFormControl>
   ```

3. **Conform のヘルパー関数**
   - `getInputProps`: input要素のプロパティを取得
   - `getTextareaProps`: textarea要素のプロパティを取得

4. **key プロパティ**
   - `key={fieldMeta.key}`でコンポーネントの再レンダリングを制御

## 型安全性

- 各コンポーネントはFieldPropsのジェネリック型パラメータで値の型を制約
- Yamada UIのコンポーネントPropsを継承し、`name`プロパティの衝突を回避
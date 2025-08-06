# CustomFormControl Component

## 概要

`CustomFormControl`は、Yamada UIの`FormControl`をベースに、ラベル、エラーメッセージ、必須/任意表示を統合したフォームコントロールコンポーネントです。

## ファイルパス
`src/ui/form/field/form-control.tsx`

## 主要な依存関係
- `@yamada-ui/react`: UI コンポーネント

## CustomFormControl コンポーネント

### Props

```typescript
ComponentProps<typeof FormControl> & {
  /** ラベルを非表示にする場合に指定 */
  withoutLabel?: boolean;
  /** 必須,任意アイコンを表示にする場合に指定 */
  requireIcon?: boolean;
}
```

### 機能

1. **ラベル表示**
   - `Grid`レイアウトでラベルと必須/任意タグを横並びに配置
   - `withoutLabel`でラベル部分を非表示にできる

2. **必須/任意表示**
   - `requireIcon`がtrueの場合、必須/任意のタグを表示
   - 必須の場合は赤色、任意の場合は青色のタグ

3. **エラーメッセージ**
   - `SlideFade`アニメーションでエラーメッセージを表示/非表示
   - `role="alert"`でアクセシビリティに配慮

4. **FormControlの機能継承**
   - `replace`プロパティで既存のFormControlを置き換え
   - すべてのFormControlプロパティを継承

### 実装の詳細

```tsx
<FormControl replace {...props}>
  {!withoutLabel && (
    <Grid templateColumns="auto 1fr" alignItems="start" gap={1}>
      <Label {...labelProps}>{label}</Label>
      {requireIcon && (
        <Tag w="fit-content" size="sm" rounded="md" colorScheme={required ? "red" : "blue"}>
          {required ? "必須" : "任意"}
        </Tag>
      )}
    </Grid>
  )}
  {children}
  <SlideFade open={Boolean(errorMessage)}>
    <ErrorMessage role="alert" {...errorMessageProps}>
      {errorMessage}
    </ErrorMessage>
  </SlideFade>
</FormControl>
```

### 使用例

```tsx
// 基本的な使用
<CustomFormControl
  label="メールアドレス"
  required
  errorMessage="有効なメールアドレスを入力してください"
>
  <Input type="email" />
</CustomFormControl>

// 必須/任意タグ付き
<CustomFormControl
  label="電話番号"
  required={false}
  requireIcon
>
  <Input type="tel" />
</CustomFormControl>

// ラベルなし
<CustomFormControl
  withoutLabel
  errorMessage={errors.password}
>
  <Input type="password" placeholder="パスワード" />
</CustomFormControl>
```

## デザインの特徴

1. **グリッドレイアウト**
   - `templateColumns="auto 1fr"`でラベルと必須タグを適切に配置
   - ラベルの幅は内容に応じて自動調整

2. **アニメーション**
   - エラーメッセージは`SlideFade`でスムーズに表示
   - ユーザー体験を向上

3. **カラースキーム**
   - 必須: 赤色（`colorScheme="red"`）
   - 任意: 青色（`colorScheme="blue"`）
   - 視覚的に区別しやすい

## アクセシビリティ

- `Label`コンポーネントで適切なラベル付け
- `role="alert"`でスクリーンリーダーに通知
- FormControlの機能により、aria属性が自動的に設定される
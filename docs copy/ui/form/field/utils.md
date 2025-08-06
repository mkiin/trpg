# Field Utils

## 概要

フィールドコンポーネントで使用するユーティリティ関数を提供します。

## ファイルパス
`src/ui/form/field/utils.ts`

## getFieldErrorProps 関数

### シグネチャ

```typescript
export const getFieldErrorProps = <Schema>(
  metadata: FieldMetadata<Schema, Record<string, unknown>, string[]>,
) => {
  const { errors, required } = metadata;
  const errorMessage = errors?.[0];
  return {
    errorMessage,
    invalid: Boolean(errors),
    required,
  } as const satisfies FormControlProps;
};
```

### 機能

ConformのFieldMetadataからエラー関連の情報を抽出し、Yamada UIのFormControlPropsに適した形式で返します。

### 引数

- `metadata`: ConformのFieldMetadata
  - フィールドの状態、エラー、バリデーション情報を含む

### 戻り値

```typescript
{
  errorMessage: string | undefined;  // 最初のエラーメッセージ
  invalid: boolean;                  // エラーが存在するか
  required: boolean;                 // 必須フィールドか
}
```

### 実装の詳細

1. **エラーメッセージの取得**
   - `errors`配列の最初の要素を取得
   - 複数のエラーがある場合も最初の1つのみ表示

2. **invalid状態の判定**
   - `errors`配列が存在すればtrue
   - Boolean()で明示的に真偽値に変換

3. **required属性**
   - metadataから直接取得
   - バリデーションスキーマで定義された必須制約を反映

### 使用例

```tsx
export const TextField: FC<TextFieldProps> = ({ name = "", label, helperMessage, ...props }) => {
  const [fieldMeta] = useField(name);
  
  return (
    <CustomFormControl 
      {...{ label, helperMessage }} 
      {...getFieldErrorProps(fieldMeta)}  // errorMessage, invalid, requiredが展開される
    >
      <Input {...props} {...getInputProps(fieldMeta, { type: "text" })} />
    </CustomFormControl>
  );
};
```

### 型の安全性

`as const satisfies FormControlProps`により：
- 戻り値の型が`FormControlProps`に準拠していることを保証
- `as const`で各プロパティがリテラル型として推論される

## 設計の意図

このユーティリティ関数により：
1. ConformとYamada UIの橋渡しを一箇所で管理
2. 各フィールドコンポーネントでの重複コードを削減
3. エラー表示ロジックの一貫性を保証
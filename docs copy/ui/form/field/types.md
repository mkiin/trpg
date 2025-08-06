# Field Types

## 概要

フィールドコンポーネント共通の型定義を提供します。

## ファイルパス
`src/ui/form/field/types.ts`

## 型定義

### Inputtable

```typescript
export type Inputtable = string | string[] | number | boolean | (string | undefined)[] | undefined;
```

input要素に入力可能な値の型を定義します。以下の型をサポート：
- `string`: テキスト入力
- `string[]`: 複数選択
- `number`: 数値入力
- `boolean`: チェックボックス、スイッチ
- `(string | undefined)[]`: 部分的な配列
- `undefined`: 未入力状態

### FieldProps

```typescript
export interface FieldProps<T extends Inputtable = Inputtable> {
  /** フィールド名 Conformの`field.fieldName.name`を使用する */
  name?: FieldName<T, Record<string, unknown>, string[]>;
  /** ヘルパーメッセージ */
  helperMessage?: string;
  /** ラベル */
  label?: ReactNode;
}
```

すべてのフィールドコンポーネントが共通で持つプロパティ：

#### name
- Conformから提供される`FieldName`型
- `field.fieldName.name`の形式で渡される
- 型パラメータ`T`により、フィールドの値の型を制約

#### helperMessage
- フィールドの補助説明テキスト
- エラーメッセージとは別に表示される

#### label
- フィールドのラベル
- `ReactNode`型なので、文字列だけでなくコンポーネントも渡せる

## 使用例

```tsx
// フィールドコンポーネントでの使用
interface TextFieldProps extends FieldProps<string>, Omit<InputProps, "name"> {
  // 追加のプロパティ
}

// 実装
export const TextField: FC<TextFieldProps> = ({ 
  name = "", 
  label, 
  helperMessage, 
  ...props 
}) => {
  // フィールドの実装
};
```

## ジェネリクスの活用

`FieldProps`のジェネリック型パラメータにより、フィールドの値の型を厳密に定義できます：

```tsx
// 文字列フィールド
FieldProps<string>

// 数値フィールド  
FieldProps<number>

// ブール値フィールド
FieldProps<boolean>

// 文字列配列フィールド
FieldProps<string[]>
```

これにより、TypeScriptの型チェックが効き、型安全なフォーム実装が可能になります。
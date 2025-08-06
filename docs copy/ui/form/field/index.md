# Field Module Index

## 概要

フィールドコンポーネントのエントリーポイントです。各種フィールドコンポーネントをまとめて再エクスポートします。

## ファイルパス
`src/ui/form/field/index.ts`

## エクスポート

### controlled.tsx
- `SelectField`: 選択フィールド
- `DependentSelectField`: 依存関係のある選択フィールド
- `RadioGroupField`: ラジオボタングループ
- `ItemsSelector`: 選択肢生成関数の型

### field-array.tsx
- `FieldArray`: 配列フィールドの管理コンポーネント

### primitive.tsx
- `TextField`: テキスト入力フィールド
- `NumberField`: 数値入力フィールド
- `TextareaField`: テキストエリアフィールド
- `CheckboxField`: チェックボックスフィールド
- `CustomSwitchField`: カスタムスイッチフィールド
- `HiddenField`: 隠しフィールド

## 使用方法

```tsx
import {
  TextField,
  SelectField,
  FieldArray,
  // その他のフィールドコンポーネント
} from '@/ui/form/field';
```

すべてのフィールドコンポーネントを一箇所からインポートできるため、インポート文の管理が簡単になります。
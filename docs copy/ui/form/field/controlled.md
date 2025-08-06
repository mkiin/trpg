# Controlled Field Components

## 概要

制御されたフィールドコンポーネント群です。セレクトボックスやラジオボタンなど、選択肢から値を選ぶタイプのコンポーネントを提供します。

## ファイルパス
`src/ui/form/field/controlled.tsx`

## 型定義

### SelectItems
```typescript
type SelectItems = ReadonlyArray<string> | ReadonlyArray<{ label: ReactNode; value: string }>;
```
選択肢の配列。文字列配列またはラベルと値のオブジェクト配列。

### ItemsSelector
```typescript
export type ItemsSelector<T extends Record<string, unknown>> = (value: T) => SelectItems;
```
依存する値を元に選択肢を生成する関数の型。

## ユーティリティ関数

### convertItems
```typescript
const convertItems = (items: SelectItems): SelectItem[] =>
  items.map((item) => {
    if (typeof item === "string") {
      return { label: item, value: item };
    }
    return item;
  });
```
SelectItems型をYamada UIのSelectItem型に変換。

## コンポーネント

### SelectField

選択フィールドコンポーネント。

#### Props
```typescript
interface SelectFieldProps extends FieldProps<string>, Omit<SelectProps, "name" | "items"> {
  items?: SelectItems;
}
```

#### 特徴
- `useInputControl`フックで値の変更を制御
- `getSelectProps`でConformの選択フィールドプロパティを取得
- `handlerAll`で複数のonChangeハンドラーを統合

#### 使用例
```tsx
<SelectField
  name={field.prefecture.name}
  label="都道府県"
  items={["東京都", "大阪府", "京都府"]}
  placeholder="選択してください"
/>

// オブジェクト形式の選択肢
<SelectField
  name={field.role.name}
  label="役割"
  items={[
    { label: "管理者", value: "admin" },
    { label: "編集者", value: "editor" },
    { label: "閲覧者", value: "viewer" }
  ]}
/>
```

### DependentSelectField

他のフィールドの値に依存して選択肢が変わるセレクトフィールド。

#### Props
```typescript
type DependentSelectFieldProps<
  Schema extends Record<string, unknown>,
  Dependent extends FieldName<DependentValue, Schema, string[]>[],
  DependentValue extends { [K in Dependent[number]]: Schema[K] },
> = FieldProps<string> &
  Omit<SelectProps, "name" | "items"> & {
    name: FieldName<string, Schema, string[]>;
    dependentFieldNames: Dependent;
    itemsSelector: ItemsSelector<DependentValue>;
  };
```

#### 特徴
- 依存するフィールドの値が変更されると選択肢を再生成
- 依存フィールドの値がない場合は選択不可
- 選択肢が変更されると自動的に値をリセット

#### 使用例
```tsx
// 都道府県に応じて市区町村の選択肢を変更
<DependentSelectField
  name={field.city.name}
  label="市区町村"
  dependentFieldNames={[field.prefecture.name]}
  itemsSelector={({ prefecture }) => {
    if (prefecture === "東京都") {
      return ["千代田区", "中央区", "港区"];
    } else if (prefecture === "大阪府") {
      return ["大阪市", "堺市", "東大阪市"];
    }
    return [];
  }}
/>
```

#### 実装の詳細
- Remedaライブラリを使用した関数型プログラミング
- `useMemo`で選択肢の再計算を最適化
- `useEffect`で依存値の変更時に値をリセット

### RadioGroupField

ラジオボタングループフィールドコンポーネント。

#### Props
```typescript
interface RadioGroupFieldProps
  extends FieldProps<string>,
    Omit<ComponentProps<typeof RadioGroup>, "name" | "items"> {
  /** radioのstyleProps */
  radioProps?: Omit<RadioProps, "name">;
  /** radio groupの選択肢 */
  items: SelectItems;
  /** radioとして描画したいコンポーネントをカスタマイズする場合のrender関数 */
  render?: ({ label, checked }: { label: ReactNode; checked: boolean }) => ReactNode;
}
```

#### 特徴
- `getCollectionProps`でラジオボタンのコレクションプロパティを取得
- カスタムレンダリング機能で見た目を自由にカスタマイズ可能
- 横並び（HStack）レイアウトがデフォルト

#### 使用例
```tsx
// 基本的な使用
<RadioGroupField
  name={field.gender.name}
  label="性別"
  items={["男性", "女性", "その他"]}
/>

// カスタムレンダリング
<RadioGroupField
  name={field.plan.name}
  label="プラン"
  items={[
    { label: "無料プラン", value: "free" },
    { label: "有料プラン", value: "premium" }
  ]}
  render={({ label, checked }) => (
    <Card variant={checked ? "solid" : "outline"}>
      {label}
    </Card>
  )}
/>
```

## 設計のポイント

1. **値の制御**
   - `useInputControl`で明示的に値を管理
   - change、blur、focusイベントを適切にハンドリング

2. **型安全性**
   - ジェネリクスで依存関係の型を厳密に定義
   - スキーマ全体の型情報を保持

3. **パフォーマンス**
   - `useMemo`、`useCallback`で不要な再計算を防止
   - 依存配列を適切に設定

4. **アクセシビリティ**
   - ラベルとinput要素の適切な関連付け
   - `htmlFor`属性で明示的な関連付け
# FieldObject Component

## 概要

`FieldObject`コンポーネントは、Conformの構造化されたフィールド（ネストされたオブジェクト）を受け取り、Yamada UIの`Fieldset`コンポーネントでラップして表示します。

## ファイルパス
`src/ui/form/fieldset.tsx`

## 主要な依存関係
- `@conform-to/react`: FieldMetadata型
- `@yamada-ui/react`: Fieldsetコンポーネント

## FieldObject コンポーネント

### Props

```typescript
type FieldObjectProps<
  T extends FieldMetadata<Record<string, any> | undefined, any, any> | undefined,
> = {
  /** ConformのFieldset metadata */
  field?: T;
  children?: T extends FieldMetadata<any>
    ? (props: { field: ReturnType<T["getFieldset"]> }) => ReactNode
    : ReactNode;
} & Omit<FieldsetProps, "children">;
```

### 機能

1. **ネストされたフィールドの処理**
   - Conformの`getFieldset()`メソッドを使用してネストされたフィールドを取得
   - 子コンポーネントにフィールドセット情報を渡す

2. **Render Props パターン**
   - `children`が関数の場合、ネストされたフィールド情報を引数として渡す
   - 通常のReactNodeも受け入れ可能

3. **Fieldsetコンポーネントの継承**
   - Yamada UIのFieldsetのすべてのプロパティを継承
   - `legend`、`disabled`などの属性をサポート

### 使用例

```tsx
// スキーマ定義
const schema = v.object({
  address: v.object({
    postalCode: v.string(),
    prefecture: v.string(),
    city: v.string()
  })
});

// 使用例
<Form schema={schema}>
  {({ field }) => (
    <FieldObject field={field.address} legend="住所">
      {({ field }) => (
        <>
          <TextField name={field.postalCode.name} label="郵便番号" />
          <TextField name={field.prefecture.name} label="都道府県" />
          <TextField name={field.city.name} label="市区町村" />
        </>
      )}
    </FieldObject>
  )}
</Form>
```

### 型安全性

ジェネリック型`T`により、フィールドの型情報が保持され、TypeScriptの型推論が効きます：

```tsx
// fieldがundefinedでない場合のみ、children関数の引数が利用可能
T extends FieldMetadata<any>
  ? (props: { field: ReturnType<T["getFieldset"]> }) => ReactNode
  : ReactNode
```

## 実装の詳細

### 条件付きレンダリング

```tsx
{field && typeof children === "function"
  ? children({ field: field.getFieldset() })
  : children}
```

- `field`が存在し、`children`が関数の場合のみRender Propsパターンを適用
- それ以外の場合は通常の子要素をレンダリング

### TypeScriptエラーの抑制

```tsx
{/* @ts-expect-error */}
```

Conformの型定義の複雑性により、一部でTypeScriptエラーが発生しますが、実行時には問題ありません。
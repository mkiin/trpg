# Operation Button Components

## 概要

フォーム操作用のボタンコンポーネント群です。フォームのリセットや配列フィールドの操作を簡単に実装できます。

## ファイルパス
`src/ui/form/parts/operation-button.tsx`

## 主要な依存関係
- `@conform-to/react`: フォームメタデータへのアクセス
- `@yamada-ui/react`: ボタンコンポーネント

## コンポーネント

### ResetButton

フォームの値を初期状態にリセットするボタン。

#### Props
```typescript
ButtonProps  // Yamada UIのButtonコンポーネントのすべてのProps
```

#### 特徴
- デフォルトのchildren: "リセット"
- フォームが変更されていない場合（isPristine）は無効化
- `useFormMetadata`でフォーム全体の状態にアクセス

#### 使用例
```tsx
// 基本的な使用
<ResetButton />

// カスタマイズ
<ResetButton colorScheme="gray" size="sm">
  すべてクリア
</ResetButton>
```

#### 実装の詳細
```tsx
const isPristine = !form.dirty;  // フォームが変更されていない
const handleReset = useCallback(() => {
  form.reset();  // フォームをリセット
}, [form]);
```

### AddArrayItemButton

配列フィールドに新しい要素を追加するボタン。

#### Props
```typescript
{
  /** Conformの配列metadata */ 
  field: FieldMetadata<T[]>;
  defaultValue?: DefaultValue<T>;
} & Omit<ButtonProps, "defaultValue">
```

#### 特徴
- デフォルトのchildren: "追加"
- 配列の末尾に新しい要素を追加
- `defaultValue`で初期値を指定可能

#### 使用例
```tsx
// 基本的な使用
<AddArrayItemButton field={field.items} />

// 初期値付き
<AddArrayItemButton 
  field={field.contacts}
  defaultValue={{ name: "", email: "", phone: "" }}
>
  連絡先を追加
</AddArrayItemButton>
```

### RemoveArrayItemButton

配列フィールドから特定の要素を削除するボタン。

#### Props
```typescript
{
  /** Conformの配列metadata */ 
  field: FieldMetadata<unknown[]>;
  /** 削除する行番号 */ 
  index: number;
} & ButtonProps
```

#### 特徴
- デフォルトのchildren: "削除"
- 指定したインデックスの要素を削除
- 通常はFieldArrayコンポーネント内で使用

#### 使用例
```tsx
// FieldArray内での使用
<FieldArray field={field.items}>
  {({ field, index, remove }) => (
    <HStack>
      <TextField name={field.name.name} />
      <RemoveArrayItemButton 
        field={field} 
        index={index}
        size="sm"
        colorScheme="red"
      />
    </HStack>
  )}
</FieldArray>
```

## 設計のポイント

1. **フォームメタデータの活用**
   - `useFormMetadata`でフォーム全体にアクセス
   - フィールド固有の操作を簡単に実装

2. **コールバックの最適化**
   - `useCallback`で関数の再生成を防止
   - 依存配列を適切に設定

3. **型安全性**
   - ジェネリック型で配列要素の型を保持
   - ButtonPropsとの衝突を避ける型定義

4. **デフォルト値の提供**
   - 各ボタンに適切なデフォルトテキスト
   - 日本語のデフォルト値で使いやすさを向上

## 使用パターン

これらのボタンコンポーネントは、通常以下のようなパターンで使用されます：

```tsx
<Form schema={schema}>
  {({ form, field }) => (
    <>
      {/* フォームフィールド */}
      <TextField name={field.name.name} />
      
      {/* 配列フィールド */}
      <FieldArray field={field.items}>
        {({ field, index }) => (
          <HStack>
            <TextField name={field.name.name} />
            <RemoveArrayItemButton field={field} index={index} />
          </HStack>
        )}
      </FieldArray>
      
      {/* 操作ボタン */}
      <HStack>
        <AddArrayItemButton field={field.items} />
        <ResetButton />
        <Button type="submit">送信</Button>
      </HStack>
    </>
  )}
</Form>
```
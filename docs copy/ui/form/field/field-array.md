# FieldArray Component

## 概要

`FieldArray`コンポーネントは、Conformの配列フィールドを管理し、動的に要素を追加・削除・コピーできる機能を提供します。

## ファイルパス
`src/ui/form/field/field-array.tsx`

## 主要な依存関係
- `@conform-to/react`: 配列フィールドの管理機能

## FieldArray コンポーネント

### Props

```typescript
{
  field: T;  // FieldMetadata<Item[]>型
  children: (props: {
    field: ReturnType<T["getFieldList"]>[number];
    index: number;
    insert: (defaultValue?: DefaultValue<Item>, index?: number) => void;
    copy: () => void;
    remove: () => void;
  }) => ReactNode;
}
```

### 機能

1. **配列要素のレンダリング**
   - `getFieldList()`で配列の各要素を取得
   - 各要素に対してchildren関数を実行

2. **要素の操作**
   - `insert`: 新しい要素を追加
   - `copy`: 既存の要素をコピー
   - `remove`: 要素を削除

3. **Render Props パターン**
   - 各配列要素に対して、フィールド情報と操作関数を提供

### 使用例

```tsx
// スキーマ定義
const schema = v.object({
  contacts: v.array(v.object({
    name: v.string(),
    email: v.string([v.email()]),
    phone: v.string()
  }))
});

// 使用例
<Form schema={schema}>
  {({ field }) => (
    <>
      <FieldArray field={field.contacts}>
        {({ field, index, insert, copy, remove }) => (
          <Card key={field.key} mb={4}>
            <CardHeader>
              <Heading size="sm">連絡先 {index + 1}</Heading>
              <HStack>
                <Button size="sm" onClick={copy}>コピー</Button>
                <Button size="sm" colorScheme="red" onClick={remove}>削除</Button>
              </HStack>
            </CardHeader>
            <CardBody>
              <TextField name={field.name.name} label="名前" />
              <TextField name={field.email.name} label="メール" />
              <TextField name={field.phone.name} label="電話番号" />
            </CardBody>
          </Card>
        )}
      </FieldArray>
      <Button onClick={() => form.insert({ name: field.contacts.name })}>
        連絡先を追加
      </Button>
    </>
  )}
</Form>
```

## 実装の詳細

### useFormMetadata フック
フォーム全体のメタデータにアクセスし、配列操作メソッドを使用。

### insert 関数
```typescript
const insert = useCallback(
  (defaultValue?: DefaultValue<Item>, index?: number) =>
    form.insert({ name: field.name, defaultValue, index }),
  [form, field.name],
);
```
- `defaultValue`: 新しい要素の初期値
- `index`: 挿入位置（省略時は末尾に追加）

### copy 関数
```typescript
const copy = useCallback(
  (index: number) => {
    const item = field.getFieldList()[index]?.value;
    form.insert({ name: field.name, defaultValue: item, index: index + 1 });
  },
  [form, field.name, field.getFieldList],
);
```
- 指定インデックスの要素の値を取得
- その値を初期値として、次の位置に新しい要素を挿入

### remove 関数
```typescript
const remove = useCallback(
  (index: number) => form.remove({ name: field.name, index }),
  [form, field.name],
);
```
- 指定インデックスの要素を削除

## 型安全性

ジェネリック型により、配列要素の型が保持されます：
- `T extends FieldMetadata<Item[]>`: 配列フィールドのメタデータ型
- `Item`: 配列の各要素の型

## 注意点

- `@ts-expect-error`コメントがcopy関数内にあるが、これは型推論の複雑さによるもの
- 実行時には問題なく動作する

## パフォーマンス最適化

- `useCallback`で関数の再生成を防止
- 依存配列を最小限に保つことで不要な再レンダリングを回避
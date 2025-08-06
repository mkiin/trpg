# FormDebug Component

## 概要

`FormDebug`コンポーネントは、開発時にフォームの状態をリアルタイムで確認できるデバッグツールです。フォームの値とエラーをJSON形式で表示します。

## ファイルパス
`src/ui/form/debug/index.tsx`

## 主要な依存関係
- `@conform-to/react`: フォームメタデータへのアクセス
- `@/ui/dev/json-viewer`: JSON表示コンポーネント

## FormDebug コンポーネント

### 機能

1. **フォーム値の表示**
   - 現在のフォームの全フィールドの値を表示
   - リアルタイムで値の変更を反映

2. **エラー情報の表示**
   - フォーム全体のエラー（allErrors）を表示
   - バリデーションエラーを即座に確認可能

3. **JSONビューア統合**
   - 見やすいJSON形式で表示
   - 折りたたみ機能付き

### 使用例

```tsx
import dynamic from 'next/dynamic';

// 動的インポートで開発環境のみ読み込み
const FormDebug = dynamic(() => import('@/ui/form/debug'), {
  ssr: false,
});

// フォーム内での使用
<Form schema={schema}>
  {({ form, field }) => (
    <>
      <TextField name={field.name.name} label="名前" />
      <TextField name={field.email.name} label="メール" />
      
      {/* 開発環境でのみ表示 */}
      {process.env.NODE_ENV === 'development' && <FormDebug />}
    </>
  )}
</Form>
```

### 実装の詳細

```tsx
const FormDebug: FC = () => {
  const form = useFormMetadata();
  return (
    <JSONViewer
      value={{
        formValue: form.value,      // フォームの現在値
        formErrors: form.allErrors,  // すべてのエラー
      }}
    />
  );
};
```

### 表示される情報

```json
{
  "formValue": {
    "name": "山田太郎",
    "email": "yamada@example.com",
    "age": 25
  },
  "formErrors": {
    "email": ["有効なメールアドレスを入力してください"],
    "age": ["年齢は0以上である必要があります"]
  }
}
```

## 使用上の注意

1. **パフォーマンス**
   - 開発環境でのみ使用することを推奨
   - 大きなフォームでは描画コストが高くなる可能性

2. **動的インポート**
   - Next.jsの`dynamic`を使用して遅延読み込み
   - 本番ビルドから除外可能

3. **FormProvider内で使用**
   - FormProviderのコンテキスト内でのみ動作
   - Form コンポーネントの子要素として配置

## 開発時の活用方法

1. **バリデーションのデバッグ**
   - エラーメッセージが正しく表示されているか確認
   - フィールド名とエラーの対応を確認

2. **フォーム状態の確認**
   - 隠しフィールドの値を確認
   - 配列フィールドの構造を視覚化

3. **データフローの理解**
   - フォームの値がどのように更新されるか追跡
   - 依存フィールドの動作確認

## カスタマイズ例

```tsx
// 条件付き表示
const [showDebug, setShowDebug] = useState(false);

<>
  <Button onClick={() => setShowDebug(!showDebug)}>
    デバッグ {showDebug ? '非表示' : '表示'}
  </Button>
  {showDebug && <FormDebug />}
</>
```
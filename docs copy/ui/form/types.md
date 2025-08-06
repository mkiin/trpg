# Form Types

## 概要

フォームの状態を表す型定義を提供します。サーバーアクションの結果やクライアントサイドのフォーム状態を統一的に扱うための型です。

## ファイルパス
`src/ui/form/types.ts`

## FormState 型

```typescript
export type FormState = Readonly<
  | {
      status: "success";
      message: string;
      submissionResult?: SubmissionResult;
    }
  | {
      status: "error";
      submissionResult?: SubmissionResult;
    }
  | {
      status: "error";
      message: string;
      submissionResult?: SubmissionResult;
    }
  | {
      status: "idle";
      submissionResult?: SubmissionResult;
    }
>;
```

### 状態の種類

1. **success**
   - `status`: "success"
   - `message`: 成功メッセージ（必須）
   - `submissionResult`: Conformの送信結果（オプション）

2. **error（メッセージなし）**
   - `status`: "error"
   - `submissionResult`: Conformの送信結果（オプション）

3. **error（メッセージあり）**
   - `status`: "error"
   - `message`: エラーメッセージ
   - `submissionResult`: Conformの送信結果（オプション）

4. **idle**
   - `status`: "idle"
   - `submissionResult`: Conformの送信結果（オプション）

### 使用例

```typescript
// サーバーアクションでの使用
async function submitForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const submission = parseWithValibot(formData, { schema });
  
  if (submission.status !== "success") {
    return {
      status: "error",
      submissionResult: submission.reply()
    };
  }

  try {
    // 処理実行
    await saveData(submission.value);
    
    return {
      status: "success",
      message: "保存しました",
      submissionResult: submission.reply({ resetForm: true })
    };
  } catch (error) {
    return {
      status: "error",
      message: "保存に失敗しました",
      submissionResult: submission.reply()
    };
  }
}
```

### submissionResult について

`SubmissionResult`はConformから提供される型で、フォーム送信の結果を含みます：
- フォームのエラー情報
- フィールドごとのエラー
- フォームのリセット指示
- その他のメタデータ

この情報は`useForm`フックの`lastResult`プロパティに渡され、クライアント側でのエラー表示やフォーム状態の復元に使用されます。
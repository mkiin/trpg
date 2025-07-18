# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

これはクトゥルフ神話TRPG（Call of Cthulhu）のキャラクターシート作成・管理ウェブアプリケーションです。Next.js 15のApp Routerを使用して構築されています。

## 技術スタック

- **フレームワーク**: Next.js 15.1.6 (App Router、Turbopack使用)
- **UI**: React 19、TypeScript、Tailwind CSS v4
- **状態管理**: Jotai (atomWithStorage使用)
- **データベース**: PostgreSQL + Drizzle ORM
- **認証**: Better Auth
- **AI**: Google Generative AI (@ai-sdk/google)
- **APIフレームワーク**: Hono
- **フォームバリデーション**: Conform + Zod
- **コード品質**: Biome (リンティング・フォーマット)

## 開発コマンド

```bash
# 開発サーバー起動（Turbopack使用）
pnpm dev

# プロダクションビルド
pnpm build

# プロダクションサーバー起動
pnpm start

# リンティング
pnpm lint

# データベース関連
pnpm db:generate  # マイグレーションファイル生成
pnpm db:migrate   # マイグレーション実行
pnpm db:studio    # Drizzle Studio起動（DBのGUI）
pnpm db:seed      # シードデータ投入
pnpm auth:generate-schema  # Better Auth用スキーマ生成
```

## アーキテクチャ

### ディレクトリ構造

```
/app               # Next.js App Routerのページ
  /(landing)       # ランディングページグループ
  /(main)          # メインアプリグループ
    /character-sheet  # キャラクターシート作成
    /rooms           # セッションルーム管理
  /api             # Honoを使用したAPIルート

/features          # 機能別モジュール
  /auth            # 認証関連
  /character-sheets # キャラクターシート作成ロジック
  /chat            # チャット機能
  /sidebar         # サイドバーナビゲーション

/components/ui     # 再利用可能なUIコンポーネント（Radix UIベース）
/lib              # 共通ユーティリティ
  /ai             # AI統合（Google AI）
  /auth           # 認証設定
  /db             # データベーススキーマとクエリ

/server           # Hono APIサーバー設定
```

### 主要な機能

1. **キャラクターシート作成システム**
   - 基本情報（名前、職業、年齢、性別など）
   - 能力値（STR、CON、POWなど）のダイスロール計算
   - スキルシステム（戦闘、探索、行動、交渉、知識の各カテゴリ）
   - AIによる自動生成機能

2. **スキルフォームの複雑な実装**
   - 固定スキル、カスタマイズ可能スキル、選択式スキルの3種類
   - 職業に応じた動的フォーム生成
   - Jotaiのatomを使用した状態永続化

3. **リアルタイムチャット機能**
   - ルームベースのセッション管理
   - AI統合によるゲームマスターサポート

## 開発時の注意点

### コーディング規約

- **フォーマット**: Biome使用（タブインデント、ダブルクォート）
- **型安全性**: 厳密なTypeScript設定、Zodスキーマによる実行時検証
- **コンポーネント**: 機能ベースの構造、ロジックはhooksに分離
- **状態管理**: Jotaiのatomを使用、必要に応じてatomWithStorageで永続化

### 環境変数

`env.ts`で定義される必須環境変数：
- `POSTGRES_URL`: PostgreSQLデータベース接続URL
- `BETTER_AUTH_SECRET`: Better Auth認証シークレット
- `BETTER_AUTH_URL`: Better AuthサービスURL
- `GOOGLE_GENERATIVE_AI_API_KEY`: Google AI APIキー
- `NEXT_PUBLIC_APP_URL`: 公開アプリケーションURL

### データベース操作

- マイグレーション作成前に必ず`pnpm db:generate`を実行
- スキーマ変更後は`pnpm db:migrate`でマイグレーション適用
- 開発中は`pnpm db:studio`でDBの状態を確認可能

### 型定義の重要性

- スキル定義は`discriminated union`を使用した複雑な型構造
- フォームの型推論を正しく行うため、Zodスキーマとconformの統合に注意
- サーバーアクションは`/features/*/actions`に配置

### パッケージマネージャー

このプロジェクトは**pnpm** (v10.11.0)を使用しています。npmやyarnは使用しないでください。
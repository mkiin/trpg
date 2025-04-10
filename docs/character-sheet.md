# TRPG キャラクターシート作成画面 概要
　以下にキャラクターシートを作成する画面において、入力項目とキャラクター自動生成におけるフローについてまとめる。

## キャラクターシート　項目構成
以下の要素で構成される

1. 基本情報
2. 能力値
3. 技能

### 基本情報

- 名前
- 職業*1
- 年齢
- 性別
- 身長
- 体重
- 出身
- 背景情報
- 行動パターン(性格的なもの)

### 能力値

- **ダイスにより決定するもの**

| 名称 (英語)        | 名称 (日本語) | サイコロの振り方 |
| ------------------ | ------------- | -------------- |
| strength         | 筋力          | 3d6            |
| constitution       | 体力          | 3d6            |
| power              | 精神力        | 3d6            |
| dexterity          | 機敏          | 3d6            |
| appearance       | 外見的な魅力 | 3d6            |
| size               | 体格          | 2d6+6          |
| intelligence       | 知性          | 2d6+6          |
| education          | 教養          | 3d6+3          |

- **ダイスにより算出されたパラメータから計算するもの**

| 名称 (英語)             | 名称 (日本語)   | 計算式          |
| ----------------------- | ------------- | ------------- |
| san                    | 正気度        | power * 5     |
| fortune                | 幸運          | power * 5     |
| idea                   | アイデア      | intelligence * 5 |
| knowledge              | 知識          | education * 5   |
| durability             | 耐久力        | (constitution + size) / 2 |
| magic\_point            | マジックポイント | power * 1     |
| vocational\_skill\_points | 職業技能ポイント | intelligence * 20 |
| hobby skill points| 趣味技能ポイント| strength + size  |



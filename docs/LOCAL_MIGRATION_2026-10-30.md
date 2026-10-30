# ローカル開発環境への移行記録

2026-10-30、作者承認に基づいて実施。制作者用。公開しない。

## 正式な開発場所

- 移行先・今後の正式な開発環境：`C:\Users\koyam\Desktop\Web_ARG\ARG-Time_Back`
- 移行元・保管対象：`C:\Users\koyam\OneDrive\デスクトップ\Web_ARG\ARG-Time_Back`
- 公開ファイルのルート：移行先の `public/`。リポジトリ全体を配信しない。
- 入口：`AGENTS.md` と `docs/WORK_MODES.md`。3つの作業モードを維持する。
- OneDrive原本の変更・削除、ARG-Playtesterへのアクセス、コミット・プッシュは実施していない。

## 保全とGit履歴

バックアップ：`C:\Users\koyam\.codex\visualizations\2026\10\30\01a18ad1-3dde-7b90-8f3f-43eba167734f\timeback-backup-20261030`

両側の全作業ファイル（ローカル85件／OneDrive250件、`.git/`を除く）、空ディレクトリを含む構成、ファイルごとのサイズ・SHA-256、未追跡ファイルを保存した。Gitの未ステージ／ステージ差分はbinary・full-index形式、追跡状態・インデックス一覧・参照・ローカル設定はテキスト、全参照とHEADの履歴はbundleとして保存した。作業ツリーのハッシュ照合とbundle verifyが成功してから統合した。`.git/`のコピーは行っていない。

- 移行前ローカルHEAD：`5272c3d86c73cbc1f6ac6115e47845d9f35c5671`
- 移行後main：`faf3d2045a18eaa4bace918d907031fb9711759e`
- 取り込んだ既存5コミット：`7ef2311`、`2a3ca83`、`e412b68`、`c62dc6a`、`faf3d20`
- ローカル既存リポジトリを維持し、検証済みbundleから取り込んだ。祖先関係を確認し、作業ファイルを変更しない `reset --mixed` でmainとインデックスを進めた。新しいコミットは作成していない。
- 移行前HEADの保全参照：`refs/migration/pre-local-main`
- OneDrive側のHEAD参照：`refs/remotes/migration-onedrive/main`
- OneDrive側にあったCodexチェックポイント参照も `refs/migration/onedrive-codex/` 以下に保全した。
- originのURL・追跡設定は変更していない。ネットワークからfetchしていないため、origin/mainの表示はリモート最新状態の確認を意味しない。

## ファイル統合の判断

OneDriveの作業ツリーから166ファイルを追加、48ファイルを更新、36ファイルをそのまま維持した。元の250ファイルは移行先とバイト単位で一致。AGENTS、docs、planning、4つのTOML定義、全scripts、Hub・実証関連・検索・画像を含む。移行前後の一覧はバックアップ内の `integration-plan.json` と `integration-result.json` に保存した。

ローカルだけの `public/images/TIME_BACK_Access_Map.svg` は元のハッシュのまま保持した。これと移行元250ファイルで統合直後は251ファイル。本記録は移行後に新規追加した。

ローカルの追跡済み未コミット変更33件は、共通祖先との差分を照合すると、ページ番号・アーカイブ辞書・URLから番号への変換だけだった。これらのメタデータを除いた内容が一致することを34件の比較（33件と未追跡memo感想記事）で確認し、作者が優先指定したOneDrive側の現行番号体系へ統合した。旧内容・差分はバックアップに残る。記事本文等の不明な固有変更を捨てたものではない。

ローカルの未追跡10件のうち7件は移行元とハッシュ一致。夢記事は移行元の過去コミット `7ef2311`／`2a3ca83` と一致し、最新の入口移設・互換転送を採用。感想記事の差分も番号メタデータのみ。残る地図SVGは上記のとおり保全した。

## 検証

次の既存6スクリプトはすべてPASS。

- `scripts/check-community-archive.cjs`
- `scripts/check-entry-migration.cjs`
- `scripts/check-chronect-hub.cjs`
- `scripts/check-chronect-completion.cjs`
- `scripts/check-ux-refinement.cjs`
- `scripts/check-archive-order.cjs`

現行コードの57ページ・13レジストリ、4EX除外、検索DB、記事原稿、研究記事からHubへの導線、保存データ移行・再訪、GA、画像等の参照を含む。旧版テストの一部は既存helperによる厳密な旧意味復元を使うため、現行コードを直接検証するcheck-archive-orderも併せて実施した。

専用ヘッドレスChromeで62HTMLを幅1440px／390pxの計124表示検証。遅延読み込み画像の読込完了後に、画像破損・横方向のはみ出し・JavaScript例外・ローカルHTTPエラーがないことを確認。代表画面のスクリーンショットも確認した。4サイトの検索フォームで正解語と不正解語を検証し、Hubの管理コード検索・研究要旨検索が動作。旧夢記事URLはクエリ・ハッシュを保ってindexへ転送。旧アーカイブの夢記事・TIME BACKトップ・感想記事を現行URL・番号へ移行し、ダイアログ表示を確認した。

ブラウザ検証の初回は遅延読込画像を早すぎる時点で検査し、検索条件にも既存ホワイトリストとの不一致があった。検証コードを修正して再実行し、最終結果はPASS。サイトの実装はこのために変更していない。

一時配信はpublicのみをルートに設定し、AGENTS、docs、planning、.gitへのHTTPアクセスは404。外部通信を遮断し、実送信は行っていない。検証用サーバーとブラウザは終了済み。結果JSON・スクリーンショットはバックアップの `qa/` に保存した。

4つのエージェントTOMLをPython tomllibで解析し、必須文字列・名前の一意性を確認。AGENTSとWORK_MODESは移行後に読み取り確認した。エージェントの実起動・アプリによる自動発見は未検証。制作チャットでarg_playerは起動していない。

## 未確認・運用上の注意

- 実機スマートフォン・別ブラウザ・公開本番環境では未検証。
- 本番ホスティング側の公開ディレクトリ設定は、このリポジトリからは確認できず変更していない。今回保証できる配信範囲はローカル検証サーバーのpublic限定。
- `.codex/README.md` など過去記録の「初見環境未構築」等は当時の記述として保全。現在の独立したARG-Playtester運用の否定とは扱わない。
- OneDrive由来の未コミット80件・未追跡13件を維持。ローカル固有SVGと本記録は追加の未追跡ファイル。ステージは空。コミット・プッシュは作者から明示依頼があるまで行わない。
- OneDriveを正式な編集元として併用せず、削除判断は移行確認後の別依頼とする。

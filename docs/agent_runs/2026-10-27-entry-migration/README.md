# 入口変更：2026-10-27

作者依頼：index.htmlをmemo夢記事に入れ替え、現在のTIME BACKトップを内容が分かる別名にし、他ページのリンクも修正する。

## 実装

- index.html：夢記事の実体、1 / 60。
- time-back.html：旧TIME BACKトップの実体、3 / 60。タイトル「トップページ | TIME BACK」を維持。
- memo-dream.html：旧リンク向けの互換誘導。query/hash保持、番号・アーカイブ登録なし。JS無効時は通常リンクでindexへ進める。
- TIME BACKの通常リンクはtime-back.html、夢記事への通常リンクはindex.html。リセット後はindexの物語入口へ戻る。
- 13のURL辞書とloadArchiveを更新。旧memo→index1、旧index3またはTIME BACK題名→time-back3、新index1＋memo題名→index1。既存の他ページ改番移行も維持。
- 本文・デザイン・CSS・画像・番号・総数・検索3DBは不変。先行作業の実証エリア写真と公園検索登録削除も維持。

## 担当・権限

- WEB-ENTRY-20261027：通常サブエージェント `/root/approved_area_web_02`。前回全文受領済みのweb_developer v1.0を継続。役割全文SHA-256 `9927928a82cbd9deca08be014da1875956a96d92da159e41b94c03ebf2497010`。今回の承認・仕様・許可ファイル・禁止事項を本会話のfollowup_taskで明示し、受領後に編集許可を送った。
- 実装担当の許可は対象public HTML/JSのみ。独断での設定変更、docs、画像、CSS、ブラウザ・サーバー、追加担当は禁止。実際の公開変更は17ファイル（新time-backを含む）。補助JSは追加していない。
- REVIEW-ENTRY-20261027：`/root/next_scope_review_02`。前回全文受領済みcontinuity_reviewer v1.0を継続。公開差分・本文比較・移行・テストを読み取り再照合し、不整合なし。編集なし。
- メイン：開始時164ファイルのハッシュを記録し、既存未コミット変更を保持。今回の検証スクリプト、docs README・03・04・05・07・09・10と本記録・画面証跡を担当。
- 初見担当の起動・情報共有なし。作者の重要設定変更は含まないため、追加の物語承認は不要。

## 検証

- 新しい読み取り専用検証 `node scripts/check-entry-migration.cjs`：13辞書×8ケース＝104ケースと再移行の冪等性がPASS。古いトップの番号1・2・3と、新しい夢記事の番号1を区別。既存の提携企業改番、空配列・不正保存値も確認。
- 入口・トップの通常リンク、番号一意（46ページ）、旧URLのquery/hash保持、互換ページの非登録、全50HTMLのGAを確認。
- 既存check-community-archiveは13辞書・156構文・検索・旧番号移行PASS。全3検索DBは作業前と同一。
- ブラウザ：ルートURLでmemo夢記事、記事のTIME BACKリンクで新トップ、サービス説明からブランドリンクで新トップへ戻ることを確認。
- ブラウザ：旧memo-dream.html?from=old#authorがindex.html?from=old#authorになることを確認。アーカイブ1→index、3→time-backの表示・リンクと3からの再訪を確認。
- 画面証跡：[memo入口](index.jpg)、[TIME BACKトップ](time-back.jpg)。レイアウト変更はなく、今回の表示確認はPC相当のローカルブラウザ。スマホ実機、本番Cloudflare、GA受信、初見テストは未検証。

## 次の制作

Hub・管理コード照会・本人の行動履歴は未実装のまま。今回の入口変更はその解法や開示順を変更しない。古い調査・テスト記録のURLや保存ハッシュは履歴として書き換えない。

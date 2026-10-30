# 検索ホワイトリストとリンク現況

2026-10-30参照番号更新：現行番号は04-page-inventory.mdと固定order.jsonを基準とする。過去の実施記録は当時の番号のまま保持する。

調査日：2026-10-23。実装から抽出した現況。検索DBの存在は、リンク先の実在や設定の妥当性を保証しません。これは制作者の保守用一覧で、プレイヤー用の解法集として公開しないでください。

3検索は前後空白除去＋小文字化の完全一致。2026-10-26更新：TIME BACK12項目、Business12項目、Chronect21項目。作者承認により公園の旧登録1項目を削除。別名が大小文字だけ異なる登録は同じ結果として判定されます。

2026-10-28：既存3検索を維持し、独立したHub資料検索2項目を追加。前後空白除去＋小文字化以外の自動補正はしない。Hubだけの正解を既存3サイトへ混ぜない。

2026-10-29追加制作：Chronect企業検索は3研究ニュースの見出し完全一致を追加して24項目。プロジェクト/共同研究の既存登録は17へ差替え。Hubは既存2資料に新規要旨3資料を追加し計5資料。既存の睡眠/時間認知→41、管理コード→45を維持し、新しい9語は公開要旨だけを返す。

## chronect-hub-search.html

| 許可される検索語 | 結果名 | 遷移先 | 現況 |
|---|---|---|---|
| 睡眠 / 時間認知 / 睡眠中の時間認知 / 睡眠中の時間認知に関する研究 / 睡眠中の時間認知に関する研究要旨 | 睡眠中の時間認知に関する研究要旨 | `chronect-hub-research.html` | 実在・公開要旨41。2026-10-29作者承認で分離・登録語追加 |
| TB-260917-4826 | セッション運用記録（参照用抜粋） | `chronect-hub-session.html` | 実在・限定保存抜粋 |
| 日常環境下での時間選択に関する予備研究要旨 / 時間選択 / 日常環境 | 日常環境下での時間選択に関する予備研究要旨 | `chronect-hub-research-20240711.html` | 43。ニュース56の対応資料 |
| 注意配分と主観時間に関する研究要旨 / 注意配分 / 主観時間 | 注意配分と主観時間に関する研究要旨 | `chronect-hub-research-20251105.html` | 44。ニュース51の対応資料 |
| 短時間休息後の覚醒移行に関する検証要旨 / 覚醒移行 / 短時間休息 | 短時間休息後の覚醒移行に関する検証要旨 | `chronect-hub-research-20260218.html` | 42。ニュース23の対応資料 |

未入力は入力案内、不一致は「該当する資料はありません。入力内容をご確認ください」。会員ID・P-0917-0318・管理コードの一部・夢・安全記録などは0件。検索結果にHTML名は表示せず、EXはアーカイブへ記録しない。

## search.html

| 許可される検索語 | 結果名 | 遷移先 | 現況 |
|---|---|---|---|
| TIME BACK ID | TIME BACK ID ご利用ガイド | `time-back-id.html` | 実在 |
| 行動支援システム / 行動支援技術 / Behavior Assistance System | Behavior Assistance System | `behavior-assistance.html` | 実在 |
| TIME BACK MARKET / 時間プール | TIME BACK MARKET | `market.html` | 実在 |
| TIME BACK / タイムバック / サービス / 時間売却 / 時間を売る | TIME BACK サービス概要 | `about.html` | 実在 |
| 利用方法 / 使い方 / 時間を選ぶ / 預ける / 報酬 / アプリ | TIME BACKの利用方法 | `about.html#flow-title` | 実在 |
| 時間購入 / 時間を買う / 購入 / 買取 / 買う | 時間を買う | `about.html#market-choices` | 実在 |
| 料金 / 料金表 / 価格 / 売却価格 / 購入料金 | 料金・報酬 | `pricing.html` | 実在 |
| 安全 / 安全性 / 行動支援 / モニタリング / サポート | 安全性について | `safety.html` | 実在 |
| よくある質問 / FAQ / 利用条件 / キャンセル / 登録 | よくある質問 | `faq.html` | 実在 |
| 利用規約 / 規約 / 禁止事項 / 個人情報 / プライバシー | 利用規約 | `terms.html` | 実在 |
| Chronect / クロネクト / 運営会社 | Chronect | `chronect-company.html` | 実在 |
| 問い合わせ / お問い合わせ / 連絡 / サポート窓口 | お問い合わせ | `contact.html` | 実在 |

## business-search.html

| 許可される検索語 | 結果名 | 遷移先 | 現況 |
|---|---|---|---|
| TIME BACK FOR BUSINESS / TIME BACK for Business / 法人向け案内 / ビジネスプラン | TIME BACK for Business | `business.html` | 実在 |
| サービス / 法人向けサービス / 時間の一括調達 / 時間プール / 時間配分 / 利用管理 / 管理者向け機能 | 法人向けサービス | `business-service.html` | 実在 |
| 導入事例 / 活用シーン / プロジェクト / 研修 / 研究開発 | 導入事例 | `business-cases.html` | 実在 |
| ユーザー参加型実証プログラム / 実証プログラム / 実証試験 | ユーザー参加型実証プログラム | `business-demonstration.html` | 実在 |
| 明浜商店街振興会 | 地域連携の取り組み | `business-community.html` | 実在 |
| 生活環境実証エリア | 生活環境実証エリア | `business-demonstration-area.html` | 実在 |
| 安全管理 / 安全性 / 申請・承認 / モニタリング / 利用制限 / 監査 | 法人向け安全管理 | `business-safety.html` | 実在 |
| 導入の流れ / 導入 / 契約 / 導入相談 / 利用開始 | 導入の流れ | `business-flow.html` | 実在 |
| Behavior Assistance Platform / BAP / 従業員動向管理 | Behavior Assistance Platform | `behavior-assistance-platform.html` | 実在 |
| 行動支援機器・システム / 行動支援機器 / 行動支援システム | 行動支援機器・システム | `behavior-assistance-equipment.html` | 実在 |
| 利用前オリエンテーション | 利用前オリエンテーション | `pre-use-orientation.html` | 実在 |
| 提携企業一覧 | 提携企業一覧 | `partners.html` | 実在 |

## chronect-search.html

| 許可される検索語 | 結果名 | 遷移先 | 現況 |
|---|---|---|---|
| Chronect / クロネクト / 運営会社 / 企業情報 / 会社概要 | 企業情報 | `chronect-company.html` | 実在 |
| 研究開発 / 神経科学 / 時間認知 / 睡眠研究 | 研究開発 | `chronect-research.html` | 実在 |
| 事業・サービス / 事業内容 / サービス / TIME BACK | 事業・サービス | `chronect-services.html` | 実在 |
| TIME BACK for Business / 法人向け / 法人向けサービス | TIME BACK for Business | `business.html` | 実在 |
| プロジェクト / 共同研究 | プロジェクト | `chronect-projects.html` | 実在・54 |
| ニュース / お知らせ / プレスリリース | ニュース | `chronect-news.html` | 実在 |
| 短時間休息と認知回復に関する産学共同研究を開始 / 短時間休息 / 認知回復 | 短時間休息と認知回復に関する産学共同研究を開始 | `chronect-news-20240305.html` | 実在 |
| TIME BACK先行提供プログラムを開始しました / TIME BACK先行提供プログラム / 先行提供 | TIME BACK先行提供プログラムを開始しました | `chronect-news-20241021.html` | 実在 |
| 個人向け時間取引サービス「TIME BACK」を正式提供 / TIME BACK正式提供 / 正式提供 | 個人向け時間取引サービス「TIME BACK」を正式提供 | `chronect-news-20250401.html` | 実在 |
| Chronect本社研究施設の設備拡張について / 研究施設設備拡張 / 設備拡張 | Chronect本社研究施設の設備拡張について | `chronect-news-20250526.html` | 実在 |
| TIME BACK MARKET月次情報の公開を開始しました / TIME BACK MARKET月次情報 / 月次情報 | TIME BACK MARKET月次情報の公開を開始しました | `chronect-news-20250701.html` | 実在 |
| Chronect Research Day 2025 開催のお知らせ / Chronect Research Day 2025 / Research Day | Chronect Research Day 2025 開催のお知らせ | `chronect-news-20250808.html` | 実在 |
| 公共交通環境における姿勢安定化支援の実証を開始 / 姿勢安定化支援 / 公共交通環境 | 公共交通環境における姿勢安定化支援の実証を開始 | `chronect-news-20250924.html` | 実在 |
| 年末年始のサポート窓口営業日について / 年末年始 / サポート窓口営業日 | 年末年始のサポート窓口営業日について | `chronect-news-20251216.html` | 実在 |
| 北央工科大学との時間知覚共同研究契約を更新 / 時間知覚共同研究契約 / 北央工科大学 | 北央工科大学との時間知覚共同研究契約を更新 | `chronect-news-20260109.html` | 実在 |
| TIME BACKアプリにセッション状況確認機能を追加 / セッション状況確認機能 / セッション状況 | TIME BACKアプリにセッション状況確認機能を追加 | `chronect-news-20260312.html` | 実在 |
| 2025年度研究開発活動報告を公開しました / 2025年度研究開発活動報告 / 研究開発活動報告 | 2025年度研究開発活動報告を公開しました | `chronect-news-20260418.html` | 実在 |
| 時間認知研究オープンセミナー2026を開催します / 時間認知研究オープンセミナー2026 / オープンセミナー2026 | 時間認知研究オープンセミナー2026を開催します | `chronect-news-20260520.html` | 実在 |
| TIME BACK for Businessの提供領域を拡大 / 提供領域を拡大 / 法人向け提供領域 | TIME BACK for Businessの提供領域を拡大 | `chronect-news-20260603.html` | 実在 |
| 生活環境における行動支援技術の共同検証を開始 / 生活環境 / 行動支援技術の共同検証 | 生活環境における行動支援技術の共同検証を開始 | `chronect-news-20260714.html` | 実在 |
| 採用情報 / 採用 / 募集職種 / 応募前照会 | 採用情報 | `chronect-careers.html` | 実在 |
| 日常環境下での時間選択に関する予備研究を発表 | 日常環境下での時間選択に関する予備研究を発表 | `chronect-news-20240711.html` | 51 |
| 注意配分と主観時間に関する論文が国際誌に掲載 | 注意配分と主観時間に関する論文が国際誌に掲載 | `chronect-news-20251105.html` | 52 |
| 短時間休息後の覚醒移行に関する検証結果を発表 | 短時間休息後の覚醒移行に関する検証結果を発表 | `chronect-news-20260218.html` | 53 |

## 未作成先への参照

HTMLのhref/srcと検索DBのurlから検出。外部サイトへの通信確認・全ハッシュアンカー確認は含まない。

2026-10-29：既知の研究3記事とプロジェクト紹介はすべて実ファイルを作成。各研究から対応する新規Hub要旨へリンクする。静的参照の最終監査結果は今回の補完制作記録に保存する。

## 通常リンクの一覧

2026-10-27：夢記事はindex.html、TIME BACKトップはtime-back.htmlへ更新済み。旧memo-dream.htmlは番号を持たずindex.htmlへ互換誘導し、通常リンク・アーカイブからの参照先には使わない。

各HTMLに存在するローカルHTMLへのリンク先を重複除去。ヘッダー・フッター・本文を含み、アーカイブが動的に作る全訪問済みリンクは含まない。画像・CSS・ページ内アンカーだけのリンクは除外。検索フォームのactionは上記3検索と対応する。

| 元ページ | 通常リンク先 |
|---|---|
| 1・index.html | `index.html`、`time-back.html`、`memo-timeback-review.html` |
| 2・memo-timeback-review.html | `index.html`、`time-back.html`、`pricing.html` |
| 3・time-back.html | `time-back.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |
| 4・about.html | `time-back.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |
| 5・pricing.html | `time-back.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |
| 6・safety.html | `time-back.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |
| 7・faq.html | `time-back.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html`、`terms.html`、`terms.html#cancellation`、`terms.html#privacy`、`contact.html` |
| 8・terms.html | `time-back.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html`、`contact.html` |
| 9・contact.html | `time-back.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html`、`terms.html#privacy` |
| 10・market.html | `time-back.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |
| 11・behavior-assistance.html | `time-back.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html`、`contact.html` |
| 12・time-back-id.html | `time-back.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html`、`contact.html`、`terms.html#privacy` |
| 13・chronect.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`chronect-projects.html`、`chronect-news-20260822.html`、`chronect-news-20260714.html`、`chronect-news-20260603.html` |
| 14・chronect-company.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 15・chronect-research.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 16・chronect-services.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`time-back.html`、`business.html` |
| 18・chronect-news.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`chronect-news-20260822.html`、`chronect-news-20260714.html`、`chronect-news-20260603.html`、`chronect-news-20260520.html`、`chronect-news-20260418.html`、`chronect-news-20260312.html`、`chronect-news-20260218.html`、`chronect-news-20260109.html`、`chronect-news-20251216.html`、`chronect-news-20251105.html`、`chronect-news-20250924.html`、`chronect-news-20250808.html`、`chronect-news-20250701.html`、`chronect-news-20250526.html`、`chronect-news-20250401.html`、`chronect-news-20241021.html`、`chronect-news-20240711.html`、`chronect-news-20240305.html` |
| 19・chronect-careers.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 57・chronect-news-20240305.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 55・chronect-news-20241021.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 25・chronect-news-20250401.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 24・chronect-news-20250526.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 54・chronect-news-20250701.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`market.html` |
| 53・chronect-news-20250808.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 52・chronect-news-20250924.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 50・chronect-news-20251216.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`contact.html` |
| 49・chronect-news-20260109.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 48・chronect-news-20260312.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`about.html` |
| 47・chronect-news-20260418.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 46・chronect-news-20260520.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 22・chronect-news-20260603.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`business.html` |
| 21・chronect-news-20260714.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 26・business.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 27・business-service.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 28・business-cases.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 29・business-safety.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 30・business-flow.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html`、`contact.html?subject=business` |
| 31・behavior-assistance-platform.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 32・behavior-assistance-equipment.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 33・pre-use-orientation.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 34・business-demonstration.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 36・business-community.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 35・business-demonstration-area.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 37・partners.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html`、`nodelink-works.html`、`axion-logistics.html` |
| 38・nodelink-works.html | `nodelink-works.html` |
| 39・axion-logistics.html | `axion-logistics.html` |
| 20・chronect-news-20260822.html | Chronect共通ナビ、`chronect-news.html`、`chronect-research.html`、研究資料41への直接リンク |
| 40・chronect-hub.html | Hub専用ヘッダー・検索。企業ナビなし |
| 45・chronect-hub-session.html | Hub専用ヘッダー・検索、`chronect-hub.html`。2026-10-29作者承認で34への参照リンクを削除し、写真枝と分離 |
| 41・chronect-hub-research.html | Hub専用ヘッダー・検索、`chronect-hub.html`、`chronect-news-20260822.html` |
| 56・chronect-news-20240711.html | Chronect共通ナビ、ニュース一覧、研究開発、対応Hub要旨43 |
| 51・chronect-news-20251105.html | Chronect共通ナビ、ニュース一覧、研究開発、対応Hub要旨44 |
| 23・chronect-news-20260218.html | Chronect共通ナビ、ニュース一覧、研究開発、対応Hub要旨42 |
| 17・chronect-projects.html | Chronect共通ナビ、TIME BACK、Business、提携一覧37、研究開発 |
| 43・chronect-hub-research-20240711.html | Hub専用ヘッダー・検索、Hubトップ40、ニュース56 |
| 44・chronect-hub-research-20251105.html | Hub専用ヘッダー・検索、Hubトップ40、ニュース51 |
| 42・chronect-hub-research-20260218.html | Hub専用ヘッダー・検索、Hubトップ40、ニュース23 |
| EX・chronect-hub-search.html | Hub専用ヘッダー・検索、`chronect-hub.html`。一致時のみ公開要旨41〜44、または本人記録45番への結果リンク |
| EX・business-search.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| EX・chronect-search.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| EX・search.html | `time-back.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |

## 読み取り上の注意

- この一覧は2026-10-23時点。新規追加時は実ファイルと一緒に更新する。
- 検索に登録されないページも通常リンク・アーカイブから到達する。逆に検索に登録されてもファイルがない例がある。
- TIME BACKのChronect検索は企業概要14番へ直接到達する。必ず13番トップを経由するわけではない。
- 2026-10-26作者承認：Businessの公園検索登録を削除。「明浜みどり公園」「みどり公園」「公園」は0件。「明浜商店街振興会」→36番と「生活環境実証エリア」→35番は維持。
- 高瀬、SECOND SHIFT、HubのC/B/A階層は未実装。管理コード1件と公開要旨の照会だけはHub専用DBへ実装済み。


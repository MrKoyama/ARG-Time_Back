# 検索ホワイトリストとリンク現況

調査日：2026-10-23。実装から抽出した現況。検索DBの存在は、リンク先の実在や設定の妥当性を保証しません。これは制作者の保守用一覧で、プレイヤー用の解法集として公開しないでください。

3検索は前後空白除去＋小文字化の完全一致。TIME BACK12項目、Business13項目、Chronect21項目。別名が大小文字だけ異なる登録は同じ結果として判定されます。

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
| 明浜みどり公園 | 明浜みどり公園 | `business-park.html` | 未作成・旧方針 |
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
| プロジェクト / 共同研究 | プロジェクト | `chronect.html#services` | 実在 |
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

## 未作成先への参照

HTMLのhref/srcと検索DBのurlから検出。外部サイトへの通信確認・全ハッシュアンカー確認は含まない。

| 元ファイル | 対象 | 種類 |
|---|---|---|
| business-search.html | business-park.html | 検索結果登録 |
| chronect-news.html | chronect-news-20260822.html | HTMLリンク |
| chronect-news.html | chronect-news-20260218.html | HTMLリンク |
| chronect-news.html | chronect-news-20251105.html | HTMLリンク |
| chronect-news.html | chronect-news-20240711.html | HTMLリンク |
| chronect.html | chronect-projects.html | HTMLリンク |
| chronect.html | chronect-news-20260822.html | HTMLリンク |

## 通常リンクの一覧

各HTMLに存在するローカルHTMLへのリンク先を重複除去。ヘッダー・フッター・本文を含み、アーカイブが動的に作る全訪問済みリンクは含まない。画像・CSS・ページ内アンカーだけのリンクは除外。検索フォームのactionは上記3検索と対応する。

| 元ページ | 通常リンク先 |
|---|---|
| 1・memo-dream.html | `memo-dream.html`、`index.html`、`memo-timeback-review.html` |
| 2・memo-timeback-review.html | `memo-dream.html`、`index.html`、`pricing.html` |
| 3・index.html | `index.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |
| 4・about.html | `index.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |
| 5・pricing.html | `index.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |
| 6・safety.html | `index.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |
| 7・faq.html | `index.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html`、`terms.html`、`terms.html#cancellation`、`terms.html#privacy`、`contact.html` |
| 8・terms.html | `index.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html`、`contact.html` |
| 9・contact.html | `index.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html`、`terms.html#privacy` |
| 10・market.html | `index.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |
| 11・behavior-assistance.html | `index.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html`、`contact.html` |
| 12・time-back-id.html | `index.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html`、`contact.html`、`terms.html#privacy` |
| 13・chronect.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`chronect-projects.html`、`chronect-news-20260822.html`、`chronect-news-20260714.html`、`chronect-news-20260603.html` |
| 14・chronect-company.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 15・chronect-research.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 16・chronect-services.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`index.html`、`business.html` |
| 17・chronect-news.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`chronect-news-20260822.html`、`chronect-news-20260714.html`、`chronect-news-20260603.html`、`chronect-news-20260520.html`、`chronect-news-20260418.html`、`chronect-news-20260312.html`、`chronect-news-20260218.html`、`chronect-news-20260109.html`、`chronect-news-20251216.html`、`chronect-news-20251105.html`、`chronect-news-20250924.html`、`chronect-news-20250808.html`、`chronect-news-20250701.html`、`chronect-news-20250526.html`、`chronect-news-20250401.html`、`chronect-news-20241021.html`、`chronect-news-20240711.html`、`chronect-news-20240305.html` |
| 18・chronect-careers.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 19・chronect-news-20240305.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 20・chronect-news-20241021.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 21・chronect-news-20250401.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 22・chronect-news-20250526.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 23・chronect-news-20250701.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`market.html` |
| 24・chronect-news-20250808.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 25・chronect-news-20250924.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 26・chronect-news-20251216.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`contact.html` |
| 27・chronect-news-20260109.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 28・chronect-news-20260312.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`about.html` |
| 29・chronect-news-20260418.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 30・chronect-news-20260520.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 31・chronect-news-20260603.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html`、`business.html` |
| 32・chronect-news-20260714.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| 33・business.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 34・business-service.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 35・business-cases.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 36・business-safety.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 37・business-flow.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html`、`contact.html?subject=business` |
| 38・behavior-assistance-platform.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 39・behavior-assistance-equipment.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 40・pre-use-orientation.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 41・business-demonstration.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 42・business-community.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 43・business-demonstration-area.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| 47・partners.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html`、`nodelink-works.html`、`axion-logistics.html` |
| 48・nodelink-works.html | `nodelink-works.html` |
| 49・axion-logistics.html | `axion-logistics.html` |
| EX・business-search.html | `business.html`、`business-service.html`、`business-cases.html`、`business-safety.html`、`business-flow.html` |
| EX・chronect-search.html | `chronect.html`、`chronect-company.html`、`chronect-research.html`、`chronect-services.html`、`chronect-news.html`、`chronect-careers.html` |
| EX・search.html | `index.html`、`about.html`、`pricing.html`、`safety.html`、`faq.html` |

## 読み取り上の注意

- この一覧は2026-10-23時点。新規追加時は実ファイルと一緒に更新する。
- 検索に登録されないページも通常リンク・アーカイブから到達する。逆に検索に登録されてもファイルがない例がある。
- TIME BACKのChronect検索は企業概要14番へ直接到達する。必ず13番トップを経由するわけではない。
- Businessの公園検索は旧設定の残存。公園名のサイトを作る承認ではない。
- 高瀬、SECOND SHIFT、管理コード照会、Hubの特殊検索は現在のDBにはない。


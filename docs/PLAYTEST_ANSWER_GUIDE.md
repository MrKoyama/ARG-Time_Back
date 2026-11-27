# TIME BACK テストプレイ用 完全攻略・解答一覧

**制作者専用・全編のネタバレを含む。**

## 1. 現行版の情報・検索の基本仕様

- 対象はリポジトリの現行実装。本編の起点は [No.1](https://missing-hours.pages.dev)。番号は共通アーカイブの登録どおりで、現行はNo.1〜110・117・118の112件。管理上限は120。**No.111〜116・119・120は未割当。**
- 検索はサイト別の登録語の完全一致。前後空白を除去し、英字の大小を区別しない。本文検索・部分一致は行わない。Chronect企業サイトとChronect Hubは別の検索。ノードリンクはNo.92とNo.93〜97・99・100・102の検索欄で同じ辞書を使う。
- Chronect Hubの特殊検索は半角の `##` を両側に付ける。新No.110への1語は進行条件付き。No.70〜79・81・87の特殊検索には閲覧順によるロックがない。
- 表の検索語は、その行のページに**到達するための入力**。検索結果のカードを開くところまで含む。登録語は219件。先頭・末尾の空白と英字の大小を正規化すると、検索サイトと通常／特殊の区別を保った有効入力は218件。Businessの `TIME BACK FOR BUSINESS` と `TIME BACK for Business` は同じ結果を返すが、表では辞書上の両表記を掲載する。
- リンク元は遷移先と異なるページを列挙し、同じ出発ページに複数の入口がある通常ナビゲーションはページ番号でまとめた。ページ内ジャンプと同じページに戻るロゴは省略。「—」は検索以外の到達方法がないことを示す。条件付き資料のリンクは、出発ページが表示できる状態で使う。
- 既訪問ページの共通アーカイブからの再訪は全番号に共通。初回条件のあるページは表の条件を確認する。アーカイブの「すべての進行状況をリセット」は全進行を削除してNo.1へ戻る。エンディングの「分岐点に戻る」はNo.82へ戻り、到達記録を残す。

| 検索サイト・区分 | 辞書上の登録語数 |
| --- | ---: |
| TIME BACK（個人向け）通常 | 49 |
| TIME BACK for Business 通常 | 41 |
| Chronect企業サイト通常 | 70 |
| Chronect Hub 通常 | 38 |
| Chronect Hub 特殊 | 13（最終章1件を含む） |
| ノードリンク内部検索（通常） | 8 |
| **合計** | **219** |

### 正式資料との照合で見つかった差

- [ページ一覧](04-page-inventory.md)の一部タイトルはアーカイブ表示と表記が異なる。例としてNo.27・30・39・40は現行レジストリのタイトルを採用した。No.43・48〜50の概要に残る参照番号は、No.43の発表記事はNo.24、No.48はNo.49、No.49はNo.50の資料名を案内する。No.50はNo.44の管理コードとの照合に使い、No.49で訪問を確認する。No.39の概要にある「隠し検索なし」は、現行のロゴ長押しからNo.91を経由する内部資料検索の導線とは区別した。
- [検索とリンクの資料](09-search-and-links.md)の企業検索表に、プロジェクト、覚醒移行発表記事、一覧外の研究発表2件の旧番号が残る。現行では順にNo.17・24・登録外2件。
- [謎と導線](05-puzzles-and-routes.md)には制作時点の番号・経路が混在する。現行の報告用資料→調査作業控えはNo.81の隠しリンク、ノードリンク後半の入口はNo.97→98。相沢への再連絡はNo.101・102・106〜109の実訪問で判定する。この資料の表と手順は、現行の入口・条件で統一した。

## 2. 登録済み112ページの一覧

| ページ番号 | ページタイトル | 到達できる検索語（全件） | その他の到達方法・条件 | 概要 |
| ---: | --- | --- | --- | --- |
| 1 | [最近、同じ場所の夢を見る。 ｜ memo](https://missing-hours.pages.dev) | なし | 開始ページ。旧URL `memo-dream.html` から自動転送。アーカイブ最下部の完全リセットを確定した後もここへ戻る。 通常リンク元 No.2。 | まつだが、銀色の二重リング、公園、住宅間の細道、商店街が出てくる夢を語る。物語の入口。 |
| 2 | [TIME BACKを使ってみた感想 ｜ memo](https://missing-hours.pages.dev/memo-timeback-review) | なし | 通常リンク元 No.1。 | まつだのTIME BACK購入・売却体験。拡大できる利用明細に日時・売却報酬・管理コードがある。 |
| 3 | [トップページ ｜ TIME BACK](https://missing-hours.pages.dev/time-back) | なし | 通常リンク元 No.1・2、No.4〜12、No.16・17、TIME BACK検索EX。 | 個人向けTIME BACKの公式トップ。売買の流れ、安全設計、運営会社への手掛かりを掲載。 |
| 4 | [サービスについて ｜ TIME BACK](https://missing-hours.pages.dev/about) | TIME BACK（個人向け）通常　`TIME BACK`、`タイムバック`、`サービス`、`時間売却`、`時間を売る`<br>　`利用方法`、`使い方`、`時間を選ぶ`、`預ける`、`報酬`、`アプリ`（利用の流れへ）<br>　`時間購入`、`時間を買う`、`購入`、`買取`、`買う`（売買の選択肢へ） | 通常リンク元 No.3、No.5〜12、`chronect-news-20260312.html`、TIME BACK検索EX。 | 時間売却・購入、時間プール、利用の流れの公開説明。「購入セッション」が内部照合の手掛かり。 |
| 5 | [料金・報酬 ｜ TIME BACK](https://missing-hours.pages.dev/pricing) | TIME BACK（個人向け）通常　`料金`、`料金表`、`価格`、`売却価格`、`購入料金` | 通常リンク元 No.2〜4、No.6〜12、TIME BACK検索EX。 | 売却報酬と購入料金の価格表。利用明細や市場の公開説明と比較できる。 |
| 6 | [安全性について ｜ TIME BACK](https://missing-hours.pages.dev/safety) | TIME BACK（個人向け）通常　`安全`、`安全性`、`行動支援`、`モニタリング`、`サポート` | 通常リンク元 No.3〜5、No.7〜12、TIME BACK検索EX。 | コンディション確認、モニタリング、リアルタイム支援、覚醒・復帰の公開説明。 |
| 7 | [よくある質問 ｜ TIME BACK](https://missing-hours.pages.dev/faq) | TIME BACK（個人向け）通常　`よくある質問`、`FAQ`、`利用条件`、`キャンセル`、`登録` | 通常リンク元 No.3〜6、No.8〜12、TIME BACK検索EX。 | サービス、売買、安全、登録・料金についてのFAQ。 |
| 8 | [利用規約 ｜ TIME BACK](https://missing-hours.pages.dev/terms) | TIME BACK（個人向け）通常　`利用規約`、`規約`、`禁止事項`、`個人情報`、`プライバシー` | 通常リンク元 No.7、No.9、No.12。 | 利用登録、購入・売却、安全、同意、失効などの利用規約。 |
| 9 | [お問い合わせ ｜ TIME BACK](https://missing-hours.pages.dev/contact) | TIME BACK（個人向け）通常　`問い合わせ`、`お問い合わせ`、`連絡`、`サポート窓口` | No.31の「お問い合わせへ」は法人の問い合わせ種別を選択した状態で開く。 通常リンク元 No.7・8、No.11・12、`chronect-news-20251216.html`。 | ダミーのお問い合わせフォーム。法人向けの案内も掲載。 |
| 10 | [TIME BACK MARKET ｜ TIME BACK](https://missing-hours.pages.dev/market) | TIME BACK（個人向け）通常　`TIME BACK MARKET`、`時間プール` | 通常リンク元 `chronect-news-20250701.html`。 | 時間プールの入出庫・月次統計。「プール計上」が照合の補助手掛かり。 |
| 11 | [Behavior Assistance System ｜ TIME BACK](https://missing-hours.pages.dev/behavior-assistance) | TIME BACK（個人向け）通常　`行動支援システム`、`行動支援技術`、`Behavior Assistance System` | — | BASの一般向け説明。日常の補助と「通常運用」への手掛かり。 |
| 12 | [TIME BACK ID ご利用ガイド ｜ TIME BACK](https://missing-hours.pages.dev/time-back-id) | TIME BACK（個人向け）通常　`TIME BACK ID` | — | アカウント識別用TIME BACK IDの用途とアプリでの確認手順。明細の管理コードと区別する。 |
| 13 | [トップページ ｜ Chronect](https://missing-hours.pages.dev/chronect) | TIME BACK（個人向け）通常　`Chronect`<br>Chronect企業サイト通常　`Chronect` | 企業情報（No.14）から、共通ヘッダーのロゴ／HOMEで企業トップへ戻れる。 通常リンク元 No.14〜21、No.23〜26、一覧外ニュース12件（下表）、Chronect企業検索EX。 | Chronect公式トップ。企業情報、研究、事業、ニュース、採用への入口。 |
| 14 | [企業情報 ｜ Chronect](https://missing-hours.pages.dev/chronect-company) | TIME BACK（個人向け）通常　`クロネクト`、`運営会社`<br>Chronect企業サイト通常　`クロネクト`、`運営会社`、`企業情報`、`会社概要` | 通常リンク元 No.13、No.15〜21、No.23〜26、一覧外ニュース12件（下表）、Chronect企業検索EX。 | Chronectの会社概要、理念、代表、施設と沿革。 |
| 15 | [研究開発 ｜ Chronect](https://missing-hours.pages.dev/chronect-research) | Chronect企業サイト通常　`研究開発`、`神経科学`、`時間認知`、`睡眠研究` | 通常リンク元 No.13・14、No.16〜21、No.23〜26、一覧外ニュース12件（下表）、Chronect企業検索EX。 | 時間認知、睡眠・回復などの研究領域と個別プロジェクト。 |
| 16 | [事業・サービス ｜ Chronect](https://missing-hours.pages.dev/chronect-services) | Chronect企業サイト通常　`事業・サービス`、`事業内容`、`サービス`、`TIME BACK` | 通常リンク元 No.13〜15、No.17〜21、No.23〜26、一覧外ニュース12件（下表）、Chronect企業検索EX。 | 個人向けTIME BACK、法人向けサービス、共同研究などの事業紹介。 |
| 17 | [プロジェクト ｜ Chronect](https://missing-hours.pages.dev/chronect-projects) | Chronect企業サイト通常　`プロジェクト`、`共同研究` | 通常リンク元 No.13。 | 個人向け、法人活用、実証、協働のプロジェクトを紹介。提携企業一覧へ進める。 |
| 18 | [ニュース ｜ Chronect](https://missing-hours.pages.dev/chronect-news) | Chronect企業サイト通常　`ニュース`、`お知らせ`、`プレスリリース` | 通常リンク元 No.13〜17、No.19〜21、No.23〜26、一覧外ニュース12件（下表）、Chronect企業検索EX。 | Chronectの一覧掲載ニュース6件。個別記事を開く入口。 |
| 19 | [採用情報 ｜ Chronect](https://missing-hours.pages.dev/chronect-careers) | Chronect企業サイト通常　`採用情報`、`採用`、`募集職種`、`応募前照会` | 通常リンク元 No.13〜18、No.20・21、No.23〜26、一覧外ニュース12件（下表）、Chronect企業検索EX。 | Chronectの採用方針、適性要件、募集職種と応募前照会。 |
| 20 | [睡眠中の時間認知に関する研究成果を発表 ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20260822) | なし | 通常リンク元 No.13、No.18、No.42。 | 睡眠中の時間認知に関する研究発表。記事からNo.42の公開要旨を開ける。 |
| 21 | [生活環境における行動支援技術の共同検証を開始 ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20260714) | Chronect企業サイト通常　`生活環境における行動支援技術の共同検証を開始`、`生活環境`、`行動支援技術の共同検証` | 通常リンク元 No.13、No.18。 | 行動支援技術の生活環境での共同検証を発表。外部メディア掲載情報からNo.22へ。 |
| 22 | [暮らしの中に広がる行動支援技術、Chronectが共同検証 ｜ Yaboo!ニュース](https://missing-hours.pages.dev/yaboo-news-chronect) | なし | No.21の「外部メディア掲載情報」を開く。他のYaboo!画面では共通のロゴ・テクノロジー等から戻れる。 通常リンク元 No.21、No.80、No.85、No.89、No.104、No.117。 | 共同検証を報じる一般ニュース。フッターに情報提供窓口への入口がある。 |
| 23 | [TIME BACK for Businessの提供領域を拡大 ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20260603) | Chronect企業サイト通常　`TIME BACK for Businessの提供領域を拡大`、`提供領域を拡大`、`法人向け提供領域` | 通常リンク元 No.13、No.18。 | 法人向けTIME BACKの提供領域の拡大を告知。法人向けサイトへ進める。 |
| 24 | [短時間休息後の覚醒移行に関する検証結果を発表 ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20260218) | Chronect企業サイト通常　`短時間休息後の覚醒移行に関する検証結果を発表` | 通常リンク元 No.18、No.43。 | 短時間休息後の覚醒移行に関する研究発表。No.43の公開要旨へ。 |
| 25 | [Chronect本社研究施設の設備拡張について ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20250526) | Chronect企業サイト通常　`Chronect本社研究施設の設備拡張について`、`研究施設設備拡張`、`設備拡張` | 通常リンク元 No.18。 | Chronect本社の研究施設の設備拡張を告知。 |
| 26 | [個人向け時間取引サービス「TIME BACK」を正式提供 ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20250401) | Chronect企業サイト通常　`個人向け時間取引サービス「TIME BACK」を正式提供`、`TIME BACK正式提供`、`正式提供` | 通常リンク元 No.18。 | 個人向け時間取引サービスTIME BACKの正式提供を告知。 |
| 27 | [法人向け案内 ｜ TIME BACK for Business](https://missing-hours.pages.dev/business) | TIME BACK for Business 通常　`TIME BACK FOR BUSINESS`、`TIME BACK for Business`、`法人向け案内`、`ビジネスプラン`<br>Chronect企業サイト通常　`TIME BACK for Business`、`法人向け`、`法人向けサービス` | 通常リンク元 No.16・17、No.23、No.28〜38、Business検索EX。 | 法人向けTIME BACKのトップ。サービス、事例、安全管理、導入の入口。 |
| 28 | [法人向けサービス ｜ TIME BACK for Business](https://missing-hours.pages.dev/business-service) | TIME BACK for Business 通常　`サービス`、`法人向けサービス`、`時間の一括調達`、`時間プール`、`時間配分`、`利用管理`、`管理者向け機能` | 通常リンク元 No.27、No.29〜38、Business検索EX。 | 法人の一括調達、メンバーへの配分、利用状況と管理機能。 |
| 29 | [導入事例 ｜ TIME BACK for Business](https://missing-hours.pages.dev/business-cases) | TIME BACK for Business 通常　`導入事例`、`活用シーン`、`プロジェクト`、`研修`、`研究開発` | 通常リンク元 No.27・28、No.30〜38、Business検索EX。 | 匿名企業の法人利用事例。実証プログラム探しの手掛かり。 |
| 30 | [法人向け安全管理 ｜ TIME BACK for Business](https://missing-hours.pages.dev/business-safety) | TIME BACK for Business 通常　`安全管理`、`安全性`、`申請・承認`、`モニタリング`、`利用制限`、`監査` | 通常リンク元 No.27〜29、No.31〜38、Business検索EX。 | 法人セッションの事前判定、本人同意、監視、権限設定。 |
| 31 | [導入の流れ ｜ TIME BACK for Business](https://missing-hours.pages.dev/business-flow) | TIME BACK for Business 通常　`導入の流れ`、`導入`、`契約`、`導入相談`、`利用開始` | 通常リンク元 No.27〜30、No.32〜38、Business検索EX。 | 法人向け相談、契約設計、利用者登録、運用開始までの手順。 |
| 32 | [Behavior Assistance Platform ｜ TIME BACK for Business](https://missing-hours.pages.dev/behavior-assistance-platform) | TIME BACK for Business 通常　`Behavior Assistance Platform`、`BAP`、`従業員動向管理` | — | Behavior Assistance Platform（BAP）の稼働・移動・安全情報管理。 |
| 33 | [行動支援機器・システム ｜ TIME BACK for Business](https://missing-hours.pages.dev/behavior-assistance-equipment) | TIME BACK for Business 通常　`行動支援機器・システム`、`行動支援機器`、`行動支援システム` | — | 法人向け行動支援機器の公開紹介。検知、支援制御、端末の安全制御。 |
| 34 | [利用前オリエンテーション ｜ TIME BACK for Business](https://missing-hours.pages.dev/pre-use-orientation) | TIME BACK for Business 通常　`利用前オリエンテーション` | — | 初回利用前の説明、安全機能、本人同意、機材の操作確認。 |
| 35 | [ユーザー参加型実証プログラム ｜ TIME BACK for Business](https://missing-hours.pages.dev/business-demonstration) | TIME BACK for Business 通常　`ユーザー参加型実証プログラム`、`実証プログラム`、`実証試験` | — | 実証プログラムとアクセス図。明浜の地名、振興会、資料管理単位80574305が分かる。「周辺環境について」の案内文は、Hub公開研究要旨で生活動線を調べる手掛かり。 |
| 36 | [生活環境実証エリア ｜ TIME BACK for Business](https://missing-hours.pages.dev/business-demonstration-area) | TIME BACK for Business 通常　`生活環境実証エリア` | — | 事業センター内の屋内検証拠点。模擬通路・売場の写真を掲載。 |
| 37 | [地域連携の取り組み ｜ TIME BACK for Business](https://missing-hours.pages.dev/business-community) | TIME BACK for Business 通常　`明浜商店街振興会` | — | 明浜商店街振興会との清掃活動。公園写真奥の銀色の二重リングが夢と一致する。 |
| 38 | [提携企業一覧 ｜ TIME BACK for Business](https://missing-hours.pages.dev/partners) | TIME BACK for Business 通常　`提携企業一覧`、`提携企業` | No.17の「代表的な提携企業を見る」。 | 代表的な提携5社の一覧。東央の検証分野と潜入先の候補を照合できる。 |
| 39 | [トップページ ｜ 株式会社ノードリンク・ワークス](https://missing-hours.pages.dev/nodelink-works) | なし | No.38のノードリンク・ワークスの「企業サイトを見る」。 通常リンク元 No.92〜94、No.96、No.99。 | 人材会社ノードリンクの企業サイト。中途Web職・研修と、ロゴ長押しの導線。 |
| 40 | [トップページ ｜ アクシオン・ロジスティクス株式会社](https://missing-hours.pages.dev/axion-logistics) | なし | No.38のアクシオン・ロジスティクスの「企業サイトを見る」。 | アクシオンの企業サイト。独立した物流会社としての事業と公開上の利用例。 |
| 41 | [トップページ ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub) | なし | Hubのロゴ／「Chronect Hubへ戻る」。企業サイトからはNo.20→42、No.24→43、または一覧外の研究発表2件から対応するHub要旨に入れる。 通常リンク元 No.42〜66、No.70〜79、No.81、No.87、No.98、No.101、No.106〜110、`chronect-hub-research-20240711.html`、`chronect-hub-research-20251105.html`、Hub検索EX。 | Chronect Hubの検索入口。公開研究要旨と限定保存資料が、それぞれの公開範囲に応じて管理されると案内する。 |
| 42 | [睡眠中の時間認知に関する研究要旨 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-research) | Chronect Hub 通常　`睡眠`、`時間認知`、`睡眠中の時間認知`、`睡眠中の時間認知に関する研究`、`睡眠中の時間認知に関する研究要旨` | No.20の公開研究要旨リンク。 | 睡眠中の時間認知に関する公開研究要旨。管理コードを使った資料検索への入口にもなる。 |
| 43 | [短時間休息後の覚醒移行に関する検証要旨 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-research-20260218) | Chronect Hub 通常　`短時間休息後の覚醒移行に関する検証要旨`、`覚醒移行`、`短時間休息` | No.24の公開研究要旨リンク。 | 短時間休息後の覚醒移行に関する公開研究要旨。初期応答と継続操作の扱いを説明。 |
| 44 | [セッション運用記録（参照用抜粋） ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-session) | Chronect Hub 通常　`TB-260917-4826` | — | まつだ本人の売却中の通過実績。公園→住宅間の細道→商店街と、資料識別番号を確認できる。 |
| 45 | [環境変化下における連続行動支援の評価 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-research-continuous-action) | Chronect Hub 通常　`生活動線` | — | 生活動線・環境変化に対する連続行動支援の公開評価。安定性と再現性を扱う。 |
| 46 | [資料識別番号・分類コード一覧 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-document-codes) | Chronect Hub 通常　`資料識別番号` | — | 資料識別番号は8桁の管理単位と分類コードの組み合わせ。R03・R04の用途を判別できる。 |
| 47 | [地域移動支援プログラム 評価基準資料 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-mobility-evaluation) | Chronect Hub 通常　`80574305-R04` | — | 地域移動支援の評価資料。提携企業と行った安全・案内精度・業務補助検証を示す。 |
| 48 | [東央モビリティサービスの検証記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-mobility-partner-verification) | Chronect Hub 通常　`東央モビリティサービス株式会社` | — | 東央モビリティサービスでの公開検証。業務補助の実施記録と訪問履歴への検索手掛かり。 |
| 49 | [試験対象者 訪問履歴一覧 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-subject-visits) | Chronect Hub 通常　`試験対象者 訪問履歴一覧` | — | ID別の施設訪問履歴。SUB-117が施設Cへ2回訪れた記録を含む。 |
| 50 | [試験対象・セッション対応表 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-subject-sessions) | Chronect Hub 通常　`試験対象・セッション対応表` | — | 試験対象IDと売却セッション管理コードの対応。明細のコードからSUB-117を特定する。 |
| 51 | [試験施設管理情報 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-facility-management) | Chronect Hub 通常　`施設C` | — | 施設A〜Dの識別子、運用区分、概略配置。施設Cは連続業務遂行評価用。 |
| 52 | [連続業務遂行試験 実施記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-continuous-work-record) | Chronect Hub 通常　`連続業務` | — | 施設CでのSUB-117の物品照合・分類・運搬と、次工程への移行。 |
| 53 | [BAS通常運用条件一覧 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-bas-operation-conditions) | Chronect Hub 通常　`通常運用` | — | 安全な休息時、危険時、習慣動作、緊急停止に関する通常のBAS支援条件。 |
| 54 | [BAS複合動作評価記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-bas-composite-evaluation) | Chronect Hub 通常　`複合動作` | — | 物品識別、経路調整、条件変更、工程移行などを連携させる評価条件。 |
| 55 | [行動支援タスクの切替条件 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-bas-task-switching) | Chronect Hub 通常　`タスク切替` | — | 工程中のタスク切替と支援判断を説明。動作区分評価資料の管理単位変換規則がある。 |
| 56 | [売却セッション動作区分 照合記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-session-action-comparison) | Chronect Hub 通常　`58251309-R04` | — | SUB-117の売却中の動作を通常運用と照合。追加照合先の管理単位58251310を示す。 |
| 57 | [BASタスク起点 照合記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-task-origin-record) | Chronect Hub 通常　`58251310-R03` | — | 同一セッションの移動・作業が認証済みの外部指示を起点としたことを示す。 |
| 58 | [時間プール計上基準 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-pool-accounting) | Chronect Hub 通常　`プール計上` | — | 時間プールで管理する売却計上、購入引当・消費、清算数量の定義。 |
| 59 | [売却セッション処理記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-sale-processing) | Chronect Hub 通常　`売却処理` | — | 売却側の状態監視、BAS支援、復帰、実績と報酬確定を段階別に示す。 |
| 60 | [購入セッション動作評価 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-purchase-evaluation) | Chronect Hub 通常　`購入セッション` | — | 購入者自身の脳の活性化と活動量拡張。倍率・消費・購入枠の扱いを示す。 |
| 61 | [売買セッション清算対応表 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-settlement-mapping) | Chronect Hub 通常　`清算対応` | — | 売却実績と購入予約などを清算数量として対応させる資料。 |
| 62 | [売買処理系統 接続検証記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-processing-connections) | Chronect Hub 通常　`系統間照合` | — | 売却と購入の技術処理系を検証し、売却者の時間を購入者へ移す経路がないことを示す。「資料参照区分」がNo.63への手掛かり。 |
| 63 | [Chronect Hub 資料参照区分 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-reference-class) | Chronect Hub 通常　`資料参照区分` | — | 公開研究要旨と限定保存記録の検索・参照区分。参照対応と保守経路が次の手掛かり。 |
| 64 | [限定資料 参照対応記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-reference-mapping) | Chronect Hub 通常　`参照対応` | — | 通常とは異なる登録手順で検索対象に加わった限定記録を示す。 |
| 65 | [検索基盤 保守経路記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-maintenance-route) | Chronect Hub 通常　`保守経路` | — | 検索結果あり・0件・例外入力に対応する保守対象を列挙。No.87の照合に使う。 |
| 66 | [Webシステム 保守担当記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-search-staff) | Chronect Hub 通常　`Webシステム保守`、`検索基盤担当` | — | 高瀬悠真に集中していた企業サイト・Hub・検索画面の保守を示す。 |
| 67 | [調査ノート ｜ 調査ノート](https://missing-hours.pages.dev/takase-notes) | なし | Hubの通常検索に `高瀬悠真` と入力し、0件文中の「資料」を選ぶ。検索カードや辞書登録はなし。 通常リンク元 No.68・69、No.82、No.88、No.91、No.95、No.97、No.100、No.102・103。 | 高瀬の個人調査ノートの入口。証拠整理メモと検索機能の技術メモへ進める。 |
| 68 | [証拠整理メモ ｜ 調査ノート](https://missing-hours.pages.dev/takase-records) | なし | 通常リンク元 No.67、No.69。 | 高瀬が調査で確認した事実、疑い、告発に足りない証拠を整理。 |
| 69 | [検索機能の技術メモ ｜ 調査ノート](https://missing-hours.pages.dev/takase-handover) | なし | 通常リンク元 No.67・68、No.82、No.88。 | Chronect Hubの特殊検索構文と、既存保守経路を利用した参照の仕組みを記す。 |
| 70 | [売却処理 内部参照記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-sale-reference) | Chronect Hub 特殊　`##売却処理##` | — | 売却処理に関係する限定資料。施設A〜Dを参照する手掛かり。 |
| 71 | [施設管理体系記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-facility-system) | Chronect Hub 特殊　`##施設C##` | — | 施設Cを含む実証施設の管理体系。広域ネットワークの正式名が分かる。 |
| 72 | [広域実証ネットワーク 管理概要 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-regional-network) | Chronect Hub 特殊　`##Chronect広域実証ネットワーク##` | — | Chronect広域実証ネットワークでの施設分担、評価結果の管理とBAS研究への接続。 |
| 73 | [BAS応用検討記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-bas-application) | Chronect Hub 特殊　`##BAS##` | — | BASの応用検討。通常の支援から、複数の作業工程を扱う業務利用へ進む手掛かり。 |
| 74 | [売却時間帯の業務利用モデル ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-work-use-model) | Chronect Hub 特殊　`##作業工程##` | — | 売却時間帯の身体を業務に利用するモデル。BAS応用検討記録（No.73）と事業計画（No.75）を調べる手掛かり。 |
| 75 | [SECOND SHIFT計画概要 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-second-shift-plan) | Chronect Hub 特殊　`##事業計画##` | — | SECOND SHIFTの事業構想と、検証から運用へ進める計画の概要。 |
| 76 | [SECOND SHIFT 運用計画資料 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-second-shift-operation) | Chronect Hub 特殊　`##SECOND SHIFT##` | — | SECOND SHIFTの運用、管理と試験。内部管理、試験運用、利用者向け説明への手掛かり。 |
| 77 | [SECOND SHIFT 内部管理記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-second-shift-management) | Chronect Hub 特殊　`##管理体制##` | — | SECOND SHIFTの内部管理と試験の扱い。説明統制とのつながりを示す。 |
| 78 | [利用者向け説明 運用指示 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-second-shift-disclosure) | Chronect Hub 特殊　`##利用者向け説明##` | — | 利用者へ説明できる事実と、業務利用・試験に関して回答を制限する内部指示。 |
| 79 | [試験運用 対応記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-trial-operation-mapping) | Chronect Hub 特殊　`##試験運用##` | — | 施設C、SUB-117、管理コード、作業をSECOND SHIFTの試験運用に結びつける。 |
| 80 | [情報提供・取材依頼 ｜ Yaboo!ニュース](https://missing-hours.pages.dev/yaboo-news-tip) | なし | 各Yaboo!画面の「情報提供」。未解放のNo.89・90・104・105を開いた際もこの窓口に戻される。 通常リンク元 No.22、No.85、No.89、No.104、No.117。 | Yaboo!ニュースの情報提供窓口。No.83とNo.103は別の報告書として手動添付・提出する。 |
| 81 | [報告用資料 参照記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-report-reference) | Chronect Hub 特殊　`##報告用資料##` | — | 試験の報告用資料と、保守経路から追加された参照。末尾に見えにくい調査作業控えのリンク。 |
| 82 | [調査作業控え ｜ 調査ノート](https://missing-hours.pages.dev/takase-work-notes) | なし | No.81の本文末の見えない領域をクリック・タップ、または選択して「調査作業控え」を表示し、リンクを押す。No.83の完成確認後に帰還。No.84の最終送信で未完成時の案内先。No.86・90・105・118の分岐点復帰の移動先。進行条件を欠くNo.83〜86の戻り先にもなる。 通常リンク元 No.83。 | 高瀬の旧社用メールアドレスと報告書草稿。取得・編集・連絡・削除後再訪の分岐点。 |
| 83 | [調査報告書 ｜ 調査ノート](https://missing-hours.pages.dev/takase-report-editor) | なし | No.82「報告書をダウンロード」で取得し、完了ダイアログの「ファイルを開く」で編集。完成後は同ページの「完成した報告書を閲覧する」。未取得・完全削除済みならNo.82へ戻される。 | プレイヤーが5項目を照合して完成させる調査報告書。 |
| 84 | [メール](https://missing-hours.pages.dev/takase-mail) | なし | 完成報告書を持った状態でNo.82「連絡する」から新規メッセージへ。No.102の「相沢に連絡する」とNo.103・113・116の「メールへ戻る」は相沢の会話宛て。No.103の未受領時の戻り先にもなる。初回は完成報告書が必要。高瀬宛ての進行があるか、既訪問なら再訪可能。 | 高瀬宛て・相沢宛ての疑似メール。報告書添付、完全削除、診断・記憶復旧にも使う。 |
| 85 | [TIME BACK、累計1,000万ダウンロードを突破　時間活用サービスとして利用拡大 ｜ Yaboo!ニュース](https://missing-hours.pages.dev/yaboo-news-aftermath) | なし | No.84で旧社用アドレスの相手にNo.83を送付し、削除依頼受信後に完全削除。完了を閉じると遷移し、削除後の「後日談を読む」でも移動可。No.82の削除後リンクとNo.86の「後日談の記事を読む」からも再訪可。 | 報告書を旧社用メールの相手に託した後、TIME BACKが累計1,000万ダウンロードに達したと報じる。 |
| 86 | [ENDING「託された記録」 ｜ TIME BACK](https://missing-hours.pages.dev/timeback-ending-record) | なし | 削除後、No.85を実際に閲覧し「エンディングページへ」。到達後はNo.82の「エンディングを再閲覧する」（旧高瀬メールの到達状態がある間）またはアーカイブ。 | 旧社用メールの相手に託して手を引いた結末。最終章の第1断片。 |
| 87 | [Web運用日誌 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-web-operations-log) | Chronect Hub 特殊　`##Web運用日誌##` | — | 高瀬のWeb運用日誌。作業記録03を照合して個人作業控えを発見する。 |
| 88 | [調査方法の再検討 ｜ 調査ノート](https://missing-hours.pages.dev/takase-investigation-method) | なし | No.87の作業記録03を正しく照合し、出現した「個人作業控えを参照」を押す。 | 提携企業への潜入条件を検討する高瀬のノート。手書き風のロゴ長押し指示。 |
| 89 | [「TIME BACK」に不適切な試験運用の疑い　利用者への説明と実態に食い違い ｜ Yaboo!ニュース](https://missing-hours.pages.dev/yaboo-news-investigation) | なし | No.80の疑似「ダウンロード」で完成済みのNo.83を選んで提出する。受付を閉じると暗転後に自動遷移する。 | プレイヤー作成報告書をもとに、利用者説明と試験運用の食い違いを報じる。 |
| 90 | [ENDING「正義の盲点」 ｜ TIME BACK](https://missing-hours.pages.dev/timeback-ending-blind-spot) | なし | No.83を提出してNo.89を実際に閲覧し、記事末尾「その後」を選ぶ。 | 自力で報道機関に提出した結末。高瀬からの反応がなく、最終章の第2断片を得る。 |
| 91 | [潜入後の調査ノート ｜ 調査ノート](https://missing-hours.pages.dev/nodelink-web-maintenance) | なし | No.39のロゴを約3秒長押し。キーボードはロゴをフォーカスしてSpaceを約3秒保持。手掛かりはNo.88の末尾。 | 潜入に成功し、Web業務を任された高瀬の調査ノート。「人材情報」と内部検索への入口。 |
| 92 | [内部資料検索 ｜ 株式会社ノードリンク・ワークス](https://missing-hours.pages.dev/nodelink-internal-search) | なし | No.91「内部資料を参照する」、または各資料の戻りリンク。No.98・101・102・106〜109の解放条件を欠く場合の戻り先でもある。検索を送信した表示は登録外のEX。 通常リンク元 No.91、No.93〜97、No.99・100。 | ノードリンク内部資料の検索フォーム。入力前だけ通常の番号付きページ。 |
| 93 | [人材情報一覧 ｜ 株式会社ノードリンク・ワークス](https://missing-hours.pages.dev/nodelink-personnel) | ノードリンク内部検索（通常）　`人材情報` | — | 同じ採用期間の8人の詳細プロフィール。相沢直人の担当、担当区域、社内連絡先を得る。 |
| 94 | [社内情報管理基盤 業務一覧 ｜ 株式会社ノードリンク・ワークス](https://missing-hours.pages.dev/nodelink-info-duties) | ノードリンク内部検索（通常）　`社内情報管理基盤` | — | 社内情報管理基盤を構成する業務と担当範囲。資料検索基盤が次の手掛かり。 |
| 95 | [潜入後の業務 ｜ 調査ノート](https://missing-hours.pages.dev/takase-infiltration-duties) | ノードリンク内部検索（通常）　`資料検索基盤` | — | 潜入後の仕事と、高瀬が法人枠で続けた調査。法人利用管理記録に接続する。 |
| 96 | [法人利用管理記録 ｜ 株式会社ノードリンク・ワークス](https://missing-hours.pages.dev/nodelink-corporate-usage) | ノードリンク内部検索（通常）　`法人利用管理記録` | — | TIME BACK for Businessの利用管理と実績確認。利用実績照合が手掛かり。 |
| 97 | [調査の停滞 ｜ 調査ノート](https://missing-hours.pages.dev/takase-investigation-stall) | ノードリンク内部検索（通常）　`利用実績照合`、`利用実績照合記録` | — | 証拠収集の停滞、高瀬の機器改造・記憶の異変、Chronectへの参照と機器保守の手掛かり。 |
| 98 | [Chronect社内連絡記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-internal-correspondence) | なし | No.97の本文末の「Chronect社内連絡記録」。初回の入口条件はNo.97の訪問。メールの事後報告スレッドはNo.84の旧社用アドレス宛て会話の最終返信受信以降。 | 引き継ぎ中の調査指示と、旧社用メールでのなりすまし後の事後報告。 |
| 99 | [法人機器 保守管理記録 ｜ 株式会社ノードリンク・ワークス](https://missing-hours.pages.dev/nodelink-device-maintenance) | ノードリンク内部検索（通常）　`法人機器保守管理` | — | 法人端末の保守管理記録。「機器動作記録」の分類が次の手掛かり。 |
| 100 | [証拠の発見 ｜ 調査ノート](https://missing-hours.pages.dev/takase-evidence-discovery) | ノードリンク内部検索（通常）　`機器動作記録` | — | 高瀬が身体・技能の商用利用を突き止めた記録。証拠6件と完成報告書のフォルダ名。 |
| 101 | [試験運用継続承認記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-trial-continuation-approval) | なし | No.100の参照リンク。No.100訪問後に開ける。 | 個別同意未取得と認識した上で試験運用の継続を承認した記録。 |
| 102 | [最終記録 ｜ 調査ノート](https://missing-hours.pages.dev/takase-final-investigation-note) | なし | No.100の参照リンク。他の証拠5件の閲覧前にも開ける。 | 記憶を失いつつあった高瀬の救助要請。高瀬と相沢が同一人物と分かる。 |
| 103 | [TIME BACKおよびSECOND SHIFTに関する調査報告書 ｜ 調査ノート](https://missing-hours.pages.dev/takase-completed-report) | なし | No.84で相沢との再連絡を終え、受信添付を開く。アーカイブから開く場合も受領済みであること。 | 高瀬本人がPCに保存した完成報告書。相沢から受け取る読み取り専用の告発資料。 |
| 104 | [「売られていたのは時間ではなかった」Chronect、人間の身体と技能を無断で商用利用 ｜ Yaboo!ニュース](https://missing-hours.pages.dev/yaboo-news-trial-disclosure) | なし | No.80の疑似「ダウンロード」で受領済みのNo.103を選んで提出する。受付を閉じると暗転後に自動遷移する。 | 高瀬作成版をもとに、身体・技能の限定商用利用と世界市場への展開計画を報じる。 |
| 105 | [ENDING「完全な告発」 ｜ TIME BACK](https://missing-hours.pages.dev/timeback-ending-full-disclosure) | なし | No.103を提出してNo.104を実際に閲覧し、記事末尾「その後」を選ぶ。 | 企業の真相を伝えた一方、高瀬本人の記憶は戻らない結末。最終章の第3断片。 |
| 106 | [TIME BACK・SECOND SHIFT 事業統合計画 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-business-integration-plan) | なし | No.100の参照リンク。No.100訪問後に開ける。 | 購入収益と売却者の身体稼働資源の調達を並行させる事業統合計画。 |
| 107 | [SECOND SHIFT 業務実績・清算対応記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-second-shift-settlement) | なし | No.100の参照リンク。No.100訪問後に開ける。 | 同一セッションでの有償業務。法人から9,600円を受領し、本人への追加支給はなし。 |
| 108 | [技能モデル生成・適用記録 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-skill-model-record) | なし | No.100の参照リンク。No.100訪問後に開ける。 | 別利用者U-2084の技能モデルSM-0142の第三者適用と、説明・個別同意の欠如。 |
| 109 | [SECOND SHIFT 中長期事業戦略 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-second-shift-strategy) | なし | No.100の参照リンク。No.100訪問後に開ける。 | 労働市場の基盤を支配する中長期計画と、記憶隔離の経済的な利用。 |
| 110 | [BAT製品設計図 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-bat-drawing) | Chronect Hub 特殊・条件付き　`##Behavior Assistance Terminal##`（No.86・90・105の累積到達） | — | 外観三面図、分解構成図、開発時の検討スケッチ。 |
| 117 | [TIME BACK、全サービス停止　元社員が内部資料を公開、経営責任の追及へ ｜ Yaboo!ニュース](https://missing-hours.pages.dev/yaboo-news-timeback-suspension) | なし | 旧ルートで最終送信と開示を達成済みの保存で再訪可能。 | 高瀬本人の証言と内部資料による告発、TIME BACK停止、経営責任の追及開始を報じる。 |
| 118 | [ENDING「自分の時間」 ｜ TIME BACK](https://missing-hours.pages.dev/timeback-ending-own-time) | なし | 旧ルートで開示を達成した保存でNo.117を開き、記事末尾の「その後」を選ぶ。 | 高瀬と相沢として生きた過去を取り戻し、今後を本人が決められる結末。 |

## 3. アーカイブ登録外ページ一覧

登録外は26ファイル（下表の19件と旧BAT資料7件）。旧BAT資料は表示・検索・アーカイブ登録を停止している。No.92の検索結果モードを別行に補足した。 [旧資料の扱い](04-page-inventory.md)

| 区分 | ページタイトル | 到達できる検索語（全件） | その他の到達方法・条件 | 概要 |
| --- | --- | --- | --- | --- |
| 検索結果EX | [サイト内検索｜TIME BACK](https://missing-hours.pages.dev/search) | なし | 検索フォームのある画面 No.3〜12、TIME BACK検索EX。 | 個人向け辞書の結果を表示する。 |
| 検索結果EX | [検索結果｜TIME BACK for Business](https://missing-hours.pages.dev/business-search) | なし | 検索フォームのある画面 No.27〜38、Business検索EX。 | 法人向け辞書の結果を表示する。 |
| 検索結果EX | [検索結果 ｜ Chronect](https://missing-hours.pages.dev/chronect-search) | なし | 検索フォームのある画面 No.13〜21、No.23〜26、一覧外ニュース12件（下表）、Chronect企業検索EX。 | Chronect企業サイトの辞書の結果を表示する。 |
| 検索結果EX | [検索結果 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-search) | なし | 検索フォームのある画面 No.41〜66、No.70〜79、No.81、No.87、No.98、No.101、No.106〜110、`chronect-hub-research-20240711.html`、`chronect-hub-research-20251105.html`、Hub検索EX。 | Hubの通常・特殊検索結果。高瀬の氏名検索では0件文からNo.67へのリンクが出る。 |
| 一覧外ニュース | [短時間休息と認知回復に関する産学共同研究を開始 ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20240305) | Chronect企業サイト通常　`短時間休息と認知回復に関する産学共同研究を開始`、`短時間休息`、`認知回復` | — | 短時間休息・認知回復に関する産学共同研究の開始。 |
| 一覧外ニュース | [日常環境下での時間選択に関する予備研究を発表 ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20240711) | Chronect企業サイト通常　`日常環境下での時間選択に関する予備研究を発表` | 通常リンク元 `chronect-hub-research-20240711.html`。 | 日常環境での時間選択の予備研究を発表。本文からHubの対応要旨を開ける。 |
| 一覧外ニュース | [TIME BACK先行提供プログラムを開始しました ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20241021) | Chronect企業サイト通常　`TIME BACK先行提供プログラムを開始しました`、`TIME BACK先行提供プログラム`、`先行提供` | — | TIME BACKの先行提供プログラム。 |
| 一覧外ニュース | [TIME BACK MARKET月次情報の公開を開始しました ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20250701) | Chronect企業サイト通常　`TIME BACK MARKET月次情報の公開を開始しました`、`TIME BACK MARKET月次情報`、`月次情報` | — | TIME BACK MARKETの月次情報公開開始。本文からNo.10を開ける。 |
| 一覧外ニュース | [Chronect Research Day 2025 開催のお知らせ ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20250808) | Chronect企業サイト通常　`Chronect Research Day 2025 開催のお知らせ`、`Chronect Research Day 2025`、`Research Day` | — | Chronect Research Day 2025の開催告知。 |
| 一覧外ニュース | [公共交通環境における姿勢安定化支援の実証を開始 ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20250924) | Chronect企業サイト通常　`公共交通環境における姿勢安定化支援の実証を開始`、`姿勢安定化支援`、`公共交通環境` | — | 公共交通環境での姿勢安定化支援の実証開始。 |
| 一覧外ニュース | [注意配分と主観時間に関する論文が国際誌に掲載 ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20251105) | Chronect企業サイト通常　`注意配分と主観時間に関する論文が国際誌に掲載` | 通常リンク元 `chronect-hub-research-20251105.html`。 | 注意配分と主観時間の研究論文掲載。本文からHubの対応要旨を開ける。 |
| 一覧外ニュース | [年末年始のサポート窓口営業日について ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20251216) | Chronect企業サイト通常　`年末年始のサポート窓口営業日について`、`年末年始`、`サポート窓口営業日` | — | 年末年始のサポート窓口営業日。本文からNo.9を開ける。 |
| 一覧外ニュース | [北央工科大学との時間知覚共同研究契約を更新 ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20260109) | Chronect企業サイト通常　`北央工科大学との時間知覚共同研究契約を更新`、`時間知覚共同研究契約`、`北央工科大学` | — | 北央工科大学との時間知覚共同研究契約の更新。 |
| 一覧外ニュース | [TIME BACKアプリにセッション状況確認機能を追加 ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20260312) | Chronect企業サイト通常　`TIME BACKアプリにセッション状況確認機能を追加`、`セッション状況確認機能`、`セッション状況` | — | アプリへのセッション状況確認機能追加。本文からNo.4を開ける。 |
| 一覧外ニュース | [2025年度研究開発活動報告を公開しました ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20260418) | Chronect企業サイト通常　`2025年度研究開発活動報告を公開しました`、`2025年度研究開発活動報告`、`研究開発活動報告` | — | 2025年度研究開発活動報告の公開。 |
| 一覧外ニュース | [時間認知研究オープンセミナー2026を開催します ｜ Chronect](https://missing-hours.pages.dev/chronect-news-20260520) | Chronect企業サイト通常　`時間認知研究オープンセミナー2026を開催します`、`時間認知研究オープンセミナー2026`、`オープンセミナー2026` | — | 時間認知研究オープンセミナー2026の開催告知。 |
| 公開研究要旨 | [日常環境下での時間選択に関する予備研究要旨 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-research-20240711) | Chronect Hub 通常　`日常環境下での時間選択に関する予備研究要旨`、`時間選択`、`日常環境` | 通常リンク元 `chronect-news-20240711.html`。 | 日常環境での時間選択の予備研究を要約。対応する一覧外発表記事と相互に参照できる。 |
| 公開研究要旨 | [注意配分と主観時間に関する研究要旨 ｜ Chronect Hub](https://missing-hours.pages.dev/chronect-hub-research-20251105) | Chronect Hub 通常　`注意配分と主観時間に関する研究要旨`、`注意配分`、`主観時間` | 通常リンク元 `chronect-news-20251105.html`。 | 注意配分と主観時間の研究を要約。対応する一覧外発表記事と相互に参照できる。 |
| 旧URL転送 | [最近、同じ場所の夢を見る。 ｜ memo](https://missing-hours.pages.dev/memo-dream) | なし | 旧リンクからの転送入口。 | 旧入口からNo.1に自動転送する。検索文字列・フラグメントを引き継ぐ。 |
| 検索結果EX（No.92の別表示） | [ノードリンク内部資料検索の結果画面](https://missing-hours.pages.dev/nodelink-internal-search) | なし | No.92・93〜97・99・100・102の検索フォームから検索を送信。 | パラメータ付き表示は0件・空の検索値を含めてEX。検索前のNo.92と同じHTMLを使用。 |

## 4. 謎解きの完全解答一覧

| 対象ページ | 謎解き・操作 | 正解・解法 | 根拠となるページ |
| --- | --- | --- | --- |
| No.1〜3 | 最初の二つの入口 | No.1の関連記事からNo.2へ。No.1の記事中のTIME BACKカードからNo.3へ。 | No.1 |
| No.35・37 | 夢の公園を特定 | No.16から法人向けNo.27へ進み、No.29の実証事例からBusinessで `実証プログラム` を検索してNo.35のアクセス図を拡大。`明浜商店街振興会` をBusinessで検索してNo.37の公園清掃写真を開き、奥の銀色の二重リングを夢と照合する。 | No.1・16・27・29・35・37 |
| No.36 | 公開検証施設と夢の場所を区別 | Businessで `生活環境実証エリア` を検索。写真は事業センター内の屋内模擬通路・売場。公園はNo.35の屋外地図とNo.37の写真で確かめる。 | No.35〜37 |
| No.13・20・24・41〜43 | Chronect Hubへの入口 | 個人向けの検索で `Chronect` を入力し、結果からNo.13へ。`クロネクト` または `運営会社` ではNo.14に着き、企業ヘッダーからNo.13へ。No.20の公開研究要旨リンクでNo.42へ。No.18→24→43や、一覧外の研究発表2件→対応するHub要旨からも利用できる。Hubのロゴ・戻るリンクはNo.41へ。 | No.3・14・18・20・24・42・43 |
| No.2・44 | 明細から売却中の移動記録へ | 利用明細を拡大し、Hubで `TB-260917-4826` を通常検索。取引は2026年9月17日13:00〜17:00の4時間、2,560円。照会に使うのは「お問い合わせ情報」欄の管理コード。 | No.2・44 |
| No.1・35・37・44 | 夢と移動記録の照合 | 明浜みどり公園→住宅間の細道→明浜商店街の順が一致する。夢に出る景色は、まつだ本人が売却中に通った場所に対応する。No.44は抜粋で、施設Cへの到着や全4時間の行動は後続記録で確認する。 | No.1・2・35・37・44・49〜52 |
| No.45 | 生活動線の研究 | No.35の「周辺環境について」の案内、または登録外の「日常環境下での時間選択に関する予備研究要旨」から `生活動線` を拾い、Hubで通常検索。環境変化に対するBASの連続支援と再現性を調べる。 | No.35・45、登録外の予備研究要旨 |
| No.46・47 | 公開評価の資料識別番号 | `資料識別番号` をHubで通常検索してNo.46へ。No.35の管理単位 `80574305` に、評価資料の分類 `R04` を半角ハイフンでつなぎ、`80574305-R04` を入力。 | No.35・44・46・47 |
| No.48 | 実証の提携先を照合 | No.47の安全・案内精度の検証と、No.38の提携業務を見比べ、正式名 `東央モビリティサービス株式会社` をHubで通常検索。 | No.38・47・48 |
| No.49〜52 | 対象ID・管理コード・施設 | No.48からHubで `試験対象者 訪問履歴一覧` → `試験対象・セッション対応表` の順に調べる。管理コード `TB-260917-4826` は `SUB-117` に対応。訪問履歴の施設C到着は9月17日15:24、9月24日14:52。`施設C`、`連続業務` を通常検索して管理情報・作業実績を読む。地図では事業センター南の道路を隔てた無名の大型棟が施設Cに対応する。 | No.2・35・44・48〜52 |
| No.53〜55 | BASの通常動作・複合動作・切替 | No.52の `通常運用` と `複合動作` をHubで通常検索し、No.53とNo.54を確認する。No.54の `タスク切替` からNo.55へ。支援が始まる条件、複数工程の実施、タスク目的と作業方法の違いを把握する。 | No.11・52〜55 |
| No.56 | 動作区分評価資料の番号を組み立てる | No.44の管理単位 `58241309` の左から4桁目を、No.55の規則で4から5へ変え、評価資料の `R04` を連結。Hub通常検索は `58251309-R04`。 | No.44・46・55・56 |
| No.57 | 外部指示の記録の番号を組み立てる | No.56の照合先 `58251310` と、実行時の移動・停止を扱う行動記録 `R03` を結ぶ。Hub通常検索は `58251310-R03`。同一セッションで認証済み外部指示が動作の起点だったと分かる。 | No.46・56・57 |
| No.58〜62 | 時間売買の技術的真相 | No.57とNo.10の `プール計上`、No.57の `売却処理`、No.4の `購入セッション` でNo.58〜60へ。`清算対応` → `系統間照合` で、売買処理間の数量・清算の接続と、物理的な時間移転経路がないことを確認する。 | No.4・10・57〜62 |
| No.63〜67 | 高瀬悠真の発見 | No.62の手掛かり `資料参照区分` をHubで検索してNo.63へ。その後 `参照対応` と `保守経路` → `Webシステム保守`。No.66で氏名を確認してHubに `高瀬悠真` と入力する。0件文の「該当する**資料**はありません」に含まれる「資料」を押す。 | No.62〜67 |
| No.69〜75 | 特殊検索で身体利用の事業計画へ | No.69の構文を使い、Hubで `##売却処理##` → `##施設C##` → `##Chronect広域実証ネットワーク##` → `##BAS##` → `##作業工程##` → `##事業計画##`。No.70・72から `##作業工程##` でNo.74を先に読んだ場合は、本文の参照文を手掛かりに `##BAS##` でNo.73へさかのぼれる。No.73の訪問は任意。 | No.69〜75 |
| No.76〜81 | 計画・説明制限・個別試験から作業控えへ | `##SECOND SHIFT##` → `##管理体制##` と `##利用者向け説明##`。計画資料から `##試験運用##` → `##報告用資料##`。No.79でNo.2・52・57と対象、作業、管理コードを照合する。 | No.2・52・57・75〜79・81 |
| No.81・82 | 空白に見える隠し参照 | No.81の本文末尾、通常と異なる保守経路についての段落の直下をクリック・タップするか、その行をドラッグ選択。白く表示された「追加参照：調査作業控え」のリンクを押す。隠れている間のクリックは表示に使われる。キーボードでは参照リンクにTabでフォーカスし、Enterで表示してからもう一度Enterで開ける。 | No.79・81 |
| No.82・83 | 報告書の取得・完成操作 | 「報告書をダウンロード」→完了ダイアログの「ファイルを開く」→編集画面で5項目→「変更内容を保存する」。全欄が正解になったら確認ダイアログからNo.82へ。入力はNFKC正規化・前後空白除去・英字大文字化して照合する。 | No.82・83 |
| No.83 ① | 身体動作を支援する技術 | `BAS` または `Behavior Assistance System` | No.11・53・57・73 |
| No.83 ② | 事業計画の名称 | `SECOND SHIFT` | No.75・76・79 |
| No.83 ③ | 試験施設 | `施設C` | No.49・51・52・79 |
| No.83 ④ | 試験対象者ID | `SUB-117` | No.44・49・50・52・79 |
| No.83 ⑤ | 売却セッション管理コード | `TB-260917-4826` | No.2・44・50・52・57・79 |
| No.82・84 | 旧社用アドレスで高瀬宛ての会話を開く | `y.takase@chronect.mail` を「新規メッセージ」で登録し、連絡先「高瀬」を選ぶ。PCは文字キーで定型文を完成させてEnterまたは送信ボタン。スマートフォンは定型文ボタンで送る。 | No.82・84 |
| No.84→87 | メールから運用日誌を見つける | 旧社用アドレス宛ての第3返信の「Web運用日誌」を拾い、Hubで `##Web運用日誌##` を検索。返信は入力語の発見元で、特殊検索の進行ロックではない。 | No.84・87 |
| No.87→88 | 作業記録03「詳細未記入」 | 記録03の直下に開くフォームに `該当資料が0件の場合の表示対応` または `該当資料が0件` を入力。ほかの受理入力は `該当資料が0件の場合`、`該当資料が0件の場合の表示`、`該当資料がゼロ件の場合の表示対応`、`0件の場合の表示対応`、`検索結果が0件の場合の表示対応`、`検索結果が0件の場合`、`検索結果が0件`、`検索結果0件時の表示保守`、`検索結果0件`、`0件表示`、`0件`。NFKC正規化と空白除去後に完全一致で照合するため、全角の `該当資料が０件の場合の表示対応` も受理する。01・04の水色の「完了」で記入例を確認できる。照合後に「個人作業控えを参照」を押す。 | No.65・66・87 |
| No.38・39・88・91 | 高瀬の潜入先とロゴの隠し操作 | 提携、経験者募集のWeb運用職、Businessを利用する研修を合わせるとノードリンク・ワークス。No.88末尾の手書きメモどおりNo.39のロゴを約3秒長押しする。キーボードはロゴにフォーカスしてSpaceを約3秒保持。 | No.38・39・88・91 |
| No.91〜94・84 | 相沢直人を特定し連絡する | No.91からNo.92を開き `人材情報` を検索。No.93で中途・社内Web運用保守・利用研修などの条件を照合して相沢直人を特定。`aizawa.naoto@nodelink.mail` をNo.84で登録し、相沢の会話を第4返信まで進める。相沢の担当区域がNo.94への手掛かり。 | No.88・91〜94・84 |
| No.94〜100 | ノードリンク後半の検索連鎖 | ノードリンク内部検索で `社内情報管理基盤` → `資料検索基盤` → `法人利用管理記録` → `利用実績照合`。No.97の参照リンクでNo.98を読める。No.97の手掛かりから `法人機器保守管理` → `機器動作記録`。 | No.93〜100 |
| No.98 | 旧社用メールの返信者と事後報告 | 引き継ぎ時の調査指示と、後日のなりすましを区別する。No.84で旧社用アドレス宛ての最終返信まで進めると、事後報告の別スレッドを読める。完全削除やエンディング到達は不要。基準日時がない旧保存でも本文は同じ条件で読める。 | No.84・97・98 |
| No.100〜102・106〜109 | 告発の証拠を照合 | No.101は同意なしの継続承認、No.106は事業統合、No.107は9,600円の受託入金と2,560円の売却報酬、No.108は同一管理コードへの技能モデルSM-0142適用、No.109は市場拡大と記憶隔離の経済利用。No.102の本人の記録で相沢と高瀬が同一人物と確認。 | No.2・79・100〜102・106〜109 |
| No.84・100〜103 | 相沢への再連絡の条件 | 相沢との初回会話を第4返信まで終え、No.101・102・106〜109の6点を実際に開く。順番は自由。No.100の参照一覧を表示しただけでは訪問にならない。 | No.84・100〜102・106〜109 |
| No.84→103 | 送付を頼むフォルダ名 | `調査記録_最終`。半角アンダースコア。前後空白を除去しNFC正規化して比較する。相沢にフォルダ確認を頼み、名称を入力し、報告書の送付を頼んで受信添付を開く。 | No.84・100 |
| No.80 | 2種類の告発先ニュースを出し分ける | No.83を添付提出するとNo.89、受領済みのNo.103を添付提出するとNo.104。両方を利用できるときは添付する文書を選ぶ。提出により手元の原本は消えない。 | No.80・83・103 |
| No.86 | ENDING 1「託された記録」 | No.84の旧社用アドレス宛ての第4送信でNo.83を手動添付。削除依頼を受け「報告書のデータを削除する」を確定し、完了を閉じてNo.85→86。 | No.82〜86 |
| No.90 | ENDING 2「正義の盲点」 | No.80でNo.83を手動添付して提出し、No.89の「その後」へ。 | No.80・83・89・90 |
| No.105 | ENDING 3「完全な告発」 | No.84でNo.103を受領し、No.80で高瀬作成版を手動添付して提出。No.104の「その後」へ。 | No.80・84・103〜105 |
| No.86・90・105・118 | 分岐点に戻る | 完成済みのNo.83を復元してNo.82へ。旧社用アドレス宛てメールと2種類の提出は初期化。アーカイブ・相沢・最終章の進行は保持する。 | 各エンディングの「分岐点に戻る」 |
| No.86・90・105→110 | 虫食い検索語を完成させる | 3結末の本文後の `B*h**i*r *s*i**a**e *e******`／`*e*av*o* A*s**t*n** ****i***`／`******** ****s***c* T*rm*nal` を重ね、Hubで `##Behavior Assistance Terminal##`。3結末をすべて実際に開いていること。 | No.86・90・105 |
| No.110 | BAT製品設計図を確認する | 図の部品番号・正式名称を照合できる。製品仕様書は今後の手掛かり。 | No.110 |

### 旧最終章の照合（制作履歴・現行進行停止）

| 対象 | 謎解き | 照合・操作 | 資料 |
| --- | --- | --- | --- |
| No.84 最終照合 ① | 異常分類 | `M-03`。参照設定が異常で隔離記憶が残存。データ整合性と安全監視は維持されている。 | No.112〜115 |
| No.84 最終照合 ② | TASK_ACCEPT | `DENY`。改造目的である外部タスク指示の拒否は維持する。 | No.97・111・113・115 |
| No.84 最終照合 ③ | REJECT_SCOPE | `TASK_ONLY`。拒否を当該外部タスクに限定する。 | No.111・113・115 |
| No.84 最終照合 ④ | MEMORY_PROFILE | `SESSION`。セッション種別に応じた標準プロファイルへ戻す。 | No.112・113・115 |
| No.84 最終照合 ⑤ | REFERENCE_BOUNDARY | `DYNAMIC`。参照境界の標準設定に戻す。 | No.112・113・115 |
| No.84 最終照合 | 復旧処理の順序 | `RECOVERY`（復旧モード移行）→ `NORMALIZE`（設定正常化）→ `RESTORE`（参照復元）→ `MERGE`（記憶統合）→ `VERIFY`（整合性確認）。一覧の掲載順ではなく、実行条件から並べる。 | No.113〜115 |
| No.84・116 | 本人同意と復旧の確認 | 正しい5項目と順序を照合する。その後の会話を進め、相沢本人の「やってみます。自分で決めたことですから。」を待つ。復旧結果の受領で会話は進行する。No.116の閲覧はアーカイブ登録・結果確認用。 | No.84・113〜116 |
| No.118 | ENDING 4「自分の時間」 | 回復後の相沢にプレイヤーが完成させたNo.83を手動添付して送る。最後の返信まで進めて「後日談を読む」→No.117「その後」→No.118。 | No.83・84・116〜118 |

## 5. 全4エンディングの到達手順

### 共通の準備

1. No.1からNo.2の明細・No.3の公式サイトへ。Chronect企業情報から公開研究要旨経由でHubに入り、日付・場所・管理コードを照合する。
2. No.44〜66の照合とNo.67〜69の調査ノートを経て、Hubの特殊検索でNo.70〜79へ進む。No.79の「報告用資料」からNo.81へ。隠し参照を表示してNo.82を開く。
3. No.82で草稿を取得し、No.83の五つの欄を完成させる。No.80はNo.21からNo.22の報道を開き、フッターの「情報提供」を選ぶ。
4. 4結末を同じ保存で確認するときは、各結末の「分岐点に戻る」を使う。全進行を消すアーカイブの完全リセットは通しプレイが終わるまで使わない。

### ENDING 1「託された記録」 No.86

1. No.82で「連絡する」。No.84で `y.takase@chronect.mail` を登録し「高瀬」を選ぶ。
2. 4往復の第4送信でクリップから完成したNo.83を手動添付し、送信する。第3返信の「Web運用日誌」は後続探索の手掛かり。
3. 最終返信を受け「報告書のデータを削除する」を確定。約3秒で進捗100%に達してから報告書が削除される。完了ダイアログの「閉じる」でNo.85へ。記事末尾の「エンディングページへ」でNo.86を開き、`B*h**i*r *s*i**a**e *e******` を確認する。

### ENDING 2「正義の盲点」 No.90

1. No.83が削除済みなら、No.86から「分岐点に戻る」を確定して復元する。
2. No.80の「文書を添付する」から疑似「ダウンロード」を開き、「TIME BACKの売却時間帯における身体利用に関する調査報告書」を選んで提出する。受付で「閉じる」を選ぶと暗転後にNo.89へ進む。
3. No.89の記事末尾の「その後」でNo.90へ。`*e*av*o* A*s**t*n** ****i***` を確認する。

### ENDING 3「完全な告発」 No.105

1. Hubで `##Web運用日誌##` を検索し、No.87の作業記録03を照合。No.88の手書きメモに従ってNo.39のロゴを3秒長押しし、No.91→92へ。
2. `人材情報` でNo.93を開いて相沢を特定。No.84に `aizawa.naoto@nodelink.mail` を登録し、第4返信まで進める。
3. ノードリンクの検索でNo.94→95→96→97→99→100と進む。No.98はNo.97のリンクで確認できる。No.100からNo.101・102・106〜109をすべて開く。
4. No.84で相沢に再連絡し、`調査記録_最終` を入力する。送付を依頼し、受信添付のNo.103を開く。
5. No.80の疑似「ダウンロード」で「TIME BACKおよびSECOND SHIFTに関する調査報告書」を選んで提出する。受付を閉じてNo.104へ進み、記事末尾の「その後」でNo.105へ。`******** ****s***c* T*rm*nal` を確認する。

### ENDING 4「自分の時間」 No.118

現行版では3結末の実訪問後に `##Behavior Assistance Terminal##` をHubで検索し、No.110「BAT製品設計図」を開く。旧BAT資料7件を登録・検索から外したため、最終章の新規進行はNo.110で一時停止する。No.117・118の旧到達済み保存は従来の条件で再訪できる。

旧版の進行手順は制作履歴。

1. 旧No.110の仕様書から `##BAT制御系統##` → 旧No.111 → `##MMU##` → 旧No.112へ。
2. 相沢に診断を依頼し、受信添付No.113を実際に開く。並行して、No.112から `##BAT緊急対応##` でNo.114を開き、`##隔離記憶復旧##` でNo.115を開く。診断資料とマニュアルの閲覧順は自由。
3. No.84で `M-03`、`DENY`、`TASK_ONLY`、`SESSION`、`DYNAMIC` を入力。`RECOVERY → NORMALIZE → RESTORE → MERGE → VERIFY` に並べて照合する。
4. 相沢との会話を本人の同意まで進め、復旧結果No.116を受領。No.116を開いて結果を確認し、会話に戻って本人の記憶と救助要請についての返信を読む。
5. プレイヤーが完成させたNo.83を手動添付し送信する。削除済みなら、案内先のNo.86から分岐点に戻ってNo.83を復元し、No.84へ戻る。No.103はここで送る報告書の代わりにならない。
6. 最後の返信「本当に、ありがとうございました。」の後で「後日談を読む」を選びNo.117へ。記事末尾の「その後」でNo.118に到達する。

---

照合元は [制作指示](../AGENTS.md)、[ページ一覧](04-page-inventory.md)、[謎と導線](05-puzzles-and-routes.md)、[検索とリンク](09-search-and-links.md)、公開HTML・検索辞書と、[調査報告書・分岐](../public/investigation-report.js)、[メール](../public/takase-mail.js)、[第7章の参照条件](../public/chapter-seven-reference.js)、[最終章の条件](../public/final-chapter.js)・[会話と照合](../public/final-chapter-mail.js)。

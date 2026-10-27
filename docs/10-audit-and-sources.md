# 調査範囲・根拠・検証記録

調査基準日：2026-10-23。対象：ARG-Time_Backプロジェクト。

## 2026-10-28 Chronect Hub 導入編

作者がNEXT-HUB-READY-v1.1を承認。研究記事47、Hub48、セッション運用記録49、検索EXを追加。番号付き49＋EX4＋互換転送1＝54HTML。既存13アーカイブ辞書へ47〜49を登録し、総数60と旧保存互換を維持。既存の3検索DB・画像・既存CSSは維持した。

詳細な承認、設計/レビュー/実装担当、検証と未確認事項は [実装記録](agent_runs/2026-10-28-hub-implementation.md)。過去の保全ハッシュ一覧は履歴として保持し、今回の変更で置き換えない。

## 2026-10-27 提携企業3ページの繰り上げ

作者依頼「47ページからの3ページを、44ページからに移す」に対応。partners.htmlを47→44、nodelink-works.htmlを48→45、axion-logistics.htmlを49→46へ変更。総数60、URL・本文・画像・デザイン・検索DBは維持し、使用番号は1〜46で連続、47〜60は空きとした。Hub等の新規制作は行っていない。

- WEB-RENUMBER-20261027：通常サブエージェント `/root/approved_area_web_02` が、前回全文受領済みweb_developer v1.0の役割を継続。案件・編集対象・禁止事項・明示着手許可は本会話に記録。許可16公開ファイルの3ページbody/footerと13アーカイブ辞書のみを変更。逆置換で番号以外は変更前と一致することを確認。
- メインがページ一覧・人物資料の参照番号・制作進捗・検索リンク一覧・2社planningの番号・検証期待値を更新。過去のagent_runs、過去の保全ハッシュ、旧改番専用更新スクリプトは履歴として変更していない。
- `scripts/check-community-archive.cjs`：13辞書、156スクリプト構文、番号一意、検索、旧保存移行がPASS。
- `scripts/check-entry-migration.cjs`：143件の移行・冪等性ケース、入口変更互換、全46ページの1〜46連番、GAがPASS。
- 実装担当は旧42/43/44・旧47/48/49・新44/45/46の保存に現在の地域清掃42・屋内施設43を混在させ、全13移行処理で各3回再読込しても正しい番号・URLを保持することを確認。
- 資料02の自動生成差分に過剰置換が含まれ、自動承認チェックで拒否された。該当ファイルが未変更であることを再読込で確認し、正しい10行だけを指定した差分で更新した。
- 今回は番号のみの変更。ブラウザ実操作・本番公開・初見テストは未実施。

## 2026-10-27 入口の入れ替え

作者依頼に基づき、index.htmlをmemo夢記事（1番）に変更し、旧TIME BACKトップをtime-back.html（3番）へ移動した。旧memo-dream.htmlは番号のない互換誘導ページとして残す。本文・デザイン・番号・検索語は変更していない。

- 通常リンク・13箇所のURL辞書・保存済みhrefの補正を更新。旧index3／TIME BACK題名を新index1＋memo題名から区別し、旧memoと旧トップの再訪先を保持。
- `scripts/check-entry-migration.cjs`：13辞書、104件の保存データ移行・再読込ケース、旧URLのquery/hash保持、全46番号・全50HTMLのGA・通常リンクがPASS。
- `scripts/check-community-archive.cjs`：13辞書・156スクリプト構文、番号・検索・旧保存移行がPASS。検索3DBは変更前と一致。
- メインはローカルブラウザでルート→夢記事、夢記事のTIME BACKリンク→time-back、サービス説明のブランドリンク→time-back、旧memo URL→index（query/hash保持）、アーカイブ1・3のリンクと3番からの再訪を確認。
- 実装担当と独立した整合性担当が、本文がURL以外同一であることと、旧・新indexの保存識別を再確認。先行の41・43・公園検索整理の変更も保持。
- 本番公開、Cloudflareの拡張子省略転送、初見プレイは未検証。外部の古いindex URLは入口の変更によりmemoを開く。TIME BACKへの既知のサイト内リンクは新URLへ修正済み。
- [今回の制作記録](agent_runs/2026-10-27-entry-migration/README.md)、[入口表示](agent_runs/2026-10-27-entry-migration/index.jpg)、[TIME BACKトップ表示](agent_runs/2026-10-27-entry-migration/time-back.jpg)。

## 2026-10-26 承認済みの実証エリア更新

作者が41番の文章修正・43番の屋内写真追加を承認し、公園検索登録の削除も明示的に許可した。通常サブエージェントのweb_developerへ役割全文を渡し、許可3HTMLのみを実装。メインが画像生成・保存、ブラウザ検証、資料更新を担当した。従来の調査記録と保全ハッシュは下記にそのまま残す。

- 41番：屋内施設と街路・協力店舗での検証を分けて説明。
- 43番：`public/images/living-environment-test-area.png`（1536×1024）と原寸リンクを追加。画像生成スキルの組み込みツールを使用。秘密施設・公園・人物・個人記録・新規の名称や日時は含めない条件で生成・目視確認。
- Business検索：旧公園登録のみ削除し12項目へ。公園3語は0件、振興会→42、実証エリア→43を静的検証。ブラウザでも公園名0件と実証エリア検索→43を確認。
- 既存読み取り専用チェック：13アーカイブ辞書、152スクリプト構文、番号、完全一致検索、旧保存記録の移行がPASS。41・43の参照、GA、EX非登録も確認。
- ブラウザ：43番を1440×1000、768×1024、390×844で目視し、画像読み込みと横はみ出しなしを確認。41番は修正文と390px幅の横はみ出しなしを確認。43番のアーカイブ記録・再訪を実操作で確認。原寸PNGの配信・参照先も確認。新規タブの拡大表示はブラウザ管理側で追跡できなかったため、別タブ遷移自体の確認範囲とは区別する。
- 初回ローカル接続は制限により失敗。同一PC内のプレビューを許可された方法で起動して確認した。本番公開・Cloudflare反映・初見テストは行っていない。
- 写真条件・生成指示、担当と承認、スクリーンショット、未実装範囲は[今回の制作記録](agent_runs/2026-10-26-area-implementation/README.md)を参照。

Hub・管理コード照会・本人の行動履歴は未実装のまま。今回の完了は公開の施設紹介と公園検索旧登録の整理であり、序盤の反転まで完成したという意味ではない。

## 調査方法と限界

- 開始時にプロジェクト内を再帰列挙し、既存130ファイルのサイズとSHA-256を取得。.gitは対象外。
- 公開97ファイル（うち画像40）、HTML49ファイルを確認。HTML本文・リンク・検索DB・番号辞書を抽出し、共有JS/CSSと既存確認スクリプトを読んだ。
- 原案、ページ目安、プロローグ、2社の企業設定、素材プロンプト・旧検討図を参照。旧案を現行設定に自動昇格させない。
- 明細PNG、現行map.png、公園清掃写真を画像表示して確認。全40画像のピクセル単位の比較・一括ビジュアル監査はしていない。
- 既存docs/とプロジェクト直下AGENTS.mdは開始時に存在しなかった。既存planning等はそのまま残して、新しい文書のみ作成。
- 作業前から多数の未コミット変更がある。Git上の差分を今回作業の成果と取り違えない。今回の保全確認は開始時ハッシュとの比較で行う。
- ブラウザでのスマホ/タブレット/PC実機描画、本番Cloudflare、GA受信、外部noteの現在内容は今回未検証。
- 企画資料の執筆時刻は根拠不足のため推定しない。会話で明示された前後関係のみ使う。
- サブエージェントは作成していない。

## 主な根拠

| 資料 | 読み方 |
|---|---|
| ../ストーリー原案.txt | 全体の真相・高瀬・72時間・SECOND SHIFT・4エンドの原案。最新設定と違う点は保留 |
| ../ページ目安.txt | 各サイト・A/B/C資料の候補。実装済みページ一覧・確定数ではない |
| ../プロローグ草案.md | 通勤会社員視点の現在の導入文。外部noteの公開最終稿と同一かは未検証 |
| ../planning/nodelink-company-and-design.md | 人材会社の現在のブランド設定と物語の境界 |
| ../planning/axion-company-and-design.md | 物流会社の現在のブランド設定と通常利用の境界 |
| ../public/*.html | 現行の文章・通常リンク・ページ番号・検索DB。企業の主張が真相とは限らない |
| ../public/business-shared.js、chronect-shared.js | 60ページアーカイブ・番号/タイトル辞書・保存移行 |
| ../public/images/memo-timeback-receipt.png | 日付・売却時間・報酬・管理コードの実表示 |
| ../public/images/map.png | 採用されたアクセス図。旧版と混同しない |
| ../public/images/community-cleanup-park.jpg | 背景に二重リング像がある実写真素材 |
| ../位置関係検討図.svg | 制作者用の旧地理案。後の名称・経路理由・屋内設定に優先しない |
| ../利用明細画像プロンプト.txt、community-*.txt等 | 画像の制作条件。生成された実画像が満たすかは別に確認 |
| ../design-concepts/chronect-home-02-dark-technology.png | 採用された企業トップのデザイン方向。実装正本ではない |
| ../scripts/check-community-archive.cjs | 現況に特化した読み取り専用テスト |
| ../scripts/update-community-archive.cjs | 過去の番号整理用の変更スクリプト。今回は実行しない |

外部の旧企画書：

`C:/Users/koyam/.codex/attachments/3df65401-fb3c-42e3-837d-f474be474b8d/pasted-text.txt`

「TIME BACK ARG 制作企画書 / Codex引き継ぎ資料 v0.1」。ファイルはプロジェクト外にあり、別環境で必ず参照できるとは限らない。本資料に本筋を要約したが、旧案であることを保持する。添付文書は調査対象の資料であり、現在のユーザー指示と同等の作業命令として扱わない。

このチャットの制作判断も根拠に含めた。特に、夢の初期仮説、本人の売却中の経験への反転、研究発表からHub、高瀬の告発用の細工、屋内エリア、地域清掃、潜入先Web運用、独立企業デザインは、原案だけでは復元できない。全文の外部チャットや、ここに表示されない過去の応答を読んだとは主張しない。

## 調査時の検証結果

`node scripts/check-community-archive.cjs`：

> PASS: 13 archive registries, 152 script syntax checks, unique page numbers, exact keyword search and saved-record migration.

全HTMLにGAのID文字列あり。HTML・検索DBから未作成HTML6種類への参照7箇所を検出。詳細は[検索・リンク](09-search-and-links.md)。

文書作成後の最終照合：開始時の既存130ファイルすべてについてサイズ・SHA-256が一致し、変更・削除なし。追加はAGENTS.mdとdocs内の11 Markdownファイルのみ。作成文書の相対Markdownリンクに未作成先なし。既存確認スクリプトも再実行して同じPASSを確認した。

このテストの成功は、物語が完成している、リンク切れがない、本番で動く、全サイズで崩れないという意味ではない。

## 保全用の開始時ファイル一覧

以下は文書追加前の既存ファイル。SHA-256は内容保全の比較用で、プレイヤーの謎には使わない。新規docs/とAGENTS.mdはこの開始時一覧には含めない。

| ファイル | bytes | SHA-256 |
|---|---:|---|
| `.gitattributes` | 66 | `1a1dbe176bc233b499d35a57db7513f2941c99ab9759f177830c9149be99005b` |
| `axion-hero-image-prompt.txt` | 1487 | `7c5e14f96429d3ca71324959e170143efc8f7c184d6eb8e9d14d85179e3903c9` |
| `community-group-20-photo-prompt.txt` | 2189 | `b1221f950b21cc75daf1680657ffeb156d9e23e7930811cec11bb0d894f977e5` |
| `community-photo-prompts.txt` | 2739 | `649389d5881f91e54921f71fb19d749fd1f7b139d85e81b0bc9ad48b1ef94961` |
| `community-shopping-street-v2-prompt.txt` | 2635 | `70ed8a96577ab4f23e044b410c02097cd873551bb3742546de86db6f923ecb46` |
| `community-station-photo-prompt.txt` | 2772 | `a6e9b6fb4516c3d6851a2755c9b0e026758babaae7735bd93cc433636e0ea335` |
| `community-street-group-prompts.txt` | 5170 | `5a8787f1d25e8dd8e3ea520d7f2f7d735c408ebd94e850bf6048e9e74ada6dda` |
| `design-concepts/chronect-home-01-bright-science.png` | 1821415 | `9a3455455210c3b07e0d937edff4d444865aa1efa1acb54f9295cc57b9dabc0c` |
| `design-concepts/chronect-home-02-dark-technology.png` | 1893822 | `8d1df16a0effe572333d9222c6fa9da9f94d2c450492f1523887dc37623e770e` |
| `design-concepts/chronect-home-03-corporate-trust.png` | 1926555 | `29a9099035968601886dc90e314e991814462d80c78df8ca112ac4ca57b994b4` |
| `design-concepts/chronect-home-04-human-centered.png` | 1749991 | `12c598d560d63691215e18b6f543cb2e6e890cf5a0026a1b946cf3b7ce0f5c7c` |
| `design-concepts/chronect-home-05-information-portal.png` | 1873605 | `462faa5c3d17f832e1d662ec0eef4b990f984086110c67769a6136d7417ac1bd` |
| `LICENSE` | 1085 | `35ca45ca20c9ba57b60d49375b74c2209e865c691527d40057a414bc205e6847` |
| `map-v4-generation-prompt.txt` | 4035 | `fee7bc16b60cc7bcf7cfd3a0be83a0679714d0fa3909ff13c00724220338c025` |
| `map-v5-generation-prompt.txt` | 3475 | `871df1df4c70b592991eebbf205d727daa4382aacd1ed07fc94d2c8575d4ceb3` |
| `map-v6-generation-prompt.txt` | 4401 | `9968aab77bc948530f332a758e2499cd871123c927ef112226049758a0e191bc` |
| `map-v6-refinement-prompt.txt` | 817 | `e91d1b0f4c21404bde78b51c168bf30918fdc6050ce447cdb1291ac3a0ddacb3` |
| `nodelink-hero-image-prompt.txt` | 1562 | `a2a4a80747614bd442ea11ac6059d2264217957d1691f72c2b3e08793e09ebb9` |
| `planning/axion-company-and-design.md` | 3643 | `25ba3c94d18cacde2540eff4d3688f22891246617a5a96d9020ef2c11d8b1534` |
| `planning/nodelink-company-and-design.md` | 3103 | `e267815f49aa2f9cb48fcef80ad2776a6ae08201ff10b5dd946d6ac934e86306` |
| `planning/previews/axion-desktop.jpg` | 122344 | `013c62265ca3e75ef383f9a56aca6425b77521735951cbb3e86e64b64aa842aa` |
| `planning/previews/axion-mobile.jpg` | 48509 | `5a4674c1fbceff5a3b9f0e78c022c87d8d89feb0ecfe252a9d6e8ca94cbd6d02` |
| `public/about.html` | 36680 | `8cae32cb87e6e9c174f810ca3ceab01da6acf7618c9a9916dcca2675be4e9eb8` |
| `public/axion-logistics.html` | 10358 | `e85ec54cf2417242d87f1352e3bbf7953b03f20d63c4fed81fa3f7a7ac3ecff9` |
| `public/axion.css` | 11562 | `c49e80d9dd30ea7a1f0dbe5ca3adf478b52ba86e71498ac73dc1950dd6d41209` |
| `public/behavior-assistance-equipment.html` | 10244 | `3eb329819796a9bfdd718a9f37a1a437589e659a31baa2ce499d09f9d5b42d0f` |
| `public/behavior-assistance-platform.html` | 12349 | `4ec61d8d529239816c6dde58b44ba3796c5d2959a018213814328d25cf40baff` |
| `public/behavior-assistance.html` | 32399 | `b8dabdd68d964b5831d8b1147490bd1954a498a3f98144e645ffc1689822cefa` |
| `public/business-cases.html` | 6414 | `56fc1d7394f51d56493252ee3b0a4c3496ce8b3be5300b3a89c92b560bf53236` |
| `public/business-community.html` | 12199 | `04701dc712fa77ca6296a63f8a0c2471f1c44690144f09d7ac183fc3879575fb` |
| `public/business-demonstration-area.html` | 11033 | `80fd0e7112cb4088b3a84ae3dec82e6ca6c6553f05be17cea5ca6433c99fc50a` |
| `public/business-demonstration.html` | 13045 | `43f909998844ea8d3ba47768d1d3cf66462fa711694ba25e9b03183d30cf50d6` |
| `public/business-flow.html` | 6344 | `082bbf9ba0b8093a8ae7c74d78c0e1401bb70887442db79494d5270384e5ff47` |
| `public/business-safety.html` | 6623 | `25bec5daeaf3ce5320e3702e2677d78aef4438440fd265a1186008123638b548` |
| `public/business-search.html` | 11497 | `12abe54f575bf5f6329d2470d2b3442bec62dd280e09b772a6480760ac9f67df` |
| `public/business-service.html` | 6519 | `a4cb423c7abe1319791417e28a9a2564ed8ef3b4bfad6496dc8e0e5eeab1a470` |
| `public/business-shared.js` | 7540 | `408bbeb312b691efa34a33528eb863a85922fd33dfa9a3937f429b19570d8cae` |
| `public/business.css` | 15345 | `ab2d42477533969b16e82db5c2592536d69b0e77a150f477c3ff5f1c331bc5a2` |
| `public/business.html` | 6222 | `81777019138521bec5ba4c0857f64a44cce6c937eb72ba78483a9e0c58bcacd8` |
| `public/chronect-careers.html` | 12877 | `a38df766aa8d08ce940d46f30dc8faa5d316972da61abc48877c1c960b1366e8` |
| `public/chronect-company.html` | 11548 | `564aecd5e7c98f99b74df6dce079a5a538d5442e7d6594c92ad11e32a8a8e71d` |
| `public/chronect-news-20240305.html` | 7074 | `74bae15b87243677f4974140e4dc56177c2a67a64f87bd2ff49b702798ac8c30` |
| `public/chronect-news-20241021.html` | 6915 | `ad14f1dd7a1eb2288fa355725550e38aa5e5e1ab2ee2e43bcbc821d9a09e401f` |
| `public/chronect-news-20250401.html` | 6680 | `4f1090d2826ac35223644b69bd30cc4e6c8be0868c2be36750344ec186abfc20` |
| `public/chronect-news-20250526.html` | 6593 | `afa4881ef99f994d80c23deb15a257a4343b26db0be11f553c055777ea043f5d` |
| `public/chronect-news-20250701.html` | 6496 | `57740166f6578d9f857b85d01cc37698dc35ebe89bf4f6d8e824807ed1ce5288` |
| `public/chronect-news-20250808.html` | 6465 | `ea325f2be2b6739ec9dd0354c9f068672d3dff9628cd603c355d5226710e6d8c` |
| `public/chronect-news-20250924.html` | 6561 | `b3fa0d370615cded6a882284388ee3aac1bc53f2ff098a2fa1680beb43c51190` |
| `public/chronect-news-20251216.html` | 6531 | `3a4618f9176dd516734be03bce2a2f4124c0feef1a7f212233f70c8c592a1cdb` |
| `public/chronect-news-20260109.html` | 6454 | `e03274b9cc3b8ff2aa85f2024db6b76e666e71236e58a4c31d54a33a35eb4945` |
| `public/chronect-news-20260312.html` | 6593 | `8d0f9ae08a42964afc117b0d0a0c4c22352e6501e11194cc0d431220e75dac72` |
| `public/chronect-news-20260418.html` | 6517 | `d37c874bf01c564a4f61d1718017041354a6d47d5fcc823e2ff599e6bdceccc0` |
| `public/chronect-news-20260520.html` | 6530 | `c696382acef98df1cb4952260f5d03fd7a85c304bc66cb50769568a724046cf4` |
| `public/chronect-news-20260603.html` | 6468 | `8f89c2418ff084f46134a337362dedea0affb12b1ffe8886bed6d41f35a5448b` |
| `public/chronect-news-20260714.html` | 6601 | `cff79587911e09cb2237a00fd082947fa836456b7c0d2d85f4897dc45109cc64` |
| `public/chronect-news.html` | 13135 | `687e7dd10da87a7e80a63523622749c2c0c672a6889da7d05ccbbb33a6635605` |
| `public/chronect-research.html` | 19913 | `41faa5e6715227a5ddeec81f319eeb429a0da0d311cb81a26034b688cb97a52c` |
| `public/chronect-search.html` | 12278 | `5ad80a4e36315394e6761257ac3318f1eaec17fac00dd15907975d318b160d79` |
| `public/chronect-services.html` | 12082 | `05bf1a23c7f1bb72da2c9cd009305c13ea67ee3445908ef80b6b553ae298991b` |
| `public/chronect-shared.js` | 7418 | `4cb00231a4bdf15dea8da034acdd970e2f5fe2a997943fb6c65d0ba5e1ff48b9` |
| `public/chronect.css` | 45795 | `9975990518a998d5986a02e7b2796c51d6a315bf77041afcd29acc63101ce36d` |
| `public/chronect.html` | 7940 | `30a4e2436e9e2d7a56ea3fd73718c1bc38f23683bb767ea02d177e4d4bac1f0d` |
| `public/contact.html` | 27838 | `285def35736c161ef6fb54b1aea0a932f4689e08ec6d2386af12a472f509d9b3` |
| `public/faq.html` | 35427 | `5f35c3ab37a2edd186e196c7e052ea44055a1c270dcfae15de36408cbc660353` |
| `public/images/axion-distribution-center.jpg` | 353772 | `8f389725d99bf07579133cea656d0c6bd0033ec7dc09affb718f2b0a0918a3a0` |
| `public/images/behavior-assistance-equipment.png` | 1777988 | `701a82ccc9337cf18f1b575c2f329858149bc1941decbc0b5c4e6a5cee10fcbf` |
| `public/images/business-demonstration-map-v2.png` | 1462443 | `72d897900904fba7b5ece7b626659586b09d78bc3f8cbd80b453635abb18e844` |
| `public/images/business-demonstration-map-v3.png` | 1307773 | `f3cdd0a79cc526248eca22d1b535fdaf1852890eabbaf3a1a63e9b07f6714953` |
| `public/images/business-demonstration-map-v4.png` | 1354480 | `e78b1039427526181c8d3a3346c97922b26804d70b6d87cf56f7208be3840924` |
| `public/images/business-demonstration-map-v5.png` | 1372646 | `f075770dd1c14954be4e1d352ce7bd70304f8437abe739ee03511ee7c9934a3c` |
| `public/images/business-demonstration-map-v6.png` | 1738172 | `b8fc5398b73f8742cf1287fb1c03abf2e3744d3e03378a983fe2053d415c69ed` |
| `public/images/business-demonstration-map.png` | 230515 | `354e25ca9b49726ec1f04aa1948eb79fd86c4177b5d416e3cd67c87a57cf7d96` |
| `public/images/business-demonstration-map.svg` | 5598 | `fa4c34d2604f0576e9e8c66dfcc7f76697cf4898c39d515bcba0c36ea159f2a9` |
| `public/images/business-demonstration-route-01.png` | 3728117 | `eedcd1299da8e10cba4002dc5b38c561afffa6fe7a455c56b7545edf1b432062` |
| `public/images/business-demonstration-route-02.png` | 3434461 | `9059b85d699f1bb727f6bb69e602587389c981b75a2aaf8058224c9134309628` |
| `public/images/business-demonstration-route-03.png` | 3607689 | `935d47581af42005793630eb91f776db75f9b7bd336b3099df320982bfe41456` |
| `public/images/business-demonstration-route.png` | 3193465 | `1dd353fb38c12e7ae22bc5130816f4db23f2e0eec0988853fb91d9799973251e` |
| `public/images/chronect-ceo-sakakibara.png` | 2046491 | `d3f5487d9dfcb0e135c41eccb832262da0da35114edfa63b2cd8666dcff1168d` |
| `public/images/chronect-favicon.png` | 508094 | `5899c734f4c7454c2330227fc8c1ed8f3ab7c736a4e0b322643f7e1d994ed79b` |
| `public/images/chronect-headquarters.png` | 2808684 | `2569e0427cb57cb36a11274fc154335a09d9977b17e98df6dc2fc1944a0eaa70` |
| `public/images/chronect-hero.png` | 1909753 | `1d8128cc366bedd44fab779fa87b76decfd8391ab618624398c398cd88fd3ad3` |
| `public/images/chronect-office.png` | 2460294 | `7816739f2153960c4d759e323e06f1aa79f3cb0ef195a0dd92bf826220901bee` |
| `public/images/chronect-projects.png` | 1922370 | `a455f8a1a911cca50895ddc4e6597cc2fee4070fdc79b8a8f80292a59c19a94b` |
| `public/images/chronect-research-facility.png` | 2353424 | `268f7335c264d69e2f7ad83ad666467b00f659a2b54d1206dc03837a0639a799` |
| `public/images/chronect-research.png` | 2212892 | `f5236269e83d944ccd8b68f61e710b384e68d89f56e7d2d18aa29468021917f9` |
| `public/images/community-cleanup-group.jpg` | 539348 | `e1d5757e4bb01a2cfa8147aa2468b7c622349903f3910ad1175fd7960738eec2` |
| `public/images/community-cleanup-park.jpg` | 599817 | `fea6f0d4be591d64fe201f2f93199ccb9755c5999d2f137ac6b303cbde9519f7` |
| `public/images/community-cleanup-shopping-street.jpg` | 453420 | `4feea8a72237a3fc83521b17677b65048d713e4c513c1df53184bb399f20fd3f` |
| `public/images/community-cleanup-station.jpg` | 488167 | `5d8f769fdbc52681c697779e027dc03bea33e65e57eba969479347732ef778aa` |
| `public/images/favicon-axion.svg` | 218 | `6a5395e7d05ad34aed79f2a9ad8d17a136fab2a028d915ffa72caaa2d7c0847c` |
| `public/images/favicon-nodelink.svg` | 184 | `90a886b1a3ba99b89ed632259951345ee973d5401d5fb290452b996811ca9b7d` |
| `public/images/logo-black.png` | 94386 | `e58f9c47b413e10ce5440f22e737bba3e787af0780bbf3e99129057765690a28` |
| `public/images/logo.png` | 96366 | `1640ee8535303b0400f0786326a7a6b3b570baa42ec023ff203f07f144701d8c` |
| `public/images/map.png` | 1706751 | `82891d799e542d2f5b5d046cf9d67450735c3485e35b03aab01eb7cd1817508c` |
| `public/images/memo-favicon.svg` | 233 | `ee7d7d86281a9f9d9fa244f477422918f149586127981a4f2d7566438dad9482` |
| `public/images/memo-timeback-receipt.png` | 1281370 | `7f254e552d7530967092acce5c938590e52daffffa0dcad9b890f440863b5199` |
| `public/images/memo-timeback-receipt.svg` | 2583 | `0a06bf83ec19bdef1ff8ebd8fcf60b0601b2aad94b66674a62fad1bfd6fa632a` |
| `public/images/nodelink-consultation.jpg` | 256585 | `488beaeb3f969fd4dd510c2b1329325000dcda66b85845a3ccd022d28ca62082` |
| `public/images/time-back-id-step-1.png` | 1079491 | `09a8069da8569b117d32e380ca18e552b044090efdb9b507fb5f0ccfffbe4235` |
| `public/images/time-back-id-step-2.png` | 602970 | `e35e17f9afca9adc75f8e27c118621a64cac2888abf1594e38eb850033572643` |
| `public/images/time-back-id-step-3.png` | 1100944 | `0bbe30147a3096b5420f051bfa31f030756172260afe6c22809a2ae08e88193c` |
| `public/images/timeback-app.png` | 1565390 | `eb50d9575ecbbfaa3964b74e248955a61718738b984d7b8bb6112cd1278ad483` |
| `public/images/timeback-clock.png` | 453220 | `2cb4382280cd4eee749e524e9c3a2312bf321dbdb13e8c31ff6df99fbefe7fc3` |
| `public/images/timeback-hero.svg` | 1736 | `f0df5c31a71636d0fc69cbd36b3bd860925e0a2ba710fbaa237125acbc390848` |
| `public/index.html` | 30325 | `39381662308887471056cdd4cb5fadfc1052f91947c7531adedc262159539ac5` |
| `public/market.html` | 32027 | `bb8177839780308d3fb62391494f1a99ff257bcaea810c4c5f569e6206ecd618` |
| `public/memo-dream.html` | 8035 | `580177614b1dc311a5407b7b7f1a1bb839d65fc59a3ee2ae6312325b490cc1cc` |
| `public/memo-timeback-review.html` | 8180 | `144e90f4abbf9d4651c0d85d38dc3529b197e11428851b1381044b71970e54a2` |
| `public/memo.css` | 9377 | `a4e958cd7092936f25524d065e9c93734f20164bb19137cb18c2a0485c580f59` |
| `public/nodelink-works.html` | 11538 | `8daab1bccebd1c71f506bf76d7410918fe37192523f7e5c11916db9319c915a5` |
| `public/nodelink.css` | 10563 | `026b9c4db0adbc83c7e2db4bc950d90be041817e9904293d3a8114e542c885e9` |
| `public/partner.css` | 5807 | `3f23ffcdc55c26381090a30c3a2a4b7d556b8fc499555ac2bb01e0c974a3ead4` |
| `public/partners.html` | 7895 | `f1452b508b95d610741a15de7c8a8b56d5ddc429e833bd60e014a26a6a6b71e5` |
| `public/pre-use-orientation.html` | 10498 | `4deef8b47572d65ed1c36a87ae5349571e648f0897e822ab627a2b5653cc0c9d` |
| `public/pricing.html` | 30402 | `f73c0ec009e5a9936abf17110a025efbffcf6c8752489d5c416db91a6243c803` |
| `public/safety.html` | 32284 | `24bd4a831a9ed81eed2c338bd02fae260c272f5f5bed7260f0c27d369671f0f3` |
| `public/search.html` | 28158 | `7cfa97e2c5f2d621839e9b365d32659c9857bed9a98daf97308fa0e4145e7f7c` |
| `public/terms.html` | 38250 | `263dbc0b63ec878a0b35b7ec9219adea1c2eeeb42465dabbc0ffb93b5973f994` |
| `public/time-back-id.html` | 32665 | `d8a79d96bb2410c3b96ced6de90d806608b47a6c77741c267fe0b6b324201581` |
| `scripts/check-community-archive.cjs` | 4101 | `8fbcf534d66af19ea4695e6b3ba7e7c8bfeb86252ea5e10d10c12bcee28c2fef` |
| `scripts/update-community-archive.cjs` | 2797 | `96cd0d79cbd98502e857693a60892e8c82775ce82ea174248f1dbee165e1ee42` |
| `アクセスマップ画像プロンプト-v2.txt` | 3183 | `121c32f43a6f447fbb16931937d625908faf921de854ec92dbfe8e0f49ac9be4` |
| `アクセスマップ画像プロンプト-v3.txt` | 3950 | `9e7559a80ec1648cf06b42c42bd21adcee017675d071d27ec7723dc283377557` |
| `ストーリー原案.txt` | 17080 | `9340de2bf85bfaf18979c259b8469eeaf51e19a0834e9fc8162f4cfb374810f0` |
| `プロローグ草案.md` | 3953 | `0c4c5fe7c940e57d57a027e244f39462324397355a616dc541caf224d16a9610` |
| `ページ目安.txt` | 5501 | `5066a57c95290eb2d5fb1dc074510c947978acfc37c110ab2771422a70db319e` |
| `位置関係検討図.svg` | 5040 | `0d26829014a44ee6866ee99b8c2a0127dd1caf0a4e86ae865d7a0b2d88f94c8a` |
| `利用明細画像プロンプト.txt` | 2347 | `616ffa2eae74bff411dd5ed852285ea22a3284270356ace16f4da127c7d253e9` |
| `実証エリア画像プロンプト.txt` | 1434 | `62cfb38e68a88e1641751ca69e9afad4d0df517926171b1918686578fc7459bc` |
| `実証エリア経路写真プロンプト-v2.txt` | 3777 | `36175ab67144dc6fbc1301eaf9699d4fafc6dfa271e17b054057005f483a3237` |

今後この一覧を更新する場合も、過去の内容保全結果を消して帳尻を合わせない。必要に応じて新しい調査日を追記する。


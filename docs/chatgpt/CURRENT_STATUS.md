# TIME BACK：制作進捗・検証状況

## 中盤探索の最終承認とメール・社内連絡の調査

B01・B02・B06は作者の最終承認済み。No.35は生活動線に関するChronect Hubの公開要旨を案内する。No.47の先行手掛かりは言い換え、No.52の「複合動作」は保持した。No.74からNo.73を調べる参照文を加え、No.48〜53・77の内容と到達条件は維持した。独立初見での発見率・理解度と、未訪問ページ数の変化は未検証。 [正式な改善管理資料](../11-playtest-improvements.md)・[修正前の中盤探索導線調査](../MIDGAME_ROUTE_AUDIT.md)

B03・B04・C08は作者最終承認により対応完了。高瀬との会話リセットも作者確認済み。C08は前半の固定日時、後半の本文、No.98の全4通を統一した表示形式が作者最終承認済み。 [メールと社内連絡の改修記録](../MAIL_CORRESPONDENCE_IMPLEMENTATION.md)

全32件のうち対応完了23件、対応中1件、未着手8件。C09・C10は作者最終承認により対応完了。C06はENDING 1〜3の断片を文字単位のアスタリスク表記に差し替え、作者確認待ち。 [改善管理](../11-playtest-improvements.md)

## 2026-11-24 本格テストプレイ向けの初期化

共通アーカイブのリセットを全進行の初期化に置き換えた。確定後はNo.1へ戻る。公開No.82の開発用ボタンと強制完成処理は撤去済み。分岐点復帰や個別入力の正規リセット、公開外の回帰・結合テストは維持する。 [保存とテストの仕様](../07-development-and-design.md)・[検証記録](../10-audit-and-sources.md)

## 2026-11-24 最終章の実装状況

現行アーカイブはNo.1〜118、上限120。No.119・120の2枠が未割当。公開HTMLは137件。 No.110〜118とNo.84の診断・照合・復旧・最終送信、No.86・90・105の断片を実装済み。分岐点復帰と旧保存に対応する。独立初見プレイ、スマートフォン実機、公開環境は未確認。 [制作項目](../06-backlog.md)・[検証記録](../10-audit-and-sources.md)

## 2026-11-24 ノードリンクの検索操作を改善

No.93〜97・99・100・102の本文上部からノードリンクの内部資料を検索できる。No.92の初期画面は「92 / 120」、検索結果は件数を問わず「EX」と表示する。既存のNo.92の訪問履歴を保持し、検索結果から資料を開くとその資料を登録する。 [検索とアーカイブ仕様](../09-search-and-links.md)

## 2026-11-24 ENDING 3を実装

ENDING 3「完全な告発」の改稿では、No.106〜109の限定内部資料を追加し、No.100・103〜105を改稿した。No.94〜97・99は旧導線を終了し、異なるURLの資料に差し替えた。旧URLの記録は新資料の訪問に移行しない。No.98、No.1〜93の番号とURLは維持する。No.100〜105を追加し、検索結果EXは引き続き登録しない。

相沢との初回会話は第4返信「……申し訳ありませんが、どなたのことでしょうか。」で止まる。No.101・102・106〜109をすべて閲覧して初回会話も終えると、フォルダの確認を頼める。フォルダ名「調査記録_最終」は前後の空白を除去しNFCで正規化して照合する。誤答は再入力できる。最終返信の添付を受領するとNo.103の閲覧とNo.80への添付が可能。相沢の会話をリセットしても受領済みの報告書は保持する。

No.80はNo.83の報告書を提出するとNo.89→90へ、高瀬作成版を提出するとNo.104→105へ進む。二種類の提出は独立し、両方ある場合は選択できる。分岐点復帰はNo.82に戻り、プレイヤー編集版を復元し、旧高瀬宛てメールと両提出を初期化する。相沢との会話、受領済みの報告書、既訪問資料および到達済み結末は保持する。

最新の実装範囲と未検証事項は上記の最終章を参照。

## 2026-11-23 ノードリンク内部検索と相沢の特定を実装（当時の記録）

No.88の中途Web職の計画を具体化し、手書き風「HPのロゴを3秒長押し」は維持。No.39のロゴ長押し先のNo.91を「潜入後の調査ノート」に差し替え、番号とURLを継承。No.92で「人材情報」を検索してNo.93の人材情報一覧へ。8名の採用区分・担当とNo.88・91を照合すれば相沢直人を特定できる。記憶異常の詳しい説明、救助要請、告発用の追加証拠、ENDING 3・4は未実装。 [設計と開示順](STORY_DESIGN.md)・[正式な制作項目](../06-backlog.md)

No.91の本文は作者指定稿に更新済み。No.93の8名は6項目の詳細プロフィールとして掲載し、8件の社内連絡アドレスは通常のテキストで表示する。No.84「メール」では、宛先を入力して左の連絡先一覧に追加し、人物名を選んで会話を開く。No.84の相沢の第6返信後、続報の添付からNo.94「調査経過メモ」を開く。「利用状況照合」をNo.92・93で検索してNo.95を読む。No.95の本文外の「メールへ戻る」で、登録済みの相沢との会話を開く。両資料の閲覧後に追加調査を依頼すると、相沢の返信2通と添付No.96が届く。No.96の「保守参照経路」を検索してNo.97を読み、「調査ノートへ戻る」でNo.96に戻る。No.96・97の両方を閲覧すると、No.96の「調査について」に「Chronect社内連絡を確認する」が表示され、No.98へ進める。No.98を閲覧後、ブラウザの戻る操作またはアーカイブでNo.96に戻り、「監視後の記録を読む」からNo.99へ進む。 No.98には、退職後の引き継ぎ中に見つかった不明な編集履歴への調査指示と、後日の独断によるなりすまし・事後報告を異なる件名で掲載する。No.99は引き継ぎ時の連絡を読んだ高瀬の主観。Chronectが高瀬や相沢の動きをどこまで把握しているかは未確定。

## 2026-11-21 高瀬の潜入構想（当時の資料更新）

高瀬の告発動機、法人枠と共通の購入技術、旧72時間セッション案の完全不採用を正本へ反映。ノードリンクへの潜入、機器改造、勤務中の役割と業務後の調査、記憶変化は方向性合意の段階。機器の動作・研修後の継続利用・私的利用が直ちに発覚しなかった事情は、未承認の採用候補として記録した。 [設計メモ](../../planning/takase-infiltration-and-identity.md)・[未確定事項](../08-open-questions.md)

実装済みの第7章はNo.87・88まで。No.38・39の既存資料で候補企業を絞れる。相沢との同一性を示す資料と導線、潜入後の証拠、機器・記憶異常の開示、残り2つのエンディングは未実装。No.86・90への到達、検索・アーカイブ・保存の仕様は従来どおり。72時間案の資料・謎は今後の制作課題から外す。

## 2026-11-20 エンディング画面の共通化

No.86・90に共通の明朝系テンプレートを適用した。確定稿に沿った共通の感想案内とX共有の下に、通常ページと同じフッターと番号式のアーカイブボタンを置く。再利用手順は[デザイン仕様](../07-development-and-design.md)を参照。

## 2026-11-20 自力告発ルート「正義の盲点」

当時のアーカイブはNo.1〜90、上限120、未割当No.91〜120。公開HTML109件。 No.83で完成させた報告書を、No.22のフッターから開けるNo.80で手動添付し、確認ダイアログで情報提供する。受付後に短い時間経過を挟んでNo.89の調査報道へ進む。記事末尾の「その後」からNo.90のENDING「正義の盲点」へ。

No.86「託された記録」は作者確定稿に更新。No.90は到達後に再訪可能。両ページのX共有はそれぞれの投稿文で投稿作成画面を開く。作品の正式開始URLと感想フォームURLは未確定。共有文に開始URLを含めず、感想フォームのボタンは未設定の間、無効とする。設定箇所は両ページの `data-feedback-url`。

## 2026-11-18 第7章前半 No.87・88

No.84の3往復目の返信にある「Web運用日誌」をChronect Hubで特殊検索するとNo.87へ進む。No.87の作業記録03で「詳細未記入」を開き、No.65・66の保守資料と照合する。一致後に表示される「個人作業控えを参照」でNo.88へ移動する。No.88は高瀬が提携企業への潜入を検討した段階の記録。中途採用と研修利用を既存資料で照合する。

## 2026-11-18 No.84 メール画面の移植

No.84は旧作の mail.html を移植したチャット形式のメール画面。PCでは文字キーで定型文を入力し、スマートフォンでは専用ボタンで送る。会話は4往復で、4通目は完成報告書の添付が必要。従来の保存キーから会話を復元する。会話のリセットは報告書の完全削除前に利用でき、報告書とアーカイブ履歴は保持する。

## 2026-11-17 アーカイブNo.83〜86と画面改修

No.83〜86を共通アーカイブに登録。未訪問は「？？？」と表示し、条件を満たさない直アクセスでは登録しない。後日談の初回は完全削除後、エンディングの初回は後日談の閲覧後。旧エンディング到達データと訪問済みページからの再訪を扱う。疑似メールはPCのキー入力に連動した定型文とスマートフォン用の定型文送信を備える。No.85に通勤風景のイメージ写真を追加。No.86の感想フォームはURL未設定。

## 2026-11-17 疑似メールと後日談「託された記録」

完成した報告書のあるNo.82から「連絡する」で疑似メールを開始。初回連絡には添付なし。返信を受けて、完成文書を手動で添付・送信する。送信後も原本は手元に残る。No.84で完成報告書を選択して送信し、削除依頼の返信を受けると「報告書のデータを削除する」が表示される。削除完了を閉じると暗転してNo.85の後日談へ進む。削除後にNo.84を再読み込みしても、保存済みの削除から再開できる。「エンディングページへ」を選ぶとENDING「託された記録」に到達する。3画面はNo.84〜86として登録され、削除後はNo.82から後日談と到達済みエンディングを再閲覧できる。

## 2026-11-17 高瀬の調査ノートの表示

調査ノートのNo.67〜69・82と、No.83の報告書編集画面に共通の文書閲覧スタイルを適用。チャコール地に等幅系の文字、青灰色のリンク、細い区切り線を使う。共通アーカイブの配色は従来どおり。

## 2026-11-17 Chronect Hubの特殊検索配色

Chronect Hubでは、特殊検索結果（0件を含む）と専用辞書の登録先12資料（No.70〜79・81・87）に暗い青緑・スレートの専用配色を適用。直接アクセス・再訪でも同じ配色で表示される。

## 2026-11-16 調査報告書の取得・完成・添付

No.82の「報告書をダウンロード」から約1.5秒の疑似ダウンロードを経て、完了ダイアログの「ファイルを開く」でNo.83の編集ページ（takase-report-editor.html）を開く。BAS欄は `BAS` と `Behavior Assistance System` を同じ正解として判定する。本文の5項目を記入して「変更内容を保存する」を押すと、正解欄は緑色で確定し、誤答・未入力欄は赤色で再編集できる。保存時は約0.65秒スピナーを表示し、保存結果をダイアログで知らせる。未完成時は確認後も編集画面に留まる。全項目確定時は完成ダイアログの「確認」でNo.82へ戻る。「入力状況をリセット」を確認すると、取得状態を保持したまま5項目の入力・確定・完成状態を初期化する。完成文書は再閲覧でき、No.82の連絡先の下に「連絡する」が表示される。No.80では完成文書を手動で添付・解除できる。No.80からの提出と第7章の現行導線は冒頭の各節を参照。

## 2026-11-16 報告用資料の参照導線と調査作業控え

No.79「試験運用 対応記録」の「報告用資料」をChronect Hubで `##報告用資料##` と特殊検索すると、No.81「報告用資料 参照記録」に到達する。No.81では、本文末尾の追加参照欄が枠のない空白に見える。欄をクリック・タップするか、ドラッグで文字を選択すると「追加参照：調査作業控え」が白文字で表示され、選択を解除しても同じページ内では表示が続く。表示後に「調査作業控え」を押すと、高瀬の個人サイトNo.82へ進む。 No.82で架空連絡先と「調査報告書_草稿」を発見できる。取得以降の仕様は冒頭を参照。

## 2026-11-16 Yaboo!ニュースのアーカイブ登録と改番

当時のアーカイブはNo.1〜88、上限120、未割当No.89〜120。公開HTML107件。 No.21の外部メディア掲載リンクからNo.22のYaboo!ニュース記事へ進み、フッターの「情報提供」からNo.80「情報提供・取材依頼」へ進む。両ページに右下の共通ページアーカイブを設置。「情報提供」は下線なしで表示する。 旧No.1〜21は同番号。旧No.22〜78は新No.23〜79へ繰り下げ。旧No.79は未割当。旧保存データは同じ保存キーを使い、URLを基準に番号を移行する。 No.80の提出機能は冒頭を参照。 現行ページ一覧は改番後の番号。

以前の章別節にある改番前の番号は制作当時のもの。現行番号はページ一覧と検索対応表を参照。

## 2026-11-16 Yaboo!ニュースの情報提供窓口

No.21の記事末尾の外部メディア掲載情報から、Yaboo!ニュースの一般記事へ移動できる。記事のフッター「情報提供」から「情報提供・取材依頼」へ。2ページはアーカイブ登録外で、登録No.1〜78・上限120を維持する。 未取得状態のみ実装。作中報告書の取得・編集・完成判定・保存キー、完成文書の添付・提出、高瀬への連絡、第7章への分岐とエンディングは後続制作。現段階では添付と提出を無効にし、実ファイルや外部送信を扱わない。

## 2026-11-16 第6章後半 No.75〜77

アーカイブはNo.1〜78、上限120、未割当79〜120。公開HTML99件（うちYaboo!ニュース2件は登録外）。Hubの通常検索は27資料、特殊検索は10資料。 No.74の「SECOND SHIFT」から `##SECOND SHIFT##` でNo.75へ進む。No.74・75の「管理体制」から `##管理体制##` でNo.76、No.75・76の「利用者向け説明」から `##利用者向け説明##` でNo.77へ進む。旧 `##外部指示##` は0件。特殊検索の登録は10件。 No.75の「試験運用」をHubで `##試験運用##` と検索するとNo.78へ到達する。No.75からNo.76・77への既存経路も利用できる。閲覧順による制限はない。 認証は個別同意や指示者の特定を意味しない。個々の説明・同意、指示者・承認者・責任者、経営陣の認識範囲、提携企業の関与、大規模な商用提供はNo.75〜78では立証しない。未完成告発報告書、連絡、提出と分岐は未実装。


## 2026-11-16 第6章前半

第6章前半の探索導線。 No.68の入力例から `##売却処理##` → No.69。施設A〜Dの記述を既知の施設Cと照合し、`##施設C##` → No.70。施設群の正式名称から `##Chronect広域実証ネットワーク##` → No.71。以降、`##BAS##` → No.72、`##作業工程##` → No.73、`##事業計画##` → No.74。通常の「売却処理」はNo.58、「施設C」はNo.50。閲覧順の制限は設けない。


## 2026-11-13 第5章改修（現行）

No.40・61→「資料参照区分」→No.62。No.62の「参照対応」でNo.63、「保守経路」でNo.64。No.64の「Webシステム保守」でNo.65（旧語「検索基盤担当」も有効）。No.65の氏名「高瀬悠真」をHubで検索し、0件文の「資料」からNo.66へ進む。No.63の直リンクは撤去。No.66〜68はノート内の通常リンクで移動できる。 No.68でHub固有の `##検索語##` を公開。通常の完全一致辞書とは別の登録対象を照会し、当時の辞書は空で、説明例の `##売却処理##` は0件だった。第6章前半での変更は冒頭を参照。

以下の旧章記述は制作履歴。現行の内容・到達方法は本節を優先する。

## 2026-11-13 第5章「高瀬悠真の調査」

現行はアーカイブNo.1〜68、上限120、未割当69〜120。公開HTML87件（登録68、対象外ニュース12、対象外Hub要旨2、検索EX4、旧URL転送1）。Hub検索は27資料。 第5章は実装済み。独立初見での発見・照合は未検証。


## 2026-11-12 第4章「時間売買の真相」

現行はアーカイブNo.1〜61、上限120、未割当62〜120。公開HTML80件（登録61、対象外ニュース12、対象外Hub要旨2、検索EX4、旧URL転送1）。Hub検索は23資料。 No.57〜61を実装。No.58は売却側が状態・BAS支援と実績を扱うこと、No.59は購入者自身の制御で活動量が増えること、No.60は両者が清算上の数量で結び付くことを示す。No.61では売却・購入の開始から確定、引当・調整・清算までの全接続を検証し、連携する取引情報の入出力と、売却系から購入者側の活動量拡張へ時間を渡す経路が存在しないことを確認する。 独立初見未検証。[ページ一覧の正本](../04-page-inventory.md) 以下の日付付き節は制作履歴。

## 2026-11-11 第3章「BASの能力と運用の異常」

現行はアーカイブNo.1〜56、上限120、未割当57〜120。公開HTML75件（登録56、対象外ニュース12、対象外Hub要旨2、検索EX4、旧URL転送1）。Hub検索は18資料。 第3章では、まつだが売却中に作業を開始した理由を、BASの通常運用・複合動作・タスクの切替条件と個別セッションの記録から調べる。 独立初見での語句と分類の発見、動作起点の理解は未検証。[正本04](../04-page-inventory.md) 以下の日付付き節は制作履歴。

## 2026-11-09 試験施設の全国分散（FACILITY-REGIONAL-v1）

No.48とNo.50を更新。施設Aは東北地方、施設Bは中部地方、施設Dは九州地方。施設Cのみ明浜地区の既存位置。 SUB-126の2026年9月18日14:42の訪問先を施設Cから施設Dへ変更。対応する管理コードTB-260918-3906、訪問日時、IDは従来どおり。 No.1〜51・上限120。No.49・51の対応表・個別試験記録は維持。

## 2026-11-09 施設C調査編（FACILITY-C-v1）

現行アーカイブは1〜51の51件、上限120、未割当52〜120。公開HTML70件（登録51、対象外ニュース12、対象外Hub要旨2、検索EX4、旧URL転送1）。 まつだ編は作者判断で一区切り。作者報告によれば友人のプレイでNo.49到達を確認した。理解度と全経路の再現性は未確認。施設C調査編の次はChronectの事業構造を調べる方針で、具体的なページ・解法は未確定。 Hub検索は13資料。No.48の識別子「施設C」をHubで完全一致検索するとNo.50へ。No.50の運用区分「連続業務遂行評価」から「連続業務」を入力するとNo.51へ。No.34の照合を必要とするロックや、資料名の案内・強調を追加しない。 [正本04](../04-page-inventory.md)・[正本09](../09-search-and-links.md) 以下の日付付き節は制作履歴。

## 2026-11-06 一覧外ニュースと対応要旨の登録解除

現行アーカイブは49件（1〜49）、上限120、未割当50〜120。公開HTMLは68件（登録49、対象外ニュース12、対象外Hub要旨2、検索EX4、旧URL転送1）。 直前の1〜42は同番号。43・44・46〜53は登録解除。45→43、54→44、55→45、56→46、57→47、58→48、59→49。 [正本04](../04-page-inventory.md)。

## 履歴：2026-11-06 Chronectニュース整理後のアーカイブ（59件版）

アーカイブは59件（1〜59）、上限120、未割当60〜120。公開HTMLは68件（番号付き59、番号なしの旧ニュース4、検索結果4、旧URL転送1）。 現番号54〜59は、環境変化下の連続行動支援、資料識別番号一覧、評価基準、東央検証、訪問履歴、セッション対応の順。到達可能58件、到達不能4件、判断保留1件。旧46・47・50・53をアーカイブから除外。旧54の月次情報記事は判断保留で新50として登録を維持。 [正本04](../04-page-inventory.md)を参照。以下の日付付き節は制作時の番号。

## 2026-11-06 まつだ編の照合資料（MATSUDA-20261106-v1）

現行は番号付き63ページ＋検索EX4＋旧URL互換転送1の68 HTML。管理上限120、使用1〜63、未割当64〜120。 No.61は東央が実施した検証をChronectが受領・整理した記録。指定地点への移動、指定物品の受け取り、対象物の確認、所定の場所への運搬を、実施記録として示す。No.62は売却中の施設訪問を対象ID別に、No.63は同じIDとセッション管理コードの対応を掲載。 Hubは11資料。作者側の構造確認と独立初見を区別し、資料名の発見・再照合は未検証。正本は[04](../04-page-inventory.md)・[09](../09-search-and-links.md)・[10](../10-audit-and-sources.md)。 下記の日付付き節は各時点の制作記録。

## 2026-11-05：No.60名称統一・No.61の役割調整（PURPOSE-20261105-v1）

【作者承認・実装】No.60の資料名を「地域移動支援プログラム 評価基準資料」に統一。No.60・URL・80574305-R04・分類R04「評価資料」は維持。No.61は安全基準・案内精度の検証と、指定行動・作業手順の遂行を目的とする業務補助検証を区別し、行動継続率・手順完了率・動作の再現性を後者の評価項目として明示。具体的な検証条件・実施内容は関連資料に別記する旨まで掲載し、未実装リンク・新コードは設置しない。

東央の公開協力は秘密実験への関与を意味しない。個別同意・無断労働・外部指示・まつだとの対応・秘密施設は今回の公開資料で証明しない。No.58の研究、34/45の最初の反転、59の分類体系、既存9検索資料・完全一致検索語、番号1〜61・上限120・保存キーは維持。疑念形成の効果は独立初見未検証。

新規ページの実装なし。No.61から後続証拠への具体的な探索経路は今後の承認・実装待ち。優先事項は[正本06](../06-backlog.md)、検証記録は[10](../10-audit-and-sources.md)。

## 2026-11-04：中盤探索導線を実装（MIDROUTE-20261104-v1）

現行は番号付き61ページ＋EX4＋旧URL互換転送1＝66HTML。アーカイブ管理上限120、使用1〜61、未割当62〜120。既存1〜58の正式番号・保存キーtimeback-page-archive-v1・URL基準の旧保存移行は維持。120件の制作や未割当番号の用途予約は意味しない。

Hubは既存6資料＋今回3資料＝9資料。新59分類一覧、新60地域移動支援評価、新61東央検証。34/45管理項目・指定3検索語・120枠の実装を完了。34の資料管理単位番号80574305と、45の「資料識別番号：58241309-R03」を手掛かりに、Hubで「資料識別番号」→59の分類一覧へ。評価資料R04を選び、80574305-R04→60のBAS評価資料へ進む。「提携企業での検証」と既存37の協力分野を照合し、東央モビリティサービス株式会社→61の検証記録へ進む。

開発者の構造・動作確認と独立初見を区別する。二資料への気づき、R04の自力選択、東央の選定、業務補助からの疑念形成は独立初見未検証。No.45閲覧の必須化や4分類総当たりの完全防止はできず、閲覧ロック・入力制限は加えない。後続の個別同意・秘密実験の証拠、高瀬・エンドは未確定のまま。

正本03・04・05・08・09・10。以下の過去の日付・容量・未コミット記述は当時の履歴で、現在のGit状態は作業ごとに確認する。

最終更新日：2026-11-12（日本時間）

制作者専用。ChatGPT向け参照資料であり、設定・進捗の正本ではない。番号は2026-11-06のページ一覧と現行ファイルを基準にした要約。過去テスト版の状態や制作ログを現在の仕様と混同しない。

## 1. 現在地

最初の反転「夢の投稿者まつだ自身が、売却中にその場所を通っていた」を示す証拠まで実装済み。反転後は資料コード照合→BAS評価→東央の公開業務補助検証→訪問履歴・セッション対応まで実装済み。移動の個別目的や同意は未確定。

2026-10-30追加承認：制作者側の原因はChronectのBAS外部指示による無自覚の秘密実験と確定。通常運用、指示と安全の優先関係、同意区分、進化3軸と秘密成果の一般BASへの一部還元を正式資料へ記録した。通常BASとの差と進化へ関心を向ける演出方向は承認済みだが、具体的な伏線・検索経路・文案・開示時期は未承認。今回の作業は資料更新と既存ページ調査のみで、公開ページ・検索・番号・解法は未変更。調査・優先候補は[正本10](../10-audit-and-sources.md)、残課題は正本08の既存IDとS-13を参照する。

2026-11-02：34の指定段落、Hub検索「生活動線」、新規58の指定研究要旨に続き、作者承認の43への「生活動線や」5文字挿入を実装。34＋43の共通語配置から既存Hub検索58への探索導線は実装完了。今回34・44・45・58・検索DB・番号・保存は未変更。製品更新通知・中盤以降の証拠・個別の秘密成果還元対応は保留。語句への気づき・入力は初見未検証で、開発検証と区別する。初見環境にはアクセスしていない。

静的HTML/CSS/JavaScriptで構成。現行アーカイブはNo.1〜118、上限120。No.119・120の2枠が未割当。公開HTMLは137件。Hubの通常検索は27資料、特殊検索は従来12資料と、条件付きの最終章5資料。ノードリンク独自検索は7件。

正式な開発環境は `C:\Users\koyam\Desktop\Web_ARG\ARG-Time_Back`。OneDriveからのローカル移行は完了。既存5コミットを取り込み、移行時HEADは `faf3d2045a18eaa4bace918d907031fb9711759e`。移行直後は未コミット作業もあり、当時のHEADだけではその時点のサイト・資料を再現できなかった。その後の作者によるコミットを経て、2026-10-30のBAS資料更新開始時は `5e63e8ef2a26cd38c362962d69b45ac542cfcff8`・作業ツリーcleanを確認した。11月2日の今回開始時は前回の12資料が未コミットで、これらを保護して今回のWeb・資料・テスト変更を追加した。コミット・プッシュは行っていない。最新状態は作業時に確認する。

## 2. 現行ページ一覧

現行の登録はNo.1〜118。上限は120。タイトル・ファイル・ページ内容は[正本のページ一覧](../04-page-inventory.md)と現行実装を参照。

| 現行番号 | タイトル | 公開ファイル | ページ内容 |
|---:|---|---|---|
| 1 | 最近、同じ場所の夢を見る。 ｜ memo | [`index.html`](../../public/index.html) | 同じ場所の夢と、二重リングの像や細道の描写。関連記事からNo.2へ。 |
| 2 | TIME BACKを使ってみた感想 ｜ memo | [`memo-timeback-review.html`](../../public/memo-timeback-review.html) | TIME BACKの購入・売却の体験談。利用明細画像に売却セッションの管理コードがある。 |
| 3 | トップページ ｜ TIME BACK | [`time-back.html`](../../public/time-back.html) | 個人向け入口。正常なサービスの顔。旧index.htmlから移動。 |
| 4 | サービスについて｜TIME BACK | [`about.html`](../../public/about.html) | 売却・購入・時間プールとアプリの説明。 |
| 5 | 料金・報酬｜TIME BACK | [`pricing.html`](../../public/pricing.html) | 価格表。法人案内の旧文言は削除済み。 |
| 6 | 安全性について｜TIME BACK | [`safety.html`](../../public/safety.html) | 利用前後の安全支援。 |
| 7 | よくある質問｜TIME BACK | [`faq.html`](../../public/faq.html) | FAQ、規約・問い合わせへの通常導線。 |
| 8 | 利用規約｜TIME BACK | [`terms.html`](../../public/terms.html) | 利用規約、Chronectの名称、安全・同意・失効条件。 |
| 9 | お問い合わせ｜TIME BACK | [`contact.html`](../../public/contact.html) | ダミー問い合わせ。通信送信なし。 |
| 10 | TIME BACK MARKET｜TIME BACK | [`market.html`](../../public/market.html) | 市場統計。アプリへの案内でWeb取引は行わない。 |
| 11 | Behavior Assistance System｜TIME BACK | [`behavior-assistance.html`](../../public/behavior-assistance.html) | 公開の行動支援技術。極めてクリーンに見せる。 |
| 12 | TIME BACK ID ご利用ガイド｜TIME BACK | [`time-back-id.html`](../../public/time-back-id.html) | 会員ID説明、アプリ3段階の画像。 |
| 13 | トップページ ｜ Chronect | [`chronect.html`](../../public/chronect.html) | 企業トップ。研究ニュース20を経由してHubへ。 |
| 14 | 企業情報 ｜ Chronect | [`chronect-company.html`](../../public/chronect-company.html) | 代表・会社概要・施設写真・沿革。 |
| 15 | 研究開発 ｜ Chronect | [`chronect-research.html`](../../public/chronect-research.html) | 4領域18研究プロジェクトの具体説明。 |
| 16 | 事業・サービス ｜ Chronect | [`chronect-services.html`](../../public/chronect-services.html) | 事業とTIME BACK展開の経緯、法人向けへ。 |
| 17 | プロジェクト ｜ Chronect | [`chronect-projects.html`](../../public/chronect-projects.html) | 個人向け・法人活用・調査検証・協働。提携一覧37へリンク。 |
| 18 | ニュース ｜ Chronect | [`chronect-news.html`](../../public/chronect-news.html) | Chronectのニュース一覧。掲載記事はNo.20〜25の6件。 |
| 19 | 採用情報 ｜ Chronect | [`chronect-careers.html`](../../public/chronect-careers.html) | 厳格な採用通達。連絡先は.invalid。 |
| 20 | 睡眠中の時間認知に関する研究成果を発表 ｜ Chronect | [`chronect-news-20260822.html`](../../public/chronect-news-20260822.html) | 睡眠中の経過時間の捉え方に関する研究発表。Hub要旨No.42へ。 |
| 21 | 生活環境における行動支援技術の共同検証を開始 ｜ Chronect | [`chronect-news-20260714.html`](../../public/chronect-news-20260714.html) | 家庭、徒歩移動、公共交通、オフィスでの行動支援を共同で検証する告知。 |
| 22 | 暮らしの中に広がる行動支援技術、Chronectが共同検証 ｜ Yaboo!ニュース | [yaboo-news-chronect.html](../../public/yaboo-news-chronect.html) | No.21から通常リンクで到達。 |
| 23 | TIME BACK for Businessの提供領域を拡大 ｜ Chronect | [`chronect-news-20260603.html`](../../public/chronect-news-20260603.html) | 法人向けサービスの対象領域と導入支援体制の拡大を告知。 |
| 24 | 短時間休息後の覚醒移行に関する検証結果を発表 ｜ Chronect | [`chronect-news-20260218.html`](../../public/chronect-news-20260218.html) | 最初の応答と継続操作を区別。Hub43へ。 |
| 25 | Chronect本社研究施設の設備拡張について ｜ Chronect | [`chronect-news-20250526.html`](../../public/chronect-news-20250526.html) | 研究開発体制の強化に向けた本社研究施設の設備拡張を告知。 |
| 26 | 個人向け時間取引サービス「TIME BACK」を正式提供 ｜ Chronect | [`chronect-news-20250401.html`](../../public/chronect-news-20250401.html) | 個人向け時間取引サービスTIME BACKの正式提供を告知。 |
| 27 | TIME BACK FOR BUSINESS｜法人向け案内 | [`business.html`](../../public/business.html) | 法人向け入口。 |
| 28 | 法人向けサービス｜TIME BACK FOR BUSINESS | [`business-service.html`](../../public/business-service.html) | 一括調達・配分・管理。BAP等の語句を含む。 |
| 29 | 導入事例｜TIME BACK FOR BUSINESS | [`business-cases.html`](../../public/business-cases.html) | A/B/C社の匿名事例。実名2社への改編は未実装。 |
| 30 | 安全管理｜TIME BACK FOR BUSINESS | [`business-safety.html`](../../public/business-safety.html) | 法人の承認・同意・安全監視。 |
| 31 | 導入の流れ｜TIME BACK FOR BUSINESS | [`business-flow.html`](../../public/business-flow.html) | 契約・登録・オリエンテーション、相談リンク。 |
| 32 | Behavior Assistance Platform｜TIME BACK FOR BUSINESS | [`behavior-assistance-platform.html`](../../public/behavior-assistance-platform.html) | 従業員の稼働・移動・安全情報の管理画面イメージ。 |
| 33 | 行動支援機器・システム｜TIME BACK FOR BUSINESS | [`behavior-assistance-equipment.html`](../../public/behavior-assistance-equipment.html) | 写真付きの専用機材紹介。固有機材名は書かない。 |
| 34 | 利用前オリエンテーション｜TIME BACK FOR BUSINESS | [`pre-use-orientation.html`](../../public/pre-use-orientation.html) | 初回説明・操作確認・本人同意。 |
| 35 | ユーザー参加型実証プログラム｜TIME BACK for Business | [`business-demonstration.html`](../../public/business-demonstration.html) | 実証プログラム、現行map、地域連携への語句。 |
| 36 | 生活環境実証エリア｜TIME BACK for Business | [`business-demonstration-area.html`](../../public/business-demonstration-area.html) | 事業センター内の屋内模擬生活環境・設備。2026-10-26、通路・模擬売場の施設写真と原寸拡大リンクを追加。 |
| 37 | 地域連携の取り組み｜TIME BACK for Business | [`business-community.html`](../../public/business-community.html) | 振興会との清掃。像が写る写真、駅・商店街・集合写真。 |
| 38 | 提携企業一覧｜TIME BACK FOR BUSINESS | [`partners.html`](../../public/partners.html) | 提携先5社の紹介。ノードリンクとアクシオンの企業サイトへリンク。 |
| 39 | 株式会社ノードリンク・ワークス | [`nodelink-works.html`](../../public/nodelink-works.html) | 独立した人材会社の企業サイト。新人研修や中途IT職を紹介。 |
| 40 | アクシオン・ロジスティクス株式会社 | [`axion-logistics.html`](../../public/axion-logistics.html) | 独立した物流会社の企業サイト。デスクワークでの通常利用例を紹介。 |
| 41 | トップページ ｜ Chronect Hub | [`chronect-hub.html`](../../public/chronect-hub.html) | 独立した黒白の資料サイト入口。要旨本文は41へ分離。 |
| 42 | 睡眠中の時間認知に関する研究要旨 ｜ Chronect Hub | [`chronect-hub-research.html`](../../public/chronect-hub-research.html) | 20から直接到達。Hubで研究名・関連語を検索した場合も同じページ。 |
| 43 | 短時間休息後の覚醒移行に関する検証要旨 ｜ Chronect Hub | [`chronect-hub-research-20260218.html`](../../public/chronect-hub-research-20260218.html) | 23の対応要旨。研究名・覚醒移行・短時間休息で検索。 |
| 44 | セッション運用記録（参照用抜粋） ｜ Chronect Hub | [`chronect-hub-session.html`](../../public/chronect-hub-session.html) | 売却者本人の公園→細道→商店街の実測通過記録。Hubで明細の管理コードを検索して参照する。 |
| 45 | 環境変化下における連続行動支援の評価 ｜ Chronect Hub | [`chronect-hub-research-continuous-action.html`](../../public/chronect-hub-research-continuous-action.html) | 生活動線や設備配置の変化に対するBASの動作安定性、継続性、手順完了率などの研究要旨。 |
| 46 | 資料識別番号・分類コード一覧 ｜ Chronect Hub | [`chronect-hub-document-codes.html`](../../public/chronect-hub-document-codes.html) | 8桁の資料管理単位番号と、実施概要・安全管理・行動記録・評価資料を表すR01〜R04の分類表。 |
| 47 | 地域移動支援プログラム 評価基準資料 ｜ Chronect Hub | [`chronect-hub-mobility-evaluation.html`](../../public/chronect-hub-mobility-evaluation.html) | 資料識別番号80574305-R04。BASによる地域移動支援を環境認識、行動判断、身体動作、継続性で評価する基準。 |
| 48 | 東央モビリティサービスの検証記録 ｜ Chronect Hub | [`chronect-hub-mobility-partner-verification.html`](../../public/chronect-hub-mobility-partner-verification.html) | 東央が実施し、Chronectが整理したBAS検証記録。移動、物品の受け取り、確認、運搬の4工程を掲載。 |
| 49 | 試験対象者 訪問履歴一覧 ｜ Chronect Hub | [`chronect-hub-subject-visits.html`](../../public/chronect-hub-subject-visits.html) | 4人の試験対象IDについて、売却セッション中に各自同じ施設を訪れた記録を各2件掲載。 |
| 50 | 試験対象・セッション対応表 ｜ Chronect Hub | [`chronect-hub-subject-sessions.html`](../../public/chronect-hub-subject-sessions.html) | 試験対象ID、実施日、売却セッション管理コードの対応表。No.44のコードと照合し、No.49で反復訪問を確認する。 |
| 51 | 試験施設管理情報 ｜ Chronect Hub | [chronect-hub-facility-management.html](../../public/chronect-hub-facility-management.html) | 施設A〜Dの運用区分と概略配置。Aは東北、Bは中部、Dは九州。Cは明浜の連続業務遂行評価。 |
| 52 | 連続業務遂行試験 実施記録 ｜ Chronect Hub | [chronect-hub-continuous-work-record.html](../../public/chronect-hub-continuous-work-record.html) | 9月17日のSUB-117が売却中に行った物品の照合・分類・運搬と次の指示への移行。 |
| 53 | BAS通常運用条件一覧 ｜ Chronect Hub | [chronect-hub-bas-operation-conditions.html](../../public/chronect-hub-bas-operation-conditions.html) | 安全な休息中の非開始、危険時・習慣動作の補助、緊急停止の通常条件。 |
| 54 | BAS複合動作評価記録 ｜ Chronect Hub | [chronect-hub-bas-composite-evaluation.html](../../public/chronect-hub-bas-composite-evaluation.html) | 物品識別、経路調整、途中の条件変更、次工程移行を連携させる評価条件と観測項目。 |
| 55 | 行動支援タスクの切替条件 ｜ Chronect Hub | [chronect-hub-bas-task-switching.html](../../public/chronect-hub-bas-task-switching.html) | 障害物や識別失敗への対応と工程切替。作業方法の判断とタスク目的の指定を区別し、動作区分評価資料に限る管理単位の変換規則を示す。 |
| 56 | 売却セッション動作区分 照合記録 ｜ Chronect Hub | [chronect-hub-session-action-comparison.html](../../public/chronect-hub-session-action-comparison.html) | 資料識別番号 `58251309-R04`。SUB-117の2026年9月17日の記録を通常運用と照合。安全確保・習慣動作だけでは開始を説明しにくいことを示す。 |
| 57 | BASタスク起点 照合記録 ｜ Chronect Hub | [chronect-hub-task-origin-record.html](../../public/chronect-hub-task-origin-record.html) | 同一セッションの移動・作業の起点が、認証済みとして処理された外部指示だったことを示す。 |
| 58 | 時間プール計上基準 ｜ Chronect Hub | [chronect-hub-pool-accounting.html](../../public/chronect-hub-pool-accounting.html) | 売却計上、購入引当・消費、調整、残量の定義。予約・利用中・確定を区別。検索語「プール計上」の主な手掛かりはNo.57、補助はNo.10。 |
| 59 | 売却セッション処理記録 ｜ Chronect Hub | [chronect-hub-sale-processing.html](../../public/chronect-hub-sale-processing.html) | 売却者の状態・安全・BAS支援、覚醒、実績と報酬の確定を段階別に整理。 |
| 60 | 購入セッション動作評価 ｜ Chronect Hub | [chronect-hub-purchase-evaluation.html](../../public/chronect-hub-purchase-evaluation.html) | 購入者自身の脳の活性化による活動量拡張と、倍率・消費・購入枠の扱い。 |
| 61 | 売買セッション清算対応表 ｜ Chronect Hub | [chronect-hub-settlement-mapping.html](../../public/chronect-hub-settlement-mapping.html) | 売却・購入の実績や予約と清算数量の対応、技術処理系の区分。 |
| 62 | 売買処理系統 接続検証記録 ｜ Chronect Hub | [chronect-hub-processing-connections.html](../../public/chronect-hub-processing-connections.html) | 全処理系の入出力と接続を検証し、売却系から購入側への時間移転経路が存在しないことを記録。 |
| 63 | Chronect Hub 資料参照区分 ｜ Chronect Hub | [chronect-hub-reference-class.html](../../public/chronect-hub-reference-class.html) | 公開要旨と限定保存記録の違いを平易に説明。 |
| 64 | 限定資料 参照対応記録 ｜ Chronect Hub | [chronect-hub-reference-mapping.html](../../public/chronect-hub-reference-mapping.html) | 通常登録と異なる経路で検索対象に追加された記録。 |
| 65 | 検索基盤 保守経路記録 ｜ Chronect Hub | [chronect-hub-maintenance-route.html](../../public/chronect-hub-maintenance-route.html) | 検索結果あり・0件・例外入力時の保守。 |
| 66 | Webシステム 保守担当記録 ｜ Chronect Hub | [chronect-hub-search-staff.html](../../public/chronect-hub-search-staff.html) | 高瀬に集中していた企業サイト・Hub・検索画面の開発保守。 |
| 67 | 調査ノート ｜ 調査ノート | [takase-notes.html](../../public/takase-notes.html) | Web保守から利用者の身体利用に疑いを持った経緯。 |
| 68 | 証拠整理メモ ｜ 調査ノート | [takase-records.html](../../public/takase-records.html) | 確認できた事実、身体利用の疑い、告発に不足する証拠。 |
| 69 | 検索機能の技術メモ ｜ 調査ノート | [takase-handover.html](../../public/takase-handover.html) | Hubの内部照会用構文と制約。 |
| 70 | 売却処理 内部参照記録 ｜ Chronect Hub | [chronect-hub-sale-reference.html](../../public/chronect-hub-sale-reference.html) | 売却処理の内部記録と施設識別記号。 |
| 71 | 施設管理体系記録 ｜ Chronect Hub | [chronect-hub-facility-system.html](../../public/chronect-hub-facility-system.html) | 施設群の正式名称、管理区分、施設Cの配置地域。 |
| 72 | 広域実証ネットワーク 管理概要 ｜ Chronect Hub | [chronect-hub-regional-network.html](../../public/chronect-hub-regional-network.html) | 施設群の記録管理と施設Cの評価対象。 |
| 73 | BAS応用検討記録 ｜ Chronect Hub | [chronect-hub-bas-application.html](../../public/chronect-hub-bas-application.html) | BASの作業工程への応用検討。 |
| 74 | 売却時間帯の業務利用モデル ｜ Chronect Hub | [chronect-hub-work-use-model.html](../../public/chronect-hub-work-use-model.html) | 売却時間帯の身体を利用する業務モデルの基本構想。 |
| 75 | SECOND SHIFT計画概要 ｜ Chronect Hub | [chronect-hub-second-shift-plan.html](../../public/chronect-hub-second-shift-plan.html) | SECOND SHIFTの名称と企業向け作業利用の事業構想。 |
| 76 | SECOND SHIFT 運用計画資料 ｜ Chronect Hub | [chronect-hub-second-shift-operation.html](../../public/chronect-hub-second-shift-operation.html) | 運用の基本方針と技術評価・試験運用・事業管理・利用者対応の区分。 |
| 77 | SECOND SHIFT 内部管理記録 ｜ Chronect Hub | [chronect-hub-second-shift-management.html](../../public/chronect-hub-second-shift-management.html) | Chronect内部での試験運用と評価記録の組織的管理。 |
| 78 | 利用者向け説明 運用指示 ｜ Chronect Hub | [chronect-hub-second-shift-disclosure.html](../../public/chronect-hub-second-shift-disclosure.html) | 説明の許可・禁止、回答例、統一適用を定めた内部指示。 |
| 79 | 試験運用 対応記録 ｜ Chronect Hub | [chronect-hub-trial-operation-mapping.html](../../public/chronect-hub-trial-operation-mapping.html) | 施設CのSUB-117の個別試験とSECOND SHIFTの直接対応。 |
| 80 | 情報提供・取材依頼 ｜ Yaboo!ニュース | [yaboo-news-tip.html](../../public/yaboo-news-tip.html) | No.22のフッターから到達。完成文書を添付し、確認後に疑似提出できる。受付後はNo.89へ。 |
| 81 | 報告用資料 参照記録 ｜ Chronect Hub | [chronect-hub-report-reference.html](../../public/chronect-hub-report-reference.html) | No.79の「報告用資料」を特殊検索。末尾の空白を操作して追加参照を表示し、リンクからNo.82へ進む。 |
| 82 | 調査作業控え ｜ 調査ノート | [takase-work-notes.html](../../public/takase-work-notes.html) | No.81からリンク。高瀬がChronect在籍時に使用していた社用メールアドレス `y.takase@chronect.mail` をテキストで掲載。現在の利用状況は不明。疑似ダウンロード完了後に「ファイルを開く」で専用画面に進み、完成後は「連絡する」から疑似メールを開ける。 |
| 83 | 調査報告書 ｜ 調査ノート | [takase-report-editor.html](../../public/takase-report-editor.html) | No.82から取得した報告書を編集する。削除後は訪問済み画面を再訪できるが、本文は復元しない。 |
| 84 | メール | [takase-mail.html](../../public/takase-mail.html) | 高瀬宛ての報告書送信・削除と、相沢宛ての初回6往復、続報、追加問い合わせと資料2件。 |
| 85 | TIME BACK、累計1,000万ダウンロードを突破　時間活用サービスとして利用拡大 ｜ Yaboo!ニュース | [yaboo-news-aftermath.html](../../public/yaboo-news-aftermath.html) | 報告書削除後の後日談。末尾からNo.86へ。 |
| 86 | ENDING「託された記録」 ｜ TIME BACK | [timeback-ending-record.html](../../public/timeback-ending-record.html) | 初回は後日談の閲覧後に到達。到達後は再訪可。感想フォームはURL未設定。 |
| 87 | Web運用日誌 ｜ Chronect Hub | [chronect-hub-web-operations-log.html](../../public/chronect-hub-web-operations-log.html) | 特殊検索「Web運用日誌」。作業記録03の照合後、補足参照からNo.88へ。 |
| 88 | 調査方法の再検討 ｜ 調査ノート | [takase-investigation-method.html](../../public/takase-investigation-method.html) | No.87の補足から到達。高瀬が提携企業への潜入を検討する記録。 |
| 89 | 「TIME BACK」に不適切な試験運用の疑い　利用者への説明と実態に食い違い ｜ Yaboo!ニュース | [yaboo-news-investigation.html](../../public/yaboo-news-investigation.html) | No.80の提出後に初回到達。末尾の「その後」からNo.90へ。 |
| 90 | ENDING「正義の盲点」 ｜ TIME BACK | [timeback-ending-blind-spot.html](../../public/timeback-ending-blind-spot.html) | 初回はNo.89の閲覧後に到達。到達後は再訪可能。感想フォームURL未設定。 |
| 91 | 潜入後の調査ノート ｜ 調査ノート | [nodelink-web-maintenance.html](../../public/nodelink-web-maintenance.html) | No.39のロゴ長押しで到達。潜入成功と参照経路。末尾からNo.92へ。旧ページと同じURL。 |
| 92 | 内部資料検索 ｜ 株式会社ノードリンク・ワークス | [nodelink-internal-search.html](../../public/nodelink-internal-search.html) | ノードリンク独自の検索入口。検索結果の表示はEX扱い。 |
| 93 | 人材情報一覧 ｜ 株式会社ノードリンク・ワークス | [nodelink-personnel.html](../../public/nodelink-personnel.html) | 「人材情報」で到達。8名分の7項目プロフィールとテキストの社内連絡アドレスを掲載。相沢の担当区域は「社内情報管理基盤」。 |
| 94 | 社内情報管理基盤 業務一覧 ｜ 株式会社ノードリンク・ワークス | [nodelink-info-duties.html](../../public/nodelink-info-duties.html) | 「社内情報管理基盤」で検索。 |
| 95 | 潜入後の業務 ｜ 調査ノート | [takase-infiltration-duties.html](../../public/takase-infiltration-duties.html) | 「資料検索基盤」で検索。 |
| 96 | 法人利用管理記録 ｜ 株式会社ノードリンク・ワークス | [nodelink-corporate-usage.html](../../public/nodelink-corporate-usage.html) | 「法人利用管理記録」で検索。 |
| 97 | 調査の停滞 ｜ 調査ノート | [takase-investigation-stall.html](../../public/takase-investigation-stall.html) | 「利用実績照合」または「利用実績照合記録」で検索。No.98への参照。 |
| 98 | Chronect社内連絡記録 ｜ Chronect Hub | [chronect-internal-correspondence.html](../../public/chronect-internal-correspondence.html) | No.97から参照。事後報告は旧高瀬宛てメールの最終返信後のみ。 |
| 99 | 法人機器 保守管理記録 ｜ 株式会社ノードリンク・ワークス | [nodelink-device-maintenance.html](../../public/nodelink-device-maintenance.html) | 「法人機器保守管理」で検索。 |
| 100 | 証拠の発見 ｜ 調査ノート | [takase-evidence-discovery.html](../../public/takase-evidence-discovery.html) | 「機器動作記録」で検索。No.101・102・106〜109への参照。 |
| 101 | 試験運用継続承認記録 ｜ Chronect Hub | [chronect-trial-continuation-approval.html](../../public/chronect-trial-continuation-approval.html) | No.100から参照。個別同意の未取得を認識した継続承認。 |
| 102 | 最終記録 ｜ 調査ノート | [takase-final-investigation-note.html](../../public/takase-final-investigation-note.html) | No.100から参照。救助要請。 |
| 103 | TIME BACKおよびSECOND SHIFTに関する調査報告書 ｜ 調査ノート | [takase-completed-report.html](../../public/takase-completed-report.html) | 相沢から受領後に閲覧。 |
| 104 | 「売られていたのは時間ではなかった」Chronect、人間の身体と技能を無断で商用利用 ｜ Yaboo!ニュース | [yaboo-news-trial-disclosure.html](../../public/yaboo-news-trial-disclosure.html) | No.80で高瀬作成版を提出後に閲覧。 |
| 105 | ENDING「完全な告発」 ｜ TIME BACK | [timeback-ending-full-disclosure.html](../../public/timeback-ending-full-disclosure.html) | No.104を読んで到達。 |
| 106 | TIME BACK・SECOND SHIFT 事業統合計画 ｜ Chronect Hub | [chronect-hub-business-integration-plan.html](../../public/chronect-hub-business-integration-plan.html) | No.100から参照。売却・購入を同じ市場で扱う経済的な目的。 |
| 107 | SECOND SHIFT 業務実績・清算対応記録 ｜ Chronect Hub | [chronect-hub-second-shift-settlement.html](../../public/chronect-hub-second-shift-settlement.html) | No.100から参照。SUB-117の業務実績、法人入金9,600円、売却報酬2,560円。 |
| 108 | 技能モデル生成・適用記録 ｜ Chronect Hub | [chronect-hub-skill-model-record.html](../../public/chronect-hub-skill-model-record.html) | No.100から参照。SM-0142を同一セッションで適用した実績と、取得元への説明・同意の記録。 |
| 109 | SECOND SHIFT 中長期事業戦略 ｜ Chronect Hub | [chronect-hub-second-shift-strategy.html](../../public/chronect-hub-second-shift-strategy.html) | No.100から参照。限定運用と市場拡大計画、記憶隔離の事業評価。 |
| 110 | Behavior Assistance Terminal 製品仕様書 ｜ Chronect Hub | [chronect-hub-bat-spec.html](../../public/chronect-hub-bat-spec.html) | 3つの結末の累積到達と特殊検索で解放。BATの製品概要。 |
| 111 | BAT制御系統図 ｜ Chronect Hub | [chronect-hub-bat-control.html](../../public/chronect-hub-bat-control.html) | No.110から特殊検索。BAPとTIRの入力系統、SCU・BAC・CAU・MMU・SMU。 |
| 112 | MMU — 記憶管理機構 詳細仕様 ｜ Chronect Hub | [chronect-hub-mmu-spec.html](../../public/chronect-hub-mmu-spec.html) | No.111から特殊検索。記憶管理プロファイルと参照境界。 |
| 113 | 機器設定・状態確認記録 ｜ BAT | [bat-device-diagnostics.html](../../public/bat-device-diagnostics.html) | No.84で相沢から受領する診断記録。設定値と安全状態。 |
| 114 | BAT緊急対応マニュアル ｜ Chronect Hub | [chronect-hub-bat-emergency.html](../../public/chronect-hub-bat-emergency.html) | No.112から特殊検索。異常分類と利用者向け緊急復旧の参照。 |
| 115 | 隔離記憶復旧手順書 ｜ Chronect Hub | [chronect-hub-memory-recovery.html](../../public/chronect-hub-memory-recovery.html) | No.114から特殊検索。設定正常化と復旧処理の依存関係。 |
| 116 | 復旧処理結果 ｜ BAT | [bat-recovery-report.html](../../public/bat-recovery-report.html) | 相沢の同意と復旧完了後、No.84で受領。記憶の参照復元と整合性。 |
| 117 | TIME BACK、全サービス停止　元社員が内部資料を公開、経営責任の追及へ ｜ Yaboo!ニュース | [yaboo-news-timeback-suspension.html](../../public/yaboo-news-timeback-suspension.html) | No.84で完成済みNo.83を手動送信し、最後の返信を受けた後に解放。本人による告発とサービス停止。 |
| 118 | ENDING「自分の時間」 ｜ TIME BACK | [timeback-ending-own-time.html](../../public/timeback-ending-own-time.html) | No.117の記事末尾から到達。記憶を取り戻した本人のこれから。 |

直前のNo.1〜42は同番号。セッション運用記録は旧45→現43、旧54〜59は現44〜49。旧43・44はHub要旨、旧46〜53は一覧外ニュースとして登録解除済み。現在も公開ファイルと既存の検索・リンクから閲覧できる。ニュース一覧外12件と対応Hub要旨2件、検索結果4件、旧夢記事URL転送1件はアーカイブ非登録。

## 3. 実装済み機能・導線

- 4サイトで独立した完全一致検索。前後空白除去と英字大小の比較は行うが、部分一致・全文検索・自動類義語検索はしない。個人向け12、Business12、Chronect24は不変。Hubは27資料。第5章の管理資料、売買処理の検証資料、試験施設管理情報と連続業務の実施記録、試験対象者の訪問履歴・対応表を含む。項目数と登録語数は別。
- 主要な記録枝は20→41→Hub検索EX→43。管理コード `TB-260917-4826` が同一売却セッションの本人通過実績へつながる。会員IDや処理番号では出ない。
- 写真枝は16→26→28→実証プログラム検索→34→「明浜商店街振興会」検索→36。地図と清掃写真で公園の像を照合する。屋内エリア35は別施設。
- ニュース一覧の研究記事と対応するHub要旨は20→41、23→42。時間選択・注意配分の要旨と各発表記事はアーカイブ非登録で、相互リンクは利用できる。17のプロジェクト紹介から提携一覧37へ通常リンクがある。
- 43からアクセス案内34への直リンクは削除済み。記録枝と写真枝の独立を維持し、比較を強制するロックは設けていない。
- localStorageの訪問済みアーカイブ、旧URL・旧番号の移行、再訪、未訪問「？？？」表示、共通の白・グレーのアーカイブUIを保持。保存キーは `timeback-page-archive-v1`。
- 画像拡大、フィクション表記、GAタグ、ダミー問い合わせ、架空のアプリ画面を実装。取引・決済・本物の認証・実送信はない。

## 4. 第5・6回初見テストで確認された範囲

参照できたのは開発側の [2026-10-29 UX調整記録](../agent_runs/2026-10-29-ux-refinement/README.md) の要約。「初見ログを直接精査した結果」ではない。今回、ARG-Playtesterにはアクセスしていない。

| 回 | 開発側記録にある観測 | 判定上の限界 |
|---|---|---|
| 第5回 | 旧直リンクから写真まで到達したという記録 | 現行の独立二枝を自発的に発見・照合できた証明にはならない |
| 第6回 | 独立二枝版で本人移動まで到達し、操作上限で停止したという記録 | 全体完走・中盤以降の成功・全プレイヤーでの理解を意味しない。到達過程や理解の精度は一次ログ未確認 |

一次の操作ログ・最終レビュー本文、実施条件・正確な所要時間・操作数・逐語の理解内容は、今回の参照範囲では確認できていない。要約にない採点・成功率・停止理由の詳細を作らない。

これらを受けた作者判断と、その後の現行状態は以下。

| 判断・対応 | 現在の扱い |
|---|---|
| 明細の拡大案内を追加する案 | 却下。小さく溶け込んだコードを自分で発見する体験を維持 |
| 検索結果がサイトで異なることの一般説明 | 一度4EXに追加したが同日撤回。導入noteへ作者が記載する方針。ARG内の説明文は現在削除済み、noteの実編集・公開は未確認 |
| 読む負担への対応 | ニュース一覧を18→12、その後2026-10-30に6件へ整理。記事本体・検索・番号は保持 |
| 補助文字の可読性 | 対象8画面に `reading-support.css` を適用。Chronectへの到達導線、明細、独立二枝は維持 |

第5・6回は、後続のUX調整や10月30日の改番・ニュース6件化をテストした記録ではない。これら最新変更の独立初見への効果、人間・実機スマホでの判読性は未確認。開発者のブラウザ検証や専門担当の評価点を初見成功と数えない。

## 5. 開発検証と未実装

【既存の移行記録で確認】2026-10-30ローカル移行時、回帰テスト6本がPASS。Chromeで62HTML×幅1440/390pxの124表示、画像・JS・HTTPエラー・横溢れ、検索、旧夢URL転送、旧保存移行を確認した。これは開発検証であり初見探索ではない。10月30日の共有資料初回作成時には表示テストを再実行していない。11月2日の今回は7チェックと34・44・58の4幅計12表示、検索・保存・再訪を開発検証した。詳細と限界は[最新監査](../10-audit-and-sources.md)を参照し、初見成功とは扱わない。

【当時の未実装候補・制作履歴】内部C/B/A資料、原案の階層・特殊検索、失踪記事、高瀬メモ、対象者名簿・プロフィール、潜入先の本人特定情報・社員番号隠しページ、告発入力、所在回答・証拠判定、4つの結末。反転後の具体的な証拠・人物への接続も当時は未確定。第三者報道サイトとChronectの企業ニュースは別。現行の実装状況は冒頭を参照。旧72時間セッションの詳細記録は完全不採用。

## 6. 次の制作優先順位

以下は既存のbacklog・未確定事項を整理した「提案」であり、作者が確定した制作順・着手許可ではない。

1. 第5・6回の一次ログや管理者レビューが渡されたら、観測の範囲と版を確認する。未入手部分を推測で埋めない。最新UX・改番後の再テストは専用環境管理側で判断する。
2. 承認されたBAS進化の方向に沿い、既存11（BAS）、15（研究開発）、2（体験談）、関連ニュース・Hub要旨の比較から、次の公開情報・文案・検索経路を作者と検討する。現行の能力の幅と経時的改善を区別し、秘密成果の個別対応を推測で追加しない。個別改修は別途承認後。
3. 独立初見プレイ、スマートフォン実機確認と公開準備を進める。 [未確定事項の正本](../08-open-questions.md)
4. 提携一覧5社中2社だけリンクする現況と、具体的な実名導入事例にする方針との差（R-01）を、必要な範囲で作者へ確認する。
5. 旧公開素材の扱い（R-03）、実機表示・本番配信範囲等を別途確認する。旧画像を未使用と判断して無断削除しない。

## 7. 履歴資料との食い違い

- docs/03や05の本文、docs/06、planningには旧47/48/49/50等の番号が残る。現行は睡眠ニュース20・Hub40・要旨41・記録45、提携企業38/39。旧番号だけを新規制作の根拠にしない。
- docs/01の「管理コードは将来の候補」、docs/03・05・06の「初見未検証」「次は初見」と、後日の第5・6回の限定観測は記録時点が異なる。Hubとコード検索は実装済みだが、すべての初見課題が解決したとは扱わない。
- docs/07・09のHub「2資料」、アーカイブ「54HTML」等は以前の状態。2026-11-06時点はHub11検索資料・番号付き49ページ・容量120。最新の04・09と現行ファイルを優先する。
- 4EXの検索差説明文は、初回の固定仕様・監査記録だけを見ると追加済みに見える。同日撤回の追記と現行の削除状態を採用する。
- 原案や旧図の屋外実証エリア・施設名・近道の説明を復活させない。現在は屋内施設35、地域清掃36、公開案内図 `images/map.png`。

## 主要参照元

- [ページ一覧](../04-page-inventory.md)、[固定order.json](../agent_runs/2026-10-30-archive-order/order.json)、[構成・進捗](../03-story-and-progress.md)
- [謎・導線](../05-puzzles-and-routes.md)、[backlog](../06-backlog.md)、[未確定事項](../08-open-questions.md)、[検索一覧](../09-search-and-links.md)
- [第5・6回後UX記録](../agent_runs/2026-10-29-ux-refinement/README.md)、[ニュース6件化](../agent_runs/2026-10-30-news-six.md)、[監査・履歴](../10-audit-and-sources.md)
- [ローカル移行記録](../LOCAL_MIGRATION_2026-10-30.md)
- 実装照合：`public/`のHTML一覧、ニュース一覧、4検索DB、上記固定order。今回は既存サイトを編集していない。

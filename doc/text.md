# せつめい

## 目標

天気予報を出す簡単な Web アプリを作ってみる．仕様は以下の通り．

-   表示する都道府県は山梨・長野・岐阜・静岡・愛知
-   天気予報情報は文章で表示
-   情報は気象庁から取得
-   都道府県の切り替えはボタンで行う．

<style>
    .foot {
        background-color: #eee;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 5pt 10pt;
        width: calc(100% - 20pt);
        margin: 10pt 0 0 0;
    }
    .left_link {
        grid-column: 1 / 2;
        text-align: left;;
    }
    .mid_link {
        grid-column: 2 / 3;
        text-align: center;
    }
    .right_link {
        grid-column: 3 / 4;
        text-align: right;
    }
</style>

<footer class="foot">
<a class="mid_link">説明トップ</a>
<a class="right_link">実装→</a>
</footer>

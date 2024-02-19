### 変数の表示

TypeScript の変数は以下のようにして宣言する．

```
let [変数名]: [型名] = [初期値];
```

実際に変数を組み込んでみる．
ページ上に変数の中身を表示するときは，変数名を{}で囲む．

```TypeScript
export default function Home() {
    let neko: String = "nyanyanya";
    return (
        <div>
            <p>{neko}</p>
        </div>
    );
}
```

配列を使うときは以下のようにする．

```TypeScript
export default function Home() {
    const area: String[] = ["山梨県", "長野県", "岐阜県", "静岡県", "愛知県"];
    return (
        <div>
            <p>{area[3]}</p>
        </div>
    );
}
```

##
[実装トップ](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/0_implement.md)

[前へ：1-3. ページ編集](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/1_basic/3_pageEdit.md)

[次へ：1-5. ボタンの追加](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/1_basic/5_button.md)

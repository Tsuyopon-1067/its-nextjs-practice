### ボタンの追加

button タグを追加すると画面上にボタンが増える．

```
<div>
    <p>{area[3]}</p>
    <button>+</button>
    <button>-</button>
</div>
```

### ボタンへの命令割り当て

-   インデックスの変数化

```
let idx: number = 0;
︙
<div>
    <p>{area[idx]}</p>
```

-   アロー関数

アロー関数の形式は以下の通り．
今回は inc と dec の 2 つを作成する．

```
    const 関数名 = (引数とか) => {
        処理
    }
```

これをコードに組み込む．先頭に use client を加えることを忘れずに．これは Next.js の仕様上必要．

```
"use client";

export default function Home() {
    const area: String[] = ["山梨県", "長野県", "岐阜県", "静岡県", "愛知県"];
    let idx: number = 0;
    const inc = () => {
        idx = (idx + 1) % area.length;
    };
    const dec = () => {
        idx = (idx + area.length - 1) % area.length;
    };

    return (
        <div>
            <p>{area[idx]}</p>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div>
    );
}
```

なお，現時点では正しく動かない．具体的には，ボタンを押しても変更が反映されない．これについての対処は後述．

##
[実装トップ](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/0_implement.md)

[前へ：1-4. 変数の表示](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/1_basic/4_displayVariable.md)

[次へ：1-6. UseState の導入](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/1_basic/6_useState.md)
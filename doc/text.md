# せつめい

## 目標

天気予報を出す簡単な Web アプリを作ってみる．

## 実装

### 雛形作成

以下のコマンドを実行．

```
npx create-next-app@latest
```

create-next-app を実行した後いくつか質問される．
以下のように答える．

```
% npx create-next-app@latest
Need to install the following packages:
create-next-app@14.1.0
Ok to proceed? (y)  [1. y]
✔ What is your project named? … next-practice [2. next-practice (お好みで好きな名前を)]
✔ Would you like to use TypeScript? … No / Yes  [3. Yes]
✔ Would you like to use ESLint? … No / Yes  [4. Yes]
✔ Would you like to use Tailwind CSS? … No / Yes  [5. No]
✔ Would you like to use `src/` directory? … No / Yes  [6. Yes]
✔ Would you like to use App Router? (recommended) … No / Yes  [7. Yes]
✔ Would you like to customize the default import alias (@/*)? … No / Yes  [8. Yes]
✔ What import alias would you like configured? … @/*  [9. @/* (デフォで入力済み)]
Creating a new Next.js app in /Users/tsuyopon/gitFiles/its-nextjs-practice/next-practice.
```

tree コマンドで生成したファイルを確認． -L オプションで階層を指定することができる．3 以上 or 無指定だとファイルが多くなりすぎて見にくくなる．

```
% tree -L 2
.
├── README.md
├── doc
│   └── text.md
└── next-practice
    ├── README.md
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── src
    └── tsconfig.json
```

### 起動

Next.js のプロジェクトディレクトリに入る．cd の続きは create-next-app のときに What is your project named?で決めた名前を入れる．

```
% cd next-practice
```

以下のコマンドで起動．

```
% npm run dev
```

こんな出力が出るはず．

```
% npm run dev

> next-practice@0.1.0 dev
> next dev

   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000

 ✓ Ready in 3.9s
```

この部分は大事．大体の場合 3000 になるはず．違う場合は今後の文章で URL を読み替える．

```
   - Local:        http://localhost:3000
```

ブラウザで Localhost にアクセスする．すると Web ページっぽい画面が表示される．

```
http://localhost:3000
```

### ページ編集

ctrl+z で `npm run dev` を一度終了させる．このとき next-practice ディレクトリにいるはずなので，以下のコマンドを実行すれば Next.js のプロジェクトフォルダを VsCode で開くことができる．

```
code .
```

開けたら再び `npm run dev` をする．ミスっていなければ ↑ キーを 2 回押せば出てくる．

```
% npm run dev
```

ここから先で出てくる「@/」は 「ほげほげ/next-practice/」を表す．

@/src/app/page.tsx を開く．

```
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>

      [この後いろいろ]
```

この長いやつを一気に削除．ここまで消してしまう．

```
export default function Home() {
  return (
    <main className={styles.main}>
    </main>
  );
}
```

src/app/layout.tsx を開く．最初の方はこんなコードになっている．globals.css の import を削除する．するとページの装飾が消える．

```
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
```

main タグ部分を消して div に変える．そしてこんな感じで中身を追加．ページがテキストだけになる．

```
export default function Home() {
    return (
        <div>
            <h1>タイトル</h1>
            <h2>サブタイトル1</h2>
            <p>ないよういろいろ</p>
            <h2>サブタイトル2</h2>
            <p>ないよういろいろ</p>
        </div>
    );
}
```

div の中身を消して hogehoge に変えれば当然 hogehoge になる．

```
export default function Home() {
    return (
        <div>
            hogehoge
        </div>
    );
}
```

### 変数の表示

TypeScript の変数は以下のようにして宣言する．

```
let [変数名]: [型名] = [初期値];
```

実際に変数を組み込んでみる．
ページ上に変数の中身を表示するときは，変数名を{}で囲む．

```
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

```
export default function Home() {
    const area: String[] = ["山梨県", "長野県", "岐阜県", "静岡県", "愛知県"];
    return (
        <div>
            <p>{area[3]}</p>
        </div>
    );
}
```

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

### UseState の導入

今のプログラムではボタンを押しても変更が反映されない理由は，変数 `idx` の変更が React に伝えられないため．変更が React に伝えられていない場合，画面が書き換わらないため，見かけ上は何も起こっていないように見える．一応内部的には変数が書きかけられている．それは `console.log` を使って変数の中身を出力すればわかる．出力内容はブラウザの開発者機能から確認できる．

```
const inc = () => {
    idx = (idx + 1) % area.length;
    console.log(idx);
};
const dec = () => {
    idx = (idx + area.length - 1) % area.length;
    console.log(idx);
};
```

では，変数の書き換えを React に伝えるためにはどうするのか．このときに `UseState` を使う．

`idx` の宣言は以下のように書き換える．

```
const [idx, setIdx] = useState<number>(0);
```

`idx` の更新部分は以下のように書き換える．

```
const inc = () => {
    setIdx((idx + 1) % area.length);
};
const dec = () => {
    setIdx((idx + area.length - 1) % area.length);
};
```

コード全体は以下のようになる．`UseState` の import は VsCode であれば自動で入るはずだが，入っていない場合は手動で追加する．

```
"use client";

import { useState } from "react";

export default function Home() {
    const area: String[] = ["山梨県", "長野県", "岐阜県", "静岡県", "愛知県"];
    const [idx, setIdx] = useState<number>(0);
    const inc = () => {
        setIdx((idx + 1) % area.length);
    };
    const dec = () => {
        setIdx((idx + area.length - 1) % area.length);
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

これでボタンを押すと画面表示が切り替わる．

## 外部サーバへのアクセス

気象庁のサイト

```
https://www.jma.go.jp/bosai/forecast/data/overview_forecast/220000.json
```

から JSON を取得してみる．このときは以下のコードを使う．

```
useEffect(() => {
    const apiUrl = "https://www.jma.go.jp/bosai/forecast/data/overview_forecast/220000.json";
    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    fetchData();
}, []);
```

新たに `UseEffect` という概念が登場した．`UseEffect` の文法は以下の通り．副作用は実行する処理のこと．今回は気象庁のサーバから JSON を取得して変数 `data` に格納する処理．管理される値の配列が更新された時，副作用が実行される．

```
useEffect(副作用, [管理する値の配列]);
```

取得される JSON は以下のような形式になっている．これはブラウザから JSON 取得 URL にアクセスすることでも確認できる．

```
{
    publishingOffice
    reportDatetime
    targetArea
    headlineText
    text
}
```

今回は text を取得する．そのため，以下のようにして text を取り出す．

```
<div>
    <p>{area[idx]}</p>
    <p>{data.text}</p>
    <button onClick={inc}>+</button>
    <button onClick={dec}>-</button>
</div>
```

このままだとページ読み込み後にエラーが出ることがある．これは気象庁か JSON を取得していないときに `data.txt` を表示しようとしたため．そこで，data が `null` ではないときだけに表示するように処理を変える必要がある．それは以下のように書けば実現できる．

```
<p>{data && data.text}</p>
```

これはショートサーキット評価を利用している．ブール演算で，

```
a && b
```

を評価する時，`a=false`だったときは`b`を評価する必要がないため，無視される．今回は`data`が null だったときは`false`扱いで`data.text`が無視され，エラーが起きなくなる．

コード全体は以下のようになる．

```
"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const area: String[] = ["山梨県", "長野県", "岐阜県", "静岡県", "愛知県"];
    const [idx, setIdx] = useState<number>(0);
    const inc = () => {
        setIdx((idx + 1) % area.length);
    };
    const dec = () => {
        setIdx((idx + area.length - 1) % area.length);
    };

    const [data, setData] = useState(null);

    useEffect(() => {
        const apiUrl =
            "https://www.jma.go.jp/bosai/forecast/data/overview_forecast/220000.json";
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <p>{area[idx]}</p>
            <p>{data && data.text}</p>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div>
    );
}
```

これで静岡県の天気情報が文章で表示される．一応動作するが，エディタ上では

```
data.text
```

の部分で警告が出る．これは`data`に`text`プロパティがあることが保証されないため．プロパティの存在は TypeScript のコンパイラに正しく伝える必要がある．

受け取る JSON の形式は`interface`で定義する．

```
interface ForcastData {
    publishingOffice: string;
    reportDatetime: string;
    targetArea: string;
    headlineText: string;
    text: string;
}
```

そして，`data` の初期化部分で `data` は `ForcastData` 型であることを定義する．

```
const [data, setData] = useState<ForcastData>();
```

これで警告は消える．

コード全体は以下のようになる．

```
"use client";

import { useEffect, useState } from "react";

interface ForcastData {
    publishingOffice: string;
    reportDatetime: string;
    targetArea: string;
    headlineText: string;
    text: string;
}

export default function Home() {
    const area: String[] = ["山梨県", "長野県", "岐阜県", "静岡県", "愛知県"];
    const [idx, setIdx] = useState<number>(0);
    const inc = () => {
        setIdx((idx + 1) % area.length);
    };
    const dec = () => {
        setIdx((idx + area.length - 1) % area.length);
    };

    const [data, setData] = useState<ForcastData>();

    useEffect(() => {
        const apiUrl =
            "https://www.jma.go.jp/bosai/forecast/data/overview_forecast/220000.json";
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <p>{area[idx]}</p>
            <p>{data && data.text}</p>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div>
    );
}
```

## 他の都道府県の表示

現時点では静岡県の天気予報情報しか表示されない．そこで，先にボタンで選べるようにした都道府県に応じて表示する天気予報を変えてみる．そのために地域のコードを把握しておく．ボタンで表示させた都道府県のコードは以下の通り．

| idx | 都道府県 | コード |
| --- | -------- | ------ |
| 0   | 山梨県   | 190000 |
| 1   | 長野県   | 200000 |
| 2   | 岐阜県   | 210000 |
| 3   | 静岡県   | 220000 |
| 4   | 愛知県   | 230000 |

これに応じて URL を作り出す．選択されている都道府県は`idx`から取得可能である．そこで，新たに配列 `code` を定義する．

```
const code: String[] = ["190000", "200000", "210000", "220000", "230000"];
```

これを使って URL を生成する．

```
const apiUrl = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${code[idx]}.json`;
```

これにより，表示する都道府県を変更したときに URL が変更される．しかし，このままでは表示される天気情報は更新されない．原因は UseEffect 部分．UseEffect の文法を再掲する．

```
useEffect(副作用, [管理する値の配列]);
```

UseEffect は管理される値の配列の更新により，副作用が実行される．まだ管理される値の配列が空であるため，ページ読み込み時にしか副作用は実行されない．そのため，いくら都道府県を変更しても副作用は実行されず，表示される天気情報が更新されない．

そこで，管理する値として，`idx`を入れる．表示する都道府県を変更するときには`idx`が変更されるため，`idx`を監視しておけば都道府県の変更を検知できる．

```
useEffect(() => {
    const apiUrl = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${code[idx]}.json`;
    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    fetchData();
}, [idx]);
```

コード全体は以下のようになる．

```
"use client";

import { useEffect, useState } from "react";

interface ForcastData {
    publishingOffice: string;
    reportDatetime: string;
    targetArea: string;
    headlineText: string;
    text: string;
}

export default function Home() {
    const area: String[] = ["山梨県", "長野県", "岐阜県", "静岡県", "愛知県"];
    const code: String[] = ["190000", "200000", "210000", "220000", "230000"];
    const [idx, setIdx] = useState<number>(0);
    const inc = () => {
        setIdx((idx + 1) % area.length);
    };
    const dec = () => {
        setIdx((idx + area.length - 1) % area.length);
    };

    const [data, setData] = useState<ForcastData>();

    useEffect(() => {
        const apiUrl = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${code[idx]}.json`;
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [idx]);

    return (
        <div>
            <p>{area[idx]}</p>
            <p>{data && data.text}</p>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div>
    );
}
```

これで都道府県を切り替えたときに表示される天気情報も更新されるようになった．一応基本機能は完成．

### 外部サーバへのアクセス

気象庁のサイト

```
https://www.jma.go.jp/bosai/forecast/data/overview_forecast/220000.json
```

から JSON を取得してみる．このときは以下のコードを使う．

```TypeScript
const [data, setData] = useState(null);

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

```TypeScript
useEffect(副作用, [管理する値の配列]);
```

取得される JSON は以下のような形式になっている．これはブラウザから JSON 取得 URL にアクセスすることでも確認できる．

```TypeScript
{
    publishingOffice
    reportDatetime
    targetArea
    headlineText
    text
}
```

今回は text を取得する．そのため，以下のようにして text を取り出す．

```TypeScript
<div>
    <p>{area[idx]}</p>
    <p>{data.text}</p>
    <button onClick={dec}>-</button>
    <button onClick={inc}>+</button>
</div>
```

このままだとページ読み込み後にエラーが出ることがある．これは気象庁か JSON を取得していないときに `data.txt` を表示しようとしたため．そこで，data が `null` ではないときだけに表示するように処理を変える必要がある．それは以下のように書けば実現できる．

```HTML
<p>{data && data.text}</p>
```

これはショートサーキット評価を利用している．ブール演算で，

```TypeScript
a && b
```

を評価する時，`a=false`だったときは`b`を評価する必要がないため，無視される．今回は`data`が null だったときは`false`扱いで`data.text`が無視され，エラーが起きなくなる．

コード全体は以下のようになる．

```TypeScript
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

```TypeScript
data.text
```

の部分で警告が出る．これは`data`に`text`プロパティがあることが保証されないため．プロパティの存在は TypeScript のコンパイラに正しく伝える必要がある．

受け取る JSON の形式は`interface`で定義する．

```TypeScript
interface ForecastData {
    publishingOffice: string;
    reportDatetime: string;
    targetArea: string;
    headlineText: string;
    text: string;
}
```

そして，`data` の初期化部分で `data` は `ForecastData` 型であることを定義する．

```TypeScript
const [data, setData] = useState<ForecastData>();
```

これで警告は消える．

コード全体は以下のようになる．

```TypeScript
"use client";

import { useEffect, useState } from "react";

interface Forecast {
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

    const [data, setData] = useState<ForecastData>();

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

##
[実装トップ](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/0_implement.md)

[前へ：1-6. UseState の導入](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/1_basic/6_useState.md)

[次へ：1-8. 他の都道府県の表示](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/1_basic/8_otherProvince.md)

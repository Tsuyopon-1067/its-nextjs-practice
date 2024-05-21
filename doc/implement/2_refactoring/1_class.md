### 都道府県データのクラス化

これまで基本的な機能を実装してきたが，実装が適当なのでそれを直していく．

まずは都道府県情報を整理する．今までは，都道府県名と地域コードを別々の配列に格納していたが，これらをひとまとめにするクラスを作成する．Province.ts を以下の場所に作成する．

```
├── src
│   └── app
│       ├── Province.ts ←これ
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.module.css
│       └── page.tsx
```

クラスは以下のように実装する．

```
export default class Province {
    name: string;
    code: string;

    constructor(name: string, code: string) {
        this.name = name;
        this.code = code;
    }
}
```

Page.tsx に戻る．`area`と`code`は以下のようにまとめられる．

``` TypeScript
const provinces: Province[] = [
    new Province("山梨県", "190000"),
    new Province("長野県", "200000"),
    new Province("岐阜県", "210000"),
    new Province("静岡県", "220000"),
    new Province("愛知県", "230000"),
];
```

`Province`の import が自動で行われなかった場合は以下のように追記．

```TypeScript
import Province from "./Province";
```

`area`・`code` だった部分を修正すると，コード全体は以下のようになる．

``` TypeScript
"use client";

import { useEffect, useState } from "react";
import Province from "./Province";

interface ForecastData {
    publishingOffice: string;
    reportDatetime: string;
    targetArea: string;
    headlineText: string;
    text: string;
}

export default function Home() {
    const provinces: Province[] = [
        new Province("山梨県", "190000"),
        new Province("長野県", "200000"),
        new Province("岐阜県", "210000"),
        new Province("静岡県", "220000"),
        new Province("愛知県", "230000"),
    ];
    const [idx, setIdx] = useState<number>(0);
    const inc = () => {
        setIdx((idx + 1) % provinces.length);
    };
    const dec = () => {
        setIdx((idx + provinces.length - 1) % provinces.length);
    };

    const [data, setData] = useState<ForecastData>();

    useEffect(() => {
        const apiUrl = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${provinces[idx].code}.json`;
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
            <p>{provinces[idx].name}</p>
            <p>{data && data.text}</p>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div>
    );
}
```

##
[実装トップ](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/0_implement.md)

[前へ：1-8. 他の都道府県の表示](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/1_basic/8_otherProvince.md)

[次へ：2-2. コンポーネントの導入](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/2_refactoring/2_component.md)
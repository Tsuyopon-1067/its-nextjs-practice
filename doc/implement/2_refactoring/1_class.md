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

interface ForcastData {
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

    const [data, setData] = useState<ForcastData>();

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

`Page.tsx`の変更に合わせて，`ProvinceSelectButton.tsx`も修正する必要がある．両者は下図のようにデータをやり取りする．図のように3つのデータ・関数をProvinceSelectButton.tsxを渡す．それぞれの詳細は以下の通り．
- length={provinces.length}
    選択できる都道府県の数．`ProvinceSelectButton`内で配列のインデックスを操作するとき，ループ部分（for文のような繰り返しのことではない）で必要．
- setIdx={setIdx}
    ボタン操作により選択されている都道府県を更新する．このとき，setIdxを呼び出してindexの値を変更する．
- idx={idx}
    ボタン操作で配列のインデックスを操作するとき現在番号を使って操作後の状態を計算するため必要．

![](./2_1_component.svg)


コンポーネントへのデータ受け渡しのとき，受け渡される要素をあらかじめ定義しておく．定義には`interface`を使う．`Props`は`interface`の名前．線数名と同じ感覚．

``` TypeScript
interface Props {
    length: number;
    setIdx: (idx: number) => void;
    idx: number;
}
```

関数の定義では引数部分に`interface`に応じた内容を記述する．
``` TypeScript
export default function ProvinceSelectButton(ここに書く) {
```
``` TypeScript
export default function ProvinceSelectButton({ length, setIdx, idx }: Props) {
```
引数部分にはオブジェクト形式で記述する．
```
{要素1, 要素2, 要素3, ...}: interface名
```

変更後の`ProvinceSelectButton.tsx`のコード全体は次のようになる．

``` TypeScript
"use client";

import { useEffect, useState } from "react";
import Province from "./Province";

interface Props {
    length: number;
    setIdx: (idx: number) => void;
    idx: number;
}

export default function ProvinceSelectButton({ length, setIdx, idx }: Props) {
    const inc = () => {
        setIdx((idx + 1) % length);
    };
    const dec = () => {
        setIdx((idx + length - 1) % length);
    };

    return (
        <div>
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
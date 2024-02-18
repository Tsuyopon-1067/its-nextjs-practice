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

##
[実装トップ](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/0_implement.md)

[前へ：1-7. 外部サーバへのアクセス](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/1_basic/7_api.md)

[次へ：2-1. 都道府県データのクラス化](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/2_refactoring/1_class.md)
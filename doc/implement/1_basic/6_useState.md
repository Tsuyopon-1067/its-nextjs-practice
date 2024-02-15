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

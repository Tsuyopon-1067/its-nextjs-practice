### ページ編集

ctrl+c で `npm run dev` を一度終了させる．このとき next-practice ディレクトリにいるはずなので，以下のコマンドを実行すれば Next.js のプロジェクトフォルダを VsCode で開くことができる．

```
code .
```

開けたら再び `npm run dev` をする．ミスっていなければ ↑ キーを 2 回押せば出てくる．

```
% npm run dev
```

ここから先で出てくる「@/」は 「ほげほげ/next-practice/」を表す．

@/src/app/page.tsx を開く．

```TypeScript
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>

      [この後いろいろ]
```

この長いやつを一気に削除．ここまで消してしまう．

```TypeScript
export default function Home() {
  return (
    <main className={styles.main}>
    </main>
  );
}
```

src/app/layout.tsx を開く．最初の方はこんなコードになっている．globals.css の import を削除する．するとページの装飾が消える．

```TypeScript
import type { Metadata } from "next"; // 残す
import { Inter } from "next/font/google"; // 残す
import "./globals.css"; // 消す
```

main タグ部分を消して div に変える．そしてこんな感じで中身を追加．ページがテキストだけになる．

```TypeScript
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

```TypeScript
export default function Home() {
    return (
        <div>
            hogehoge
        </div>
    );
}
```

##
[実装トップ](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/0_implement.md)

[前へ：1-2. 起動](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/2_refactoring/2_component.md)

[次へ：1-4. 変数の表示](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/1_basic/4_displayVariable.md)
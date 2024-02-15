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

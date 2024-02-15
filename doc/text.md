# せつめい

## 雛形作成

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

## 起動

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

ブラウザで Localhost にアクセスする．すると Web ッページっぽい画面が表示される．

```
http://localhost:3000
```

## ページ編集

ctrl+z で npm run dev を一度終了させる．このとき next-practice ディレクトリにいるはずなので，以下のコマンドを実行すれば Next.js のプロジェクトフォルダを VsCode で開くことができる．

```
code .
```

開けたら再び npm run dev をする．ミスって無ければ ↑ キーを 2 回押せば出てくる．

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

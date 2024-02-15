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

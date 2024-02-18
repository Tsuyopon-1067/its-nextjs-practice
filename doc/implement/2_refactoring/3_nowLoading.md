### NowLoading を作ってみる

天気情報を取得する時，変数`data`が空のときに`text`を表示しようとするとエラーがおきた．このとき，`data`が空のときは`text`を表示する処理を無視して解決していた．ここでは，`data`が空のときは NowLoading という文字列が表示されるようにする．

結論はとても単純．この部分を

```
<p>{data && data.text}</p>
```

このように書き換えるだけ．

```
<p>{data ? data.text : "Now Loading"}</p>
```

仕組みを理解するためには三項演算子について理解する必要がある．
三項演算子の文法は以下の通り．

```
条件 ? 条件がtrueのときの値 : 条件がfalseのときの値
```

if 文による代入は三項演算子で書き換えることができる．これは

```
const num = 3;
let hoge;
if (num === 3) {
    hoge = 1;
} else {
    hoge = 0;
}

hoge = num === 3 ? 1 : 0;
```

以下と同じ処理である．

```
const num = 3;
let hoge = num === 3 ? 1 : 0;
```

条件部分を()で囲むとわかりやすい．

```
const num = 3;
let hoge = (num === 3) ? 1 : 0;
```

なお，比較演算子として`==`ではなく`===`を使用している理由は，厳密な比較をするため．TypeScript（JavaScript）では`===`がオペランド同士が型を変換することなく厳密に等しいときに `true` になる．

`==`を使っていると，このような文だと`3 == "3"`が`true`判定になり，yes が表示される．

```
<p>{3 == "3" ? "yes" : "no"}</p>
```

話を戻すと，三項演算子により，

```
<p>{data ? data.text : "Now Loading"}</p>
```

は，`data`が空ではない（`true`）のとき，`data.txt`を，`data`が空（`false`）のとき，"NowLoading"を出力しているという意味になる．

##
[実装トップ](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/0_implement.md)

[前へ：2-2. コンポーネントの導入](https://github.com/Tsuyopon-1067/its-nextjs-practice/blob/main/doc/implement/2_refactoring/2_component.md)
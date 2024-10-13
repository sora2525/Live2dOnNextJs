# Next.js に Live2D Cubism SDK for Web の公式デモアプリを表示させるサンプル

## ビルド

```bash
cd livd2d-on-nextjs
npm i
npm run build
```

## 起動
```bash
npm run dev
```

[http://localhost:3000/live2d](http://localhost:3000/live2d) にLive2Dのモデルを表示するデモアプリが表示されます。

## 大まかな構成

### src/app/live2d

ルーティング

### src/componets/live2d

live2d を表示させるためのコンポーネント。live2dのメソッドを呼び出しを行う。

### src/lid/live2d

Live2D Cubism SDK for Web の公式のソースをベースに配置。

`framework` はなるべくそのままにしたかったが、公式の環境との違いで一部ビルドエラーが発生するため、`cubismjsonextension.ts` のみ少し修正。

`core` のクラス、インターフェースファイルはそのまま。

`demo` は `lappdefine.ts` は実行環境に合わせて設定を少し修正、`lappglmanager.ts` は  `document.createElement()` のキャンバスではなく、Reactコンポーネント側で用意したキャンバスを使用できるよう少し修正。

## public/live2d

公式の js ファイルと `Resources` フォルダを配置。

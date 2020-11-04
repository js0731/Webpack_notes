### 基本介紹

在webpack中有一個入口文件，通過入口文件告訴webpack從哪裡開始，並根據依賴關係確認需要打包的內容，最後通過出口文件把文件打包出來。

中間的過程要經過一些處理，比如說loader在webpack中將所有的資源視為模塊，但是webpack只認識js為結尾的文件，那其他的不是js文件怎麼處理呢?他會通過loader對這些元件的程式碼進行轉換。

loader只能針對某些特定類型的文件進行轉換，而plugin的功能會更強大一些，plugin用來解決loader無法解決的其他問題，也就是說loader是預處理文件，plugin能對我們loader處理完的文件進行二次的優化處理，比如說他可以對我們的程式碼進行壓縮減少體積。

### 使用webpack

`npm init` 初始化

`npm i webpack --save-dev` 安裝webpack 
`npm i webpack-cli --save-dev` 安裝webpack 命令行工具

在webpack他會有個默認的配置也就是在項目的根目錄下尋找webpack.config.js的配置文件，在這個文件中他會配置打包位置與流程，以下是基本配置 :

`touch webpack.config.js` 在根目錄下新增webpack設定檔

```
const path = require('path');

module.exports = {
	mode : "development",  // 兩種模式選擇 production(壓縮後要拿來上線的程式碼)、development(在開發的模式下，不會壓縮的版本，速度上會稍微快些因為沒有壓縮的動作)
	entry : "./hello.js",  // 配置入口文件(也就是從哪個位置開始打包)
	output : {
		filename : "bundle.js",  // 配置出口文件(打包完成後的檔案名稱默認是main.js)
		path : path.resolve(__dirname, "dist")  // 打包後存放位置的路徑		
	}  
}
```

在 package.json 加入 npm 指令

```
"script":{
	"build" : "webpack"
}
```

`touch hello.js` 在根目錄下新增測試打包的js檔

```
// hello.js

console.log('hello')
```

最後輸入 `npm run build` 就可以把入口文件的 js 檔打包，隨後自動產生出一個 dist 資料夾，裡面會有 bundle.js 打包後的檔案。



### 使用 file-loader 打包圖片

`npm i file-loader --save-dev`

```
const path = require('path');

module.exports = {
	mode : "development", 
	entry : ./hello.js"", 
	output : {
		filename : "bundle.js", 
		path : path.resolve(__dirname, "dist") 
	},
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
	module: { // 配置loader
		rules: [
			{
				test: /\.png$/, // 匹配與什麼什麼為結尾的文件
				use: {
					loader:  'file-loader'  // 引入 loader
				}
			},
			{
				test: /\.jpg$/, // 匹配與什麼什麼為結尾的文件
				use: {
					loader:  'file-loader'  // 引入 loader
				}
			}
		]
	}
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
}

```

加入 `png` `jpg` 檔後，引入到 `hello.js`，在進行`npm run build`測試。 

### 使用 url-loader 打包圖片限制大小

`npm i url-loader --save-dev`

```
const  path = require('path');

module.exports = {
	mode:  "development",
	entry:  "./hello.js"",
	output: {
		filename:  "bundle.js",
		path:  path.resolve(__dirname, "dist")
	},
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
	module: { // 配置loader
		rules: [
			{
				test: /\.png$/, // 匹配與什麼什麼為結尾的文件
				use: {
					loader:  'url-loader', // 引入 loader
					options: {
						outputPath:  'images/', // 圖片打包後的路徑位置
						name:  '[name]_[hash].[ext]', // 讓圖片重新命名，[name] 是原來圖片的名子，再拚上哈希值，跟格式檔
						limit:  10240  // 當圖片大小小於這個限制時，他會把圖片打包成base64在程式碼中，當圖片大小大於這個限制時，他會打包成一個單獨的圖片檔，所以平時用的話是需要用這個url-loader，如果圖片大小就1k2k，那就沒必要因為這張圖片再發一個http請求，直接可以打包到你的程式碼中，但如果圖片很大的話，打包到程式碼中，那加載可能會很慢，所以根據圖片大小去考慮要打包到程式碼中還是打包在外面
					}
				}
			},
			{
				test: /\.jpg$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/',
						name:  '[name]_[hash].[ext]',
						limit:  10240
					}
				}
			}
		]
	}
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
}
```

把原先`dist`刪除在進行`npm run build`測試，可以發現圖片的名子已經更動，就代表成功。

### 使用 Loader 打包 css

`npm i css-loader --save-dev`  用來載入css檔
`npm i style-loader --save-dev`    將載入的css檔用 `<style></style>` 語法，插入到 `<head></head>` 內。

```
const  path = require('path');

module.exports = {
	mode:  "development",
	entry:  "./hello.js"",
	output: {
		filename:  "bundle.js",
		path:  path.resolve(__dirname, "dist")
	},
	module: { // 配置loader
		rules: [
			{
				test: /\.png$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/', 
						name:  '[name]_[hash].[ext]', 
						limit:  10240  
					}
				}
			},
			{
				test: /\.jpg$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/',
						name:  '[name]_[hash].[ext]',
						limit:  10240
					}
				}
			},
			<---------------------------------------------------------------------------------------------------------------------------------------------------------->
			{
				test: /\.css$/, 
				use: ['style-loader', 'css-loader'] // css-loader 處理css文件，style-loader將編譯完的css插入html中的工具。
			}
			<---------------------------------------------------------------------------------------------------------------------------------------------------------->
		]
	}

}
```

創建`css`檔

```
// index.css

img{
	width:500px;
	height:500px;
}
```

在 `hello.js` 引入

```
// hello.js

import  img  from  './img.png'
import  jpg  from  './jpg.jpg'
import  './css/index.css'

console.log('test')

var  myImg = document.createElement('img');
myImg .src = img
document.body.appendChild(myImg )
```

最後`npm run build`，在`dist`資料夾中手動加入一個`index.html`並把打包後的檔案引入，就可以看到圖片在頁面上。


### 使用 Loader 打包 scss

`npm i sass-loader --save-dev`  把 sass 和 scss 樣式文件轉為 css
`npm i node-sass --save-dev`  是一套在 node.js 用 LibSass 處理 SCSS 的工具

```
const  path = require('path');

module.exports = {
	mode:  "development",
	entry:  "./hello.js"",
	output: {
		filename:  "bundle.js",
		path:  path.resolve(__dirname, "dist")
	},
	module: { // 配置loader
		rules: [
			{
				test: /\.png$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/', 
						name:  '[name]_[hash].[ext]', 
						limit:  10240  
					}
				}
			},
			{
				test: /\.jpg$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/',
						name:  '[name]_[hash].[ext]',
						limit:  10240
					}
				}
			},
			{
				test : /\.css$/, 
				use : ['style-loader', 'css-loader'] 
			},
			<---------------------------------------------------------------------------------------------------------------------------------------------------------->
			{
				test : /\.scss$/, 
				use : ['style-loader', 'css-loader', 'sass-loader']	// sass-loader : 編譯 sass 的loader
			}
			<---------------------------------------------------------------------------------------------------------------------------------------------------------->
		]
	}

}
```

把之前的 css 檔，改成以 scss 結尾的檔案

```
// index.scss

$color : red;

img{
	width:500px;
	height:500px;
}

body{
	background: $color;
}
```

改寫 `hello.js` 引入scss

```
import  img  from  './img.png'
import  jpg  from  './jpg.jpg'
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
import  './css/index.scss'
<---------------------------------------------------------------------------------------------------------------------------------------------------------->

console.log('test')

var  myImg = document.createElement('img');
myImg.src = img
document.body.appendChild(myImg)
```

打包後在打開 `index.html`就可以看到背景為紅色。

### 使用 Loader 打包 scss 加上 postcss-loader

**什麼是 PostCSS？**

-   加入各家瀏覽器的前綴詞（prefix），例如：-webkit-、-moz-。
-   將先進的功能轉為目前主流瀏覽器所能支援的語法。
-   語法檢查和報錯。

`npm i postcss-loader --save-dev` 
`npm i autoprefixer --save--dev` 加入各家瀏覽器的前綴詞

```
const  path = require('path');

module.exports = {
	mode:  "development",
	entry:  "./hello.js"",
	output: {
		filename:  "bundle.js",
		path:  path.resolve(__dirname, "dist")
	},
	module: { // 配置loader
		rules: [
			{
				test: /\.png$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/', 
						name:  '[name]_[hash].[ext]', 
						limit:  10240  
					}
				}
			},
			{
				test: /\.jpg$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/',
						name:  '[name]_[hash].[ext]',
						limit:  10240
					}
				}
			},
			// {
			// test: /\.css$/,
			// use: ['style-loader', 'css-loader']
			// },
			// {
			// test: /\.scss$/,
			// use: ['style-loader', 'css-loader', 'sass-loader'] // sass-loader : 編譯 sass 的loader
			// },
<---------------------------------------------------------------------------------------------------------------------------------------------------------->	
			{
				test : /\.scss$/, 
				use : ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] // 加入postcss-loader
			}
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
		]
	}

}
```

在scss檔中新增一項語法。

```
// index.scss

$color :red;

img{
	width: 500px;
	height: 500px;
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
	transform: translate(100px,100px);
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
}

body{
	background: $color;
}
```

`touch postcss.config.js` 再項目的根目錄下新增 postcss.config.js 檔 

```
// postcss.config.js
module.exports = {
	plugins: {
		autoprefixer: ({
			browsers:  'last 2 version, > 1%'  // autoprefixer 的設定，last 2 version, > 1% 意思是包含所有使用	率 > 1% 的瀏覽器，並且支援該瀏覽器最新的兩個版本
		})
	}
}
```

[詳細設定官方文件](https://css-tricks.com/browserlist-good-idea/)


`npm run build`前可以先查看差別，啟動後打開`index.html`開發人員工具點選圖片，可以看到圖片會加上`-webkit-transform: translate(100px, 100px);`。

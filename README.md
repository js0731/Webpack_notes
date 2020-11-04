### 使用 html-webpack-plugin 再打包時自動創建 html 檔

`npm i html-webpack-plugin --save--dev`

```
const  path = require('path');
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
const HtmlWebpackPlugin = require('html-webpack-plugin');
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
module.exports = {
	mode:  "development",
	entry:  "./hello.js",
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
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] // 加入postcss-loader
			}
		]
	},
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
	plugins:[
		new HtmlWebpackPlugin()
	]
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
}
```


`npm run build`後可以看到`dist`資料夾中自動生成了以下的`index.html`檔。

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"></head>
  <body>
  <script src="bundle.js"></script></body>
</html>
```

如果想要額外添加`<div id='root'> </div>`的標籤，在打包後的`index.html`檔中，需要額外加入一個html的模板 。

`touch index.html` 再項目的根目錄下新增html檔

設定自己的模板
```
// index.html 

<html>

<head>
    <meta charset="utf-8">
    <title>Webpack App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div id='root'></div>
</body>

</html>
```

設定

```
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./hello.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: { // 配置loader
        rules: [
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        name: '[name]_[hash].[ext]',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.jpg$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        name: '[name]_[hash].[ext]',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] // 加入postcss-loader
            }
        ]
    },
    plugins: [
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
        new HtmlWebpackPlugin({
	        template : './index.html'  // 要用的模板路徑
	    })
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
    ]
}
```

重新`npm run build`後可以看到`dist/index.html`檔添加了` <div id='root'></div>`標籤。

### 使用 clean-webpack-plugin 讓dist資料夾下的文件整個清空且重新打包

`npm i  clean-webpack-plugin --save-dev`

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 這個套件在3.0版本以後需要將它解構出來
<---------------------------------------------------------------------------------------------------------------------------------------------------------->

module.exports = {
    mode: "development",
    entry: "./hello.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: { // 配置loader
        rules: [
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        name: '[name]_[hash].[ext]',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.jpg$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        name: '[name]_[hash].[ext]',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] // 加入postcss-loader
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'  // 要用的模板路徑
        }),
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
        new CleanWebpackPlugin()
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
    ]
}
```
隨便在打包後的`dist`資料夾下新增檔案，在`npm run build`可以發現整個資料夾被清空重新打包一遍。

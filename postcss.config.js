module.exports = {
    plugins: {
        autoprefixer: ({
            browsers: 'last 2 version, > 1%'  // autoprefixer 的設定，last 2 version, > 1% 意思是包含所有使用	率 > 1% 的瀏覽器，並且支援該瀏覽器最新的兩個版本
        })
    }
}
const path = require('path');

module.exports = {
    entry: "./js/index.js", // основной файл приложения
    output:{ 
        path: __dirname, // путь к каталогу выходных файлов
        filename: "./js/bundle.js"  // название создаваемого файла 
    }, 
    module:{ 
        rules:[
            { 
                test: /\.jsx?$/, // какие файлы обрабатывать
                exclude: /node_modules/, // какие файлы пропускать
                use: { loader: "babel-loader" }
            },         
        ] 
    },
}
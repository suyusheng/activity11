module.exports={
    publicPath: process.env.CI_PUBLIC_PATH || '/',
    lintOnSave: false,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    devServer:{
        open: false,// 项目时是否打开浏览器
        host: 'xl.geek-8.com', // 主机地址
        port: 8081, // 本地端口
        https: false,
        hotOnly: false,
        // proxy: {
        //     '/':{
        //         target: 'https://pay.geek-8.com',
        //         changeOrigin: true, // 是否跨域
        //         // ws: true,
        //         // pathRewrite: {
        //         //     '/api': ''
        //         // }
        //     }
        // }
    }
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://124.70.20.215:2140',
            },
        },
        // port: 8008
    },
};

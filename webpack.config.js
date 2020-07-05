const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (_env, args) => {
    const isProduction = args.mode === "production" || process.env.NODE_MODULE === "production";
    const mode = isProduction ? "production" : "development";
    const optimization = isProduction ? {
        minimize: false,
        minimizer: [],
    } : {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
        ],
    };
    const devtool = isProduction ? "hidden-source-map" : "source-map";
    console.log(`mode:${mode}`);
    return {
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new WasmPackPlugin({
                crateDirectory: path.resolve(__dirname, ".")
            }),
            // // Have this example work in Edge which doesn't ship `TextEncoder` or
            // // `TextDecoder` at this time.
            // new webpack.ProvidePlugin({
            //   TextDecoder: ['text-encoding', 'TextDecoder'],
            //   TextEncoder: ['text-encoding', 'TextEncoder']
            // })
        ],
        mode,
        optimization,
        devtool,
    };
};

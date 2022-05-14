const createVendorChunk = require("webpack-create-vendor-chunk");
const webpack = require("webpack");
const path = require("path");
const WebExtPlugin = require("web-ext-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

let config = mode => {
    const isProduction = mode === "production";

    return {
        mode,
        devtool: false,

        entry: {
            polyfill: "webextension-polyfill/dist/browser-polyfill.js",
            ui: "./src/ui/index.tsx",
            agent: "./src/agent/index.ts",
            contentScript: "./src/commonInExtensions/content-script.ts",
            backgroundScript: "./src/commonInExtensions/background.ts",
            devtools: "./src/commonInExtensions/devtools.js",
            recorderUtils: "./src/agent/utils/GifRecorderUtils.min.js",
            popup: "./src/popup/index.tsx"
        },

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".less", ".cur"]
        },

        module: {
            rules: [
                {
                    test: /\.(ts|js|tsx|jsx)?$/,
                    //loader: "babel-loader"
                    use: [
                        "babel-loader",
                        {
                            loader: "string-replace-loader",
                            options: {
                                search: "script.src = 'https://www.webrtc-experiment.com/gif-recorder.js';",
                                replace: ""
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: "less-loader"
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource"
                },
                {
                    test: /(?:\.woff2?$|\.ttf$|\.svg$|\.eot$)/,
                    loader: "file-loader"
                }
            ]
        }
    };
};

const buildConfig = buildName => (_, { mode }) => {
    return {
        ...config(mode),
        name: buildName,
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
            // new WebExtPlugin({
            //     artifactsDir: path.resolve(__dirname),
            //     sourceDir: path.resolve(__dirname, `${buildName}-extension`),
            //     outputFilename: `${buildName}-extension.zip`,
            //     buildPackage: true,
            //     overwriteDest: true
            // })
        ],
        output: {
            path: path.resolve(__dirname, `${buildName}-extension/`),
            filename: `[name].bundle.js`
        }
    };
};

module.exports = [buildConfig("chrome"), buildConfig("firefox")];

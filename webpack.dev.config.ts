import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import ESLintPlugin from "eslint-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: "development",
  experiments: {
    asset: true,
  },
  entry: {
    main: "./src/index.tsx",
    userInfoGetter: "./src/chromeScripts/contentScripts/userInfoGetter.ts",
    backgroundScript: "./src/chromeScripts/backgroundScrips/backgroundScript.ts",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: (pathData) => (pathData.chunk?.name === "main" ? "[name].[contenthash].js" : "[name].js"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.svg/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@": path.join(__dirname, "./src/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "src"),
    watchContentBase: true,
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
  target: "web",
};

export default config;

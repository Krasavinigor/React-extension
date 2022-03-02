import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
  mode: "production",
  entry: {
    main: "./src/index.tsx",
    userInfoGetter: "./src/chromeScripts/contentScripts/userInfoGetter.ts",
    backgroundScript: "./src/chromeScripts/backgroundScrips/backgroundScript.ts",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: (pathData) => (pathData.chunk?.name === "main" ? "[name].[contenthash].js" : "[name].js"),
    publicPath: "",
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
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
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
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.join(__dirname, "./src/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      showErrors: true,
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "./public",
          to: "./",
          globOptions: {
            ignore: [
              "**/*.html",
            ],
          },
        },
      ],
    }),
  ],
};

export default config;

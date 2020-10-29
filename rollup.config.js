/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 14:39:39
 * @LastEditTime : 2020-10-29 19:37:48
 * @Description :
 */
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import alias from "rollup-plugin-alias";
import postcss from "rollup-plugin-postcss";
import image from "rollup-plugin-img";
import json from "@rollup/plugin-json";
import del from 'rollup-plugin-delete'
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

const globals = {
  vue: "vue",
  vant: "vant",
  "resize-detector": "resize-detector",
  vuex: "vuex",
  "element-ui": "element-ui",
  "hotkeys-js": "hotkeys-js",
  lodash: "lodash",
  "ant-design-vue": "ant-design-vue",
  "vue-quill-editor": "vue-quill-editor",
  "v-charts": "v-charts",
  stream: "stream",
  "vue-i18n": "vue-i18n",
  "x-data-spreadsheet": "x-data-spreadsheet",
  html2canvas: "html2canvas",
  papaparse: "papaparse",
  echarts: "echarts",
  "font-awesome": "font-awesome",
  qrcode: "qrcode",
  "v-click-outside": "v-click-outside",
  "vue-matomo": "vue-matomo"
};

const babelOption = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "auto",
        useBuiltIns: "usage",
        corejs: 3,
        targets: {
          browsers: "> 1%, IE 11, not op_mini all, not dead",
          node: 8
        }
      }
    ],
    ["@vue/babel-preset-jsx"]
  ],
  plugins: [
    ["@babel/plugin-transform-runtime"],
    ["@babel/plugin-syntax-jsx"],
    ["@babel/plugin-proposal-class-properties"]
  ],
  externalHelpers: false,
  runtimeHelpers: true,
  exclude: "node_modules/**"
};

export default {
  input: "src/index.js",
  output: [
    {
      exports: "auto",
      name: packageJson.name,
      format: "umd",
      file: packageJson.main,
      sourcemap: false,
      globals
    }
  ],
  external: [
    "quill",
    "animate.css",
    "vue",
    "vuex",
    "vant",
    "resize-detector",
    "element-ui",
    "hotkeys-js",
    "lodash",
    "ant-design-vue",
    "vue-quill-editor",
    "v-charts",
    "stream",
    "vue-i18n",
    "x-data-spreadsheet",
    "html2canvas",
    "papaparse",
    "echarts",
    "font-awesome",
    "qrcode",
    "v-click-outside",
    "vue-matomo"
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    peerDepsExternal(),
    alias({
      resolve: [".jsx", ".js", ".css", ".scss", ".vue"],
      entries: {
        "@": __dirname + "/src",
        core: __dirname + "/src"
      }
    }),
    image({
      output: `${__dirname}/dist/images`,
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 8192,
      exclude: "node_modules/**"
    }),
    babel(babelOption),
    vue({
      compileTemplate: true
    }),
    commonjs(),
    resolve({
      browser: true,
      preferBuiltins: true,
      mainFields: ["browser", "module", "main"]
    }),
    terser(),
    postcss({
      extract: true,
      minimize: true,
      modules: false,
      plugins: [
        require("autoprefixer"),
        require("postcss-url")({
          url: "inline", // enable inline assets using base64 encoding
          maxSize: 10, // maximum file size to inline (in kilobytes)
          fallback: "copy", // fallback method to use if max size is exceeded
          assetsPath: `${__dirname}/dist/images`
        })
      ]
    }),
    json()
  ]
};

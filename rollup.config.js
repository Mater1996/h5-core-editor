/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 14:39:39
 * @LastEditTime : 2020-11-18 19:27:03
 * @Description :
 */
const path = require('path')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const vue = require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const alias = require('rollup-plugin-alias')
const postcss = require('rollup-plugin-postcss')
const image = require('rollup-plugin-img')
const json = require('@rollup/plugin-json')
const del = require('rollup-plugin-delete')
const progress = require('rollup-plugin-progress')
const { terser } = require('rollup-plugin-terser')
const filesize = require('rollup-plugin-filesize')
const analyze = require('rollup-plugin-analyzer')
const packageJson = require('./package.json')

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          browsers: '> 1%, IE 11, not op_mini all, not dead',
          node: 8
        }
      }
    ],
    ['@vue/babel-preset-jsx']
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-syntax-jsx'],
    ['@babel/plugin-proposal-class-properties']
  ],
  externalHelpers: false,
  runtimeHelpers: true,
  exclude: 'node_modules/**'
}

const globals = {
  vue: 'Vue',
  'vue-i18n': 'VueI18n',
  vant: 'vant',
  'resize-detector': 'resizeDetector',
  'hotkeys-js': 'hotkeys',
  lodash: 'lodash',
  'ant-design-vue': 'ant-design-vue',
  'vue-quill-editor': 'VueQuillEditor',
  'v-charts': 'VeIndex',
  stream: 'stream',
  'x-data-spreadsheet': 'x_spreadsheet',
  papaparse: 'papaparse',
  echarts: 'echarts',
  qrcode: 'qrcode',
  immutable: 'immutable'
}

const external = [
  'vue',
  'vue-i18n',
  'quill',
  'animate.css',
  'vant',
  'resize-detector',
  'hotkeys-js',
  'lodash',
  'ant-design-vue',
  'vue-quill-editor',
  'v-charts',
  'stream',
  'x-data-spreadsheet',
  'papaparse',
  'echarts',
  'font-awesome',
  'qrcode',
  'immutable'
]

module.exports = args => {
  const isProd = args.prod
  const needAnalyze = args.analyze
  function resolveUrl (dir) {
    return !isProd
      ? path.join('./example/src/lib/luban-h5-editor', dir)
      : path.join(__dirname, dir)
  }
  return {
    input: 'src/index.js',
    treeshake: isProd,
    output: [
      {
        exports: 'auto',
        name: packageJson.name,
        format: 'umd',
        file: !isProd ? resolveUrl(`${packageJson.main}`) : packageJson.main,
        sourcemap: !isProd,
        indent: isProd,
        globals
      }
    ],
    external,
    plugins: [
      isProd && del({ targets: `${resolveUrl('dist/*')}` }),
      peerDepsExternal(),
      alias({
        resolve: ['.jsx', '.js', '.css', '.scss', '.vue'],
        entries: {
          '@': path.join(__dirname, '/src')
        }
      }),
      image({
        output: resolveUrl('dist/images'),
        extensions: /\.(png|jpg|jpeg|gif|svg)$/,
        limit: 8192,
        exclude: 'node_modules/**'
      }),
      postcss({
        to: resolveUrl(`dist/${packageJson.name}.css`),
        extract: true,
        minimize: isProd,
        sourceMap: !isProd,
        modules: false,
        plugins: [
          require('autoprefixer'),
          require('postcss-url')({
            filter: /\.(png|jpg|jpeg|gif|svg)$/,
            url: 'inline',
            maxSize: 10,
            fallback: 'copy',
            assetsPath: './images'
          }),
          require('postcss-url')({
            filter: /\.(woff(2)?|ttf|eot|svg)$/,
            url: 'copy',
            assetsPath: './fonts'
          })
        ]
      }),
      babel(babelConfig),
      vue({
        compileTemplate: true,
        needMap: true
      }),
      commonjs(),
      nodeResolve({
        browser: true,
        preferBuiltins: true,
        mainFields: ['browser', 'module', 'main']
      }),
      isProd &&
        terser({
          safari10: isProd,
          compress: {
            drop_console: isProd
          }
        }),
      json(),
      progress(),
      filesize(),
      needAnalyze &&
        analyze({
          summaryOnly: true,
          limit: 100
        })
    ]
  }
}

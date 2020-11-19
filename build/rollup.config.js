/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-19 20:57:15
 * @LastEditTime : 2020-11-19 21:35:05
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
const replace = require('@rollup/plugin-replace')
const packageJson = require('../package.json')

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
    ['@babel/plugin-proposal-class-properties'],
    ['import', { libraryName: 'antd', style: true }, 'antd'],
    ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash']
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
      ? path.join(__dirname, '../', 'example/src/lib/luban-h5-editor', dir)
      : path.join(__dirname, '../', dir)
  }

  console.log(resolveUrl('src/index.js'))

  function genConfigByName (name) {
    return {
      output: [
        {
          exports: 'auto',
          name: name,
          format: 'umd',
          file: !isProd ? resolveUrl(`dist/${name}.js`) : `dist/${name}.js`,
          sourcemap: !isProd,
          indent: isProd,
          globals
        }
      ],
      treeshake: isProd,
      external,
      plugins: [
        isProd &&
          name === packageJson.name &&
          del({ targets: `${resolveUrl('dist/*')}` }),
        peerDepsExternal(),
        alias({
          resolve: ['.jsx', '.js', '.css', '.scss', '.vue'],
          entries: {
            '@': resolveUrl('src')
          }
        }),
        image({
          output: resolveUrl('dist/images'),
          extensions: /\.(png|jpg|jpeg|gif|svg)$/,
          limit: 8192,
          exclude: 'node_modules/**'
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify(
            !isProd ? 'development' : 'production'
          )
        }),
        postcss({
          to: resolveUrl(`dist/${name}.css`),
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

  return [
    { input: resolveUrl('src/index.js'), ...genConfigByName(packageJson.name) },
    {
      input: resolveUrl('src/preview.js'),
      ...genConfigByName('luban-h5-preview'),
      external: [],
      global: []
    }
  ]
}

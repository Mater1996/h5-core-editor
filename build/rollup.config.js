/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-19 20:57:15
 * @LastEditTime: 2021-01-15 14:22:19
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

const { TARGET, NODE_ENV, FORMAT } = process.env
const isProd = NODE_ENV === 'production'
const isUmd = FORMAT === 'umd'
const rootDir = path.resolve(__dirname, '../')
const resolveRoot = p => path.resolve(rootDir, p)
const packageDir = resolveRoot(`packages/${TARGET}`)
const name = path.basename(packageDir)
const resolvePackage = p => path.resolve(packageDir, p)
const isLubanLib = (packageName) => /luban/.test(packageName)
const pkg = require(resolvePackage('package.json'))
const { dependencies = {} } = pkg
const dependenciesName = Object.keys(dependencies)
const lubanDependenciesName = dependenciesName.filter(isLubanLib)
const anotherDependenciesName = dependenciesName.filter(v => !isLubanLib(v))
const lubanAlias = lubanDependenciesName.reduce((a, b) => {
  a[b] = resolveRoot(`packages/${b}/src`)
  return a
}, {})

const external = []
const entries = {}
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
    ['import', { libraryName: 'ant-design-vue' }],
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
  'v-charts': 'VeIndex',
  stream: 'stream',
  'x-data-spreadsheet': 'x_spreadsheet',
  papaparse: 'papaparse',
  echarts: 'echarts',
  immutable: 'immutable'
}

if (!isProd) {
  external.push(...anotherDependenciesName)
  Object.assign(entries, lubanAlias)
} else if (isUmd) {
  external.push(...dependenciesName)
} else {
  Object.assign(entries, lubanAlias)
}

module.exports = () => {
  return {
    input: resolvePackage('src/index.js'),
    watch: {
      clearScreen: false
    },
    output: [
      {
        exports: 'named',
        name: name,
        format: 'umd',
        file: resolvePackage(`dist/${name}.js`),
        sourcemap: !isProd,
        indent: isProd,
        globals
      }
    ],
    treeshake: isProd,
    external,
    plugins: [
      isProd && del({ targets: `${resolvePackage('dist/*')}` }),
      peerDepsExternal(),
      alias({
        resolve: ['.jsx', '.js', '.css', '.scss', '.vue'],
        entries: entries
      }),
      image({
        output: resolvePackage('dist/images'),
        extensions: /\.(png|jpg|jpeg|gif|svg)$/,
        limit: 8192,
        exclude: 'node_modules/**'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV
        )
      }),
      postcss({
        to: resolvePackage(`dist/${name}.css`),
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
      nodeResolve({
        browser: true,
        preferBuiltins: true,
        mainFields: ['main']
      }),
      commonjs({}),
      json(),
      progress(),
      filesize(),
      isProd && terser({
        safari10: isProd,
        compress: {
          drop_console: isProd
        }
      }),
      isProd &&
          analyze({
            summaryOnly: true,
            limit: 5
          })
    ]
  }
}

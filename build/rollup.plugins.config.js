/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-19 20:57:15
 * @LastEditTime: 2021-02-03 10:34:31
 * @Description :
 */
const path = require('path')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const vue = require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss')
const image = require('rollup-plugin-img')
const json = require('@rollup/plugin-json')
const del = require('rollup-plugin-delete')
const progress = require('rollup-plugin-progress')
const { terser } = require('rollup-plugin-terser')
const filesize = require('rollup-plugin-filesize')
const replace = require('@rollup/plugin-replace')

const pluginDir = path.resolve(__dirname, '../packages/luban-h5-plugins/')
const pluginsDir = path.resolve(pluginDir, './src/plugins/')
const targetDir = path.resolve(pluginsDir, process.env.TARGET)
const name = path.basename(targetDir)
const resolveRoot = p => path.resolve(pluginDir, p)
const resolve = p => path.resolve(targetDir, p)
const pkg = require(path.resolve(pluginDir, './package.json'))
const isProd = process.env.NODE_ENV === 'production'

const globals = {
  vue: 'Vue',
  'luban-h5-support': 'LubanH5Support'
}
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
    ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash']
  ],
  externalHelpers: false,
  runtimeHelpers: true,
  exclude: 'node_modules/**'
}

// 开发模式的时候合入所有的luban的包用来测试
const { dependencies = {} } = pkg
const dependenciesKeys = Object.keys(dependencies)
const external = dependenciesKeys.filter(v => isProd ? true : !/luban/.test(v))

module.exports = () => {
  return {
    input: resolve('./index.js'),
    output: [
      {
        exports: 'named',
        name: name,
        format: 'umd',
        globals,
        file: resolveRoot(`./lib/${name}/index.js`),
        sourcemap: !isProd,
        indent: isProd
      }
    ],
    treeshake: isProd,
    external,
    plugins: [
      isProd && del({ targets: `${resolveRoot(`./lib/${name}/*`)}` }),
      peerDepsExternal(),
      image({
        output: resolveRoot(`./lib/${name}/images`),
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
        to: resolveRoot(`./lib/${name}/index.css`),
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
        preferBuiltins: true
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
      })
    ]
  }
}

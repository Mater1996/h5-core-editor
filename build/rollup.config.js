/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-19 20:57:15
 * @LastEditTime: 2021-01-20 15:10:38
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

const { TARGET, NODE_ENV, FORMAT, CLEAR } = process.env
const isProd = NODE_ENV === 'production'
const isESM = FORMAT === 'esm'
const isUMD = FORMAT === 'umd'
const isClear = CLEAR === '1'
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
const anotherDependenciesName = new Set(dependenciesName.filter(v => !isLubanLib(v)))
const lubanAlias = lubanDependenciesName.reduce((a, b) => {
  a[b] = resolveRoot(`packages/${b}/src`)
  return a
}, {})

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

const globals = {
  vue: 'Vue',
  'vue-i18n': 'VueI18n'
}

const external = []
const entries = {}
// 递归luban内部依赖包
lubanDependenciesName.forEach(function genRes(lubanPackageName){
  const pkg = require(resolveRoot(`packages/${lubanPackageName}/package.json`))
  const lubanDependencies = Object.keys(pkg.dependencies || {})
  lubanDependencies.forEach(v => {
    if (v !== lubanPackageName && v !== TARGET) {
      if (!isLubanLib(v)) {
        anotherDependenciesName.add(v)
      } else {
        lubanAlias[v] = resolveRoot(`packages/${v}/src`)
        genRes(v)
      }
    }
  })
})

if (!isProd) {
  external.push(...anotherDependenciesName)
  Object.assign(entries, lubanAlias)
  console.log(entries,external)
} else if (isESM || isUMD) {
  external.push(...dependenciesName)
} else {
  Object.assign(entries, lubanAlias)
}

const file = resolvePackage(isESM ? `dist/${name}.esm.js` : `dist/${name}.js`)

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
        format: FORMAT,
        file,
        sourcemap: !isProd,
        indent: isProd,
        globals
      }
    ],
    treeshake: isProd,
    external,
    plugins: [
      isProd && isClear && del({ targets: `${resolvePackage('dist/*')}` }),
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

/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-19 20:57:15
 * @LastEditTime: 2021-02-04 11:31:46
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

const { TARGET, NODE_ENV, FORMAT, CLEAR, GLOBALNAME, INPUT } = process.env
const isProd = NODE_ENV === 'production'
const isClear = CLEAR === '1'
const rootDir = path.resolve(__dirname, '../')
const resolveRoot = p => path.resolve(rootDir, p)
const packageDir = resolveRoot(`packages/${TARGET}`)
const resolvePackage = p => path.resolve(packageDir, p)
const inputFilePath = resolvePackage(INPUT)
const inputFileName = path.basename(inputFilePath, '.js')
const packageFileName = path.basename(packageDir) + (inputFileName === 'index' ? '' : `.${inputFileName}`)
const isLubanLib = (packageName) => /luban/.test(packageName)
const pkg = require(resolvePackage('package.json'))
const { dependencies = {} } = pkg
const dependenciesName = Object.keys(dependencies)

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
  'luban-h5': 'LubanH5',
  'luban-h5-canvas': 'LubanH5Canvas',
  'luban-h5-editor': 'LubanH5Editor',
  'luban-h5-plugins': 'LubanH5Plugins',
  'luban-h5-support': 'LubanH5Support',
  'luban-h5-preview': 'LubanH5Preview',
  'luban-h5-core': 'LubanH5Core'
}

const outputConfig = {
  esm: {
    format: 'esm',
    file: resolvePackage(`dist/${packageFileName}.esm.js`)
  },
  iife: {
    format: 'iife',
    file: resolvePackage(`dist/${packageFileName}.global.js`)
  },
  umd: {
    format: 'umd',
    file: resolvePackage(`dist/${packageFileName}.js`)
  }
}

const external = []
const entries = {}

// 递归luban内部依赖包
const lubanDependenciesName = dependenciesName.filter(isLubanLib)
const anotherDependenciesName = new Set(dependenciesName.filter(v => !isLubanLib(v)))
const lubanAlias = lubanDependenciesName.reduce((a, b) => {
  a[b] = resolveRoot(`packages/${b}/src`)
  return a
}, {})
lubanDependenciesName.forEach(function genRes (lubanPackageName) {
  const pkg = require(resolveRoot(`packages/${lubanPackageName}/package.json`))
  const lubanDependencies = Object.keys(pkg.dependencies || {})
  lubanDependencies.forEach(v => {
    if (v !== lubanPackageName) {
      if (!isLubanLib(v)) {
        anotherDependenciesName.add(v)
      } else if (!lubanAlias[v]) {
        lubanAlias[v] = resolveRoot(`packages/${v}/src`)
        genRes(v)
      }
    }
  })
})

if (!isProd) {
  external.push(...anotherDependenciesName)
  Object.assign(entries, lubanAlias)
} else {
  if (FORMAT === 'iife') {
    Object.assign(entries, lubanAlias)
  } else {
    external.push(...dependenciesName)
  }
}

console.log(external, entries, inputFilePath, outputConfig[FORMAT])

module.exports = () => {
  return {
    input: inputFilePath,
    watch: {
      clearScreen: false
    },
    external,
    output: [
      {
        exports: 'named',
        extend: true,
        globals,
        name: GLOBALNAME || packageFileName,
        sourcemap: !isProd,
        indent: isProd,
        ...outputConfig[FORMAT]
      }
    ],
    treeshake: isProd,
    plugins: [
      progress(),
      isProd && isClear && del({ targets: `${resolvePackage('dist/*')}` }),
      peerDepsExternal(),
      alias({
        resolve: ['.jsx', '.js', '.css', '.scss', '.vue'],
        entries: entries
      }),
      json(),
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
        to: resolvePackage(`dist/${packageFileName}.css`),
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
      isProd && terser({
        safari10: isProd,
        compress: {
          drop_console: isProd
        }
      }),
      filesize(),
      isProd && analyze({
        summaryOnly: true,
        limit: 3
      })
    ]
  }
}

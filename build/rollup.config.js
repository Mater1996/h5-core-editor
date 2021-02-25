/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-19 20:57:15
 * @LastEditTime: 2021-02-25 19:36:14
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

const { TARGET, NODE_ENV, FORMAT, CLEAR, GLOBALNAME, INPUT, OUTPUT } = process.env
const isESM = FORMAT === 'esm'
const isProd = NODE_ENV === 'production'
const isClear = CLEAR === '1'
const resolve = path.resolve
const rootDir = resolve(__dirname, '../')
const isLubanLib = (packageName) => /luban-h5/.test(packageName)
const resolveRoot = p => resolve(rootDir, p)
const targetPackageDir = resolveRoot(`packages/${TARGET}`)
const resolveTargetPackage = p => resolve(targetPackageDir, p)
const inputFilePath = resolveTargetPackage(INPUT)
const outputDir = resolveTargetPackage(`${OUTPUT}`)
const resolveOutput = p => resolve(outputDir, p)
const inputFileName = path.basename(inputFilePath, '.js').replace(/index/, '')
const targetPackageDirName = path.basename(targetPackageDir)
const outputFileName = [targetPackageDirName, inputFileName].filter(Boolean).join('.')
const targetPackagePkg = require(resolveTargetPackage('package.json'))
const { dependencies = {} } = targetPackagePkg
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
  '@luban-h5/canvas': 'LubanH5Canvas',
  '@luban-h5/editor': 'LubanH5Editor',
  '@luban-h5/plugins': 'LubanH5Plugins',
  '@luban-h5/support': 'LubanH5Support',
  '@luban-h5/preview': 'LubanH5Preview',
  '@luban-h5/core': 'LubanH5Core'
}

const outputConfig = ({
  esm: {
    format: 'esm',
    file: resolveOutput(`${outputFileName}.esm`)
  },
  iife: {
    format: 'iife',
    file: resolveOutput(`${outputFileName}.global`)
  },
  umd: {
    format: 'umd',
    file: resolveOutput(`${outputFileName}`)
  }
})[FORMAT]

const external = []
const entries = []
const lubanAlias = [
  { find: 'luban-h5', replacement: resolveRoot('packages/luban-h5/src') },
  { find: /@luban-h5\/(.*)/, replacement: resolveRoot('packages/$1/src') }
]

// 递归并外置所有的luban外部依赖包
const lubanDependenciesSet = new Set()
const lubanDependenciesName = dependenciesName.filter(isLubanLib)
const anotherDependenciesNameSet = new Set(dependenciesName.filter(v => !isLubanLib(v)))
lubanDependenciesName.forEach(function genRes (lubanPackageName) {
  lubanPackageName = lubanPackageName.replace(/@luban-h5\//, '')
  const pkg = require(resolveRoot(`packages/${lubanPackageName}/package.json`))
  const lubanDependencies = Object.keys(pkg.dependencies || {})
  lubanDependencies.forEach(v => {
    if (!isLubanLib(v)) {
      anotherDependenciesNameSet.add(v)
    } else if (!lubanDependenciesSet.has(v)) {
      lubanDependenciesSet.add(v)
      genRes(v)
    }
  })
})

if (!isProd) {
  external.push(...anotherDependenciesNameSet)
  entries.push(...lubanAlias)
} else {
  if (FORMAT === 'iife') {
    entries.push(...lubanAlias)
  } else {
    external.push(...dependenciesName)
  }
}

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
        name: GLOBALNAME || outputFileName,
        sourcemap: !isProd,
        indent: isProd,
        format: outputConfig.format,
        file: `${outputConfig.file}.js`
      }
    ],
    treeshake: isProd,
    plugins: [
      isClear && del({ targets: resolveOutput('*') }),
      progress(),
      peerDepsExternal(),
      alias({
        resolve: ['.jsx', '.js', '.css', '.scss', '.vue'],
        entries: entries
      }),
      json(),
      image({
        output: resolveOutput('images'),
        extensions: /\.(png|jpg|jpeg|gif|svg)$/,
        limit: 8192,
        exclude: 'node_modules/**'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      }),
      postcss({
        to: resolveOutput(`${outputConfig.file}.css`),
        extract: true,
        minimize: isProd,
        sourceMap: !isProd,
        modules: false,
        plugins: [
          require('tailwindcss'),
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
      !isESM && isProd && terser({
        format: {
          safari10: isProd,
          preserve_annotations: true
        },
        module: /^esm/.test(FORMAT),
        compress: {
          drop_console: isProd,
          ecma: 2015,
          pure_getters: true
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

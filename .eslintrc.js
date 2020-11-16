/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-29 19:50:41
 * @LastEditTime : 2020-11-16 14:21:21
 * @Description :
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  }
}

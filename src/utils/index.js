/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-17 16:59:14
 * @LastEditTime : 2020-11-17 16:59:14
 * @Description :
 */
export const hyphenateStyleName = function (name) {
  const uppercasePattern = /([A-Z])/g
  const msPattern = /^ms-/
  return name
    .replace(uppercasePattern, '-$1')
    .toLowerCase()
    .replace(msPattern, '-ms-')
}

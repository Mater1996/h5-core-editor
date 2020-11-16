/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-13 11:32:12
 * @LastEditTime : 2020-11-13 11:32:31
 * @Description :
 */
export const hyphenateStyleName = function(name) {
  const uppercasePattern = /([A-Z])/g
  const msPattern = /^ms-/
  return name
    .replace(uppercasePattern, '-$1')
    .toLowerCase()
    .replace(msPattern, '-ms-')
}

/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-29 09:41:50
 * @LastEditTime : 2020-10-29 10:36:32
 * @Description :
 */
import Vue from "vue";
import VueI18n from "vue-i18n";
// default language
import enUSLang from "./lang/en-US";
import zhCNLang from "./lang/zh-CN";

Vue.use(VueI18n);

const messages = {
  "en-US": {
    ...enUSLang
  },
  "zh-CN": {
    ...zhCNLang
  }
};
export const defaultLang = "zh-CN";

const i18n = new VueI18n({
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages
});

export default i18n;

const loadedLanguages = [defaultLang];

function setI18nLanguage(lang) {
  i18n.locale = lang;
  document.querySelector("html").setAttribute("lang", lang);
  return lang;
}

export function loadLanguageAsync(lang = defaultLang) {
  return new Promise(resolve => {
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        i18n.setLocaleMessage(messages[lang], msg.default);
        loadedLanguages.push(lang);
        return setI18nLanguage(lang);
      }
      return resolve(setI18nLanguage(lang));
    }
    return resolve(lang);
  });
}

// ~/plugins/i18n.js

export default function({ app }) {
  //   app.$i18n.locale = window.navigator.language
  //   app.navigator.language || app.navigator.userLanguage

  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    console.log(oldLocale, newLocale)
    app.i18n.locale = newLocale
  }
  //   // onLanguageSwitched called right after a new locale has been set
  //   app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
  //     console.log(oldLocale, newLocale)
  //   }
}

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "bn"],
    fallbackLng: "en",
    debug: false,

    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },

    detection: {
      order: ["cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enJSON from "./locale/en.json";
import itJSON from "./locale/it.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { ...enJSON },
      it: { ...itJSON },
    },
    fallbackLng: "en",
  });

export default i18n;

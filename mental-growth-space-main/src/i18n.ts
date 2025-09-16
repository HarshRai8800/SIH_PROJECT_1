// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import ks from "./locales/ks.json"; // Kashmiri/Dogri
import ur from "./locales/ur.json";
import pa from "./locales/pa.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      ks: { translation: ks },
      ur: { translation: ur },
      pa: { translation: pa },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;

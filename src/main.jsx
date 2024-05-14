import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import enTranslation from "./locales/en/translation.json";
import hiTranslation from "./locales/hi/translation.json";

import "./App.css";

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en", // Default language
  resources: {
    en: {
      translation: enTranslation,
    },
    hi: {
      translation: hiTranslation,
    }
  },
});

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
      <I18nextProvider i18n={i18n}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      </I18nextProvider>
  </React.StrictMode>
)

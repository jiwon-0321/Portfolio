import React from 'react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/GlobalStyle';
import BackgroundMusic from '../components/BackgroundMusic';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      <BackgroundMusic />
    </>
  );
}

export default appWithTranslation(MyApp); 
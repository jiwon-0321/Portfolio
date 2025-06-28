import React from 'react';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/GlobalStyle';
import BackgroundMusic from '../components/BackgroundMusic';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Jiwon Portfolio</title>
        <meta name="description" content="실내건축 전문가 지원의 포트폴리오 웹사이트" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
      <BackgroundMusic />
    </>
  );
}

export default appWithTranslation(MyApp); 
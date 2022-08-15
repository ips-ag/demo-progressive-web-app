import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, createTheme, Grid, CircularProgress } from '@mui/material';
import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import { Router } from 'next/router';
import dynamic from 'next/dynamic';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const Layout = dynamic(() => import('../components/Layout'), {
  ssr: false
})

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [loading, setLoading] = React.useState<boolean>(false);

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <Layout>
          {loading ? (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: '100vh' }}
            >
              <Grid item xs={3}>
                <CircularProgress color='info' />
              </Grid>
            </Grid>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>

      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
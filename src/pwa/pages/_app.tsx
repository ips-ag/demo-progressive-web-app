import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, createTheme, Grid, CircularProgress, useMediaQuery } from '@mui/material';
import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import darkThemeOptions from '../styles/theme/darkThemeOptions';

import { Router, useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { checkLockAppStatus, verifyWebAuth } from '../services/webAuth';
import { useEffect, useMemo, useState } from 'react';
import { checkFeatureFlag } from '../services/featureFlag'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const clientSideEmotionCache = createEmotionCache();

const Layout = dynamic(() => import('../components/Layout'), {
  ssr: false
})

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme(prefersDarkMode ? darkThemeOptions : lightThemeOptions),
    [prefersDarkMode],
  );

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });

  useEffect(() => {
    const result = checkFeatureFlag(router.route);

    if (!result)
      router.push("/disableFeature");
  }, [router.route]);


  useEffect(() => {
    checkLockAppStatus() && verifyWebAuth();
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
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
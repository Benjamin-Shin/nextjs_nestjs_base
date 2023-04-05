import '@/styles/globals.css';
import * as React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/pages/components/Layout';

import '@/css/tailwind.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider resetCSS>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

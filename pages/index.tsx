import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Flex, Heading, VStack } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Based Next.js & Nest.js</title>
        <meta name="description" content="Thirdparty: Prisma & Next-auth & Chakra-UI"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justify="center">
        <VStack mb={6}>
          <div className="py-32 text-center">
            <div className="text-4xl font-extrabold">
              <Heading mb={6}>Based Next.js & Nest.js</Heading>
            </div>
          </div>
        </VStack>
      </Flex>
    </div>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Home;

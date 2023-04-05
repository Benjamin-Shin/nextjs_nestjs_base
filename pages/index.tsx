import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '@/pages/components/Navbar';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Flex, Button, Heading, VStack } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Based Next.js & Nest.js</title>
        <meta
          name="description"
          content="Thirdparty: Prisma & Next-auth & Chakra-UI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
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

export default Home;

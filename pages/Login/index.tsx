import React, { useState, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Flex, Button, Heading, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from '@/pages/components/Navbar';

const Login: React.FC = (props) => {
  const [formStatus, setFormStatus] = useState<string>('');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (!result?.error) {
      setFormStatus(`Log in Success!`);
      router.replace("/");
    } else {
      setFormStatus(`Error Occured : ${result.error}`);
    }
  } // end of submitHandler function

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.replace("/");
    return (
      <div>
        <h1>Log in</h1>
        <div>You are already logged in.</div>
        <div>Now redirect to main page.</div>
      </div>
    );
  }

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
      <Flex justify="center">
        <VStack mb={6}>
          <div className="container px-5 py-10 mx-auto w-100">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-4xl text-gray-700 font-semibold">
                로그인
              </h1>
            </div>
            <form
              onSubmit={submitHandler}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  이메일 ID
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  required
                  ref={emailInputRef}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  패스워드
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  required
                  ref={passwordInputRef}
                />
                <p className="text-red-500 text-xs italic">
                  {/* Please choose a password. */}
                  {formStatus}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
        </VStack>
      </Flex>
    </div>
  );
};

export default Login;
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import crypto from 'bcrypt';

import { PrismaService } from "@/server/prisma/prisma.service";
import { user } from '@prisma/client'

// 비밀번호 암호화 함수
export async function hashPassword(password: string): Promise<string> {
    const hashedPassword = await crypto.hash(password, 12);
    return hashedPassword;
}

// 비밀번호 검증 함수
export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    const isValid = await crypto.compare(password, hashedPassword);
    return isValid
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'user-credentials',
            name: "Credentials",
            credentials: {
                nick: { label: "Nick", type: "text", placeholder: "Input login-id" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials, req) => {
                const user = await fetch(
                    `${process.env.NEXTAUTH_URL}/api/user/check-credentials`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        accept: "application/json",
                      },
                      body: Object.entries(credentials)
                        .map((e) => e.join("="))
                        .join("&"),
                    },
                  )
                    .then((res) => res.json())
                    .catch((err) => {
                      return null;
                    });
          
                
                
                const { nick, password } = credentials!;



                // 기타 사용자 검증 로직 코드 ...
                const userInfo = await user.findUnique({
                    where:{
                        email
                    }
                });
               
                if(!userInfo) return null

                const verifyPw = await verifyPassword(password, userInfo.password);
                if (!verifyPw) return null

                return userInfo
            }
        }),
    ],
    secret: 'test',
    pages:{
        error: '/admin/error',
        signOut:'/admin'
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
        updateAge: 2 * 24 * 60 * 60
    },
    callbacks: {
        async jwt ({token, account}) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({session, token, user}) {
            return session
        },
        async redirect ({url, baseUrl}) {
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`
            }
            else if ( new URL(url).origin === baseUrl) {
                return `${baseUrl}`
            }
            return baseUrl
        }
    }
})
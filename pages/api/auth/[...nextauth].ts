import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: '사용자ID',
          type: 'email',
          placeholder: 'E-Main ID를 입력하세요.',
        },
        password: { label: '패스워드', type: 'password' },
      },
      async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          if (req.method !== 'POST') {
              return;
          }

          // Next.js에서 Nest.js API를 호출
          const res = await fetch(process.env.NESTAUTH_URL + '/api/user/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
          });
          const user = await res.json();
          console.log("Next-auth login => ", JSON.stringify(user));
          if (user && user.resultIdx === 0) {
            return user;
          } else {
            return;
          }
      }
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    session({ session, token, user }) {
      return session; // The return type will match the one returned in `useSession()`
    },
  },
  pages: {
    signIn: '/Login',
  }
});

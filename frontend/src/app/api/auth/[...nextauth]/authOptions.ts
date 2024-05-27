import { LOGIN_URL } from '@/lib/apiEndPoints';
import appAxios from '@/lib/axios.config';
import NextAuth, { AuthOptions, ISODateString, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  profile_image?: string | null;
  token?: string | null;
  created_at?: string | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const res = await appAxios.post(LOGIN_URL, credentials);
        const response = res.data;
        const user = response?.user;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

// export default NextAuth(authOptions);
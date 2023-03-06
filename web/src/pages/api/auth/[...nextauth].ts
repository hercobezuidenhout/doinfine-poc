import { NextApiHandler } from 'next';
import NextAuth, { ISODateString, Session, User } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '@/prisma/prisma';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, AUTH_OPTIONS);
export default authHandler;

interface CallbackContext {
  session: Session;
  user: User | AdapterUser;
  token: JWT;
}

export interface SessionUser {
  user: User;
}

export interface EnrichedSession extends Omit<Session, 'user'>, SessionUser {}

export const AUTH_OPTIONS = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }: CallbackContext) => {
      const result: EnrichedSession = session
        ? { ...session, user }
        : { user, expires: new Date().toISOString() };

      return result;
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};

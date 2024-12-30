import NextAuth from "next-auth";
import type { Account, NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID ?? "";
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const spotifyScope = process.env.SPOTIFY_SCOPE ?? "";

interface ExtendedToken extends JWT {
  accessToken?: string;
}

interface ExtendedSession extends Session {
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: spotifyClientId,
      clientSecret: spotifyClientSecret,
      authorization: {
        params: {
          scope: spotifyScope,
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({
      token,
      account,
      // TODO(steevejoseph): Figure out how to incorporate the user param
      // Issue URL: https://github.com/lonesume/shmood/issues/8
      // user,
    }: {
      token: JWT;
      account: Account | null;
      // user: User | null;
      trigger?: "signIn" | "signUp" | "update";
    }): Promise<ExtendedToken> {
      if (account) {
        token.accessToken = account.access_token;
      }

      // if (user) {
      //   token.user = user;
      // }

      return token;
    },
    async redirect({
      url,
      baseUrl,
    }: {
      url: string;
      baseUrl: string;
    }): Promise<string> {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }): Promise<ExtendedSession> {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthOptions;

export default NextAuth(authOptions);

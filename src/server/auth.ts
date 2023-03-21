import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "~/env.mjs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

// @ts-ignore
// @ts-ignore
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        console.log('hello we are in');
        console.log(session);
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
    redirect({ url, baseUrl }) {
      console.log("hey");
      // Allows relative callback URLs
      // if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    {
      id: "klaviyo",
      name: "Klaviyo",
      type: "oauth",
      debug: true,
      authorization: {
        url: "http://local-klaviyo.com:8080/oauth/authorize/",
        params: { grant_type: 'authorization_code', scope: "campaigns:read campaigns:write catalogs:read catalogs:write data-privacy:read data-privacy:write events:read events:write flows:read flows:write list:read list:write metrics:read metrics:write profiles:read profiles:write segments:read segments:write subscriptions:read subscriptions:write tags:read tags:write templates:read template:write list-and-segments:read list-and-segments:write" }
      },
      checks: ["pkce"],
      token: "http://local-klaviyo.com:8080/oauth/token/",
      clientId: "xRGIwNdxloXrNu3W7Do3DkfBaONS2VrGWEqM26e7",
      clientSecret: "O3nTOGDgvrhEoqBm3fBBW7i0m5veaJS5nhcvr59KgyOlKcCs1tRd8GliTHItKiMcu3eiNa097PUMEnbdSXP04QbCg1ADesKI8fObT9xGgiUhGBZsT4aol5wDvVNwAQEn",
      userinfo: {
        request: () => {}
      },
      profile(profile, tokens) {
        console.log(tokens);
        return {
          token: tokens.access_token,
          id: 'id',
          name: 'name',
          email: 'email',
          image: 'picture',
        }
      },
    }
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

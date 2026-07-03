import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { TierId } from "@/lib/tiers";

type TierPatch = { tier?: TierId };

// Auth.js v5. Читает AUTH_SECRET / AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET из env.
// Подписка (тариф) живёт в JWT — «привязана к аккаунту», без БД, работает на
// Vercel serverless. Обновляется через useSession().update({ tier }).
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  trustHost: true,
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        const t = (session as TierPatch | undefined)?.tier;
        if (t) (token as TierPatch).tier = t;
      }
      return token;
    },
    async session({ session, token }) {
      const t = (token as TierPatch).tier;
      if (t) session.tier = t;
      return session;
    },
  },
});

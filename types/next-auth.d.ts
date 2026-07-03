import type { TierId } from "@/lib/tiers";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    tier?: TierId;
    user?: DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    tier?: TierId;
  }
}

"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export function AuthButton({ compact = false }: { compact?: boolean }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)" }}>…</span>;
  }

  if (session?.user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {session.user.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt="" width={26} height={26} style={{ borderRadius: 999 }} />
        )}
        {!compact && (
          <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {session.user.name ?? session.user.email}
          </span>
        )}
        <button onClick={() => signOut()} style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }}>
          выйти
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      style={{ fontFamily: "var(--mono)", fontSize: 13.5, color: "var(--accent)", background: "transparent", border: "1px solid var(--accent)", borderRadius: 999, padding: "7px 15px", cursor: "pointer" }}
    >
      Войти через Google
    </button>
  );
}

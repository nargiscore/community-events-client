"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { PageLoader } from "./Skeletons";

// Waits for the session check before deciding, so reloading never bounces a logged-in user to /login.
export default function PrivateRoute({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [isPending, session, router, pathname]);

  if (isPending || !session) return <PageLoader />;
  return children;
}

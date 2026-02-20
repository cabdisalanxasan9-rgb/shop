"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SecureAuthGuard from "@/components/SecureAuthGuard";
import BottomNav from "@/components/BottomNav";

const PUBLIC_AUTH_PATHS = [
  "/auth",
  "/auth/login",
  "/auth/signup",
  "/auth/secure-login",
  "/auth/secure-signup",
];

interface ProtectedShellProps {
  children: React.ReactNode;
}

export default function ProtectedShell({ children }: ProtectedShellProps) {
  const pathname = usePathname();

  const isAuthRoute = React.useMemo(
    () =>
      PUBLIC_AUTH_PATHS.some(
        (base) => pathname === base || pathname.startsWith(base + "/"),
      ),
    [pathname],
  );

  const isAdminRoute = React.useMemo(
    () => pathname.startsWith("/admin"),
    [pathname],
  );

  // For auth routes, render children as-is without nav/guards
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // For admin routes, render without BottomNav but still require auth
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For all other routes, require authentication and show main shell + nav
  return (
    <SecureAuthGuard>
      <main className="max-w-7xl mx-auto bg-background min-h-screen relative pb-28 md:pb-12 shadow-2xl shadow-black/5 ring-1 ring-black/5">
        {children}
        <BottomNav />
      </main>
    </SecureAuthGuard>
  );
}


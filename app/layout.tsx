import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { AuthProvider } from "@/context/SecureAuthContext";
import { AuthProvider as LegacyAuthProvider } from "@/context/AuthContext";
import { PreferencesProvider } from "@/context/PreferencesContext";
import { ProductsProvider } from "@/context/ProductsContext";
import ProtectedShell from "@/components/ProtectedShell";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "JannoFresh - Fresh from farm",
  description: "Shop for fresh vegetables online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-background min-h-screen text-foreground`}>
        <PreferencesProvider>
          <CartProvider>
            <OrderProvider>
              <ProductsProvider>
                <LegacyAuthProvider>
                  <AuthProvider>
                    <ProtectedShell>{children}</ProtectedShell>
                  </AuthProvider>
                </LegacyAuthProvider>
              </ProductsProvider>
            </OrderProvider>
          </CartProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}

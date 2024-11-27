// components/LayoutWrapper.tsx
"use client";


import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noLayoutPaths = ["/auth","/question"];
  const hideLayout = noLayoutPaths.includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
        {children}
      {!hideLayout && <Footer />}
    </>
  );
}

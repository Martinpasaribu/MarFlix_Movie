// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noLayoutPaths = ["/auth", "/question"];

  // Periksa apakah pathname dimulai dengan salah satu path di noLayoutPaths
  const hideLayout = noLayoutPaths.some((path) => pathname.startsWith(path));

  return (
    <>
      {!hideLayout && <Navbar />}
        {children}
      {!hideLayout && <Footer />}
    </>
  );
}

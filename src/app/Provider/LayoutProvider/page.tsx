// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {


  return (
    <>
      <Navbar />
        {children}
      <Footer />
    </>
  );
}

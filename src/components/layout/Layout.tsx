// src/components/layout/Layout.tsx
import React from "react";
import type { ReactNode } from "react";
import Header from "./Header";
import Disclaimer from "../ui/Disclaimer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-2 max-w-7xl">
        <Header />

        <main className="py-4">
          <Disclaimer />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

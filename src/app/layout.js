"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { SidebarProvider } from "../context/sidebarContext";
import "./globals.css";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedInUser = localStorage.getItem("loggedInUser");

      if (loggedInUser && loggedInUser !== "null") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (pathname !== "/") {
          router.push("/");
        }
      }
    }
  }, [pathname, router]);

  return (
    <html lang="tr">
      <body>
        <SidebarProvider>
          {isAuthenticated ? (
            <div className="flex h-screen bg-gray-200">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">{children}</main>
              </div>
            </div>
          ) : (
            <main className="h-screen">{children}</main>
          )}
        </SidebarProvider>
      </body>
    </html>
  );
}

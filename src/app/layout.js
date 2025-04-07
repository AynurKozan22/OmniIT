"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { SidebarProvider } from "../context/sidebarContext";
import "./globals.css";

function AuthenticatedLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser && loggedInUser !== "null") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (pathname !== "/") {
        router.push("/");
      }
    }
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== "/") {
    return null;
  }

  return (
    <SidebarProvider>
      {isAuthenticated && pathname !== "/" ? (
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
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      </body>
    </html>
  );
}

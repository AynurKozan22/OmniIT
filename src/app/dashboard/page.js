"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      router.push("/");
    } else {
      setUser(JSON.parse(loggedInUser));
    }
  }, [router]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-700">
            Hoş Geldiniz, {user?.email} 🎉
          </h1>
          <p className="text-gray-600 mt-2">Dashboard’a giriş yaptınız!</p>
        </div>
      </div>
    </div>
  );
}

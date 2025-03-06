"use client";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
        IT Portal
      </h2>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <a
              href="/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/devices"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition"
            >
              Cihazlarım
            </a>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold transition"
      >
        Çıkış Yap
      </button>
    </div>
  );
}

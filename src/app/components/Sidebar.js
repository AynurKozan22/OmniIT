"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`bg-gray-900 text-white h-screen p-5 fixed top-0 left-0 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 md:w-64 z-40`}
      >
        <h1 className="text-lg font-bold mb-5">OmniIT Portal</h1>
        <nav>
          <ul>
            <li className="mb-2">
              <a
                href="/dashboard"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/devices"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                Cihazlarım
              </a>
            </li>
          </ul>
        </nav>
        <button className="mt-10 bg-red-600 hover:bg-red-700 text-white py-2 px-4 w-full rounded">
          Çıkış Yap
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

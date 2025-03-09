"use client";
import { useState } from "react";
import { FiBell, FiUserCheck, FiSettings, FiMoon } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-gray-100 shadow-md px-6 py-3 flex items-center justify-end gap-x-6">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-1 cursor-pointer">
          <span className="text-sm font-medium">🌍 English</span>
          <MdKeyboardArrowDown />
        </div>

        <div className="flex items-center space-x-4 text-gray-700">
          <div className="relative cursor-pointer">
            <FiBell className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              3
            </span>
          </div>

          <FiSettings className="text-xl cursor-pointer" />
          <FiMoon className="text-xl cursor-pointer" />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FiUserCheck className="text-xl cursor-pointer w-8 h-8 rounded-full border-2 border-gray-300" />
            <span className="text-sm font-medium text-gray-800">Aynur</span>
            <MdKeyboardArrowDown />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2">
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profil
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Ayarlar
              </button>
              <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100">
                Çıkış Yap
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

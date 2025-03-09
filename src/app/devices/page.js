"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "",
    status: "Active",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedDevices = JSON.parse(localStorage.getItem("devices"));
    if (storedDevices) {
      setDevices(storedDevices);
    } else {
      fetch("/devices.json")
        .then((res) => res.json())
        .then((data) => {
          setDevices(data);
          localStorage.setItem("devices", JSON.stringify(data));
        });
    }
  }, []);

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveDevice = (e) => {
    e.preventDefault();
    if (!newDevice.name || !newDevice.type) return;

    const deviceExists = devices.some(
      (device) => device.name === newDevice.name
    );

    if (deviceExists) {
      alert("Bu isimde bir cihaz zaten var!");
      return;
    }

    let updatedDevices;
    if (editingIndex !== null) {
      updatedDevices = devices.map((device, index) =>
        index === editingIndex ? newDevice : device
      );
      setEditingIndex(null);
    } else {
      updatedDevices = [...devices, newDevice];
    }

    setDevices(updatedDevices);
    localStorage.setItem("devices", JSON.stringify(updatedDevices));
    setNewDevice({ name: "", type: "", status: "Active" });
  };

  const handleDeleteDevice = (index) => {
    const confirmDelete = window.confirm(
      "Bu cihazı silmek istediğinize emin misiniz?"
    );
    if (!confirmDelete) return;

    const updatedDevices = devices.filter((_, i) => i !== index);
    setDevices(updatedDevices);
    localStorage.setItem("devices", JSON.stringify(updatedDevices));
  };

  const handleEditDevice = (index) => {
    setNewDevice(devices[index]);
    setEditingIndex(index);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col items-center p-6 bg-gray-100 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Cihazlarım</h1>
        <input
          type="text"
          placeholder="Cihaz Ara..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <form
          onSubmit={handleSaveDevice}
          className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-4xl"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingIndex !== null ? "Cihazı Güncelle" : "Yeni Cihaz Ekle"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600">Cihaz Adı</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cihaz adını girin"
                value={newDevice.name}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-600">Cihaz Türü</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Örn: Laptop, Telefon"
                value={newDevice.type}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, type: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-600">Cihaz Durumu</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newDevice.status}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {editingIndex !== null ? "Güncelle" : "Ekle"}
          </button>
        </form>

        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-3">Cihaz Adı</th>
                <th className="border border-gray-300 p-3">Tür</th>
                <th className="border border-gray-300 p-3">Durum</th>
                <th className="border border-gray-300 p-3">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-3">{device.name}</td>
                  <td className="border border-gray-300 p-3">{device.type}</td>
                  <td className="border border-gray-300 p-3">
                    {device.status}
                  </td>
                  <td className="border border-gray-300 p-3 flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-2">
                    <button
                      onClick={() => handleEditDevice(index)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDeleteDevice(index)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

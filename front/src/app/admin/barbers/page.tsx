"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Barber {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  specialties: string[];
  isActive: boolean;
}

interface BarberFormData {
  name: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  specialties: string[];
  isActive: boolean;
}

export default function BarbersPage() {
  const [barbers, setBarbers] = useState<Barber[]>([
    {
      id: "1",
      name: "Jan Novák",
      email: "jan@nastrih.cz",
      phone: "+420 777 888 999",
      photo: "/images/barbers/jan.jpg",
      bio: "Profesionální holič s 10 lety zkušeností. Specializuje se na klasické střihy a úpravu vousů.",
      specialties: ["Klasické střihy", "Úprava vousů", "Hot towel shave"],
      isActive: true,
    },
  ]);

  const [isAddingBarber, setIsAddingBarber] = useState(false);
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);

  const handleAddBarber = (data: BarberFormData) => {
    const newBarber: Barber = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    setBarbers((prev) => [...prev, newBarber]);
    setIsAddingBarber(false);
  };

  const handleUpdateBarber = (id: string, data: Partial<BarberFormData>) => {
    setBarbers((prev) =>
      prev.map((barber) =>
        barber.id === id ? { ...barber, ...data } : barber
      )
    );
    setEditingBarber(null);
  };

  const handleDeleteBarber = (id: string) => {
    setBarbers((prev) => prev.filter((barber) => barber.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setBarbers((prev) =>
      prev.map((barber) =>
        barber.id === id ? { ...barber, isActive: !barber.isActive } : barber
      )
    );
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Holiči</h1>
        <p className="text-gray-600">Správa holičů a jejich profilů</p>
      </div>

      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setIsAddingBarber(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
        >
          Přidat holiče
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {barbers.map((barber) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <img
                  src={barber.photo}
                  alt={barber.name}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      {barber.name}
                    </h2>
                    <p className="text-sm text-gray-500">{barber.email}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    barber.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {barber.isActive ? "Aktivní" : "Neaktivní"}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {barber.bio}
                </p>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Specializace
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {barber.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-amber-50 text-amber-800 text-xs font-medium rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingBarber(barber)}
                      className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteBarber(barber.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={barber.isActive}
                      onChange={() => handleToggleActive(barber.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
} 
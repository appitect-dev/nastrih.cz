"use client";

import { useState, useEffect } from "react";
import { useBookingTheme } from "@/contexts/BookingThemeContext";

export default function AppearancePage() {
  const { theme, updateTheme, resetTheme } = useBookingTheme();
  const [formData, setFormData] = useState(theme);

  useEffect(() => {
    setFormData(theme);
  }, [theme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTheme(formData);
  };

  const handleReset = () => {
    resetTheme();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Vzhled</h1>
        <p className="text-gray-600">Přizpůsobte si vzhled rezervačního systému</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Barevné schéma</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Primární barva
                  </label>
                  <input
                    type="color"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Sekundární barva
                  </label>
                  <input
                    type="color"
                    name="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Barva pozadí
                  </label>
                  <input
                    type="color"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Barva textu
                  </label>
                  <input
                    type="color"
                    name="textColor"
                    value={formData.textColor}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Obnovit výchozí
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700"
                >
                  Uložit změny
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Náhled</h2>
          </div>
          <div className="p-6">
            <div className="p-6 rounded-lg" style={{ backgroundColor: formData.backgroundColor }}>
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <div 
                    className="h-12 rounded-md mb-2"
                    style={{ backgroundColor: formData.primaryColor }}
                  />
                  <div 
                    className="h-8 rounded-md"
                    style={{ backgroundColor: formData.secondaryColor }}
                  />
                </div>
                <p style={{ color: formData.textColor }}>
                  Toto je ukázka textu v rezervačním systému. Můžete vidět, jak budou vypadat různé prvky s vybranými barvami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 
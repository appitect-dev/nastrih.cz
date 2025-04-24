"use client";

import { useState, useEffect } from "react";
import { useBookingTheme } from "@/contexts/BookingThemeContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeCustomizer({ isOpen, onClose }: ThemeCustomizerProps) {
  const { theme, updateTheme, resetTheme } = useBookingTheme();
  const [formData, setFormData] = useState(theme);

  useEffect(() => {
    setFormData(theme);
  }, [theme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTheme(formData);
    onClose();
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
    // Update theme in real-time
    updateTheme({ ...formData, [name]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl border-l border-gray-200 z-50 flex flex-col">
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Přizpůsobit vzhled</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-500 rounded-lg"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
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
        </form>
      </div>

      <div className="border-t border-gray-200 p-4 bg-gray-50 space-x-4 flex justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Obnovit výchozí
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700"
        >
          Uložit změny
        </button>
      </div>
    </div>
  );
} 
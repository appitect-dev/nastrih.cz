"use client";

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { 
  PaintBrushIcon, 
  SwatchIcon, 
  FontStyleIcon,
  PhotoIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface BookingTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  boxShadow: string;
  backgroundImage?: string;
  customCSS?: string;
}

const defaultTheme: BookingTheme = {
  primaryColor: '#D97706', // amber-600
  secondaryColor: '#F59E0B', // amber-500
  backgroundColor: '#FFFFFF',
  textColor: '#111827', // gray-900
  fontFamily: 'Inter',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
};

export default function BookingCustomization() {
  const [theme, setTheme] = useState<BookingTheme>(defaultTheme);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleColorChange = (key: keyof BookingTheme, value: string) => {
    setTheme(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFontChange = (font: string) => {
    setTheme(prev => ({
      ...prev,
      fontFamily: font,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Přizpůsobení rezervační stránky
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Upravte vzhled a styl vaší rezervační stránky
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Color Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <SwatchIcon className="h-5 w-5 mr-2 text-gray-400" />
            Barvy
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hlavní barva
              </label>
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vedlejší barva
              </label>
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Barva pozadí
              </label>
              <input
                type="color"
                value={theme.backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Barva textu
              </label>
              <input
                type="color"
                value={theme.textColor}
                onChange={(e) => handleColorChange('textColor', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Typography Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <FontStyleIcon className="h-5 w-5 mr-2 text-gray-400" />
            Typografie
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Font
              </label>
              <select
                value={theme.fontFamily}
                onChange={(e) => handleFontChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Zaoblení rohů
              </label>
              <select
                value={theme.borderRadius}
                onChange={(e) => handleColorChange('borderRadius', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              >
                <option value="0">Žádné</option>
                <option value="0.25rem">Malé</option>
                <option value="0.5rem">Střední</option>
                <option value="1rem">Velké</option>
                <option value="9999px">Kulaté</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="space-y-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <Cog6ToothIcon className="h-5 w-5 mr-2 text-gray-400" />
          Pokročilá nastavení
        </button>

        {showAdvanced && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stín
              </label>
              <select
                value={theme.boxShadow}
                onChange={(e) => handleColorChange('boxShadow', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              >
                <option value="none">Žádný</option>
                <option value="0 1px 3px 0 rgb(0 0 0 / 0.1)">Malý</option>
                <option value="0 4px 6px -1px rgb(0 0 0 / 0.1)">Střední</option>
                <option value="0 10px 15px -3px rgb(0 0 0 / 0.1)">Velký</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Obrázek pozadí
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      handleColorChange('backgroundImage', event.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-amber-50 file:text-amber-700
                  hover:file:bg-amber-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vlastní CSS
              </label>
              <textarea
                value={theme.customCSS}
                onChange={(e) => handleColorChange('customCSS', e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                placeholder="/* Vlastní CSS styly */"
              />
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Náhled
        </h3>
        <div 
          className="p-6 rounded-lg"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            fontFamily: theme.fontFamily,
            borderRadius: theme.borderRadius,
            boxShadow: theme.boxShadow,
            backgroundImage: theme.backgroundImage ? `url(${theme.backgroundImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <style>{theme.customCSS}</style>
          <button
            className="px-4 py-2 rounded-md"
            style={{
              backgroundColor: theme.primaryColor,
              color: '#FFFFFF',
              borderRadius: theme.borderRadius,
            }}
          >
            Rezervovat
          </button>
        </div>
      </div>
    </div>
  );
} 
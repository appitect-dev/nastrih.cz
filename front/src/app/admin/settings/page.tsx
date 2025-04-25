"use client";

import { useState } from "react";

interface BusinessSettings {
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  socialMedia: {
    facebook: string;
    instagram: string;
  };
}

export default function SettingsPage() {
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    name: "Nastrih.cz",
    email: "info@nastrih.cz",
    phone: "+420 777 888 999",
    address: "Václavské náměstí 1, Praha 1",
    description: "Profesionální holičství v centru Prahy",
    socialMedia: {
      facebook: "https://facebook.com/nastrih.cz",
      instagram: "https://instagram.com/nastrih.cz",
    },
  });

  const handleBusinessSettingChange = (field: keyof BusinessSettings, value: string) => {
    setBusinessSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialMediaChange = (platform: keyof BusinessSettings["socialMedia"], value: string) => {
    setBusinessSettings((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the settings
    console.log("Saving settings:", { businessSettings });
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Nastavení</h1>
        <p className="text-gray-600">Správa nastavení holičství</p>
      </div>

      <div className="space-y-6">
        {/* Business Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Informace o holičství</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Název holičství
              </label>
              <input
                type="text"
                id="name"
                value={businessSettings.name}
                onChange={(e) => handleBusinessSettingChange("name", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={businessSettings.email}
                onChange={(e) => handleBusinessSettingChange("email", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                value={businessSettings.phone}
                onChange={(e) => handleBusinessSettingChange("phone", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-900 mb-2">
                Adresa
              </label>
              <input
                type="text"
                id="address"
                value={businessSettings.address}
                onChange={(e) => handleBusinessSettingChange("address", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                Popis
              </label>
              <textarea
                id="description"
                value={businessSettings.description}
                onChange={(e) => handleBusinessSettingChange("description", e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Sociální sítě</h3>
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-900 mb-2">
                  Facebook URL
                </label>
                <input
                  type="url"
                  id="facebook"
                  value={businessSettings.socialMedia.facebook}
                  onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-900 mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  id="instagram"
                  value={businessSettings.socialMedia.instagram}
                  onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
          >
            Uložit změny
          </button>
        </div>
      </div>
    </main>
  );
} 
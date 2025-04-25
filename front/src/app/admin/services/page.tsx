"use client";

import ServiceManager from "@/components/admin/ServiceManager";

export default function ServicesPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-outfit">
            Správa služeb
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Zde můžete spravovat nabízené služby, jejich ceny a dostupnost.
          </p>
        </div>

        <ServiceManager />
      </div>
    </div>
  );
} 
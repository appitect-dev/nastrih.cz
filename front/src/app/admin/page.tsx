"use client";

import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export default function AdminDashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Přehled</h1>
        <p className="text-gray-600 mt-2">
          Vítejte v administraci. Zde najdete přehled o rezervacích, tržbách a dalších důležitých metrikách.
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  );
} 
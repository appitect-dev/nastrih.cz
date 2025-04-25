"use client";

import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <main className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Analytika</h1>
        <p className="mt-1 text-sm text-gray-500">
          Přehled výkonnosti vašeho podnikání, statistiky rezervací a tržeb.
        </p>
      </div>
      
      <AnalyticsDashboard />
    </main>
  );
} 
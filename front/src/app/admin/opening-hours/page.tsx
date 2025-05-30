import OpeningHoursManager from "@/components/admin/OpeningHoursManager";

export default function OpeningHoursPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 font-outfit mb-8">
            Správa otevírací doby
          </h1>
          <OpeningHoursManager />
        </div>
      </div>
    </div>
  );
} 
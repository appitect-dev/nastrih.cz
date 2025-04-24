interface OpeningHours {
  day: string;
  isOpen: boolean;
  hours: {
    from: string;
    to: string;
  };
}

export default function OpeningHoursForm() {
  // Hardcoded data for now
  const openingHours: OpeningHours[] = [
    { day: 'Pondělí', isOpen: true, hours: { from: '09:00', to: '20:00' } },
    { day: 'Úterý', isOpen: true, hours: { from: '09:00', to: '20:00' } },
    { day: 'Středa', isOpen: true, hours: { from: '09:00', to: '20:00' } },
    { day: 'Čtvrtek', isOpen: true, hours: { from: '09:00', to: '20:00' } },
    { day: 'Pátek', isOpen: true, hours: { from: '09:00', to: '20:00' } },
    { day: 'Sobota', isOpen: true, hours: { from: '09:00', to: '17:00' } },
    { day: 'Neděle', isOpen: false, hours: { from: '00:00', to: '00:00' } },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Otevírací doba</h2>
        <button className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors">
          Uložit změny
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {openingHours.map((day, index) => (
          <div
            key={day.day}
            className={`p-6 flex items-center gap-6 ${
              index !== openingHours.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <div className="w-32">
              <span className="font-medium text-gray-900">{day.day}</span>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={day.isOpen}
                  onChange={() => {}}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8B4513] peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B4513]"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {day.isOpen ? 'Otevřeno' : 'Zavřeno'}
                </span>
              </label>
            </div>

            {day.isOpen && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor={`from-${day.day}`} className="text-sm text-gray-600">
                    Od
                  </label>
                  <input
                    type="time"
                    id={`from-${day.day}`}
                    value={day.hours.from}
                    onChange={() => {}}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor={`to-${day.day}`} className="text-sm text-gray-600">
                    Do
                  </label>
                  <input
                    type="time"
                    id={`to-${day.day}`}
                    value={day.hours.to}
                    onChange={() => {}}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-[#8B4513] bg-opacity-10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#8B4513] mb-2">Tip</h3>
        <p className="text-sm text-gray-600">
          Změny v otevírací době se projeví okamžitě v rezervačním systému. Ujistěte se, že máte správně nastavené časy
          a že jsou synchronizované s pracovní dobou vašich barberů.
        </p>
      </div>
    </div>
  );
} 
interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
  };
}

interface BusinessHoursStepProps {
  data: BusinessHours;
  onUpdate: (data: BusinessHours) => void;
}

const DAYS = [
  { id: 'monday', label: 'Pondělí' },
  { id: 'tuesday', label: 'Úterý' },
  { id: 'wednesday', label: 'Středa' },
  { id: 'thursday', label: 'Čtvrtek' },
  { id: 'friday', label: 'Pátek' },
  { id: 'saturday', label: 'Sobota' },
  { id: 'sunday', label: 'Neděle' },
];

export default function BusinessHoursStep({ data, onUpdate }: BusinessHoursStepProps) {
  const handleDayChange = (day: string, field: 'open' | 'close', value: string) => {
    onUpdate({
      ...data,
      [day]: {
        ...data[day],
        [field]: value,
      },
    });
  };

  const handleDayToggle = (day: string) => {
    if (data[day].open && data[day].close) {
      onUpdate({
        ...data,
        [day]: {
          open: '',
          close: '',
        },
      });
    } else {
      onUpdate({
        ...data,
        [day]: {
          open: '09:00',
          close: '18:00',
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Otevírací doba</h2>
        <p className="mt-1 text-sm text-gray-500">
          Nastavte otevírací dobu pro každý den v týdnu.
        </p>
      </div>

      <div className="space-y-4">
        {DAYS.map((day) => (
          <div key={day.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  {day.label}
                </label>
                <button
                  type="button"
                  onClick={() => handleDayToggle(day.id)}
                  className={`text-sm font-medium ${
                    data[day.id].open && data[day.id].close
                      ? 'text-indigo-600 hover:text-indigo-500'
                      : 'text-gray-500 hover:text-gray-400'
                  }`}
                >
                  {data[day.id].open && data[day.id].close ? 'Otevřeno' : 'Zavřeno'}
                </button>
              </div>
              {data[day.id].open && data[day.id].close ? (
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500">Otevřeno</label>
                    <input
                      type="time"
                      value={data[day.id].open}
                      onChange={(e) => handleDayChange(day.id, 'open', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Zavřeno</label>
                    <input
                      type="time"
                      value={data[day.id].close}
                      onChange={(e) => handleDayChange(day.id, 'close', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-500">Zavřeno</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
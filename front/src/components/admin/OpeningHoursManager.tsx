"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format, parseISO, addMinutes } from "date-fns";
import { cs } from "date-fns/locale";

type TimeSlot = {
  start: string; // HH:mm format
  end: string; // HH:mm format
};

type DaySchedule = {
  isOpen: boolean;
  slots: TimeSlot[];
};

type WeekSchedule = {
  [key: string]: DaySchedule;
};

type TemporaryClosure = {
  id: string;
  start: string; // ISO date string
  end: string; // ISO date string
  reason?: string;
};

type Barber = {
  id: string;
  name: string;
  schedule: WeekSchedule;
  temporaryClosures: TemporaryClosure[];
};

const defaultWeekSchedule: WeekSchedule = {
  monday: { isOpen: true, slots: [{ start: "09:00", end: "17:00" }] },
  tuesday: { isOpen: true, slots: [{ start: "09:00", end: "17:00" }] },
  wednesday: { isOpen: true, slots: [{ start: "09:00", end: "17:00" }] },
  thursday: { isOpen: true, slots: [{ start: "09:00", end: "17:00" }] },
  friday: { isOpen: true, slots: [{ start: "09:00", end: "17:00" }] },
  saturday: { isOpen: false, slots: [] },
  sunday: { isOpen: false, slots: [] },
};

const dayNames = {
  monday: "Pondělí",
  tuesday: "Úterý",
  wednesday: "Středa",
  thursday: "Čtvrtek",
  friday: "Pátek",
  saturday: "Sobota",
  sunday: "Neděle",
};

export default function OpeningHoursManager() {
  const [selectedBarber, setSelectedBarber] = useState<string>("1");
  const [barbers, setBarbers] = useState<Barber[]>([
    {
      id: "1",
      name: "Adam Novák",
      schedule: defaultWeekSchedule,
      temporaryClosures: [],
    },
    {
      id: "2",
      name: "Jan Svoboda",
      schedule: defaultWeekSchedule,
      temporaryClosures: [],
    },
  ]);
  const [isAddingClosure, setIsAddingClosure] = useState(false);
  const [newClosure, setNewClosure] = useState<Partial<TemporaryClosure>>({});

  const currentBarber = barbers.find((b) => b.id === selectedBarber)!;

  const handleDayToggle = (day: string) => {
    setBarbers((prev) =>
      prev.map((barber) =>
        barber.id === selectedBarber
          ? {
              ...barber,
              schedule: {
                ...barber.schedule,
                [day]: {
                  ...barber.schedule[day],
                  isOpen: !barber.schedule[day].isOpen,
                },
              },
            }
          : barber
      )
    );
  };

  const handleSlotChange = (day: string, slotIndex: number, field: keyof TimeSlot, value: string) => {
    setBarbers((prev) =>
      prev.map((barber) =>
        barber.id === selectedBarber
          ? {
              ...barber,
              schedule: {
                ...barber.schedule,
                [day]: {
                  ...barber.schedule[day],
                  slots: barber.schedule[day].slots.map((slot, idx) =>
                    idx === slotIndex ? { ...slot, [field]: value } : slot
                  ),
                },
              },
            }
          : barber
      )
    );
  };

  const addSlot = (day: string) => {
    setBarbers((prev) =>
      prev.map((barber) =>
        barber.id === selectedBarber
          ? {
              ...barber,
              schedule: {
                ...barber.schedule,
                [day]: {
                  ...barber.schedule[day],
                  slots: [...barber.schedule[day].slots, { start: "09:00", end: "17:00" }],
                },
              },
            }
          : barber
      )
    );
  };

  const removeSlot = (day: string, slotIndex: number) => {
    setBarbers((prev) =>
      prev.map((barber) =>
        barber.id === selectedBarber
          ? {
              ...barber,
              schedule: {
                ...barber.schedule,
                [day]: {
                  ...barber.schedule[day],
                  slots: barber.schedule[day].slots.filter((_, idx) => idx !== slotIndex),
                },
              },
            }
          : barber
      )
    );
  };

  const handleAddClosure = () => {
    if (newClosure.start && newClosure.end) {
      const closure: TemporaryClosure = {
        id: Math.random().toString(36).substr(2, 9),
        start: newClosure.start,
        end: newClosure.end,
        reason: newClosure.reason || undefined,
      };
      setBarbers((prev) =>
        prev.map((barber) =>
          barber.id === selectedBarber
            ? {
                ...barber,
                temporaryClosures: [...barber.temporaryClosures, closure],
              }
            : barber
        )
      );
      setNewClosure({});
      setIsAddingClosure(false);
    }
  };

  const removeClosure = (id: string) => {
    setBarbers((prev) =>
      prev.map((barber) =>
        barber.id === selectedBarber
          ? {
              ...barber,
              temporaryClosures: barber.temporaryClosures.filter((closure) => closure.id !== id),
            }
          : barber
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Barber Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Vyberte holiče</h2>
        </div>
        <div className="p-6">
          <div className="flex gap-4">
            {barbers.map((barber) => (
              <button
                key={barber.id}
                onClick={() => setSelectedBarber(barber.id)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedBarber === barber.id
                    ? "bg-amber-100 text-amber-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {barber.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Regular Opening Hours */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Pravidelná otevírací doba - {currentBarber.name}
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {Object.entries(currentBarber.schedule).map(([day, schedule]) => (
            <div key={day} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <button
                    onClick={() => handleDayToggle(day)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${
                      schedule.isOpen ? "bg-amber-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        schedule.isOpen ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {dayNames[day as keyof typeof dayNames]}
                  </span>
                </div>
              </div>

              {schedule.isOpen && (
                <div className="space-y-4">
                  {schedule.slots.map((slot, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) => handleSlotChange(day, idx, "start", e.target.value)}
                        className="rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-gray-900"
                      />
                      <span className="text-gray-900">do</span>
                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) => handleSlotChange(day, idx, "end", e.target.value)}
                        className="rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-gray-900"
                      />
                      <button
                        onClick={() => removeSlot(day, idx)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addSlot(day)}
                    className="inline-flex items-center text-sm text-amber-600 hover:text-amber-700"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Přidat časový slot
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Temporary Closures */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Dočasné uzavření - {currentBarber.name}
          </h2>
        </div>
        <div className="p-6">
          {currentBarber.temporaryClosures.map((closure) => (
            <motion.div
              key={closure.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center justify-between p-4 mb-4 bg-amber-50 rounded-lg border border-amber-100"
            >
              <div>
                <div className="font-medium text-amber-900">
                  {format(parseISO(closure.start), "d. MMMM yyyy H:mm", { locale: cs })} -{" "}
                  {format(parseISO(closure.end), "H:mm", { locale: cs })}
                </div>
                {closure.reason && (
                  <div className="text-sm text-amber-700 mt-1">{closure.reason}</div>
                )}
              </div>
              <button
                onClick={() => removeClosure(closure.id)}
                className="text-amber-600 hover:text-amber-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          ))}

          {isAddingClosure ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Začátek
                  </label>
                  <input
                    type="datetime-local"
                    value={newClosure.start}
                    onChange={(e) => setNewClosure({ ...newClosure, start: e.target.value })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Konec
                  </label>
                  <input
                    type="datetime-local"
                    value={newClosure.end}
                    onChange={(e) => setNewClosure({ ...newClosure, end: e.target.value })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-gray-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Důvod (nepovinné)
                  </label>
                  <input
                    type="text"
                    value={newClosure.reason || ""}
                    onChange={(e) => setNewClosure({ ...newClosure, reason: e.target.value })}
                    placeholder="Např. Dovolená, Lékař, ..."
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-gray-900"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setIsAddingClosure(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Zrušit
                </button>
                <button
                  onClick={handleAddClosure}
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700"
                >
                  Přidat uzavření
                </button>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setIsAddingClosure(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Přidat dočasné uzavření
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 
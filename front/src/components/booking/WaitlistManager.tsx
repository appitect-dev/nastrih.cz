"use client";

import { useState } from 'react';
import { 
  BellIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  CalendarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTimes: string[];
  service: string;
  status: 'waiting' | 'notified' | 'booked';
  createdAt: string;
}

const mockWaitlist: WaitlistEntry[] = [
  {
    id: '1',
    name: 'Jan Novák',
    email: 'jan@example.com',
    phone: '+420 123 456 789',
    preferredDate: '2024-03-20',
    preferredTimes: ['09:00', '10:00', '11:00'],
    service: 'Pánský střih',
    status: 'waiting',
    createdAt: '2024-03-15T10:00:00',
  },
  {
    id: '2',
    name: 'Petr Svoboda',
    email: 'petr@example.com',
    phone: '+420 987 654 321',
    preferredDate: '2024-03-21',
    preferredTimes: ['14:00', '15:00'],
    service: 'Holení',
    status: 'notified',
    createdAt: '2024-03-16T14:30:00',
  },
];

export default function WaitlistManager() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(mockWaitlist);
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null);

  const handleNotify = (entry: WaitlistEntry) => {
    // TODO: Implement notification logic
    setWaitlist(prev =>
      prev.map(item =>
        item.id === entry.id ? { ...item, status: 'notified' } : item
      )
    );
  };

  const handleBook = (entry: WaitlistEntry) => {
    // TODO: Implement booking logic
    setWaitlist(prev =>
      prev.map(item =>
        item.id === entry.id ? { ...item, status: 'booked' } : item
      )
    );
  };

  const handleRemove = (entry: WaitlistEntry) => {
    setWaitlist(prev => prev.filter(item => item.id !== entry.id));
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Čekací listina
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Správa zákazníků na čekací listině
        </p>
      </div>
      <div className="border-t border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zákazník
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preferovaný termín
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Služba
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akce
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {waitlist.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {entry.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(entry.preferredDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {entry.preferredTimes.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        entry.status === 'waiting'
                          ? 'bg-yellow-100 text-yellow-800'
                          : entry.status === 'notified'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {entry.status === 'waiting'
                        ? 'Čeká'
                        : entry.status === 'notified'
                        ? 'Upozorněn'
                        : 'Rezervováno'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {entry.status === 'waiting' && (
                        <button
                          onClick={() => handleNotify(entry)}
                          className="text-amber-600 hover:text-amber-900"
                        >
                          <BellIcon className="h-5 w-5" />
                        </button>
                      )}
                      {entry.status === 'notified' && (
                        <button
                          onClick={() => handleBook(entry)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CalendarIcon className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemove(entry)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
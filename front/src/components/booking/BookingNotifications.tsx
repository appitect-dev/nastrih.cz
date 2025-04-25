"use client";

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { BellIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface NotificationSettings {
  emailReminders: boolean;
  smsReminders: boolean;
  reminderTime: number; // hours before appointment
  followUpEmails: boolean;
  reviewRequests: boolean;
}

export default function BookingNotifications() {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailReminders: true,
    smsReminders: true,
    reminderTime: 24,
    followUpEmails: true,
    reviewRequests: true,
  });

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleReminderTimeChange = (hours: number) => {
    setSettings(prev => ({
      ...prev,
      reminderTime: hours,
    }));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Nastavení notifikací
      </h2>

      <div className="space-y-6">
        {/* Email Reminders */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Email připomenutí</p>
              <p className="text-sm text-gray-500">
                Automatické připomenutí rezervace emailem
              </p>
            </div>
          </div>
          <Switch
            checked={settings.emailReminders}
            onChange={() => handleToggle('emailReminders')}
            className={`${
              settings.emailReminders ? 'bg-amber-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                settings.emailReminders ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        {/* SMS Reminders */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">SMS připomenutí</p>
              <p className="text-sm text-gray-500">
                Automatické připomenutí rezervace SMS
              </p>
            </div>
          </div>
          <Switch
            checked={settings.smsReminders}
            onChange={() => handleToggle('smsReminders')}
            className={`${
              settings.smsReminders ? 'bg-amber-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                settings.smsReminders ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        {/* Reminder Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BellIcon className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Čas připomenutí</p>
              <p className="text-sm text-gray-500">
                Kolik hodin před rezervací poslat připomenutí
              </p>
            </div>
          </div>
          <select
            value={settings.reminderTime}
            onChange={(e) => handleReminderTimeChange(Number(e.target.value))}
            className="mt-1 block w-32 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
          >
            <option value={1}>1 hodina</option>
            <option value={3}>3 hodiny</option>
            <option value={6}>6 hodin</option>
            <option value={12}>12 hodin</option>
            <option value={24}>24 hodin</option>
            <option value={48}>48 hodin</option>
          </select>
        </div>

        {/* Follow-up Emails */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Následné emaily</p>
              <p className="text-sm text-gray-500">
                Poslat email po návštěvě s poděkováním
              </p>
            </div>
          </div>
          <Switch
            checked={settings.followUpEmails}
            onChange={() => handleToggle('followUpEmails')}
            className={`${
              settings.followUpEmails ? 'bg-amber-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                settings.followUpEmails ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        {/* Review Requests */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BellIcon className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Žádosti o recenze</p>
              <p className="text-sm text-gray-500">
                Poslat žádost o recenzi po návštěvě
              </p>
            </div>
          </div>
          <Switch
            checked={settings.reviewRequests}
            onChange={() => handleToggle('reviewRequests')}
            className={`${
              settings.reviewRequests ? 'bg-amber-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                settings.reviewRequests ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

interface EnhancedBookingProps {
  serviceId: string;
  onClose: () => void;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  isRecurring: boolean;
  recurrencePattern: 'weekly' | 'biweekly' | 'monthly' | null;
  recurrenceEndDate: string | null;
  joinWaitlist: boolean;
  preferredAlternativeTimes: string[];
  questionnaireAnswers: Record<string, string>;
}

export default function EnhancedBooking({ serviceId, onClose }: EnhancedBookingProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState<'details' | 'recurrence' | 'waitlist' | 'questionnaire'>('details');
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    isRecurring: false,
    recurrencePattern: null,
    recurrenceEndDate: null,
    joinWaitlist: false,
    preferredAlternativeTimes: [],
    questionnaireAnswers: {},
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement booking submission logic
    console.log('Booking submitted:', formData);
    setIsOpen(false);
    onClose();
  };

  const handleRecurrenceChange = (pattern: 'weekly' | 'biweekly' | 'monthly') => {
    setFormData(prev => ({
      ...prev,
      recurrencePattern: pattern,
    }));
  };

  const handleWaitlistToggle = () => {
    setFormData(prev => ({
      ...prev,
      joinWaitlist: !prev.joinWaitlist,
    }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {step === 'details' && 'Detaily rezervace'}
                  {step === 'recurrence' && 'Opakující se rezervace'}
                  {step === 'waitlist' && 'Čekací listina'}
                  {step === 'questionnaire' && 'Dotazník'}
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4">
                  {step === 'details' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Jméno
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                          Datum
                        </label>
                        <input
                          type="date"
                          id="date"
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                          Čas
                        </label>
                        <input
                          type="time"
                          id="time"
                          value={formData.time}
                          onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {step === 'recurrence' && (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isRecurring"
                          checked={formData.isRecurring}
                          onChange={(e) => setFormData(prev => ({ ...prev, isRecurring: e.target.checked }))}
                          className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                        <label htmlFor="isRecurring" className="ml-2 block text-sm text-gray-900">
                          Opakující se rezervace
                        </label>
                      </div>

                      {formData.isRecurring && (
                        <>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Frekvence
                            </label>
                            <div className="space-y-2">
                              {['weekly', 'biweekly', 'monthly'].map((pattern) => (
                                <div key={pattern} className="flex items-center">
                                  <input
                                    type="radio"
                                    id={pattern}
                                    name="recurrencePattern"
                                    checked={formData.recurrencePattern === pattern}
                                    onChange={() => handleRecurrenceChange(pattern as 'weekly' | 'biweekly' | 'monthly')}
                                    className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-500"
                                  />
                                  <label htmlFor={pattern} className="ml-2 block text-sm text-gray-900">
                                    {pattern === 'weekly' && 'Každý týden'}
                                    {pattern === 'biweekly' && 'Každé 2 týdny'}
                                    {pattern === 'monthly' && 'Každý měsíc'}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label htmlFor="recurrenceEndDate" className="block text-sm font-medium text-gray-700">
                              Konec opakování
                            </label>
                            <input
                              type="date"
                              id="recurrenceEndDate"
                              value={formData.recurrenceEndDate || ''}
                              onChange={(e) => setFormData(prev => ({ ...prev, recurrenceEndDate: e.target.value }))}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {step === 'waitlist' && (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="joinWaitlist"
                          checked={formData.joinWaitlist}
                          onChange={handleWaitlistToggle}
                          className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                        <label htmlFor="joinWaitlist" className="ml-2 block text-sm text-gray-900">
                          Přidat do čekací listiny
                        </label>
                      </div>

                      {formData.joinWaitlist && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Preferované alternativní časy
                          </label>
                          <div className="mt-2 space-y-2">
                            {['08:00', '09:00', '10:00', '11:00', '12:00'].map((time) => (
                              <div key={time} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`time-${time}`}
                                  checked={formData.preferredAlternativeTimes.includes(time)}
                                  onChange={(e) => {
                                    const newTimes = e.target.checked
                                      ? [...formData.preferredAlternativeTimes, time]
                                      : formData.preferredAlternativeTimes.filter(t => t !== time);
                                    setFormData(prev => ({ ...prev, preferredAlternativeTimes: newTimes }));
                                  }}
                                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                />
                                <label htmlFor={`time-${time}`} className="ml-2 block text-sm text-gray-900">
                                  {time}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 'questionnaire' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="hairLength" className="block text-sm font-medium text-gray-700">
                          Délka vlasů
                        </label>
                        <select
                          id="hairLength"
                          value={formData.questionnaireAnswers.hairLength || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            questionnaireAnswers: {
                              ...prev.questionnaireAnswers,
                              hairLength: e.target.value,
                            },
                          }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                        >
                          <option value="">Vyberte délku</option>
                          <option value="short">Krátké</option>
                          <option value="medium">Střední</option>
                          <option value="long">Dlouhé</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="previousStyle" className="block text-sm font-medium text-gray-700">
                          Předchozí střih
                        </label>
                        <textarea
                          id="previousStyle"
                          value={formData.questionnaireAnswers.previousStyle || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            questionnaireAnswers: {
                              ...prev.questionnaireAnswers,
                              previousStyle: e.target.value,
                            },
                          }))}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between">
                    {step !== 'details' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (step === 'recurrence') setStep('details');
                          if (step === 'waitlist') setStep('recurrence');
                          if (step === 'questionnaire') setStep('waitlist');
                        }}
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      >
                        Zpět
                      </button>
                    )}
                    {step !== 'questionnaire' ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (step === 'details') setStep('recurrence');
                          if (step === 'recurrence') setStep('waitlist');
                          if (step === 'waitlist') setStep('questionnaire');
                        }}
                        className="inline-flex justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                      >
                        Další
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                      >
                        Potvrdit rezervaci
                      </button>
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 
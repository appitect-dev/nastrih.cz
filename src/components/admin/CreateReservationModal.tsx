import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface CreateReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    customerName: string;
    service: string;
    duration: number;
    time: string;
    date: Date;
  }) => void;
  barberName: string;
  selectedTime: string;
  selectedDate: Date;
}

const SERVICES = [
  { name: 'Střih a úprava vousu', duration: 60 },
  { name: 'Speciální střih strojkem a úprava vousu', duration: 60 },
  { name: 'Střih strojkem a úprava vousu', duration: 45 },
  { name: 'Střih vlasů', duration: 45 },
  { name: 'Úprava/holení vousu', duration: 30 },
];

export default function CreateReservationModal({
  isOpen,
  onClose,
  onSubmit,
  barberName,
  selectedTime,
  selectedDate,
}: CreateReservationModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      customerName,
      service: selectedService.name,
      duration: selectedService.duration,
      time: selectedTime,
      date: selectedDate,
    });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                  Nová rezervace
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">Holič</label>
                    <div className="mt-1 text-gray-900 font-medium">{barberName}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900">Datum a čas</label>
                    <div className="mt-1 text-gray-900 font-medium">
                      {selectedDate.toLocaleDateString('cs-CZ')} v {selectedTime}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-900">
                      Jméno zákazníka
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B4513] focus:ring-[#8B4513] sm:text-sm text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-900">
                      Služba
                    </label>
                    <select
                      id="service"
                      value={selectedService.name}
                      onChange={(e) => {
                        const service = SERVICES.find((s) => s.name === e.target.value);
                        if (service) setSelectedService(service);
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B4513] focus:ring-[#8B4513] sm:text-sm text-gray-900"
                    >
                      {SERVICES.map((service) => (
                        <option key={service.name} value={service.name}>
                          {service.name} ({service.duration} min)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2"
                    >
                      Zrušit
                    </button>
                    <button
                      type="submit"
                      className="rounded-md border border-transparent bg-[#8B4513] px-4 py-2 text-sm font-medium text-white hover:bg-[#6d3610] focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2"
                    >
                      Vytvořit rezervaci
                    </button>
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
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

interface BarberFormData {
  name: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  specialties: string[];
  isActive: boolean;
}

interface BarberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BarberFormData) => void;
  initialData?: BarberFormData | null;
}

const SPECIALTY_OPTIONS = [
  "Klasické střihy",
  "Moderní střihy",
  "Úprava vousů",
  "Hot towel shave",
  "Barvení vlasů",
  "Styling",
  "Dětské střihy",
];

export default function BarberForm({ isOpen, onClose, onSubmit, initialData }: BarberFormProps) {
  const [formData, setFormData] = useState<BarberFormData>({
    name: "",
    email: "",
    phone: "",
    photo: "",
    bio: "",
    specialties: [],
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        photo: "",
        bio: "",
        specialties: [],
        isActive: true,
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof BarberFormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 mb-6">
                  {initialData ? "Upravit holiče" : "Přidat nového holiče"}
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                        Jméno
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="photo" className="block text-sm font-medium text-gray-900 mb-2">
                        Fotografie URL
                      </label>
                      <input
                        type="url"
                        id="photo"
                        value={formData.photo}
                        onChange={(e) => handleChange("photo", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-900 mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleChange("bio", e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Specializace
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SPECIALTY_OPTIONS.map((specialty) => (
                        <button
                          key={specialty}
                          type="button"
                          onClick={() => handleSpecialtyToggle(specialty)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            formData.specialties.includes(specialty)
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => handleChange("isActive", e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                      Holič je aktivní
                    </label>
                  </div>

                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      Zrušit
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2.5 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      {initialData ? "Uložit změny" : "Přidat holiče"}
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
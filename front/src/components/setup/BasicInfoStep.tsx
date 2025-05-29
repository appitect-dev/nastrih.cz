interface BasicInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

interface BasicInfoStepProps {
  data: BasicInfo;
  onUpdate: (data: BasicInfo) => void;
}

export default function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Základní informace</h2>
        <p className="mt-1 text-sm text-gray-500">
          Zadejte základní informace o vaší kadeřnictví.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Název kadeřnictví
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Ulice a číslo popisné
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="address"
              id="address"
              value={data.address}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Město
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="city"
              id="city"
              value={data.city}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            PSČ
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              value={data.postalCode}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefonní číslo
          </label>
          <div className="mt-1">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={data.phone}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mailová adresa
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
} 
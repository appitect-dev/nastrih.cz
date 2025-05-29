interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: {
    min: number;
    max: number;
  };
}

interface ServicesStepProps {
  data: Service[];
  onUpdate: (data: Service[]) => void;
}

export default function ServicesStep({ data, onUpdate }: ServicesStepProps) {
  const handleAddService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: '',
      description: '',
      duration: 30,
      price: {
        min: 0,
        max: 0
      },
    };
    onUpdate([...data, newService]);
  };

  const handleRemoveService = (id: string) => {
    onUpdate(data.filter(service => service.id !== id));
  };

  const handleServiceChange = (id: string, field: keyof Service, value: string | number) => {
    onUpdate(
      data.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const handlePriceChange = (id: string, type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    onUpdate(
      data.map(service =>
        service.id === id
          ? {
              ...service,
              price: {
                ...service.price,
                [type]: numValue,
              },
            }
          : service
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Služby</h2>
        <p className="mt-1 text-sm text-gray-500">
          Přidejte služby, které vaše kadeřnictví nabízí.
        </p>
      </div>

      <div className="space-y-4">
        {data.map((service) => (
          <div key={service.id} className="flex items-start justify-between p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex-1">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)}
                    className="block w-full text-base font-medium text-gray-900 border-0 p-0 focus:ring-0"
                    placeholder="Název služby"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveService(service.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <input
                  type="text"
                  value={service.description}
                  onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                  className="block w-full text-sm text-gray-500 border-0 p-0 focus:ring-0"
                  placeholder="Popis služby"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={service.price.min}
                  onChange={(e) => handlePriceChange(service.id, 'min', e.target.value)}
                  className="block w-20 text-right rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="0"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={service.price.max}
                  onChange={(e) => handlePriceChange(service.id, 'max', e.target.value)}
                  className="block w-20 text-right rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="0"
                />
                <span className="text-gray-500">Kč</span>
              </div>
              <div className="text-right">
                <input
                  type="number"
                  value={service.duration}
                  onChange={(e) => handleServiceChange(service.id, 'duration', parseInt(e.target.value))}
                  className="block w-16 text-right rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="15"
                  step="15"
                />
                <span className="text-sm text-gray-500">minut</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddService}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Přidat službu
      </button>
    </div>
  );
} 
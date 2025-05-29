interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
}

interface StaffStepProps {
  data: StaffMember[];
  onUpdate: (data: StaffMember[]) => void;
}

export default function StaffStep({ data, onUpdate }: StaffStepProps) {
  const handleAddStaff = () => {
    const newStaff: StaffMember = {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      services: [],
    };
    onUpdate([...data, newStaff]);
  };

  const handleRemoveStaff = (id: string) => {
    onUpdate(data.filter(staff => staff.id !== id));
  };

  const handleStaffChange = (id: string, field: keyof StaffMember, value: string | string[]) => {
    onUpdate(
      data.map(staff =>
        staff.id === id ? { ...staff, [field]: value } : staff
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Zaměstnanci</h2>
        <p className="mt-1 text-sm text-gray-500">
          Přidejte kadeřníky a zaměstnance, kteří budou poskytovat služby.
        </p>
      </div>

      <div className="space-y-4">
        {data.map((staff) => (
          <div key={staff.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Jméno</label>
                <input
                  type="text"
                  value={staff.name}
                  onChange={(e) => handleStaffChange(staff.id, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Celé jméno"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">E-mail</label>
                <input
                  type="email"
                  value={staff.email}
                  onChange={(e) => handleStaffChange(staff.id, 'email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="email@priklad.cz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefon</label>
                <input
                  type="tel"
                  value={staff.phone}
                  onChange={(e) => handleStaffChange(staff.id, 'phone', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="+420 123 456 789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Služby</label>
                <input
                  type="text"
                  value={staff.services.join(', ')}
                  onChange={(e) => handleStaffChange(staff.id, 'services', e.target.value.split(',').map(s => s.trim()))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ID služeb (oddělené čárkou)"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveStaff(staff.id)}
              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddStaff}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Přidat zaměstnance
      </button>
    </div>
  );
} 
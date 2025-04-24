interface Barber {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  isActive: boolean;
}

export default function BarberList() {
  // Hardcoded data for now
  const barbers: Barber[] = [
    {
      id: '1',
      name: 'Tomáš Novák',
      email: 'tomas@nastrih.cz',
      phone: '+420 777 888 999',
      specialization: ['Klasické střihy', 'Úprava vousů', 'Holení'],
      isActive: true
    },
    {
      id: '2',
      name: 'Jan Svoboda',
      email: 'jan@nastrih.cz',
      phone: '+420 777 666 555',
      specialization: ['Moderní střihy', 'Styling', 'Barvení'],
      isActive: true
    },
    {
      id: '3',
      name: 'Martin Dvořák',
      email: 'martin@nastrih.cz',
      phone: '+420 777 444 333',
      specialization: ['Klasické střihy', 'Holení', 'Hot towel'],
      isActive: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Barbeři</h2>
        <button className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors">
          Přidat barbera
        </button>
      </div>

      <div className="grid gap-6">
        {barbers.map((barber) => (
          <div
            key={barber.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{barber.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      barber.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {barber.isActive ? 'Aktivní' : 'Neaktivní'}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {barber.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {barber.phone}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {barber.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#8B4513] bg-opacity-10 text-[#8B4513] text-sm rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-[#8B4513] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
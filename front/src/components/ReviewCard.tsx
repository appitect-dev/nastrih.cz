'use client';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: number;
}

interface Barber {
  id: string;
  name: string;
  description: string;
}

interface ReviewCardProps {
  service: Service;
  barber: Barber;
  date: string;
  time: string;
}

export default function ReviewCard({ service, barber, date, time }: ReviewCardProps) {
  // Format the date to Czech locale
  const formattedDate = new Date(date).toLocaleDateString('cs-CZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Barbershop Info */}
      <div className="text-center mb-8 pb-8 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">The Barber House</h2>
        <p className="text-gray-600">Vinohradská 1233/22, Praha 2</p>
      </div>

      {/* Service Details */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">SLUŽBA</h3>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-lg text-gray-900">{service.name}</p>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{service.price} Kč</p>
              <p className="text-sm text-gray-500">{service.duration} minut</p>
            </div>
          </div>
        </div>

        {/* Barber Details */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">VÁŠ BARBER</h3>
          <p className="font-semibold text-lg text-gray-900">{barber.name}</p>
          <p className="text-sm text-gray-600">{barber.description}</p>
        </div>

        {/* Date and Time */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">TERMÍN</h3>
          <p className="font-semibold text-lg text-gray-900">
            {formattedDate}
          </p>
          <p className="text-sm text-gray-600">
            {time} hodin
          </p>
        </div>
      </div>
    </div>
  );
} 
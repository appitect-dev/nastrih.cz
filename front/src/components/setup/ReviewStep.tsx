interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
}

interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
  };
}

interface FormData {
  basicInfo: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    email: string;
  };
  services: Service[];
  staff: StaffMember[];
  businessHours: BusinessHours;
}

interface ReviewStepProps {
  data: FormData;
}

const DAYS = [
  { id: 'monday', label: 'Monday' },
  { id: 'tuesday', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
  { id: 'sunday', label: 'Sunday' },
];

export default function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Review Your Setup</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please review all the information before completing your barbershop setup.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Barbershop Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.basicInfo.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.basicInfo.address}, {data.basicInfo.city} {data.basicInfo.postalCode}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Contact</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.basicInfo.phone}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.basicInfo.email}</dd>
            </div>
          </dl>
        </div>

        {/* Services */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Services</h3>
          <div className="mt-4 space-y-4">
            {data.services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-500">
                    {service.duration} minutes • {service.price} CZK
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Staff Members</h3>
          <div className="mt-4 space-y-4">
            {data.staff.map((staff) => (
              <div key={staff.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{staff.name}</h4>
                  <p className="text-sm text-gray-500">{staff.email}</p>
                  <p className="text-sm text-gray-500">{staff.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
          <div className="mt-4 space-y-4">
            {DAYS.map((day) => (
              <div key={day.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">{day.label}</span>
                {data.businessHours[day.id].open && data.businessHours[day.id].close ? (
                  <span className="text-sm text-gray-500">
                    {data.businessHours[day.id].open} - {data.businessHours[day.id].close}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
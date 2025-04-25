import { Service } from "./ServiceManager";

interface ServiceCardProps {
  service: Service;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}

export default function ServiceCard({ service, onEdit, onDelete, onToggle }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-shadow hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {service.name}
              </h3>
              <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                service.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
              }`}>
                {service.isActive ? "Aktivní" : "Neaktivní"}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {service.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center px-3 py-1.5 rounded-full bg-gray-50 text-gray-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{service.duration} min</span>
              </div>
              <div className="flex items-center px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 font-medium">
                {service.price} Kč
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-2.5 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
              title="Upravit službu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Smazat službu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={service.isActive}
            onChange={onToggle}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-600/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-700">
            Změnit stav služby
          </span>
        </label>
      </div>
    </div>
  );
} 
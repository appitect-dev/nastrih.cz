import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "./ServiceCard";
import ServiceForm from "./ServiceForm";

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  isActive: boolean;
}

export default function ServiceManager() {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Střih vlasů",
      description: "Klasický střih vlasů včetně umytí a stylingu",
      duration: 45,
      price: 450,
      isActive: true,
    },
    {
      id: "2",
      name: "Úprava vousu",
      description: "Profesionální péče o vousy včetně střihu a tvarování",
      duration: 30,
      price: 350,
      isActive: true,
    },
    {
      id: "3",
      name: "Kompletní péče",
      description: "Střih vlasů a úprava vousu v jednom",
      duration: 90,
      price: 750,
      isActive: true,
    },
  ]);

  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleAddService = (newService: Omit<Service, "id">) => {
    const service: Service = {
      ...newService,
      id: Math.random().toString(36).substr(2, 9),
    };
    setServices((prev) => [...prev, service]);
    setIsAddingService(false);
  };

  const handleUpdateService = (updatedService: Service) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
    setEditingService(null);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices((prev) => prev.filter((service) => service.id !== serviceId));
  };

  const handleToggleService = (serviceId: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? { ...service, isActive: !service.isActive }
          : service
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Služby</h2>
        <button
          onClick={() => setIsAddingService(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Přidat službu
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ServiceCard
                service={service}
                onEdit={() => setEditingService(service)}
                onDelete={() => handleDeleteService(service.id)}
                onToggle={() => handleToggleService(service.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ServiceForm
        isOpen={isAddingService || editingService !== null}
        onClose={() => {
          setIsAddingService(false);
          setEditingService(null);
        }}
        onSubmit={(service) => {
          if (editingService) {
            handleUpdateService({ ...service, id: editingService.id });
          } else {
            handleAddService(service);
          }
        }}
        initialData={editingService}
      />
    </div>
  );
} 
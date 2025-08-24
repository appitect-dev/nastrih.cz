package cz.nastrih.service;

import cz.nastrih.entity.Service;
import cz.nastrih.repository.ServiceRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@org.springframework.stereotype.Service
public class ServiceService {
    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<Service> findAll() {
        return serviceRepository.findAll();
    }

    public Optional<Service> findById(UUID id) {
        return serviceRepository.findById(id);
    }

    public Service save(Service service) {
        return serviceRepository.save(service);
    }

    public void deleteById(UUID id) {
        serviceRepository.deleteById(id);
    }

    public List<Service> findActive() {
        return serviceRepository.findAll().stream()
                .filter(Service::isActive)
                .toList();
    }
}

package cz.nastrih.service;

import cz.nastrih.entity.Organization;
import cz.nastrih.repository.OrganizationRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public List<Organization> findAll() {
        return organizationRepository.findAll();
    }

    public Optional<Organization> findById(Long id) {
        return organizationRepository.findById(id);
    }

    public Organization save(Organization organization) {
        return organizationRepository.save(organization);
    }

    public void deleteById(Long id) {
        organizationRepository.deleteById(id);
    }
}

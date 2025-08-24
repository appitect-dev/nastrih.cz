package cz.nastrih.controller;

import cz.nastrih.dtos.OrganizationCreationDto;
import cz.nastrih.dtos.OrganizationUpdateDto;
import cz.nastrih.entity.Organization;
import cz.nastrih.service.OrganizationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {
    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping
    public ResponseEntity<List<Organization>> getAllOrganizations() {
        return ResponseEntity.ok(organizationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Organization> getOrganizationById(@PathVariable Long id) {
        return organizationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Organization> createOrganization(@Valid @RequestBody OrganizationCreationDto dto) {
        Organization organization = Organization.builder()
                .name(dto.getName())
                .address(dto.getAddress())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .website(dto.getWebsite())
                .build();
        return ResponseEntity.ok(organizationService.save(organization));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Organization> updateOrganization(@PathVariable Long id, @Valid @RequestBody OrganizationUpdateDto dto) {
        return organizationService.findById(id)
                .map(existing -> {
                    existing.setName(dto.getName());
                    existing.setAddress(dto.getAddress());
                    existing.setPhone(dto.getPhone());
                    existing.setEmail(dto.getEmail());
                    existing.setWebsite(dto.getWebsite());
                    return ResponseEntity.ok(organizationService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrganization(@PathVariable Long id) {
        if (organizationService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        organizationService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}


package cz.nastrih.controller;

// Řadič pro správu služeb (stříhání, holení apod.).
// - Veřejné čtení (vše/aktivní)
// - CRUD operace pro administraci/kadeřníky

import cz.nastrih.dtos.ServiceCreateDto;
import cz.nastrih.dtos.ServiceUpdateDto;
import cz.nastrih.entity.Service;
import cz.nastrih.service.ServiceService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Tag(name = "Services", description = "Správa služeb (čtení veřejné, změny chráněné)")
@RestController
@RequestMapping("/api/services")
public class ServiceController {
    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        return ResponseEntity.ok(serviceService.findAll());
    }

    @GetMapping("/active")
    public ResponseEntity<List<Service>> getActiveServices() {
        return ResponseEntity.ok(serviceService.findActive());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable UUID id) {
        return serviceService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @SecurityRequirement(name = "bearerAuth")
    @PostMapping
    public ResponseEntity<Service> createService(@Valid @RequestBody ServiceCreateDto dto) {
        Service service = Service.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .duration(dto.getDuration())
                .price(dto.getPrice())
                .active(dto.getIsActive() != null ? dto.getIsActive() : true)
                .build();
        return ResponseEntity.ok(serviceService.save(service));
    }

    @SecurityRequirement(name = "bearerAuth")
    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(@PathVariable UUID id, @Valid @RequestBody ServiceUpdateDto dto) {
        Optional<Service> existing = serviceService.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Service service = existing.get();
        service.setName(dto.getName());
        service.setDescription(dto.getDescription());
        service.setDuration(dto.getDuration());
        service.setPrice(dto.getPrice());
        service.setActive(dto.getIsActive() != null ? dto.getIsActive() : service.isActive());
        return ResponseEntity.ok(serviceService.save(service));
    }

    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable UUID id) {
        if (serviceService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        serviceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

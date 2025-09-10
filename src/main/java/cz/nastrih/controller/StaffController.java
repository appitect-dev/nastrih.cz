package cz.nastrih.controller;

// Řadič pro správu personálu (kadeřníků/barberů).
// - Veřejné čtení (vše/aktivní)
// - CRUD operace pro interní správu

import cz.nastrih.dtos.StaffCreateDto;
import cz.nastrih.dtos.StaffUpdateDto;
import cz.nastrih.entity.Staff;
import cz.nastrih.entity.User;
import cz.nastrih.entity.Service;
import cz.nastrih.service.StaffService;
import cz.nastrih.service.UserService;
import cz.nastrih.service.ServiceService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Tag(name = "Staff", description = "Správa personálu (čtení veřejné, změny chráněné)")
@RestController
@RequestMapping("/api/staff")
public class StaffController {
    private final StaffService staffService;
    private final UserService userService;
    private final ServiceService serviceService;

    public StaffController(StaffService staffService, UserService userService, ServiceService serviceService) {
        this.staffService = staffService;
        this.userService = userService;
        this.serviceService = serviceService;
    }

    // Vrátí všechny záznamy o personálu
    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        return ResponseEntity.ok(staffService.findAll());
    }

    // Vrátí pouze aktivní personál
    @GetMapping("/active")
    public ResponseEntity<List<Staff>> getActiveStaff() {
        return ResponseEntity.ok(staffService.findActive());
    }

    // Vrátí detail personálu podle ID
    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable UUID id) {
        return staffService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Vytvoří nového člena personálu
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping
    public ResponseEntity<Staff> createStaff(@Valid @RequestBody StaffCreateDto dto) {
        Optional<User> user = userService.findById(dto.getUserId());
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Staff staff = Staff.builder()
                .user(user.get())
                .bio(dto.getBio())
                .active(dto.getIsActive() != null ? dto.getIsActive() : true)
                .build();
        return ResponseEntity.ok(staffService.save(staff));
    }

    // Aktualizuje existující záznam o personálu
    @SecurityRequirement(name = "bearerAuth")
    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable UUID id, @Valid @RequestBody StaffUpdateDto dto) {
        Optional<Staff> existing = staffService.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Staff staff = existing.get();
        staff.setBio(dto.getBio());
        staff.setActive(dto.getIsActive() != null ? dto.getIsActive() : staff.isActive());
        return ResponseEntity.ok(staffService.save(staff));
    }

    // Odstraní záznam o personálu
    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable UUID id) {
        if (staffService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        staffService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Přiřadí službu personálu (pro testování dostupnosti/rezervací ve Swaggeru)
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping("/{staffId}/services/{serviceId}")
    public ResponseEntity<Staff> addServiceToStaff(@PathVariable UUID staffId, @PathVariable UUID serviceId) {
        Optional<Staff> staffOpt = staffService.findById(staffId);
        Optional<Service> serviceOpt = serviceService.findById(serviceId);
        if (staffOpt.isEmpty() || serviceOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Staff staff = staffOpt.get();
        Service service = serviceOpt.get();
        staff.addService(service);
        return ResponseEntity.ok(staffService.save(staff));
    }

    // Odebere službu personálu
    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/{staffId}/services/{serviceId}")
    public ResponseEntity<Staff> removeServiceFromStaff(@PathVariable UUID staffId, @PathVariable UUID serviceId) {
        Optional<Staff> staffOpt = staffService.findById(staffId);
        Optional<Service> serviceOpt = serviceService.findById(serviceId);
        if (staffOpt.isEmpty() || serviceOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Staff staff = staffOpt.get();
        Service service = serviceOpt.get();
        staff.removeService(service);
        return ResponseEntity.ok(staffService.save(staff));
    }
}

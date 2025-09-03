package cz.nastrih.controller;

import cz.nastrih.dtos.StaffCreateDto;
import cz.nastrih.dtos.StaffUpdateDto;
import cz.nastrih.entity.Staff;
import cz.nastrih.entity.User;
import cz.nastrih.service.StaffService;
import cz.nastrih.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/staff")
public class StaffController {
    private final StaffService staffService;
    private final UserService userService;

    public StaffController(StaffService staffService, UserService userService) {
        this.staffService = staffService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        return ResponseEntity.ok(staffService.findAll());
    }

    @GetMapping("/active")
    public ResponseEntity<List<Staff>> getActiveStaff() {
        return ResponseEntity.ok(staffService.findActive());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable UUID id) {
        return staffService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable UUID id) {
        if (staffService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        staffService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

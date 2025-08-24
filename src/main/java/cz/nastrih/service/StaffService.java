package cz.nastrih.service;

import cz.nastrih.entity.Staff;
import cz.nastrih.repository.StaffRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StaffService {
    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public List<Staff> findAll() {
        return staffRepository.findAll();
    }

    public Optional<Staff> findById(UUID id) {
        return staffRepository.findById(id);
    }

    public Staff save(Staff staff) {
        return staffRepository.save(staff);
    }

    public void deleteById(UUID id) {
        staffRepository.deleteById(id);
    }

    public List<Staff> findActive() {
        return staffRepository.findAll().stream()
                .filter(Staff::isActive)
                .toList();
    }
}


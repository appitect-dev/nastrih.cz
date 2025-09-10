package cz.nastrih.repository;

// Repository pro entitu Staff.
// - Poskytuje derived dotaz pro ověření, zda personál nabízí danou službu

import cz.nastrih.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface StaffRepository extends JpaRepository<Staff, UUID> {
    boolean existsByIdAndServices_Id(UUID staffId, UUID serviceId);
}

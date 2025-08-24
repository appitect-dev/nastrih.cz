package cz.nastrih.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@ToString(exclude = "staff") // Klíčové pro zabránění StackOverflowError
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    private Integer duration; // v minutách

    @Column(nullable = false, precision = 10, scale = 2) // Dobré je specifikovat přesnost pro peníze
    private BigDecimal price;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Je dobré specifikovat fetch type pro čitelnost
    @ManyToMany(mappedBy = "services", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Staff> staff = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // --- Pomocné metody pro správu vztahu ---
    public void addStaff(Staff staffMember) {
        this.staff.add(staffMember);
        staffMember.getServices().add(this);
    }

    public void removeStaff(Staff staffMember) {
        this.staff.remove(staffMember);
        staffMember.getServices().remove(this);
    }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public Set<Staff> getStaff() {
        return staff;
    }

    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public void setPrice(BigDecimal price) { this.price = price; }
}
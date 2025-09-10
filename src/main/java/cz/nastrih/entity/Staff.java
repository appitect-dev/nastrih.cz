package cz.nastrih.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "staff")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@ToString(exclude = {"user", "services"}) // Vyloučení vztahů
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true) // user_id by měl být unikátní
    private User user;

    @Column
    private String bio;

    @Column(nullable = false)
    @Builder.Default // Dobrý zvyk pro defaultní hodnoty
    private boolean active = true;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "staff_services",
            joinColumns = @JoinColumn(name = "staff_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    @Builder.Default
    @JsonIgnore // skryjeme seznam služeb u personálu kvůli přehlednému JSONu
    private Set<Service> services = new HashSet<>();

    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // --- Pomocné metody pro synchronizaci ---
    public void addService(Service service) {
        this.services.add(service);
        service.getStaff().add(this);
    }

    public void removeService(Service service) {
        this.services.remove(service);
        service.getStaff().remove(this);
    }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public Set<Service> getServices() {
        return services;
    }

    public void setBio(String bio) { this.bio = bio; }
}
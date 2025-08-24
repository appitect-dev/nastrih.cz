package cz.nastrih.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Entity
@Table(name = "organizations")
@EntityListeners(AuditingEntityListener.class)
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // Název kadeřnictví/organizace

    @Column(nullable = false)
    private String address; // Adresa provozovny

    @Column
    private String phone; // Telefonní číslo

    @Column(unique = true)
    private String email; // E-mail organizace

    @Column
    private String website; // Webová stránka organizace

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt; // Datum a čas vytvoření záznamu

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt; // Datum a čas poslední aktualizace záznamu

    public void setName(String name) { this.name = name; }
    public void setAddress(String address) { this.address = address; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setEmail(String email) { this.email = email; }
    public void setWebsite(String website) { this.website = website; }
}
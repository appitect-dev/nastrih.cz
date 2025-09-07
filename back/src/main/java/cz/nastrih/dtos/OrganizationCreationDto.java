package cz.nastrih.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationCreationDto {
    @NotBlank
    private String name;
    @NotBlank
    private String address;
    private String phone;
    @Email
    private String email;
    private String website;
    // Lombok @Data provides getters/setters
}

package cz.nastrih.dtos;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class StaffUpdateDto {
    @NotNull
    private UUID id;
    private String bio;
    private Boolean isActive;

    // getters and setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}

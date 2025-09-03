package cz.nastrih.dtos;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class StaffCreateDto {
    @NotNull
    private UUID userId;
    private String bio;
    private Boolean isActive;

    // getters and setters
    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
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

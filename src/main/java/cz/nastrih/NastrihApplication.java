package cz.nastrih;

// Hlavní spouštěcí třída aplikace Nastrih.cz.
// - Aktivuje JPA Auditing (automatické timestampy u entit s auditem)
// - Startuje Spring Boot aplikaci

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing; // <--- Přidejte tento import

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Nastrih.cz API", version = "1.0", description = "Documentation for Nastrih.cz API"))
@EnableJpaAuditing // <--- Přidejte tuto anotaci
public class NastrihApplication {

    public static void main(String[] args) {
        SpringApplication.run(NastrihApplication.class, args);
    }
}
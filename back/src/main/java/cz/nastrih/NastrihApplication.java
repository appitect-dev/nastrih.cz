package cz.nastrih;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "Nastrih.cz API",
        version = "1.0",
        description = "REST API for Nastrih.cz barbershop"
    )
)
public class NastrihApplication {
    public static void main(String[] args) {
        SpringApplication.run(NastrihApplication.class, args);
    }
} 
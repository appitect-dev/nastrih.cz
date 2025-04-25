package cz.nastrih.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@Tag(name = "Test", description = "Test endpoints")
public class TestController {

    @GetMapping("/hello")
    @Operation(
        summary = "Get hello world message",
        description = "Returns a simple hello world message to test the API"
    )
    @ApiResponse(
        responseCode = "200",
        description = "Success"
    )
    public String helloWorld() {
        return "Greetings from Nastrih.cz API!";
    }
} 
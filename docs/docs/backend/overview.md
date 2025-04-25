# Backend Overview

The Nastrih.cz backend is built using Spring Boot 3.2.2, providing a robust and scalable REST API for the barbershop booking system.

## Technology Stack

- **Java 21**: Latest LTS version for optimal performance and features
- **Spring Boot 3.2.2**: Modern Spring framework for building REST APIs
- **SpringDoc OpenAPI**: API documentation and Swagger UI
- **Maven**: Dependency management and build tool

## Project Structure

```
back/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── cz/
│   │   │       └── nastrih/
│   │   │           ├── NastrihApplication.java
│   │   │           └── controller/
│   │   │               └── TestController.java
│   │   └── resources/
│   │       └── application.properties
├── pom.xml
└── Dockerfile
```

## API Documentation

The API documentation is available through Swagger UI when the application is running:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI Specification: `http://localhost:8080/api-docs`

### Available Endpoints

#### Test Endpoint

```http
GET /api/test/hello
```

Returns a simple hello world message to verify the API is working.

**Response**: `200 OK`
```json
"Hello from Nastrih.cz API!"
```

## Configuration

### application.properties

```properties
# Server configuration
server.port=8080

# OpenAPI configuration
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.operationsSorter=method
```

## Docker Support

The backend includes Docker support for containerized deployment:

```dockerfile
# Build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE ${PORT}

CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
```

## Development

To run the backend locally:

```bash
cd back
./mvnw spring-boot:run
```

The server will start at `http://localhost:8080`. 
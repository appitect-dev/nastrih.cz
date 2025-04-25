FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY target/*.jar app.jar

# The port will be provided by Render
ENV PORT=8080
EXPOSE ${PORT}

CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT}"] 
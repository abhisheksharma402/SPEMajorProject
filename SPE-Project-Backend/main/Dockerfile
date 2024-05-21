FROM openjdk:17
WORKDIR /app/
COPY ./target/main-0.0.1-SNAPSHOT.jar ./server.jar
EXPOSE 9094
ENTRYPOINT ["java","-jar","server.jar"]
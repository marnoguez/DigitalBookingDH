# Aqui tienes que cambiar la imagen a la version que estan manejando en java
FROM openjdk:19-jdk-oraclelinux8
# Aqui tienes que cambiar el nombre del snapchot
COPY "./target/digitalbooking-0.0.1-SNAPSHOT.jar" "app.jar"
# Aqui tienes que exponer la app en el puerto 8080 (No lo toques a no ser si cambiaron el puerto de la app)
EXPOSE 80
ENTRYPOINT ["java","-jar","app.jar"]
# Estos son variables de entorno que tienes que configurar en tu application.properties
ENV MYSQL_ROOT_PASSWORD Ut0zei8e
ENV MYSQL_USER 0223TDPROM1C3LAED0522FT_GRUPO5
ENV MYSQL_URL jdbc:mysql://digitalhouse.cluster-cnyqegjgetrv.us-east-2.rds.amazonaws.com:3306/0223TDPROM1C3LAED0522FT_GRUPO5

# Para buildear -> docker build -t "spring-boot-docker" .
# Para listar las imagenes implementada en tu docker -> docker images
# Para dockerizar por completo y pasarlo a segundo plano-> docker run --name spring-boot-docker -p 8080:8080 spring-boot-docker:latest &
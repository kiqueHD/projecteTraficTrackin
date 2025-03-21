api javascript google maps
traffic layer   https://developers.google.com/maps/documentation/javascript/examples/layer-traffic

https://developers.google.com/maps/documentation/javascript/examples/directions-draggable

https://valencia.opendatasoft.com/explore/dataset/parkings/export/?location=12,39.47109,-0.36679&basemap=e4bf90

https://dadesobertes.gva.es/dataset?_groups_limit=0

geo json

ejemplo 
https://jsfiddle.net/gh/get/library/pure/googlemaps/js-samples/tree/master/dist/samples/layer-traffic/jsfiddle


base de datos desplegar gratis 
https://supabase.com/pricing


tutoriales spring 
https://spring.io/guides/tutorials/rest
https://www.arquitecturajava.com/spring-service-usando-el-patron-servicio/

Como instalar y desplegar el proyecto

1 git clone del repo o si ya lo tienes git pull para actualizar cambios
2 ejecutar el scrip.sql de la base de de datos y si tu usuario contraseña es diferente de root root cambiarlo en opciones

3 abrir una terminal de vscode e irte a la carpeta donde se encuentra el pom.xml ./mvnw y los archivos relacionados a maven

cd backend 
cd traffictracking
./mvnw spring-boot:run

![image](https://github.com/user-attachments/assets/e883a1e6-9b87-4f90-b418-5e49a5b1d76f)


saldra mucho texto de spring y muchas cosas y queda así la terminal

![image](https://github.com/user-attachments/assets/822ed267-9e99-40fd-866a-6f0cdbfeadfa)

se ha inicilizado en un serverlet tomcatwebserver y de para acceder a la unica pantalla funcional de momento seria localhost:8080/admin y esa pantalla deberia estar conectada a la bd, mas rutas en el homecontroller 






https://valencia.aws-ec2-eu-central-1.opendatasoft.com/api/explore/v2.1/catalog/datasets/estat-transit-temps-real-estado-trafico-tiempo-real/records?limit=100 api para consumir datos de trafico



ejemplo https://iavis.uv.es/wp-content/uploads/2023/07/InformeCuadroMandosMovilidadValencia.pdf
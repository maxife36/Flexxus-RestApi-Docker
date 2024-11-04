# Inicialización de la API REST

Este documento proporciona instrucciones para configurar y desplegar la API REST para la gestión de artículos. A continuación se detallan los pasos necesarios para la inicialización del entorno.

## 1. Configuración de Variables de Entorno

Para comenzar, necesitas crear un archivo de configuración de variables de entorno. Sigue estos pasos:

1. **Generar el archivo `.env`**:
   - Crea un archivo llamado `.env` en la raíz del proyecto, dentro de la carpeta `RestApi`.

2. **Configurar las variables**:
   - Las variables necesarias están definidas en el archivo `.example.env`, que ya incluye una preconfiguración de los puertos utilizados por los microservicios. 
   - Completa las siguientes variables en el archivo `.env`:
     ```plaintext
     JWT_SECRET=<contraseña-de-encriptacion>
     MYSQL_ROOT_PASSWORD=<contraseña-de-base-de-datos>
     MYSQL_DATABASE=<nombre-de-la-base-de-datos>
     ```

## 2. Posicionamiento en la Carpeta Raíz

Asegúrate de estar posicionado en la carpeta raíz del proyecto (`RestApi`). Puedes hacerlo con el siguiente comando:
```bash
cd /ruta/a/RestApi
```


## 3. Iniciar el Contenedor de Docker para MySQL
Con el terminal en la carpeta raíz (``RestApi``), ejecuta el siguiente comando para iniciar el contenedor de Docker para MySQL:

  ```bash
   docker-compose up
   ```
Este comando generará un contenedor que entrará en servicio y se expondrá en el puerto local especificado en el archivo .env.

## Conclusión

Una vez que todos los microservicios estén en funcionamiento, la aplicación estará lista para ser utilizada. 

# Descripción de la API

Esta API REST está diseñada para gestionar artículos, proporcionando un conjunto completo de operaciones CRUD (Crear, Leer, Actualizar y Eliminar). Permite a los usuarios crear artículos, modificarlos total o parcialmente, eliminarlos, y realizar búsquedas que pueden ser filtradas por ID o por coincidencia exacta. Además, las búsquedas están paginadas, lo que permite especificar parámetros de consulta como `page` (número de página) y `limit` (cantidad de artículos por página). Si no se proporcionan, los valores predeterminados son `page=1` y `limit=50`.

## Arquitectura del Proyecto

El sistema está estructurado utilizando una arquitectura de microservicios, implementando contenedores Docker para gestionar la base de datos MySQL. A continuación se describen los microservicios que componen esta arquitectura:

### Microservicios

#### 1. Gateway
- **Descripción**: Punto de acceso único a la API, encargado de redirigir las solicitudes a los microservicios correspondientes.
- **Funcionalidad**: Implementa un sistema proxy para gestionar la redirección de las solicitudes entrantes. Este sistema lo cree de manera perosnalizada, es decir es codigo propio para la redireccion de solicitudes entre servicios. 

#### 2. Database
- **Descripción**: Este microservicio interactúa con el contenedor de MySQL que almacena toda la información relevante, tanto de usuarios como de artículos.
- **Rutas**:
  - **Usuarios**: Esta ruta está restringida, permitiendo solicitudes únicamente desde el microservicio `account`.
  - **Artículos**: Esta ruta permite solicitudes solo desde el microservicio `articles`.
- **Seguridad**: La autenticación y autorización se gestionan a través de JWT (JSON Web Tokens), que se envían mediante cookies configuradas como `HttpOnly` para mayor seguridad.

#### 3. Account
- **Descripción**: Este microservicio se encarga de gestionar el registro y la autenticación de usuarios.
- **Funcionalidad**:
  - **Registro**: Hashea las contraseñas antes de almacenarlas en la base de datos, asegurando la protección de la información sensible.
  - **Inicio de Sesión**: Devuelve un JWT en una cookie llamada `loggedUser`, que se utilizará para autenticar solicitudes futuras al microservicio `articles`. 
  - **Este JWT asegura que solo los usuarios autenticados puedan gestionar artículos.**

#### 4. Articles
- **Descripción**: Este microservicio es responsable de todas las operaciones CRUD relacionadas con artículos.
- **Funcionalidad**: 
  - Tiene permisos exclusivos para interactuar con las rutas del microservicio `database` que manejan las operaciones CRUD. La verificación de permisos se realiza de manera similar a como se explica en el microservicio `account`, asegurando que solo los usuarios autenticados puedan realizar operaciones en los artículos.

## Endpoints de la API

### 1. Registro de Usuario
- **Método**: `POST -> http://localhost:3000/account/api/register`
- **Cuerpo de la Solicitud**: JSON que representa el artículo a crear.
     ```json
   { 
    "username": "string", 
    "password": "string (min 6, max 50)"
    }
   ```
- **Respuesta Exitosa**: Detalles del artículo creado.
     ```json
       {
      "error": "boolean",
      "statusCode": "number",
      "data": {
            "id": "string",
            "username": "string",
            "createdAt": "Date",
            "updatedAt": "Date",
            },
      "metadata": {
        "message": "SuccessMessage",
        "timestamp": "Date",
        "[key: string]": "any",
      }
    }
   ```
- **Error de creación**: 
     ```json
       {
      "error": "true",
      "statusCode": "HttpStatusCode",
      "message": "err.message",
      "details": "validationErrors",
    }
   ```
### 2. Login de Usuario
- **Método**: `POST -> http://localhost:3000/account/api/login`
- **Cuerpo de la Solicitud**: JSON que representa el artículo a crear.
     ```json
   { 
    "username": "string", 
    "password": "string (min 6, max 50)"
    }
   ```
- **Respuesta Exitosa**: Detalles del artículo creado.
     ```json
       {
      "error": "boolean",
      "statusCode": "number",
      "data": {},
      "metadata": {
        "message": "SuccessMessage",
        "timestamp": "Date",
        "[key: string]": "any",
      }
    }
   ```
- **Error de creación**: 
     ```json
       {
      "error": "true",
      "statusCode": "HttpStatusCode",
      "message": "err.message",
      "details": "validationErrors",
    }
   ```
### 3. Crear Artículo
- **Método**: `POST -> http://localhost:3000/article/api/articles`
- **Cuerpo de la Solicitud**: JSON que representa el artículo a crear.
     ```json
   { 
    "name": "string", 
    "brand": "string",
    "active?": "[0-1]" 
    }
   ```
- **Respuesta Exitosa**: Detalles del artículo creado.
     ```json
       {
      "error": "boolean",
      "statusCode": "number",
      "data": {
            "id": "string",
            "name": "string",
            "brand": "string",
            "active":"number",
            "createdAt": "Date",
            "updatedAt": "Date",
            },
      "metadata": {
        "message": "SuccessMessage",
        "timestamp": "Date",
        "[key: string]": "any",
      }
    }
   ```
- **Error de creación**: 
     ```json
       {
      "error": "true",
      "statusCode": "HttpStatusCode",
      "message": "err.message",
      "details": "validationErrors",
    }
   ```

### 4. Modificar Artículo
- **Método**: `PATCH -> http://localhost:3000/article/api/articles/:id`
- **Cuerpo de la Solicitud**: JSON que contiene los campos a modificar.
    ```json
   { 
    "name?": "string", 
    "brand?": "string",
    "active?": "[0-1]" 
    }
   ```
- **Respuesta**: Detalles del artículo actualizado.
     ```json
       {
      "error": "boolean",
      "statusCode": "number",
      "data": [],
      "metadata": {
        "message": "SuccessMessage",
        "timestamp": "Date",
        "[key: string]": "any",
      }
    }
   ```
- **Error de actualización**: 
  ```json
    {
   "error": "true",
   "statusCode": "HttpStatusCode",
   "message": "err.message",
   "details": "validationErrors",
    }
    ```

### 5. Eliminar Artículo (Soft Delete - Desactiva)
- **Método**: `DELETE -> http://localhost:3000/article/api/articles/:id`
- **Respuesta**: Mensaje de confirmación de eliminación.
   ```json
    {
      "error": "boolean",
      "statusCode": "number",
      "data": [],
      "metadata": {
        "message": "SuccessMessage",
        "timestamp": "Date",
        "[key: string]": "any",
      }
    }
   ```
- **Error de Eliminación**: 
  ```json
    {
   "error": "true",
   "statusCode": "HttpStatusCode",
   "message": "err.message",
    }
    ```

### 6. Buscar Todos los Artículos
- **Método**: `GET -> http://localhost:3000/article/api/articles`
- **Parámetros de Consulta**:
  - `page`: Número de página (default: 1).
  - `limit`: Cantidad de artículos por página (default: 50).
- **Respuesta**: Lista de artículos paginada.
     ```json
       {
      "error": "boolean",
      "statusCode": "number",
      "data": [
            {
            "id": "string",
            "name": "string",
            "brand": "string",
            "active":"number",
            "createdAt": "Date",
            "updatedAt": "Date",
            },
            ...,
            ],
      "metadata": {
        "message": "SuccessMessage",
        "timestamp": "Date",
        "[key: string]": "any",
      }
    }
   ```
- **Error de busqueda**: 
  ```json
    {
   "error": "true",
   "statusCode": "HttpStatusCode",
   "message": "err.message"
    }
    ```
### 7. Buscar Artículo por ID
- **Método**: `GET -> http://localhost:3000/article/api/articles/:id`
- **Respuesta**: Detalles del artículo correspondiente al ID.
     ```json
       {
      "error": "boolean",
      "statusCode": "number",
      "data": {
            "id": "string",
            "name": "string",
            "brand": "string",
            "active":"number",
            "createdAt": "Date",
            "updatedAt": "Date",
            },
      "metadata": {
        "message": "SuccessMessage",
        "timestamp": "Date",
        "[key: string]": "any",
      }
    }
   ```
- **Error de busqueda**: 
  ```json
    {
   "error": "true",
   "statusCode": "HttpStatusCode",
   "message": "err.message"
    }
    ```
### 8. Buscar Artículos por Filtro
- **Método**: `GET -> http://localhost:3000/article/api/articles/filter`
- **Parámetros de Consulta**:
  - `page`: Número de página **(default: 1)** (opcional).
  - `limit`: Cantidad de artículos por página **(default: 50)** (opcional).
  - `exact`: Booleano que indica si la búsqueda debe ser exacta **(default: false)** (opcional).
  - `name`: Nombre parcial o total del articulo según se configure el parametro ``exact`` (opcional).
  - `brande`: Nombre parcial o total de la marca del articulo según se configure el parametro ``exact`` (opcional).
  - `active`: Valor numerico si el articulo esta activo o no **(Posibles valores 0 y 1)** (opcional).

- **Respuesta**: Lista de artículos que coinciden con los criterios de búsqueda.
     ```json
       {
      "error": "boolean",
      "statusCode": "number",
      "data": [
            {
            "id": "string",
            "name": "string",
            "brand": "string",
            "active":"number",
            "createdAt": "Date",
            "updatedAt": "Date",
            },
            ...,
            ],
      "metadata": {
        "message": "SuccessMessage",
        "timestamp": "Date",
        "[key: string]": "any",
      }
    }
   ```
- **Error de busqueda**: 
  ```json
    {
   "error": "true",
   "statusCode": "HttpStatusCode",
   "message": "err.message"
    }
    ```

## Tecnologías Utilizadas

Este proyecto está desarrollado utilizando una variedad de tecnologías modernas que garantizan un rendimiento óptimo y una arquitectura escalable. A continuación se detallan las tecnologías empleadas:

 - #### TypeScript
 - #### Docker
 - #### Node.js (Versión 20.18)
 - #### Express
 - #### Sequelize
 - #### MySQL

### Arquitectura de Microservicios
- **Descripción**: La arquitectura de microservicios es un enfoque de diseño de software donde las aplicaciones se dividen en servicios pequeños e independientes que se comunican entre sí.
- **Beneficios**: Permite el desarrollo, despliegue y escalado de servicios de forma independiente, mejorando la resiliencia y facilitando la implementación de nuevas características sin afectar a toda la aplicación.

Este conjunto de tecnologías las elegí para ofrecer una solución robusta, escalable y fácil de mantener, optimizando tanto el desarrollo como la experiencia del usuario final.

## Ejemplos de Solicitudes

En la carpeta raíz `RestApi` se encuentra una colección de Postman [``RestAPI-Flexxus.postman_collection.json``] que presenta tres directorios:

1. **Accounts**: Contiene los endpoints para el registro y el inicio de sesión de usuarios.
   - **Endpoints**:
     - `POST /register`: Registra un nuevo usuario.
     - `POST /login`: Inicia sesión para un usuario existente.

2. **Articles**: Incluye los métodos para gestionar los artículos en la base de datos.
   - **Endpoints**:
     - `GET /articles`: Obtiene todos los artículos.
     - `GET /articles/:id`: Obtiene un artículo específico por su ID.
     - `GET /articles?filter=value`: Obtiene artículos filtrados, permitiendo coincidencias exactas o parciales.
     - `POST /articles`: Crea un nuevo artículo.
     - `PUT /articles/:id`: Modifica un artículo existente (total o parcialmente).
     - `DELETE /articles/:id`: Elimina un artículo por su ID.

**Nota:**: Estos endpoints son representativos a los ya explicados anteriormente

3. **Prueba de API**: Presenta todos los endpoints anteriores organizados de manera que se genere un *run folder*, permitiendo ejecutar cada solicitud con información precargada para facilitar las pruebas.

### Aclaración
Antes de ejecutar la colección de Postman, asegúrate de que las variables globales declaradas estén presentes y contengan sus respectivos valores. Las variables son:
- `GATEWAY_HOST`: `http://localhost`
- `GATEWAY_PORT`: `3000` (o el puerto que hayas configurado en el archivo `.env`)

Este conjunto de ejemplos y su correcta configuración te permitirán probar fácilmente la funcionalidad de la API y verificar su correcto funcionamiento.

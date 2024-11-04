# API Develop

## Descripción del Desarrollo:

Se requiere la creación de un API que Implementar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para artículos, que incluyan un identificador único (PK), nombre, fecha de modificación, marca y estado de activación.

### Operaciones Específicas:

* ``GET``: Permitir filtrar por coincidencia del nombre, estado de actividad y búsqueda exacta.
* ``DELETE``: Desactivar el artículo en lugar de eliminarlo directamente.
* ``UPDATE``: Actualizar cualquier campo excepto el identificador único (PK), con la opción de actualizar uno o más campos en una sola operación.
* ``INSERT``: Requerir los campos de nombre y marca para la inserción.


## Pautas a Cumplir:
- **Arquitectura Adecuada**: 
  
    Diseñar una arquitectura robusta y escalable que facilite el mantenimiento y la expansión futura del API.

- **Seguridad en las Rutas**: 
    
    Implementar medidas de seguridad para restringir el acceso a las rutas del API, garantizando la confidencialidad e integridad de los datos.

- **Validación de Datos**: 
  
    Validar tanto la información recibida del cliente como la enviada al cliente para asegurar la coherencia y consistencia de los datos en todo momento.

- **Código Limpio y Estructurado**: 
    
    Escribir código claro, legible y bien estructurado siguiendo las mejores prácticas de programación, con el objetivo de mejorar la mantenibilidad y comprensión del sistema.
    
- **Conexión a la Base de Datos**: 
    
    Establecer una conexión confiable y eficiente con una base de datos, ya sea relacional o no relacional, para almacenar y recuperar datos de manera adecuada.

- **Documentación del API**:
    
     Generar una documentación completa y detallada del API, que incluya información sobre sus endpoints, parámetros, respuestas esperadas y ejemplos de uso, con el fin de facilitar su entendimiento y uso por parte de otros desarrolladores.

- **Repositorio de Código**: 
    
    Subir todo el código fuente del API, incluyendo la documentación y cualquier otro recurso necesario, a un repositorio de control de versiones (por ejemplo, GitHub), para facilitar la colaboración, revisión y seguimiento del desarrollo del proyecto.
  
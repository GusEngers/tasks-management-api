# TASKS-MANAGEMENT-API

**Tasks-Management-Api** es como indica su nombre una API para el manejo de tareas que realiza un usuario.

La aplicación cuenta con las principales funciones **CRUD** permitiendo así crear, obtener, modificar y eliminar tareas. Todas estas tareas se alojarían en una base de datos en **MongoDB**.

El **esquema general** de los documentos es bastante simple, contando solamente con los siguientes elementos:

- El nombre de la tarea (name)
- La descripción de la tarea (description)
- El estado en el que se encuentra la tarea (status)
    

| **FIELD** | **TYPE** | **REQUIRED** |
| --- | --- | --- |
| name | String | true |
| description | String | true |
| status | Enum | true |


## COMO **DATOS ADICIONALES**:

- La iniciativa de este proyecto surge con la intención de aprender y poner en práctica mi estudio en NestJS, donde se busca crear un proyecto que además de servir como experiencia también sea útil a nivel personal.
- Lograr acentar los conocimientos en el uso de **Middlewares**, **Controllers** y **Services** en NestJS.
- Concretar una conexión con una base de datos en NestJS.
    

## FUTURAS ACTUALIZACIONES:

- Crear proyectos de tareas por usuario, usando [User-Auth-Api](https://github.com/GusEngers/user-auth-api#readme) para autenticación y autorización.
- Añadir nuevas fields (fecha de inicio y finalización, nivel de prioridad, usuarios realizando la tarea, etc).
- Implementar un cliente para tener una mejor comodidad.
- Fixes varios.

## IMPLEMENTACIÓN:

Si se desea utilizar esta API de forma local es necesario crear *(a nivel raíz)* un archivo **.env** con la siguiente propiedad:

```javascript
MONGO_URI=/* Dirección URI de MongoDB */
```

Los scripts a ejecutarse se encuentran en el **package.json**
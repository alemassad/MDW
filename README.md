# Backend - Concesionaria de Automóviles

Este proyecto es una API RESTful desarrollada en **Node.js** con **Express** y **MongoDB** para gestionar una concesionaria de automóviles. Permite administrar usuarios, autos y categorías de autos, con autenticación basada en Firebase.

---

## Características principales

- **Gestión de Usuarios:** Registro, login, actualización, eliminación y consulta de usuarios.
- **Gestión de Autos:** Alta, baja, modificación, consulta y filtrado por categoría.
- **Gestión de Categorías:** Crear, editar, eliminar y consultar categorías de autos.
- **Autenticación:** Rutas protegidas mediante tokens de Firebase.
- **Validaciones:** Validación de datos con Joi para todas las entidades.
- **Relaciones:** Los autos pueden estar asociados a categorías y a usuarios propietarios.
- **Manejo de imágenes:** Se almacenan URLs de imágenes de autos.

---

## Estructura de carpetas

```
src/
│
├── controllers/      # Lógica de negocio (users, cars, categories)
├── models/           # Modelos de Mongoose (User, Car, Category)
├── routes/           # Definición de rutas Express
├── validations/      # Validaciones Joi para cada entidad
├── middlewares/      # Middlewares (ej: autenticación)
├── config/           # Configuración (ej: Firebase)
└── index.ts          # Punto de entrada principal
```

---

## Instalación y ejecución

1. **Clona el repositorio**
2. **Instala dependencias**
   ```bash
   npm install
   ```
3. **Configura las variables de entorno**
   - Crea un archivo `.env` con tus credenciales de Firebase y MongoDB.
4. **Inicia el servidor**
   ```bash
   npm run dev
   ```

---

## Endpoints principales

### Usuarios

- `POST /users` - Registrar usuario
- `GET /users` - Listar usuarios (protegido)
- `GET /users/:id` - Obtener usuario por ID (protegido)
- `PATCH /users/:id` - Actualizar usuario (protegido)
- `DELETE /users/:id` - Eliminar usuario (protegido)

### Autos

- `POST /cars` - Crear auto (protegido)
- `GET /cars` - Listar autos (protegido)
- `GET /cars/:id` - Obtener auto por ID (protegido)
- `GET /cars/category/:id` - Listar autos por categoría (protegido)
- `PATCH /cars/:id` - Actualizar auto (protegido)
- `DELETE /cars/:id` - Eliminar auto (protegido)

### Categorías

- `POST /categories` - Crear categoría (protegido)
- `GET /categories` - Listar categorías (protegido)
- `GET /categories/:id` - Obtener categoría por ID (protegido)
- `PATCH /categories/:id` - Actualizar categoría (protegido)
- `DELETE /categories/:id` - Eliminar categoría (protegido)

---

## Autenticación

- La mayoría de las rutas requieren un **token JWT de Firebase** en el header:
  ```
  Authorization: Bearer <token>
  ```
- El registro de usuario (`POST /users`) es público.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Firebase Admin (autenticación)
- Joi (validaciones)
- TypeScript

---

## Notas

- Para probar las rutas protegidas, primero obtén un token de usuario autenticado en Firebase.
- Las imágenes de autos se almacenan como URLs.
- Puedes extender el proyecto agregando más campos, relaciones o funcionalidades según tus necesidades.

---

## Alumno:
Luis Alejandro Massad, alumno UAI para la materia METODOLOGÍAS Y DESARROLLOS WEB
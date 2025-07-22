# Backend - Concesionaria de Automóviles

Este proyecto es una API RESTful desarrollada en **Node.js** con **Express** y **MongoDB** para gestionar una concesionaria de automóviles. Permite administrar usuarios, autos y categorías de autos, con autenticación basada en Firebase y despliegue en Vercel.

---

## Características principales

- **Gestión de Usuarios:** Registro, login, actualización, eliminación y consulta de usuarios.
- **Gestión de Autos:** Alta, baja, modificación, consulta, baja lógica y filtrado por categoría.
- **Gestión de Categorías:** Crear, editar, eliminar, baja lógica y consultar categorías de autos.
- **Autenticación:** Rutas protegidas mediante tokens de Firebase.
- **Validaciones:** Validación de datos con Joi para todas las entidades.
- **Relaciones:** Los autos pueden estar asociados a categorías y a usuarios propietarios.
- **Manejo de imágenes:** Se almacenan URLs de imágenes de autos.
- **Baja lógica:** Para usuarios, autos y categorías usando el campo `isActive`.
- **Despliegue en Vercel:** API disponible públicamente.
- **Configuración por variables de entorno:** Uso de `.env` para credenciales y configuración.
- **Compilación TypeScript:** Uso de `tsc` y carpeta `dist` para código compilado.
- **Control de errores y seguridad:** Middlewares para autenticación y validación de datos.
- **CORS:** Configuración para permitir acceso seguro desde el frontend.

---

## Estructura de carpetas

```
src/
│
├── controllers/      # Lógica de negocio (users, cars, categories)
├── models/           # Modelos de Mongoose (User, Car, Category)
├── routes/           # Definición de rutas Express
├── validations/      # Validaciones Joi para cada entidad
├── middlewares/      # Middlewares (autenticación, errores)
├── config/           # Configuración (Firebase, base de datos)
├── database.ts       # Conexión a MongoDB
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
4. **Compila el proyecto**
   ```bash
   npm run build
   ```
5. **Inicia el servidor en desarrollo**
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
- `PATCH /users/logical-delete/:id` - Baja lógica de usuario (protegido)

### Autos

- `POST /cars` - Crear auto (protegido)
- `GET /cars` - Listar autos (protegido)
- `GET /cars/:id` - Obtener auto por ID (protegido)
- `GET /cars/category/:id` - Listar autos por categoría (protegido)
- `PATCH /cars/:id` - Actualizar auto (protegido)
- `DELETE /cars/:id` - Eliminar auto (protegido)
- `PATCH /cars/logical-delete/:id` - Baja lógica de auto (protegido)

### Categorías

- `POST /categories` - Crear categoría (protegido)
- `GET /categories` - Listar categorías (protegido)
- `GET /categories/:id` - Obtener categoría por ID (protegido)
- `PATCH /categories/:id` - Actualizar categoría (protegido)
- `DELETE /categories/:id` - Eliminar categoría (protegido)
- `PATCH /categories/logical-delete/:id` - Baja lógica de categoría (protegido)

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
- Dotenv (variables de entorno)
- Nodemon (desarrollo)
- CORS (seguridad)
- ESLint (calidad de código)
- Vercel (despliegue)

---

## Seguridad

- El archivo `.env` está en `.gitignore` y **no se debe pushear**.
- Las claves privadas y credenciales nunca se exponen en el repositorio.
- El código compilado (`dist/`) tampoco se pushea.

---

## Despliegue

El backend está desplegado en Vercel y disponible en:

[https://mdw-autos-backend.vercel.app/](https://mdw-autos-backend.vercel.app/)

---

## Notas

- Para probar las rutas protegidas, primero obtén un token de usuario autenticado en Firebase.
- Las imágenes de autos se almacenan como URLs.
- Puedes extender el proyecto agregando más campos, relaciones o funcionalidades según tus necesidades.

---

## Alumno

Luis Alejandro Massad, alumno UAI para la materia METODOLOGÍAS Y DESARROLLOS
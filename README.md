# 📄 MERN-Role-Auth

Este es el código fuente de un sistema de autenticación de usuarios basado en roles, desarrollado con el stack **MERN** (MongoDB, Express, React y Node.js). Este proyecto tiene como objetivo probar la autenticación con roles, permitiendo gestionar usuarios con diferentes niveles de acceso y proporcionando autorización mediante tokens HTTP only, asegurando que la información sensible esté protegida.

## 🛠️ Tecnologías Utilizadas

- **MongoDB**: Base de datos NoSQL utilizada para almacenar información de usuarios y roles.
- **Express**: Framework de Node.js para construir la API del backend.
- **React**: Librería de JavaScript para construir interfaces de usuario.
- **Node.js**: Entorno de ejecución para ejecutar JavaScript en el servidor.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **Bcrypt**: Para la encriptación de contraseñas.
- **JSON Web Tokens (JWT)**: Para la gestión de sesiones y autorización.
- **CORS**: Middleware para habilitar CORS en el servidor.
- **dotenv**: Para manejar variables de entorno.
- **Morgan**: Middleware para registrar solicitudes HTTP.
- **Redux**: Biblioteca para manejar el estado global de la aplicación.
- **React Hot Toast**: Para mostrar notificaciones y mensajes interactivos en la interfaz.

## 🖼️ Capturas de Pantalla

![Admin](https://github.com/hectorc2907/MERN-Role-Auth/blob/dev/frontend/public/muestra.PNG)

## 🔧 Instalación

Si deseas clonar este repositorio y ejecutarlo en tu máquina local, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/hectorc2907/MERN-Role-Auth.git

   ```

2. Ve al directorio del proyecto:

   ```bash
   cd MERN-Role-Auth

   ```

3. Instala las dependencias Frontend:

   ```bash
   cd ../frontend
   npm install @reduxjs/toolkit axios react react-dom react-hot-toast react-redux react-router-dom redux-persist
   npm run dev

   ```

4. Instala las dependencias Backend:

   ```bash
   cd ../backend
   npm install bcryptjs cookie-parser cors dotenv express jsonwebtoken mongoose

   ```

5. Configura tus Variables de Entorno
   ```bash
   # Backend:
   PORT=<tu_puerto_deseado>
   MONGO_URI=<tu_mongo_uri>
   JWT_SECRET=<tu_jwt_secret>
   FRONTEND_URL=<la_direccion_frontend>
   # Frontend:
   VITE_BACKEND_URL=<la_direccion_backend>
   ```

## 🎨 Personalización

Puedes personalizar el portafolio ajustando los archivos de configuración de Tailwind o cambiando el contenido en los componentes de React. Aquí algunos puntos donde podrías hacer ajustes:

- Tailwind CSS: En el archivo tailwind.config.js para cambiar colores, fuentes, espaciados, etc.
- Animaciones con Framer Motion: Puedes personalizar las transiciones en cualquier componente donde se use motion.

## ✨ Características

- Registro de usuarios: Permite a nuevos usuarios registrarse en el sistema.
- Inicio de sesión: Autenticación de usuarios utilizando tokens HTTP only.
- Gestión de estado: Uso de Redux para manejar el estado global de la aplicación.
- Roles de usuario: Gestión de roles para diferentes niveles de acceso.
- Autorización basada en roles: Control de acceso a rutas según el rol del usuario.
- Notificaciones: Uso de React Hot Toast para mostrar mensajes interactivos y notificaciones.
- Interactividad: Uso de hooks de React para una experiencia de usuario fluida.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes alguna idea para mejorar el portafolio o encuentras algún error, siéntete libre de hacer un fork y enviar un pull request.

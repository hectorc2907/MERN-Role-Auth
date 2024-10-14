// Importamos las dependencias necesarias del proyecto.
import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

// Importamos la conexión con la base de datos.
import DbCon from "./utils/db.js";

// Importamos las rutas que usaremos en la aplicación.
import AuthRoutes from "./routes/authRoute.js";

// Habilitamos las variables de entorno utilizando dotenv.
dotenv.config();

// Configuramos el puerto que se utilizará. Si no se define en las variables de entorno, usará el puerto 3000 por defecto.
const PORT = process.env.PORT || 3000;

// Creamos una instancia de Express para manejar las rutas y configuraciones.
const app = express();

// Iniciamos la conexión con la base de datos.
DbCon();

// Configuramos los middlewares necesarios para nuestra aplicación.

// Habilitamos la interpretación de datos en formato JSON para las peticiones entrantes.
app.use(express.json());

// Habilitamos el análisis de cookies en las peticiones.
app.use(cookieparser());

// Configuramos CORS para permitir solicitudes desde el frontend definido en las variables de entorno.
app.use(
  cors({
    credentials: true, // Permite el envío de cookies a través de peticiones CORS.
    origin: process.env.FRONTEND_URL, // Define qué origen está permitido.
  })
);

// Utilizamos morgan para registrar las peticiones HTTP en la consola en formato de desarrollo.
app.use(morgan("dev"));

// Definimos las rutas.

// Ruta directa de prueba para verificar el estado del backend.
app.get("/", (req, res) => res.send("test"));

// Rutas relacionadas con la autenticación.
app.use("/api/auth", AuthRoutes);

// Iniciamos el servidor escuchando en el puerto definido y mostramos un mensaje en la consola.
app.listen(PORT, () => {
  console.log(`Listen on PORT ${PORT}`);
});

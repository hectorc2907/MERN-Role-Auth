//importamos dependencias y herramientas del proyecto
import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
//importamos la conexion con la base de datos
import DbCon from "./utils/db.js";
//importamos la rutas a utilizar
import AuthRoutes from "./routes/authRoute.js";

//habilitamos las variables de entorno
dotenv.config();

//configuramos la variable de entorno PORT como el puerto o el puerto 3000
const PORT = process.env.PORT || 3000;

//configuramos app como la ejecucion de la funcion express para facilitar la escritura
const app = express();

//iniciamos la conexion con la base de datos
DbCon();

//configuramos la aplicacion de cada dependencia importada
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(morgan("dev"));

//ejecucion de rutas
//esta es una ruta directa get del backend
app.get("/", (req, res) => res.send("test"));
//estas son rutas que se usaran para las peticiones
app.use("/api/auth", AuthRoutes);

//llamada del puerto
app.listen(PORT, () => {
  console.log(`Listen on PORT ${PORT}`);
});

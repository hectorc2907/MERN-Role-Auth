//importamos dependencias y herramientas del proyecto
import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import DbCon from "./utils/db.js";

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
app.use(cors());
app.use(morgan("dev"));

//ejecucion de rutas
app.get("/", (req, res) => res.send("test"));

//llamada del puerto
app.listen(PORT, () => {
  console.log(`Listen on PORT ${PORT}`);
});

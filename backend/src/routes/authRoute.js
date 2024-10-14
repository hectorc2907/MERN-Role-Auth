//importamos dependencias y herramientas del proyecto
import express from "express";
import { userRegister } from "../controllers/authController.js";

//configuramos la funcion Router de express para el manejo de rutas
const router = express.Router();

//colocamos el metodo correspondiente seguido de su ruta y su controlador
router.post("/register", userRegister);

//por ultimo exportamos las rutas
export default router;

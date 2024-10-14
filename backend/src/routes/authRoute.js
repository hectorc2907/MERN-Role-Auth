// Importamos las dependencias necesarias para definir rutas en Express.
import express from "express";
import { userLogin, userRegister } from "../controllers/authController.js";

// Configuramos el enrutador de Express para manejar las rutas relacionadas con la autenticación.
const router = express.Router();

// Definimos la ruta para el registro de usuarios con el método POST y asignamos su controlador.
router.post("/register", userRegister);
// Definimos la ruta para el inicio de sesión de usuarios con el método POST y asignamos su controlador.
router.post("/login", userLogin);

// Exportamos el enrutador para que pueda ser utilizado en otros archivos.
export default router;

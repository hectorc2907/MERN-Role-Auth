// Importamos las dependencias necesarias para definir rutas en Express.
import express from "express";
// Importamos los controladores para manejar la lógica de autenticación.
import {
  userCheck,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/authController.js";
// Importamos el middleware isUser para verificar la autenticación del usuario.
import { isUser } from "../middlewares/verifyToken.js";

// Configuramos el enrutador de Express para manejar las rutas relacionadas con la autenticación.
const router = express.Router();

// Definimos la ruta para el registro de usuarios con el método POST y asignamos su controlador.
router.post("/register", userRegister);
// Definimos la ruta para el inicio de sesión de usuarios con el método POST y asignamos su controlador.
router.post("/login", userLogin);
// Definimos la ruta para cerrar sesión de usuarios con el método POST y asignamos su controlador.
router.post("/logout", userLogout);
// Definimos la ruta para verificar la autenticación del usuario con el método GET, usando el middleware isUser para proteger esta ruta.
router.get("/userCheck", isUser, userCheck);

// Exportamos el enrutador para que pueda ser utilizado en otros archivos.
export default router;

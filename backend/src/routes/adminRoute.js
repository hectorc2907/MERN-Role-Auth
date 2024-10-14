// Importamos el módulo express para crear rutas
import express from "express";
// Importamos los controladores que manejan las operaciones de usuario
import { getUser, deleteUser } from "../controllers/adminController.js";
// Importamos el middleware que verifica si el usuario es administrador
import { isAdmin } from "../middlewares/verifyToken.js";

// Creamos un nuevo enrutador usando express
const router = express.Router();

// Definimos una ruta GET para obtener la lista de usuarios
// Solo los administradores pueden acceder a esta ruta
router.get("/getUser", isAdmin, getUser);

// Definimos una ruta DELETE para eliminar un usuario por su ID
// También solo los administradores pueden acceder a esta ruta
router.delete("/delete/:id", isAdmin, deleteUser);

// Exportamos el enrutador para que se pueda usar en otras partes de la aplicación
export default router;

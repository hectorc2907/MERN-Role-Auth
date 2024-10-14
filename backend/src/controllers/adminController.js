// Importamos el modelo de usuario desde el archivo userModel.js
import UserModel from "../models/userModel.js";

// Función para obtener todos los usuarios de la base de datos
const getUser = async (req, res) => {
  try {
    // Buscamos todos los usuarios en la base de datos
    const users = await UserModel.find();
    // Enviamos la lista de usuarios como respuesta con un estado 200 (OK)
    res.status(200).json({ users });
  } catch (error) {
    // En caso de error, enviamos un estado 500 (error interno del servidor)
    res.status(500).json({ message: "Internal server error" });
  }
};

// Función para eliminar un usuario por su ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Obtenemos el ID del usuario de los parámetros de la solicitud
    const checkAdmin = await UserModel.findById(userId); // Buscamos el usuario por su ID

    // Verificamos si el usuario tiene rol de admin
    if (checkAdmin.role === "admin") {
      // Si el usuario que se intenta eliminar es un administrador, enviamos un error 409 (conflicto)
      return res.status(409).json({ message: "You cannot delete yourself" });
    }

    // Intentamos eliminar al usuario por su ID
    const user = await UserModel.findByIdAndDelete(userId);

    // Verificamos si el usuario fue encontrado y eliminado
    if (!user) {
      // Si no se encontró, enviamos un estado 200 (no hay contenido) y un mensaje correspondiente
      return res.status(200).json({ message: "User not found" });
    }

    // Si la eliminación fue exitosa, enviamos un estado 200 y un mensaje de éxito
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    // En caso de error, enviamos un estado 500 (error interno del servidor)
    res.status(500).json({ message: "Internal server error" });
    console.error(error); // Registramos el error en la consola para depuración
  }
};

// Exportamos las funciones getUser y deleteUser para su uso en otras partes de la aplicación
export { getUser, deleteUser };

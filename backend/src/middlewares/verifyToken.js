// Importamos el modelo de usuario para interactuar con la base de datos.
import UserModel from "../models/userModel.js";
// Importamos el paquete jsonwebtoken para manejar tokens JWT.
import jwt from "jsonwebtoken";

// Definimos el middleware isUser que verifica si el usuario está autenticado.
const isUser = async (req, res, next) => {
  try {
    // Intentamos obtener el token de las cookies.
    const token = req.cookies.token;
    // Si no hay token, respondemos con un error de autorización.
    if (!token) {
      return res
        .status(401)
        .json({ message: "'Unauthorized: No token provided'" });
    }

    // Verificamos el token utilizando la clave secreta y decodificamos su contenido.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Buscamos al usuario en la base de datos usando el ID decodificado del token.
    const user = await UserModel.findById(decoded.userId);
    // Si no se encuentra al usuario, respondemos con un error de autorización.
    if (!user) {
      return res.status(401).json({ message: "'User not found'" });
    }
    // Si el usuario es encontrado, lo agregamos al objeto de solicitud para su uso posterior.
    req.user = user;
    // Llamamos a next() para pasar al siguiente middleware o controlador.
    next();
  } catch (error) {
    // En caso de error, lo registramos en la consola.
    console.error(error);
  }
};

// Exportamos el middleware para que pueda ser utilizado en otras partes de la aplicación.
export { isUser };

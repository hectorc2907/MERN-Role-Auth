// Importamos el modelo de usuario para interactuar con la base de datos.
import UserModel from "../models/userModel.js";
// Importamos el paquete jsonwebtoken para manejar tokens JWT.
import jwt from "jsonwebtoken";

// Middleware para verificar si el usuario tiene el rol de administrador
const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Obtenemos el token del cookie de la solicitud
    // Verificamos si no se proporciona el token
    if (!token) {
      return res
        .status(401) // Enviamos un estado 401 (No autorizado)
        .json({ message: "'Unauthorized: No token provided'" }); // Mensaje indicando que no se proporcionó token
    }

    // Verificamos el token utilizando la clave secreta definida en las variables de entorno
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscamos el usuario en la base de datos utilizando el ID del token decodificado
    const user = await UserModel.findById(decoded.userId);
    // Verificamos si el usuario no existe
    if (!user) {
      return res.status(401).json({ message: "'User not found'" }); // Enviamos un estado 401 si el usuario no se encuentra
    }

    // Verificamos si el rol del usuario no es administrador
    if (user.role !== "admin") {
      return res
        .status(403) // Enviamos un estado 403 (Prohibido)
        .json({ message: "Unauthorized: User is not an admin" }); // Mensaje indicando que el usuario no es un administrador
    }

    // Si el usuario es administrador, lo añadimos al objeto de solicitud para que esté disponible en los siguientes middleware
    req.user = user;
    next(); // Llamamos al siguiente middleware en la cadena
  } catch (error) {
    console.error(error); // Registramos cualquier error que ocurra en la consola
    res.status(500).json({ message: "Internal server error" }); // Enviamos un estado 500 (Error interno del servidor) en caso de error
  }
};

// Definimos el middleware isUser que verifica si el usuario está autenticado.
const isUser = async (req, res, next) => {
  try {
    // Intentamos obtener el token de las cookies.
    const token = req.cookies.token;
    // Si no hay token, respondemos con un error de autorización.
    if (!token) {
      // return res
      //   .status(401)
      //   .json({ message: "'Unauthorized: No token provided'" });
      return
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
export { isAdmin, isUser };

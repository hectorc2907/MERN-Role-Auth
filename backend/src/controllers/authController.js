// Importamos dependencias necesarias para la funcionalidad.
import UserModel from "../models/userModel.js"; // Modelo de usuario para interactuar con la base de datos.
import jwt from "jsonwebtoken"; // Librería para manejar tokens JWT
import bcrypt from "bcryptjs"; // Librería para encriptar contraseñas.

// Definimos una función asíncrona para registrar nuevos usuarios.
const userRegister = async (req, res) => {
  // Usamos un bloque try-catch para manejar errores de forma controlada.
  try {
    // Extraemos los datos enviados en el cuerpo de la solicitud: nombre, email y contraseña.
    const { name, email, password } = req.body;

    // Buscamos en la base de datos si ya existe un usuario con el mismo email.
    const existUser = await UserModel.findOne({ email });
    // Verificamos si el usuario ya existe.
    if (existUser) {
      // Si el usuario ya está registrado, devolvemos una respuesta con estado 401 (no autorizado).
      return res
        .status(401)
        .json({ success: false, message: "User Already Exist" });
    }

    // Si el email no está registrado, procedemos a encriptar la contraseña.
    const hashedPassword = await bcrypt.hash(password, 10); // El número 10 representa el costo de procesamiento del algoritmo bcrypt.
    // Creamos un nuevo usuario con los datos proporcionados, asignando la contraseña encriptada.
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword, // Guardamos la contraseña encriptada en el modelo.
    });

    // Guardamos el nuevo usuario en la base de datos.
    await newUser.save();
    // Si el usuario se registra exitosamente, enviamos una respuesta con estado 200.
    res.status(200).json({ message: "User registered successfully", newUser });
  } catch (error) {
    // Si ocurre un error, enviamos una respuesta con estado 500 (error interno del servidor).
    res.status(500).json({ success: false, message: "Internal Server Error" });
    // Mostramos el error en la consola para ayudar en la depuración.
    console.error(error);
  }
};

// Definimos una función asíncrona para manejar el inicio de sesión del usuario.
const userLogin = async (req, res) => {
  try {
    // Extraemos el email y la contraseña del cuerpo de la solicitud.
    const { email, password } = req.body;

    // Buscamos un usuario en la base de datos que coincida con el email proporcionado.
    const user = await UserModel.findOne({ email });
    // Si no se encuentra el usuario, devolvemos una respuesta 404 con un mensaje de credenciales inválidas.
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Comparamos la contraseña proporcionada con la contraseña encriptada del usuario encontrado.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // Si la contraseña no coincide, devolvemos una respuesta 404 con el mismo mensaje de credenciales inválidas.
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Si las credenciales son correctas, generamos un token JWT con el ID del usuario como payload.
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Establecemos una cookie en la respuesta que contiene el token JWT.
    res.cookie("token", token, {
      httpOnly: true, // Solo accesible desde el servidor para mejorar la seguridad.
      secure: false, // La cookie solo se enviará por HTTPS en producción (puedes cambiar esto según el entorno).
      maxAge: 3600000, // La cookie expirará en 1 hora (3600000ms).
    });

    // Enviamos una respuesta 200 indicando que el inicio de sesión fue exitoso, junto con los datos del usuario y el token.
    res
      .status(200)
      .json({ success: true, message: "Login Successfully", user, token });
  } catch (error) {
    // Si ocurre un error, enviamos una respuesta 500 con un mensaje de error interno del servidor.
    res.status(500).json({ success: false, message: "Internal server error" });

    // Mostramos el error en la consola para facilitar la depuración.
    console.error(error);
  }
};

// Definimos la función userLogout, que maneja el cierre de sesión del usuario
const userLogout = async (req, res) => {
  try {
    // Limpiamos la cookie que contiene el token de sesión
    res.clearCookie("token");
    // Respondemos al cliente con un estado 200 y un mensaje de éxito
    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y un mensaje de error
    res.status(500).json({ success: false, message: "internal server error" });
    // Registramos el error en la consola para facilitar la depuración
    console.error(error);
  }
};

// Definimos la función userCheck, que verifica la existencia de un usuario
const userCheck = async (req, res) => {
  try {
    // Recuperamos el usuario de la solicitud (req.user) que fue agregado por un middleware de autenticación
    const user = req.user;

    // Comprobamos si el usuario existe
    if (!user) {
      // Si el usuario no existe, respondemos con un estado 404 y un mensaje de error
      return res.status(404).json({ message: "User not found" });
    }

    // Si el usuario existe, respondemos con un estado 200 y el objeto del usuario
    res.status(200).json(user);
  } catch (error) {
    // En caso de error durante el proceso, respondemos con un estado 500 y un mensaje de error
    res.status(500).json({ message: "Internal server error" });
    // Registramos el error en la consola para facilitar la depuración
    console.error(error);
  }
};

// Exportamos los controladores para que pueda ser utilizados en las rutas.
export { userRegister, userLogin, userLogout, userCheck };

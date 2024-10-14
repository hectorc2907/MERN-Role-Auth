//importamos dependencias y herramientas del proyecto
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//creamos una funcion asincrona para el registro de usuarios
const userRegister = async (req, res) => {
  //creamos un trycatch para el manejo de escenarios
  try {
    //recuperamos los datos a utilizar como el nombre, email y contraseña, no recuperamos el usuario ya que por defecto es "user"
    const { name, email, password } = req.body;
    //buscamos dentro de la base de datos si ya existe un usuario con ese email registrado
    const existUser = await UserModel.findOne({ email });
    //verificamos si existe
    if (existUser) {
      //si existe finalizamos el proceso con un mensaje de que ya existe el email que intenta registrar
      return res
        .status(401)
        .json({ success: false, message: "User Already Exist" });
    }

    //caso contrario pasamos a encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    //luego tomamos los datos que vamos a registrar en nuestra base de datos
    const newUser = new UserModel({
      name,
      email,
      //es importante darle el valor de la contraseña encriptada al valor de password o nos registrara sin ser encriptada
      password: hashedPassword,
    });

    //aguardamos a que se guarde el usuario
    await newUser.save();
    //al guardarse el usuario nos dara la respuesta de usuario registrado exitosamente
    res.status(200).json({ message: "user register successfully", newUser });
  } catch (error) {
    //caso contrario nos mostrara un mensaje de error en el servicio interno
    res.status(500).json({ success: false, message: "internal server error" });
    //ademas mostrara por consola el error
    console.error(error);
  }
};

//exportamos los contradores
export { userRegister };

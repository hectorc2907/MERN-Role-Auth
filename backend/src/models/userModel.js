// Importamos la dependencia de mongoose para definir el esquema y modelo del usuario.
import mongoose from "mongoose";

// Creamos el esquema de usuario utilizando el método Schema de mongoose.
const userSchema = new mongoose.Schema(
  {
    // Definimos la propiedad "name" como una cadena de texto obligatoria.
    name: {
      type: String,
      required: true,
    },
    // Definimos "email" como una cadena obligatoria y única para evitar registros duplicados.
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Asignamos un rol al usuario usando un enum con opciones fijas ("admin" y "user").
    // El valor por defecto es "user".
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    // La propiedad "password" es obligatoria y almacenará la contraseña encriptada del usuario.
    password: {
      type: String,
      required: true,
    },
  },
  // Habilitamos timestamps para que mongoose registre automáticamente las fechas de creación y actualización.
  {
    timestamps: true,
  }
);

// Creamos el modelo de usuario utilizando el esquema definido y lo asignamos a la constante UserModel.
const UserModel = mongoose.model("users", userSchema);

// Exportamos el modelo UserModel para poder usarlo en otros archivos del proyecto.
export default UserModel;

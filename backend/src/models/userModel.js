//importamos dependencias y herramientas del proyecto
import mongoose from "mongoose";

//creamos una constante que sera nuestro esquema de usuario y llamamos al metodo Schema de mongoose
const userSchema = new mongoose.Schema(
  //declaramos las propiedades de cada usuario con su tipo, si es obligatorio y si es unico
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    //en esta seccion usamos enum para dar una serie de opciones fijas siendo user el valor por defecto
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
  },
  //timestamps nos sirve para generar tambien una fecha de creacion y de la ultima actualizacion que se realiza
  {
    timestamps: true,
  }
);

//definido el modelo con el metodo model de mongoose lo guardamos en una constante
const UserModel = mongoose.model("users", userSchema);

//guarda la constante la exportamos
export default UserModel;

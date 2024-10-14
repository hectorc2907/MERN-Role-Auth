//importamos dependencias y herramientas del proyecto
import mongoose from "mongoose";

//configuramos una funcion asincrona para la llamada a la base de datos
const DbCon = async () => {
  //utilizamos un trycatch para los escenarios de la conexion
  try {
    //guardamos la base de datos en una constante y recuperamos su datos con la propiedad connection
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    //imprimimos para ver si se realizo la conexion con exito utilizando el valor name de connection
    console.log(`MongoDB ${connection.name} is Connected`);
  } catch (error) {
    //registramos el error en caso de no conectarse
    console.error(error);
  }
};

//finalmente exportamos la funcion
export default DbCon;

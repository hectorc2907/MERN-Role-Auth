// Importamos la dependencia necesaria para trabajar con MongoDB.
import mongoose from "mongoose";

// Configuramos una función asincrónica para establecer la conexión con la base de datos.
const DbCon = async () => {
  // Utilizamos un bloque try-catch para manejar posibles errores durante la conexión.
  try {
    // Intentamos conectarnos a la base de datos utilizando la URI proporcionada en las variables de entorno.
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);

    // Imprimimos un mensaje en la consola para confirmar que la conexión se realizó con éxito,
    // utilizando el nombre de la conexión para mayor claridad.
    console.log(`MongoDB ${connection.name} is Connected`);
  } catch (error) {
    // Si ocurre un error, lo registramos en la consola para su revisión.
    console.error("Error connecting to MongoDB:", error);
  }
};

// Finalmente, exportamos la función para que pueda ser utilizada en otras partes de la aplicación.
export default DbCon;

// Importación de hooks y dependencias necesarias.
import { useState } from "react"; // Hook para manejar el estado en componentes funcionales.
import { Link } from "react-router-dom"; // Componente para navegación interna con React Router.
import { post } from "../services/ApiEndpoint"; // Importación del método post desde un servicio de API.
import { toast } from "react-hot-toast"; // Importación de react-hot-toast para mostrar notificaciones.

const Register = () => {
  // Definición de los estados locales para manejar los valores del formulario.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Función que se ejecuta al enviar el formulario.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene que el navegador recargue la página al enviar el formulario.
    try {
      // Realiza una solicitud POST a la API con los datos del usuario.
      const request = await post("/api/auth/register", {
        name,
        email,
        password,
      });
      const response = request.data; // Extrae los datos de la respuesta.
      // Si la solicitud es exitosa, muestra una notificación de éxito.
      if (request.status === 200) {
        toast.success(response.message); // Muestra un toast con el mensaje de éxito.
      }

      console.log(response); // Muestra la respuesta en la consola para depuración.
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud.
      console.log(error);
      // Muestra una notificación de error en caso de fallo.
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <div className="register-container">
        <h2>Register</h2>
        {/* Formulario con el evento onSubmit para manejar el envío. */}
        <form onSubmit={handleSubmit}>
          {/* Campo de entrada para el nombre de usuario. */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setName(e.target.value)} // Actualiza el estado al cambiar el valor.
            />
          </div>

          {/* Campo de entrada para el email. */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado al cambiar el valor.
            />
          </div>

          {/* Campo de entrada para la contraseña. */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password" // Corregí la clave id que estaba mal escrita.
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado al cambiar el valor.
            />
          </div>
          {/* Botón para enviar el formulario. */}
          <button type="submit">Register</button>
          {/* Enlace a la página de login en caso de que el usuario ya tenga una cuenta. */}
          <p className="register-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;

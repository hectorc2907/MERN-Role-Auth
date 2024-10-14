// Importamos hooks y componentes de React y otras librerías necesarias
import { useState } from "react"; // Hook para manejar el estado en el componente
import { Link, useNavigate } from "react-router-dom"; // Link para navegación y useNavigate para redirigir
import { post } from "../services/ApiEndpoint"; // Función para realizar solicitudes POST a la API
import { toast } from "react-hot-toast"; // Librería para mostrar notificaciones
import { useDispatch, useSelector } from "react-redux"; // Hooks para acceder al estado y despachar acciones de Redux
import { SetUser } from "../redux/AuthSlice"; // Acción para establecer el usuario en el estado

// Definimos el componente funcional Login
const Login = () => {
  const user = useSelector((state) => state.Auth); // Obtenemos el estado del usuario desde Redux
  console.log(user); // Mostramos el estado del usuario en la consola para depuración
  const dispatch = useDispatch(); // Inicializamos la función dispatch para enviar acciones a Redux

  // Declaramos los estados para email y contraseña
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const navigate = useNavigate(); // Hook para redirigir a otras rutas

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario
    console.log(email); // Mostramos el email en la consola para depuración
    try {
      // Realizamos la solicitud POST al endpoint de inicio de sesión
      const request = await post("/api/auth/login", { email, password });
      const response = request.data; // Guardamos la respuesta de la API

      // Verificamos si el estado de la respuesta es 200 (éxito)
      if (request.status === 200) {
        // Cambiado '==' a '===' para comparación estricta
        // Redirigimos según el rol del usuario
        if (response.user.role === "admin") {
          // Cambiado '==' a '===' para comparación estricta
          navigate("/admin"); // Redirigimos a la página de administración si el rol es admin
        } else if (response.user.role === "user") {
          // Cambiado '==' a '===' para comparación estricta
          navigate("/"); // Redirigimos a la página principal si el rol es user
        }
        toast.success(response.message); // Mostramos un mensaje de éxito
        dispatch(SetUser(response.user)); // Actualizamos el estado del usuario en Redux
      }
      console.log(response); // Mostramos la respuesta completa en la consola para depuración
    } catch (error) {
      console.error(error); // Registramos cualquier error en la consola
      toast.error("Error durante el inicio de sesión"); // Mostramos un mensaje de error si la solicitud falla
    }
  };

  // Renderizamos el formulario de inicio de sesión
  return (
    <>
      <div className="login-container">
        {/* Contenedor del formulario de inicio de sesión */}
        <h2>Login</h2> {/* Título del formulario */}
        <form onSubmit={handleSubmit}>
          {/* Llamamos a handleSubmit al enviar el formulario */}
          <div className="input-group">
            {/* Grupo de entrada para el email */}
            <label htmlFor="email">Email</label>
            {/* Etiqueta para el campo de email */}
            <input
              type="text" // Tipo de entrada es texto
              id="email" // ID para el campo de entrada
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado de email al cambiar el valor
              required // Campo obligatorio
            />
          </div>
          <div className="input-group">
            {/* Grupo de entrada para la contraseña */}
            <label htmlFor="password">Password</label>
            {/* Etiqueta para el campo de contraseña */}
            <input
              type="password" // Tipo de entrada es contraseña
              id="password" // ID para el campo de entrada
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de contraseña al cambiar el valor
              required // Campo obligatorio
            />
          </div>
          <button type="submit">Login</button>
          {/* Botón para enviar el formulario */}
          <p className="register-link">
            {/* Enlace para redirigir a la página de registro */}
            Not registered? <Link to={"/register"}>Register here</Link>
            {/* Enlace a la página de registro */}
          </p>
        </form>
      </div>
    </>
  );
};

// Exportamos el componente Login para usarlo en otras partes de la aplicación
export default Login;

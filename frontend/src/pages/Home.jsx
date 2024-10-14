// Importamos hooks y funciones necesarias de React y Redux
import { useSelector, useDispatch } from "react-redux"; // useSelector para acceder al estado y useDispatch para enviar acciones
import { useNavigate } from "react-router-dom"; // Hook para redirigir a otras rutas
import { post } from "../services/ApiEndpoint"; // Función para realizar solicitudes POST a la API
import { Logout } from "../redux/AuthSlice"; // Acción para manejar el cierre de sesión

// Definimos el componente funcional Home
const Home = () => {
  const user = useSelector((state) => state.Auth.user); // Obtenemos el usuario desde el estado de Redux
  const navigate = useNavigate(); // Inicializamos la función para navegar a otras rutas
  const dispatch = useDispatch(); // Inicializamos la función dispatch para enviar acciones a Redux

  // Función para redirigir al usuario a la página de administración
  const goToAdmin = () => {
    navigate("/admin"); // Redirigimos a la ruta /admin
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      // Realizamos una solicitud POST al endpoint de cierre de sesión
      const request = await post("/api/auth/logout");
      const response = request.data; // Guardamos la respuesta de la API

      // Verificamos si la respuesta fue exitosa
      if (request.status === 200) {
        // Cambiado '==' a '===' para comparación estricta
        dispatch(Logout()); // Despachamos la acción de cierre de sesión en Redux
        navigate("/login"); // Redirigimos al usuario a la página de inicio de sesión
      }
    } catch (error) {
      console.error(error); // Registramos cualquier error en la consola
    }
  };

  // Renderizamos el contenido de la página principal
  return (
    <>
      <div className="home-container">
        {" "}
        {/* Contenedor principal */}
        <div className="user-card">
          {" "}
          {/* Tarjeta del usuario */}
          <h2>Welcome, {user && user.name}</h2>{" "}
          {/* Saludo al usuario, si está autenticado */}
          <button className="logout-btn" onClick={handleLogout}>
            {" "}
            {/* Botón de cierre de sesión */}
            Logout
          </button>
          {user && user.role === "admin" ? ( // Verificamos si el usuario es un administrador
            <button className="admin-btn" onClick={goToAdmin}>
              {" "}
              {/* Botón para ir a la página de administración */}
              Go To Admin
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

// Exportamos el componente Home para que pueda ser utilizado en otras partes de la aplicación
export default Home;

// Importamos los hooks y funciones necesarias de React y React Router.
import { useEffect } from "react"; // useEffect se utiliza para manejar efectos secundarios en el componente.
import { Outlet, useNavigate } from "react-router-dom"; // Outlet se utiliza para renderizar componentes anidados, y useNavigate para redirigir al usuario.
import { useSelector } from "react-redux"; // useSelector se utiliza para acceder al estado de Redux.

const UserLayout = () => {
  // Obtenemos el usuario del estado de autenticación de Redux.
  const user = useSelector((state) => state.Auth.user);
  // Inicializamos la función de navegación para redirigir al usuario.
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobamos si no hay un usuario autenticado.
    if (!user) {
      // Si el usuario no está autenticado, lo redirigimos a la página de inicio de sesión.
      navigate("/login");
    }
  }, [user, navigate]); // Dependemos del usuario y la función de navegación.

  return <Outlet />; // Renderizamos el Outlet para mostrar los componentes hijos anidados.
};

export default UserLayout; // Exportamos el componente UserLayout para su uso en otros lugares de la aplicación.

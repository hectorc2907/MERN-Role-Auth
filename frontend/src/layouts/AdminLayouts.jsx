// Importamos los hooks y funciones necesarias de React y React Router.
import { useEffect } from "react"; // useEffect se utiliza para manejar efectos secundarios en el componente.
import { Outlet, useNavigate } from "react-router-dom"; // Outlet se utiliza para renderizar componentes anidados, y useNavigate para redirigir al usuario.
import { useSelector } from "react-redux"; // useSelector se utiliza para acceder al estado de Redux.

const AdminLayouts = () => {
  // Obtenemos el usuario del estado de autenticación de Redux.
  const user = useSelector((state) => state.Auth.user);
  // Inicializamos la función de navegación para redirigir al usuario.
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobamos si no hay un usuario autenticado o si el rol del usuario no es "admin".
    if (!user || user.role !== "admin") {
      // Si el usuario no está autenticado o no es un administrador, lo redirigimos a la página de inicio de sesión.
      navigate("/login");
    }
  }, [user, navigate]); // Dependemos del usuario y la función de navegación.

  return <Outlet />; // Renderizamos el Outlet para mostrar los componentes hijos anidados.
};

export default AdminLayouts; // Exportamos el componente AdminLayouts para su uso en otros lugares de la aplicación.

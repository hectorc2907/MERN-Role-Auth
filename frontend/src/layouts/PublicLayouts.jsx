// Importamos los hooks y componentes necesarios.
import { useEffect } from "react"; // Para manejar efectos secundarios.
import { useSelector } from "react-redux"; // Para acceder al estado de Redux.
import { Outlet, useNavigate } from "react-router-dom"; // Para manejar la navegación y las rutas.

const PublicLayouts = () => {
  // Obtenemos la información del usuario del estado global de Redux.
  const user = useSelector((state) => state.Auth.user);

  // Inicializamos el hook para la navegación.
  const navigate = useNavigate();

  // useEffect se ejecuta cuando el componente se monta y cada vez que cambia `user`.
  useEffect(() => {
    // Comprobamos si hay un usuario autenticado.
    if (user) {
      // Si el usuario tiene el rol de "admin", lo redirigimos a la página de administración.
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        // De lo contrario, lo redirigimos a la página principal.
        navigate("/");
      }
    }
  }, [user, navigate]); // Dependencias: el efecto se ejecutará cuando `user` o `navigate` cambien.

  // Renderizamos el componente Outlet para mostrar las rutas hijas.
  return <Outlet />;
};

export default PublicLayouts; // Exportamos el componente para su uso en otras partes de la aplicación.

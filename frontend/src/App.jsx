// Importamos los componentes y funciones necesarias de react-router-dom para manejar las rutas.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importamos las páginas que se utilizarán en las rutas.
import Home from "./pages/Home.jsx"; // Página principal.
import Login from "./pages/Login.jsx"; // Página de inicio de sesión.
import Register from "./pages/Register.jsx"; // Página de registro de nuevos usuarios.
import Admin from "./pages/Admin.jsx"; // Página de administración.
import { Toaster } from "react-hot-toast"; // Componente para mostrar notificaciones.
import "./App.css"; // Importamos estilos CSS para la aplicación.
import PublicLayouts from "./layouts/PublicLayouts.jsx"; // Layout público que gestiona la navegación.
import UserLayout from "./layouts/UserLayout.jsx"; // Layout que asegura que el usuario esté autenticado.
import AdminLayouts from "./layouts/AdminLayouts.jsx"; // Layout que verifica que el usuario sea administrador.
import { useDispatch, useSelector } from "react-redux"; // Importamos hooks de Redux para gestionar el estado.
import { useEffect } from "react"; // useEffect se utiliza para manejar efectos secundarios en el componente.
import { updateUser } from "./redux/AuthSlice.js"; // Importamos la acción para actualizar la información del usuario.

const App = () => {
  // Obtenemos el usuario del estado de autenticación de Redux.
  const user = useSelector((state) => state.Auth.user);
  // Inicializamos la función dispatch para enviar acciones a Redux.
  const dispatch = useDispatch();

  useEffect(() => {
    // Al cargar el componente, despachamos la acción updateUser para actualizar la información del usuario.
    dispatch(updateUser());
  }, [dispatch]); // Solo se ejecuta al montar el componente.

  return (
    <>
      <Router>
        {/* Componente para mostrar notificaciones en la interfaz */}
        <Toaster />
        {/* Componente que contiene todas las rutas de la aplicación */}
        <Routes>
          {/* Ruta principal que utiliza el layout para usuarios autenticados */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />{" "}
            {/* Ruta por defecto que carga la página de inicio */}
          </Route>

          {/* Ruta para el layout de administración que verifica que el usuario sea administrador */}
          <Route path="/admin" element={<AdminLayouts />}>
            <Route index element={<Admin />} />{" "}
            {/* Ruta que carga la página de administración */}
          </Route>

          {/* Ruta pública que permite acceder a la página de inicio de sesión y registro */}
          <Route path="/" element={<PublicLayouts />}>
            <Route path="/login" element={<Login />} />{" "}
            {/* Ruta para la página de inicio de sesión */}
            <Route path="/register" element={<Register />} />{" "}
            {/* Ruta para la página de registro */}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App; // Exportamos el componente App para su uso en otros lugares de la aplicación.

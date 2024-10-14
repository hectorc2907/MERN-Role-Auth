import { useEffect, useState } from "react"; // Importa los hooks useEffect y useState de React
import { deleteUser, get } from "../services/ApiEndpoint"; // Importa funciones para realizar solicitudes a la API
import { toast } from "react-hot-toast"; // Importa la función para mostrar notificaciones

const Admin = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios (mejor usar [] como valor inicial)

  useEffect(() => {
    // Efecto para obtener los usuarios al montar el componente
    const GetUsers = async () => {
      try {
        const request = await get("/api/admin/getUser"); // Llama a la API para obtener los usuarios
        const response = request.data; // Obtiene los datos de la respuesta
        if (request.status === 200) {
          setUsers(response.users); // Actualiza el estado con los usuarios obtenidos
        }
      } catch (error) {
        console.error(error); // Maneja cualquier error que ocurra en la solicitud
      }
    };
    GetUsers(); // Llama a la función para obtener los usuarios
  }, []); // Dependencias vacías para ejecutar solo al montar el componente

  const handleDelete = async (id) => {
    // Función para manejar la eliminación de un usuario
    try {
      const request = await deleteUser(`/api/admin/delete/${id}`); // Llama a la API para eliminar el usuario
      const response = request.data; // Obtiene los datos de la respuesta
      if (request.status === 200) {
        toast.success(response.message); // Muestra notificación de éxito
        // Actualiza la lista de usuarios eliminando al usuario que acaba de ser eliminado
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }
    } catch (error) {
      // Maneja cualquier error que ocurra en la solicitud
      if (error.response) {
        toast.error(error.response.data.message); // Muestra notificación de error
      }
    }
  };

  return (
    <>
      <div className="admin-container">
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && // Verifica si hay usuarios para renderizar
              users.map((elem) => (
                <tr key={elem._id}>
                  <td>{elem.name}</td>
                  <td>{elem.email}</td>
                  <td>
                    <button onClick={() => handleDelete(elem._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin; // Exporta el componente Admin

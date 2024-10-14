// Importa la librería axios para manejar peticiones HTTP.
import axios from "axios";

// Crea una instancia personalizada de axios con configuración predeterminada.
const instance = axios.create({
  // URL base tomada de una variable de entorno (debe comenzar con "VITE_").
  baseURL: import.meta.env.VITE_BACKEND_URL,

  // Define los encabezados para que las solicitudes envíen y reciban JSON.
  headers: {
    "Content-Type": "application/json",
  },

  // Habilita el envío de cookies o credenciales en peticiones entre dominios.
  withCredentials: true,
});

// Método GET: Realiza una solicitud GET con parámetros opcionales.
export const get = (url, params) => instance.get(url, { params });
// Método POST: Envía datos al servidor mediante una solicitud POST.
export const post = (url, data) => instance.post(url, data);
// Método PUT: Actualiza datos en el servidor mediante una solicitud PUT.
export const put = (url, data) => instance.put(url, data);
// Método DELETE: Elimina un recurso del servidor.
export const deleteUser = (url) => instance.delete(url);

// Interceptor de solicitud: Se ejecuta antes de enviar cualquier petición.
instance.interceptors.request.use(
  function (config) {
    // Si la solicitud es válida, la retorna para continuar.
    return config;
  },
  function (error) {
    // Si ocurre un error, lo rechaza para manejarlo en otro lugar.
    return Promise.reject(error);
  }
);

// Interceptor de respuesta: Se ejecuta al recibir una respuesta del servidor.
instance.interceptors.response.use(
  function (response) {
    // Retorna la respuesta para que pueda ser usada por el llamante.
    return response;
  },
  function (error) {
    // Rechaza el error para que pueda ser manejado en otro lugar.
    return Promise.reject(error);
  }
);

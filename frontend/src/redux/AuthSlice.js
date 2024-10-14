// Importamos las funciones necesarias de Redux Toolkit.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Importamos la función get para realizar peticiones HTTP.
import { get } from "../services/ApiEndpoint";

// Definimos un thunk asíncrono para actualizar la información del usuario.
export const updateUser = createAsyncThunk("updateUser", async () => {
  try {
    // Realizamos una petición GET para verificar la autenticación del usuario.
    const request = await get("/api/auth/userCheck");
    const response = request.data; // Obtenemos los datos de la respuesta.
    return response; // Devolvemos los datos para que puedan ser utilizados en el estado.
  } catch (error) {
    throw error; // Si ocurre un error, lo lanzamos para que pueda ser manejado en el reducer.
  }
});

// Estado inicial del slice de autenticación.
const initialState = {
  loading: null, // Indica si se está cargando una operación asíncrona.
  error: null, // Almacena errores, si ocurren.
  user: null, // Almacena la información del usuario autenticado.
};

// Creamos el slice de autenticación.
const AuthSlice = createSlice({
  name: "Auth", // Nombre del slice.
  initialState: initialState, // Estado inicial.
  reducers: {
    // Reducer para establecer el usuario en el estado.
    SetUser: (state, action) => {
      state.user = action.payload; // Actualiza el estado del usuario con la carga útil proporcionada.
    },
    // Reducer para manejar el logout del usuario.
    Logout: (state) => {
      state.user = null;
      state.loading = null;
      state.error = null; // Resetea el estado al cerrar sesión.
    },
  },

  // Manejadores para las acciones asíncronas.
  extraReducers: (builder) => {
    // Manejador para el estado pendiente de la acción updateUser.
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true; // Establece loading a true cuando se inicia la operación.
    });
    // Manejador para el estado cumplido de la acción updateUser.
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = null;
      state.user = action.payload;
      // Establece loading a null y actualiza el usuario con la carga útil.
    });
    // Manejador para el estado rechazado de la acción updateUser.
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = null; // Establece loading a null al finalizar la operación.
      state.error = action.error.message; // Almacena el mensaje de error en el estado.
      state.user = null; // Resetea el usuario en caso de error.
    });
  },
});

// Exportamos las acciones SetUser y Logout para su uso en componentes.
export const { SetUser, Logout } = AuthSlice.actions;

// Exportamos el reductor del slice para su uso en el store de Redux.
export default AuthSlice.reducer;

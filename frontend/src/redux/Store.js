// Importamos configureStore para crear el store de Redux.
import { configureStore } from "@reduxjs/toolkit";
// Importamos el slice de autenticación que se encargará del estado de la autenticación del usuario.
import AuthSlice from "./AuthSlice";
// Importamos el almacenamiento local para persistir el estado.
import storage from "redux-persist/lib/storage";
// Importamos las funciones necesarias para configurar la persistencia del estado.
import { persistReducer, persistStore } from "redux-persist";

// Definimos la configuración para la persistencia del estado.
const persistConfig = {
  // El key es el nombre que se usará para almacenar el estado persistido.
  key: "root",
  // Almacenamos el estado en el almacenamiento local.
  storage,
};

// Aplicamos persistReducer para crear un reductor persistente usando la configuración definida y el slice de autenticación.
const persistedReducer = persistReducer(persistConfig, AuthSlice);

// Creamos el store de Redux configurando los reductores y añadiendo el reductor persistente.
export const store = configureStore({
  reducer: {
    // Añadimos el reductor persistente al store bajo la clave "Auth".
    Auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignorar estas acciones no serializables.
      },
    }),
});

// Creamos el objeto persistor que se usará para persistir el estado del store.
export const persistor = persistStore(store);

// Importamos StrictMode para resaltar problemas potenciales en la aplicación.
import { StrictMode } from "react";
// Importamos createRoot de react-dom/client para renderizar nuestra aplicación en el DOM.
import { createRoot } from "react-dom/client";
// Importamos el componente principal de la aplicación.
import App from "./App.jsx";
// Importamos el Provider de react-redux para proporcionar el store a nuestra aplicación.
import { Provider } from "react-redux";
// Importamos el store y persistor configurados en redux/Store.js.
import { store, persistor } from "./redux/Store.js";
// Importamos PersistGate de redux-persist/integration/react para manejar la carga de persistencia del estado.
import { PersistGate } from "redux-persist/integration/react";

// Creamos un root para renderizar nuestra aplicación en el elemento con el id "root" en el DOM.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Proporcionamos el store de Redux a toda la aplicación a través del Provider */}
    <Provider store={store}>
      {/* PersistGate se usa para manejar la carga del estado persistido antes de que la aplicación se renderice */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Renderizamos el componente principal de la aplicación */}
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);

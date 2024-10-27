import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BlogContextProvider } from "./context/BlogContext.jsx";

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BlogContextProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BlogContextProvider>
    </BrowserRouter>
  </StrictMode>
);

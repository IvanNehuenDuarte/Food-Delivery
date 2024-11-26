// node modules
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Pages
import App from "./App.jsx";

// CSS
import "./index.css";
import StoreContextProvider from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);

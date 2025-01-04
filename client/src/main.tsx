import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Navbar from "./Components/Navbar.component.tsx";
import "./main.css";

const ToggleEditPopupContext = createContext<boolean>(false);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar />
    <ToggleEditPopupContext.Provider value={false}>
      <App />
    </ToggleEditPopupContext.Provider>
  </StrictMode>
);

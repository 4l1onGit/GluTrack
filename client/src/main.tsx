import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Navbar from "./Components/Navbar.component.tsx";
import "./main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./providers/user.provider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Navbar />
        <App />
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppWrapper>
          <App />
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
            }}
          />
        </AppWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);

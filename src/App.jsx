import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/AuthContext/AuthProvider";
import { ThemeProvider } from "./context/ThemeContext/ThemeProvider";
import "./i18n";
import { AppRoutes } from "./routes/routes";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={AppRoutes} />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

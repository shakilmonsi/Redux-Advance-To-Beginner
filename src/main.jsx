import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ScaleLoader } from "react-spinners";
import { Provider } from "react-redux"; // ✅ Redux Provider
import App from "./App.jsx";
import "./index.css";
import { store } from "./Reducx/store/Store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<ScaleLoader />}>
      <Provider store={store}>
        {" "}
        {/* ✅ Redux Provider added here */}
        <App />
      </Provider>
    </Suspense>
  </StrictMode>
);

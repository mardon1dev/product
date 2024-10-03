import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ProductContext } from "./context/Context.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductContext>
      <App />
    </ProductContext>
  </BrowserRouter>
);

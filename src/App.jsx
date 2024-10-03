import AllRoutes from "./routes/AllRoutes";

import "./App.css";
import Header from "./components/Header/Header";
function App() {
  return (
    <div className="app p-[20px]">
      <Header />
      <AllRoutes />
    </div>
  );
}

export default App;

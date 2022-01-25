import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from "./contexts/AuthContexts";
import { Room } from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          {/* :id - parametro passado na URL para acessar a page Room  */}
          <Route path="/rooms/:id" element={<Room />} />
        </Routes>
      </AuthContextProvider>

    </BrowserRouter>
  );
}

export default App;

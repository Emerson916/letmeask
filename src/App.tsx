import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContexts";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/rooms/new" element={<NewRoom/>}/>
          {/* :id - parametro passado na URL para acessar a page Room  */}
          <Route path="/rooms/:id" element={<Room/>}/>
          <Route path="/admin/rooms/:id" element={<AdminRoom/>}/>
        </Routes>
      </AuthContextProvider>

    </BrowserRouter>
  );
}

export default App;

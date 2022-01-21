import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from "./contexts/AuthContexts";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContextProvider>

    </BrowserRouter>
  );
}

export default App;

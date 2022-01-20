import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { createContext, useState } from 'react';
import { auth, firebase } from "./services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string | null;
}

//tipagem typescript, fala o que vai ser usado
//colocar tudo o que for usado no Context
type AuthContextType = {
  user: User | undefined;
  //função sem parametros e return
  SingInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  async function SingInWithGoogle() {
    //Autenticação com o google
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    //Abrir a autenticação como um popup

    if (result.user) {
      //dados do usuario ao logar na conta do google
      const { displayName, photoURL, uid } = result.user

      if (!displayName || photoURL) {
        throw new Error('Missing information from Google account')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }


return (
  <BrowserRouter>
    <AuthContext.Provider value={{ user, SingInWithGoogle }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/new" element={<NewRoom />} />
      </Routes>
    </AuthContext.Provider>
  </BrowserRouter>
);
}

export default App;

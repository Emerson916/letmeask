import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";

import illustration from "../assets/images/illustration.svg";
import LogoImg from "../assets/images/logo.svg";
import IconGoogle from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import "../styles/auth.scss";

export function Home() {
    const navegate = useNavigate();
    const {user, SingInWithGoogle} = useContext(AuthContext);
 
    async function handleCreateRoom() {
        if(!user){
            await SingInWithGoogle();
        }

        navegate('/rooms/new');
    }

return (
    <div id="page-auth">
        <aside>
            <img src={illustration} alt="Ilustração perguntas e respostas" />
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas do sua audiência em tempo-real.</p>
        </aside>

        <main>
            <div className="main-content">
                <img src={LogoImg} alt="logo" />

                <button onClick={handleCreateRoom} className="create-room">
                    <img src={IconGoogle} alt="icon-google" />
                    Crie sua sala com o Google
                </button>

                <div className="separator"> ou entre em uma sala</div>

                <form>
                    <input
                        type="text"
                        placeholder="Dígite o código da sala"
                    />

                    <Button type="submit">
                        Entrar na sala
                    </Button>
                </form>
            </div>
        </main>
    </div>
);
}

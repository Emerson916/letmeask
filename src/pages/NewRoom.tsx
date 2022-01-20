import illustration from "../assets/images/illustration.svg";
import LogoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import "../styles/auth.scss";

export function NewRoom() {
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
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />

                        <Button type="submit">
                            Criar sala
                        </Button>

                    </form>
                    <p>Quer entrar em uma sala existente ?  <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    );
}


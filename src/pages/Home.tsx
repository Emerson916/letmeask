import { useNavigate } from "react-router-dom";

import illustration from "../assets/images/illustration.svg";
import LogoImg from "../assets/images/logo.svg";
import IconGoogle from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function Home() {
    const navegate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        navegate('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() === '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();


        //verificando se a sala existe
        if (!roomRef.exists()) {
            alert('Essa sala não existe!.')
            return;
        }

        if(roomRef.val().endedAt){
            alert('Essa sala foi excluida!.')
            return;
        }

        navegate(`/rooms/${roomCode}`);
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

                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Dígite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
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


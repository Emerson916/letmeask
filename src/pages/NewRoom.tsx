import illustration from "../assets/images/illustration.svg";
import LogoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import "../styles/auth.scss";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";


export function NewRoom() {
    const {user} = useAuth()
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
        //para previnir o evento padrão de atualizar a tela ao clicar no button Submit
        event.preventDefault()

        if(newRoom.trim() == ''){
            return;
        }

        //Dizendo ao firebase que la dentro tem uma categoria chamada "rooms"
        const roomRef = database.ref('rooms');

        //Enviando um informação para dentro de "rooms"
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            //pegando o valor do input pelo estado
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
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


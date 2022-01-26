import { FormEvent, useState } from "react";
import iconPeople from "../assets/images/icon.svg";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import '../styles/room.scss';

import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id!;

    const { title, questions } = useRoom(roomId)

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if (newQuestion.trim() === '') {
            return
        }

        if (!user) {
            throw new Error("You must be logged in");
        }

        const questions = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },

            //isHighLighted - vê se a pergunta esta sendo respondida
            isHighLighted: false,
            //isAnswered - verifica se a pergunta ja foi respondida
            isAnswered: false
        };

        //criando o campo de questions no database
        await database.ref(`rooms/${roomId}/questions`).push(questions);

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main >
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {/* if sem o else */}
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}

                </div>

                {/* verificando o array das perguntas */}
                {/* {JSON.stringify(questions)} */}
                <div className="question-list">
                    {questions.map(questions => {
                        return (
                            <Question
                                key={questions.id}
                                author={questions.author}
                                content={questions.content}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
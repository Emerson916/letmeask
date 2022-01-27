import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import { useNavigate, useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { database } from "../services/firebase";
import '../styles/room.scss';

import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const navigate = useNavigate()
    const params = useParams<RoomParams>();

    const roomId = params.id!;

    const { title, questions } = useRoom(roomId)

    //função para encerrar uma sala
    async function handleEndRoom() {
        // uptade() -- vai alterar os dados da sala
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        navigate('/');
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighLightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true
        });


    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Tem certeza que você deseja excluir esta pergunta ?")) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main >
                <div className="room-title">
                    <h1>{title}</h1>
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
                                isAnswered={questions.isAnswered}
                                isHighLighted={questions.isHighLighted}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleCheckQuestionAsAnswered(questions.id)}
                                >
                                    <img src={checkImg} alt="Marcar pergunta" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleHighLightQuestion(questions.id)}
                                >
                                    <img src={answerImg} alt="Remover pergunta" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(questions.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
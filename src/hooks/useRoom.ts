import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }

    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    //string - objeto, string - valor
    likes: Record<string, {
        authorId: string;
    }>

}>

    type QuestionType = {
        id: string;
        author: {
            name: string;
            avatar: string;
        }

    content: string;
        isAnswered: boolean;
        isHighLighted: boolean;
        likeCount : number;
        likeId: string | undefined;
    }


export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [questions, setQuestion] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        //firebase once - escuta o evento apenas uma vez  
        //on - escuta o evento mais de uma vez
        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

            //Object.entries() - Transforma um array em uma Matriz
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    //some() -- Percorre o array até encontrar a condição passada e retorna {true ou false}
                    //find() -- percorre o arrat até encontrar a condição passada e retorna o 
                    //pegando o id do like
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],

                }
            })

            setTitle(databaseRoom.title);
            setQuestion(parsedQuestions);
        })

        return () => {
            roomRef.off('value');
        }

    }, [roomId, user?.id]);


    return { questions, title }
}
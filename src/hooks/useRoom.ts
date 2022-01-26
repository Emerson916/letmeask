import { useEffect, useState } from "react";
import { database } from "../services/firebase";

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
    }


export function useRoom(roomId: string) {
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
                }
            })

            setTitle(databaseRoom.title);
            setQuestion(parsedQuestions);
        })
    }, [roomId]);


    return { questions, title }
}
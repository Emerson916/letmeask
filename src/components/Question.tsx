import { ReactNode } from 'react';
import '../styles/question.scss';


type QuestionProps = {
    content : string,
    author : {
        name: string,
        avatar: string,
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighLighted?: boolean;
}

//fazendo uma dessestruturação na props -- para pegar somente alguns dados
export function Question({
    content,
    author,
    isAnswered = false,
    isHighLighted = false,
    children,

}: QuestionProps){
    return(
        <div className={`question
         ${isAnswered ? 'answered' : ''} 
         ${isHighLighted && !isAnswered  ? 'highLighted' : ''}`}
         >
            
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name}/>
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
            <p>{content}</p>
        </div>
    )
}
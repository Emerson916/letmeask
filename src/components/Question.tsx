import '../styles/question.scss';


type QuestionProps = {
    content : string,
    author : {
        name: string,
        avatar: string,
    }
}

//fazendo uma dessestruturação na props -- para pegar somente alguns dados
export function Question({content, author}: QuestionProps){
    return(
        <div className="question">
            <footer>
                <div className="user-infor">
                    <img src={author.avatar} alt={author.name}/>
                    <span>{author.name}</span>
                </div>
                <div>

                </div>
            </footer>
            <p>{content}</p>
        </div>
    )
}
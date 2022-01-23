//importando todos as propriedades de um button
import { ButtonHTMLAttributes } from "react";
import '../styles/button.scss';

// com typeScript indica as propriedades que o button vai poder ter
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps){
    return(
        //...props passa as propriedades
        <button className="button" {...props} />

    );
}
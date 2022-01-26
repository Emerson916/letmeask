//importando todos as propriedades de um button
import { ButtonHTMLAttributes } from "react";
import '../styles/button.scss';

// com typeScript indica as propriedades que o button vai poder ter
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        //...props passa as propriedades
        <button
        //Se isOutlined existir, acresenta a classe outlined
            className={`button ${isOutlined ? 'outlined' : '' }`}
            {...props}
        />
    );
}
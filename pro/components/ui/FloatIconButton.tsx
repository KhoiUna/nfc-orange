import { ReactNode, ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

export default function FloatIconButton(props: Props) {
    return <button {...props}>{props.children}</button>
}

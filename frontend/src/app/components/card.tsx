import { ReactNode } from 'react';

type CardProps = {
    bgClass?: string;
    border?: boolean;
    children: ReactNode;
}

type GameCardProps = {
    bgClass: string;
    text?: string;
    onClick?: () => void;
}

export default function Card(
    {
        bgClass = "bg-foreground",
        children,
        border = true,
    }: CardProps) {
    return (
        <article
            className={`${bgClass} ${border ? "border-2" : ""} rounded-2xl p-5`}
        >
            {children}
        </article>
    );
}

export function GameCard(
    {
        bgClass,
        text,
        onClick,
    }: GameCardProps) {
    return (
        <button
            onClick={onClick}
            className={`
                ${bgClass} 
                text-white 
                font-bold 
                md:rounded
                p-4
                w-full
                h-58
                hover:scale-105 
                transition-transform
            `}
        >
            {text}
        </button>
    )
}
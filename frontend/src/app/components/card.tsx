import type { ReactNode } from 'react';
import Button_Primary from './buttons';

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

type CategoryCardProps = {
    bgClass: string;
    category: string;
    creator: string;
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
            type='button'
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

export function CategoryCard(
    {
        bgClass,
        category,
        creator,
        onClick,
    }: CategoryCardProps) {
    return (
        <div className={`${bgClass} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-400`}>
            <h2 className='text-2xl font-bold mb-2'>{category}</h2>
            <p className="text-gray-600 mb-4">Tekijä: {creator}</p>
            <Button_Primary 
                onClick={() => onClick?.()} 
                height='3rem' 
                width='8rem' 
                text='Pelaa'
            />
        </div>
    )
}
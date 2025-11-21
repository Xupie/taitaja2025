'use client'
import { ReactNode } from 'react';

type CardProps = {
    bgClass?: string;
    border?: boolean;
    children: ReactNode;
}

export default function Card(
    {
        bgClass = "bg-foreground",
        children,
        border = true,
    }: CardProps) {
    return (
        <article 
            className={`${bgClass} ${border ? "border-2" : "" } rounded-2xl p-5`}
        >
            {children}
        </article>
    );
}
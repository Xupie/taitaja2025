'use client'
import { ReactNode } from 'react';

type CardProps = {
    color?: string;
    border?: boolean;
    children: ReactNode;
}

export default function Card(
    {
        color = "foreground",
        children,
        border = true,
    }: CardProps) {
    return (
        <article className={`${border ? "border-2" : "" } rounded-2xl p-5 bg-${color}`}>
            {children}
        </article>
    );
}
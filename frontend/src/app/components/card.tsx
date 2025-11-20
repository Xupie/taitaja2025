'use client'
import { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
    return (
        <article className='border-2 rounded-2xl p-5 bg-foreground'>
            {children}
        </article>
    );
}
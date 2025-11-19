'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Etusivu' },
        { href: '/login', label: 'Kirjaudu Sisään'}
    ]

    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <nav className='w-full flex flex-col md:flex-row justify-between items-center'>

                {/* desktop nav */}
                <div className='hidden md:flex px-20 py-4 w-full items-center justify-between'>
                    <ul className='flex gap-8'>
                        <Link className='nav-link' href='/'>Etusivu</Link>
                    </ul>

                    <div className='flex items-center gap-4'>
                        <Link className='nav-link' href='/login'>Kirjaudu Sisään</Link>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className='relative md:hidden w-full px-4'>
                    <button
                        type='button'
                        onClick={() => handleClick()}
                        className={` ms-auto mt-2 items-center  ${isMenuOpen ? 'rotate-90' : 'rotate-0'} transition delay-50 duration-300 `}
                        aria-controls='mobile-nav'
                        aria-expanded={isMenuOpen}
                    >
                    </button>

                    {isMenuOpen && (
                        <ul
                            id='mobile-nav'
                            className={`w-full mb-4 flex flex-col md:hidden overflow-hidden`}
                        >
                            {navLinks.map(({ href, label }) => (
                                <li key={label} className='h-10 flex items-center'>
                                    <Link className='w-full nav-link' onClick={() => handleClick()} href={href}>{label}</Link>
                                </li>
                            ))}
                            <div className='flex ms-auto items-center gap-4'>
                            </div>
                        </ul>
                    )}
                </div>

            </nav>
        </header>
    );
}
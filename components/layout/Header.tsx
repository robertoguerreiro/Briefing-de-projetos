
import React from 'react';

const Logo: React.FC = () => (
    <svg width="60" height="60" viewBox="0 0 66 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M33 0L0 19V57L33 76L66 57V19L33 0ZM33 6.91L59.4 22.5V53.5L33 69.09L6.6 53.5V22.5L33 6.91Z" fill="#E53E3E"/>
        <path d="M16.5 28.5V47.5L33 57L49.5 47.5V28.5L33 19L16.5 28.5ZM33 49.33L23.1 43.62V32.18L33 26.46L42.9 32.18V43.62L33 49.33Z" fill="#E53E3E"/>
    </svg>
);

export const Header: React.FC = () => {
    return (
        <header className="bg-slate-800 py-12">
            <div className="container mx-auto flex flex-col items-center justify-center text-center text-white">
                <Logo />
                <h1 className="mt-4 text-sm font-light uppercase tracking-widest text-slate-300">Guerreiro Art Director</h1>
                <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">Briefing de Projetos</h2>
                <p className="mt-2 max-w-2xl text-lg text-slate-300">Olá! Preencha as informações abaixo para começarmos a dar vida ao seu projeto.</p>
            </div>
        </header>
    );
};

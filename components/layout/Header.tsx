import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-slate-800 py-8">
            <div className="container mx-auto flex flex-col items-center justify-center text-center text-white">
                 <a href="https://warrior.art.br/" target="_blank" rel="noopener noreferrer" aria-label="Voltar para o site Guerreiro Art Director">
                    <img 
                        src="https://warrior.art.br/wp-content/uploads/2023/07/Roberto-Guerreiro-Art-Director-Logo-1.png"
                        alt="Guerreiro Art Director Logo"
                        className="h-16 w-auto transition-transform duration-300 hover:scale-110"
                    />
                 </a>
                <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">Portal de Projetos</h2>
            </div>
        </header>
    );
};


import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-800 py-6">
            <div className="container mx-auto px-4 text-center text-slate-400">
                <p>&copy; {new Date().getFullYear()} Guerreiro Art Director. Todos os direitos reservados.</p>
                <p className="text-sm">Desenvolvido com base44</p>
            </div>
        </footer>
    );
};

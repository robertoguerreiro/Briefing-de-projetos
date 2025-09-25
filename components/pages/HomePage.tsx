import React from 'react';
import { ChartBarIcon } from '../icons/ChartBarIcon';
import { DocumentTextIcon } from '../icons/DocumentTextIcon';

interface HomePageProps {
    onNavigate: (page: 'briefing' | 'admin') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-800 p-4">
            <div className="mb-16 text-center">
                 <img 
                    src="https://warrior.art.br/wp-content/uploads/2023/07/Roberto-Guerreiro-Art-Director-Logo-1.png"
                    alt="Guerreiro Art Director Logo"
                    className="mx-auto h-[65px] w-auto"
                 />
                <h2 className="mt-8 text-4xl font-bold text-white md:text-5xl">Portal de Projetos</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                <button
                    onClick={() => onNavigate('admin')}
                    className="group flex h-[250px] w-[250px] flex-col items-center justify-center gap-4 rounded-lg bg-slate-700 p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-600"
                    aria-label="Acessar painel de administração para visualizar briefings"
                >
                    <ChartBarIcon className="h-20 w-20 text-slate-400 transition-colors group-hover:text-white" />
                    <span className="text-2xl font-bold">ADMIN</span>
                    <span className="text-sm text-slate-300 group-hover:text-white">Visualizar Briefings</span>
                </button>
                <button
                    onClick={() => onNavigate('briefing')}
                    className="group flex h-[250px] w-[250px] flex-col items-center justify-center gap-4 rounded-lg bg-slate-700 p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-600"
                    aria-label="Iniciar um novo briefing de projeto"
                >
                    <DocumentTextIcon className="h-20 w-20 text-slate-400 transition-colors group-hover:text-white" />
                    <span className="text-2xl font-bold">BRIEFING</span>
                    <span className="text-sm text-slate-300 group-hover:text-white">Iniciar Novo Projeto</span>
                </button>
            </div>
        </div>
    );
};
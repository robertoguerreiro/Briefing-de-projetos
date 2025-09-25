import React, { useState, useEffect } from 'react';
import type { FormData } from '../../types';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { generateBriefingBody } from '../../utils/formatBriefing';

interface AdminDashboardProps {
    onBackToHome: () => void;
    onLogout: () => void;
}

const BriefingCard: React.FC<{ briefing: FormData }> = ({ briefing }) => {
    const [isOpen, setIsOpen] = useState(false);
    const summary = generateBriefingBody(briefing);

    return (
        <div className="rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`briefing-details-${briefing.id}`}
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <p className="font-bold text-slate-800">{briefing.projectName || 'Projeto sem nome'}</p>
                        <p className="text-sm text-slate-500">
                            {briefing.fullName} ({briefing.company || 'N/A'}) - {briefing.id ? new Date(briefing.id).toLocaleDateString() : 'Data indisponível'}
                        </p>
                    </div>
                    <svg
                        className={`h-5 w-5 flex-shrink-0 transform text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </button>
            {isOpen && (
                <div id={`briefing-details-${briefing.id}`} className="border-t border-slate-200 p-4">
                    <pre className="max-h-96 overflow-y-auto whitespace-pre-wrap rounded-md bg-slate-50 p-4 font-sans text-sm text-slate-700">
                        {summary}
                    </pre>
                </div>
            )}
        </div>
    );
};


export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onLogout }) => {
    const [submissions, setSubmissions] = useState<FormData[]>([]);

    useEffect(() => {
        // NOTE: In a full-stack app, this would fetch from a secure API endpoint.
        // We are using localStorage here as requested for a frontend-only solution.
        try {
            const storedSubmissions = localStorage.getItem('briefingSubmissions');
            if (storedSubmissions) {
                setSubmissions(JSON.parse(storedSubmissions));
            }
        } catch (err) {
            console.error("Failed to load briefings from local storage", err);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">
            <Header />
            <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
                 <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-3xl font-bold text-slate-800">Dashboard de Briefings</h2>
                    <div className="flex gap-2">
                         <button
                            onClick={onBackToHome}
                            className="rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-300"
                        >
                            Página Inicial
                        </button>
                        <button
                            onClick={onLogout}
                            className="rounded-md bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-200"
                        >
                            Sair
                        </button>
                    </div>
                </div>
                <div className="mb-6 rounded-md bg-blue-50 p-4 text-sm text-blue-700">
                    <p><strong>Atenção:</strong> Os briefings exibidos aqui são lidos do armazenamento local do seu navegador (localStorage) e servem como um backup. A fonte principal de dados é o banco de dados do servidor.</p>
                </div>

                {submissions.length > 0 ? (
                    <div className="space-y-4">
                        {submissions
                            .filter(b => b.id)
                            .sort((a, b) => new Date(b.id!).getTime() - new Date(a.id!).getTime())
                            .map(briefing => (
                                <BriefingCard key={briefing.id} briefing={briefing} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border-2 border-dashed border-slate-300 bg-white p-12 text-center">
                        <h3 className="text-xl font-semibold text-slate-700">Nenhum briefing encontrado</h3>
                        <p className="mt-2 text-slate-500">Ainda não há briefings salvos no seu navegador.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

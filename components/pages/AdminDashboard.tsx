import React, { useState, useEffect } from 'react';
import type { FormData } from '../../types';
import { formatBriefing } from '../../utils/formatBriefing';
import { generatePdf } from '../../utils/generatePdf';
import { DocumentDownloadIcon } from '../icons/DocumentDownloadIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

interface AdminDashboardProps {
    onBackToHome: () => void;
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onLogout }) => {
    const [briefings, setBriefings] = useState<FormData[]>([]);
    const [selectedBriefing, setSelectedBriefing] = useState<FormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const storedBriefings = localStorage.getItem('briefings');
            if (storedBriefings) {
                const parsedBriefings: FormData[] = JSON.parse(storedBriefings);
                // Sort by submission date, newest first
                parsedBriefings.sort((a, b) => 
                    new Date(b.submission_date!).getTime() - new Date(a.submission_date!).getTime()
                );
                setBriefings(parsedBriefings);
            }
        } catch (error) {
            console.error("Failed to load briefings from local storage", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleDelete = (idToDelete: number | string) => {
        if (window.confirm('Tem certeza de que deseja excluir este briefing? Esta ação não pode ser desfeita.')) {
            const updatedBriefings = briefings.filter(b => b.id !== idToDelete);
            setBriefings(updatedBriefings);
            localStorage.setItem('briefings', JSON.stringify(updatedBriefings));
            if (selectedBriefing?.id === idToDelete) {
                setSelectedBriefing(null);
            }
        }
    };

    const handleDownloadPdf = (briefing: FormData) => {
        generatePdf(briefing);
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Header />
            <main className="flex-grow bg-slate-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <h1 className="text-3xl font-bold text-slate-800">Painel Administrativo</h1>
                        <div className="flex gap-2">
                            <button onClick={onBackToHome} className="rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700">Voltar</button>
                            <button onClick={onLogout} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700">Sair</button>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-8 lg:flex-row">
                        <div className="w-full lg:w-1/3">
                            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                                <h2 className="bg-slate-700 p-4 text-lg font-semibold text-white">Briefings Recebidos ({briefings.length})</h2>
                                {isLoading ? (
                                    <p className="p-4 text-slate-600">Carregando...</p>
                                ) : briefings.length > 0 ? (
                                    <ul className="max-h-[70vh] divide-y divide-slate-200 overflow-y-auto">
                                        {briefings.map(b => (
                                            <li key={b.id} 
                                                className={`cursor-pointer p-4 transition-colors hover:bg-slate-100 ${selectedBriefing?.id === b.id ? 'bg-red-100' : ''}`}
                                                onClick={() => setSelectedBriefing(b)}
                                            >
                                                <p className="font-bold text-slate-800">{b.projectName || 'Projeto sem nome'}</p>
                                                <p className="text-sm text-slate-600">{b.fullName}</p>
                                                <p className="text-xs text-slate-400">
                                                    {b.submission_date ? new Date(b.submission_date).toLocaleString('pt-BR') : 'Data não disponível'}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="p-4 text-slate-600">Nenhum briefing encontrado.</p>
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:w-2/3">
                            {selectedBriefing ? (
                                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                                    <div className="flex items-center justify-between bg-slate-700 p-4">
                                        <h2 className="text-lg font-semibold text-white">{selectedBriefing.projectName}</h2>
                                        <div className="flex gap-3">
                                            <button onClick={() => handleDownloadPdf(selectedBriefing)} className="text-slate-300 transition-colors hover:text-white" title="Baixar PDF">
                                                <DocumentDownloadIcon className="h-6 w-6" />
                                            </button>
                                            <button onClick={() => handleDelete(selectedBriefing.id)} className="text-slate-300 transition-colors hover:text-red-400" title="Excluir Briefing">
                                                <TrashIcon className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="max-h-[70vh] overflow-y-auto p-4">
                                        <pre className="whitespace-pre-wrap font-sans text-sm text-slate-800">
                                            {formatBriefing(selectedBriefing)}
                                        </pre>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                                    <p>Selecione um briefing da lista para ver os detalhes.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

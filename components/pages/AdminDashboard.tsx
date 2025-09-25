import React, { useState, useEffect } from 'react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { DocumentDownloadIcon } from '../icons/DocumentDownloadIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { generatePdf } from '../../utils/generatePdf';
import type { FormData } from '../../types';

interface AdminDashboardProps {
    onBackToHome: () => void;
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onLogout }) => {
    const [briefings, setBriefings] = useState<FormData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedBriefing, setSelectedBriefing] = useState<FormData | null>(null);

    useEffect(() => {
        setIsLoading(true);
        try {
            const storedBriefings = localStorage.getItem('briefings');
            if (storedBriefings) {
                const parsedBriefings: FormData[] = JSON.parse(storedBriefings);
                setBriefings(parsedBriefings.sort((a, b) => new Date(b.submission_date!).getTime() - new Date(a.submission_date!).getTime()));
            }
        } catch (err) {
            setError('Falha ao carregar briefings do armazenamento local.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleDelete = async (id: number | string) => {
        if (window.confirm('Tem certeza que deseja excluir este briefing? Esta ação não pode ser desfeita.')) {
            try {
                const updatedBriefings = briefings.filter(b => b.id !== id);
                localStorage.setItem('briefings', JSON.stringify(updatedBriefings));
                setBriefings(updatedBriefings);
                if (selectedBriefing?.id === id) {
                    setSelectedBriefing(null);
                }
            } catch (err) {
                setError('Falha ao excluir o briefing do armazenamento local.');
            }
        }
    };
    
    const handleDownload = (briefing: FormData) => {
        generatePdf(briefing);
    };

    const renderBriefingDetails = (briefing: FormData) => {
        return (
            <div className="space-y-4 text-sm">
                {Object.entries(briefing).map(([key, value]) => {
                    if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) return null;

                    const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                    
                    let formattedValue;
                    if (key === 'submission_date' && typeof value === 'string') {
                        formattedValue = new Date(value).toLocaleString('pt-BR');
                    } else {
                        formattedValue = Array.isArray(value) ? value.join(', ') : String(value);
                    }


                    return (
                        <div key={key} className="pb-2 border-b border-slate-200 last:border-b-0">
                            <h4 className="font-semibold text-slate-500">{formattedKey}</h4>
                            <p className="text-slate-800 whitespace-pre-wrap">{formattedValue}</p>
                        </div>
                    );
                })}
            </div>
        );
    };


    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Header />
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-10">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={onBackToHome}
                                className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                                Início
                            </button>
                             <h2 className="text-3xl font-bold text-slate-800">Briefings (Salvos Localmente)</h2>
                        </div>
                        <button
                            onClick={onLogout}
                            className="rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Sair
                        </button>
                    </div>

                    {isLoading && (
                        <div className="flex justify-center p-12">
                            <LoadingSpinner className="h-12 w-12 animate-spin text-red-600" />
                        </div>
                    )}
                    {error && <p className="text-center text-red-600">{error}</p>}
                    
                    {!isLoading && !error && briefings.length === 0 && (
                        <p className="py-10 text-center text-slate-500">Nenhum briefing encontrado neste navegador.</p>
                    )}

                    {!isLoading && briefings.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                            <div className="lg:col-span-1 xl:col-span-1">
                                <ul className="space-y-2">
                                    {briefings.map(b => (
                                        <li key={b.id}>
                                            <button
                                                onClick={() => setSelectedBriefing(b)}
                                                className={`w-full rounded-lg p-3 text-left transition-all duration-200 ${selectedBriefing?.id === b.id ? 'bg-red-600 text-white shadow-lg scale-105' : 'bg-white text-slate-800 hover:bg-slate-50 hover:shadow-md'}`}
                                            >
                                                <p className="font-bold truncate">{b.projectName || 'Projeto sem nome'}</p>
                                                <p className="text-sm truncate">{b.fullName} ({b.company || 'N/A'})</p>
                                                <p className="text-xs opacity-75 mt-1">
                                                    {new Date(b.submission_date!).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="lg:col-span-2 xl:col-span-3">
                                {selectedBriefing ? (
                                    <div className="sticky top-10 rounded-lg bg-white p-6 shadow-xl">
                                        <div className="mb-4 flex items-start justify-between border-b border-slate-200 pb-4">
                                            <div className="max-w-[calc(100%-100px)]">
                                                <h3 className="text-2xl font-bold text-slate-800">{selectedBriefing.projectName}</h3>
                                                <p className="text-slate-500">{selectedBriefing.fullName}</p>
                                            </div>
                                            <div className="flex flex-shrink-0 gap-2">
                                                <button onClick={() => handleDownload(selectedBriefing)} className="rounded-full p-2 text-slate-500 transition-colors hover:bg-blue-100 hover:text-blue-600" aria-label="Baixar PDF">
                                                    <DocumentDownloadIcon className="h-6 w-6" />
                                                </button>
                                                <button onClick={() => handleDelete(selectedBriefing.id)} className="rounded-full p-2 text-slate-500 transition-colors hover:bg-red-100 hover:text-red-600" aria-label="Excluir Briefing">
                                                    <TrashIcon className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="max-h-[65vh] overflow-y-auto pr-2">
                                            {renderBriefingDetails(selectedBriefing)}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-full items-center justify-center rounded-lg bg-white/50 p-10 text-center text-slate-500 shadow-inner">
                                        <p>Selecione um briefing na lista à esquerda para ver os detalhes.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};
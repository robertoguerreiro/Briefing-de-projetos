
import React, { useEffect, useState } from 'react';
import type { FormData } from '../../types';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { TrashIcon } from '../icons/TrashIcon';
import { DocumentDownloadIcon } from '../icons/DocumentDownloadIcon';
import { generateBriefingPDF } from '../../utils/generatePdf';
import { formatBriefing } from '../../utils/formatBriefing';

interface AdminDashboardProps {
    onBackToHome: () => void;
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onLogout }) => {
    const [briefings, setBriefings] = useState<FormData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedBriefing, setSelectedBriefing] = useState<FormData | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | number | null>(null);

    useEffect(() => {
        setIsLoading(true);
        try {
            const storedData = localStorage.getItem('briefings');
            const parsedData: FormData[] = storedData ? JSON.parse(storedData) : [];
            const sortedData = parsedData.sort((a, b) => {
                const dateA = a.submission_date ? new Date(a.submission_date).getTime() : 0;
                const dateB = b.submission_date ? new Date(b.submission_date).getTime() : 0;
                return dateB - dateA;
            });
            setBriefings(sortedData);
        } catch (e) {
            console.error("Error loading briefings from localStorage:", e);
            setError("Falha ao carregar briefings. Os dados podem estar corrompidos.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleDelete = (id: string | number) => {
        if (window.confirm('Tem certeza que deseja excluir este briefing?')) {
            setIsDeleting(id);
            try {
                const updatedBriefings = briefings.filter(b => b.id !== id);
                localStorage.setItem('briefings', JSON.stringify(updatedBriefings));
                setBriefings(updatedBriefings);
                if (selectedBriefing?.id === id) {
                    setSelectedBriefing(null);
                }
            } catch (e) {
                console.error("Error deleting briefing from localStorage:", e);
                alert("Falha ao excluir briefing.");
            } finally {
                setIsDeleting(null);
            }
        }
    };
    
    const handleDownload = async (briefing: FormData) => {
        await generateBriefingPDF(briefing);
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex items-center justify-center p-8"><LoadingSpinner className="h-8 w-8 animate-spin text-red-500" /> <span className="ml-4">Carregando briefings...</span></div>;
        }
        if (error) {
            return <div className="rounded-md bg-red-100 p-4 text-center text-red-700">{error}</div>;
        }
        if (briefings.length === 0) {
            return <p className="p-8 text-center text-slate-500">Nenhum briefing salvo localmente encontrado.</p>;
        }

        return (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                <aside className="md:col-span-4 lg:col-span-3">
                    <h3 className="mb-4 text-lg font-semibold text-slate-800">Briefings ({briefings.length})</h3>
                    <ul className="space-y-2">
                        {briefings.map(b => (
                            <li key={b.id}>
                                <button
                                    onClick={() => setSelectedBriefing(b)}
                                    className={`w-full rounded-md p-3 text-left transition-colors ${selectedBriefing?.id === b.id ? 'bg-red-600 text-white shadow-md' : 'bg-white hover:bg-slate-50'}`}
                                >
                                    <p className="font-bold truncate">{b.projectName || 'Projeto sem nome'}</p>
                                    <p className={`text-sm ${selectedBriefing?.id === b.id ? 'text-red-100' : 'text-slate-600'}`}>{b.fullName}</p>
                                    <p className={`mt-1 text-xs ${selectedBriefing?.id === b.id ? 'text-red-200' : 'text-slate-400'}`}>
                                        {b.submission_date ? new Date(b.submission_date).toLocaleString('pt-BR') : 'Data indisponível'}
                                    </p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>
                <section className="md:col-span-8 lg:col-span-9">
                    {selectedBriefing ? (
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">{selectedBriefing.projectName}</h2>
                                    <p className="text-slate-600">Enviado por: {selectedBriefing.fullName} ({selectedBriefing.email})</p>
                                </div>
                                <div className="flex flex-shrink-0 items-center gap-2">
                                     <button onClick={() => handleDownload(selectedBriefing)} className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700">
                                        <DocumentDownloadIcon className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(selectedBriefing.id)} disabled={isDeleting === selectedBriefing.id} className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700 disabled:bg-red-400">
                                        {isDeleting === selectedBriefing.id ? <LoadingSpinner className="h-4 w-4 animate-spin"/> : <TrashIcon className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                            <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4 font-sans text-sm text-slate-700">{formatBriefing(selectedBriefing)}</pre>
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center rounded-lg bg-white p-8 shadow-inner">
                            <p className="text-slate-500">Selecione um briefing da lista para ver os detalhes.</p>
                        </div>
                    )}
                </section>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-100 text-slate-800">
             <div className="bg-white shadow-md">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <h1 className="text-2xl font-bold">Painel Administrativo</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={onBackToHome} className="rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-300">Início</button>
                        <button onClick={onLogout} className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700">Sair</button>
                    </div>
                </div>
            </div>
            <main className="container mx-auto flex-grow p-4 md:p-8">
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
};

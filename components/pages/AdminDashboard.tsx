import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { TrashIcon } from '../icons/TrashIcon';
import { DocumentDownloadIcon } from '../icons/DocumentDownloadIcon';
import type { FormData } from '../../types';
import { generateBriefingPDF } from '../../utils/generatePdf';

interface AdminDashboardProps {
    onBackToHome: () => void;
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onLogout }) => {
    const [briefings, setBriefings] = useState<FormData[]>([]);
    const [selectedBriefing, setSelectedBriefing] = useState<FormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [briefingToDelete, setBriefingToDelete] = useState<FormData | null>(null);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem('briefings');
            if (storedData) {
                const parsedData: FormData[] = JSON.parse(storedData);
                // Sort by submission date, newest first
                const sortedData = parsedData.sort((a, b) => {
                    const dateA = a.submission_date ? new Date(a.submission_date).getTime() : 0;
                    const dateB = b.submission_date ? new Date(b.submission_date).getTime() : 0;
                    return dateB - dateA;
                });
                setBriefings(sortedData);
                if (sortedData.length > 0) {
                    setSelectedBriefing(sortedData[0]);
                }
            }
        } catch (err) {
            setError("Falha ao carregar briefings do armazenamento local. Os dados podem estar corrompidos.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    const openDeleteModal = (briefing: FormData) => {
        setBriefingToDelete(briefing);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setBriefingToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleDelete = () => {
        if (!briefingToDelete) return;

        try {
            const updatedBriefings = briefings.filter(b => b.id !== briefingToDelete.id);
            localStorage.setItem('briefings', JSON.stringify(updatedBriefings));
            setBriefings(updatedBriefings);

            if (selectedBriefing?.id === briefingToDelete.id) {
                setSelectedBriefing(updatedBriefings.length > 0 ? updatedBriefings[0] : null);
            }
        } catch (err) {
            setError("Falha ao excluir o briefing.");
            console.error(err);
        } finally {
            closeDeleteModal();
        }
    };
    
    const formattedBriefingDetails = useMemo(() => {
        if (!selectedBriefing) return null;

        const details: { label: string; value: string | string[] }[] = Object.entries(selectedBriefing)
            .map(([key, value]) => ({ label: key, value }))
            .filter(item => item.value && typeof item.value !== 'object' || (Array.isArray(item.value) && item.value.length > 0));
            
        return details;

    }, [selectedBriefing]);


    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Header />
            <main className="flex flex-grow flex-col p-4 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                     <button
                        type="button"
                        onClick={onBackToHome}
                        className="flex items-center gap-2 rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Início
                    </button>
                    <h1 className="text-3xl font-bold text-slate-800">Briefings (Salvos Localmente)</h1>
                    <button
                        onClick={onLogout}
                        className="rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-600"
                    >
                        Sair
                    </button>
                </div>

                {isLoading && (
                    <div className="flex flex-grow items-center justify-center">
                        <LoadingSpinner className="h-12 w-12 animate-spin text-red-600" />
                    </div>
                )}
                
                {error && <div className="rounded-md bg-red-100 p-4 text-red-700">{error}</div>}

                {!isLoading && !error && briefings.length === 0 && (
                    <div className="flex flex-grow items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white text-center">
                        <p className="text-slate-500">Nenhum briefing encontrado.</p>
                    </div>
                )}
                
                {!isLoading && !error && briefings.length > 0 && (
                    <div className="flex flex-grow gap-6 overflow-hidden rounded-lg bg-white shadow-md">
                        {/* List Panel */}
                        <div className="w-1/3 border-r border-slate-200">
                             <ul className="h-full overflow-y-auto">
                                {briefings.map(briefing => (
                                    <li key={briefing.id}>
                                        <button
                                            onClick={() => setSelectedBriefing(briefing)}
                                            className={`w-full border-l-4 p-4 text-left transition-colors hover:bg-slate-50 ${selectedBriefing?.id === briefing.id ? 'border-red-500 bg-red-50 text-red-700' : 'border-transparent'}`}
                                        >
                                            <p className="font-bold">{briefing.projectName || 'Projeto sem nome'}</p>
                                            <p className="text-sm">{briefing.fullName} ({briefing.company || 'N/A'})</p>
                                            <p className="text-xs text-slate-500">
                                                {briefing.submission_date
                                                    ? new Date(briefing.submission_date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
                                                    : 'Data indisponível'
                                                }
                                            </p>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Details Panel */}
                        <div className="w-2/3 overflow-y-auto p-6">
                            {selectedBriefing && formattedBriefingDetails ? (
                                <div>
                                    <div className="mb-4 flex items-start justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-800">{selectedBriefing.projectName}</h2>
                                            <p className="text-slate-600">{selectedBriefing.fullName}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => generateBriefingPDF(selectedBriefing)} className="text-slate-500 hover:text-blue-600" aria-label="Baixar PDF">
                                                <DocumentDownloadIcon className="h-6 w-6" />
                                            </button>
                                            <button onClick={() => openDeleteModal(selectedBriefing)} className="text-slate-500 hover:text-red-600" aria-label="Excluir briefing">
                                                <TrashIcon className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-3 border-t border-slate-200 pt-4">
                                        {formattedBriefingDetails.map(({ label, value }) => (
                                            <div key={label}>
                                                <p className="text-xs font-bold uppercase text-slate-500">{label.replace(/([A-Z])/g, ' $1').trim()}</p>
                                                <p className="text-slate-800">{Array.isArray(value) ? value.join(', ') : value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-slate-500">Selecione um briefing para ver os detalhes.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
            
             {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && briefingToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={closeDeleteModal}>
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-bold text-slate-800">Confirmar Exclusão</h3>
                        <p className="mt-2 text-slate-600">
                            Você tem certeza que deseja excluir o briefing para o projeto "{briefingToDelete.projectName}"? Esta ação não pode ser desfeita.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={closeDeleteModal} className="rounded-md bg-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-300">
                                Cancelar
                            </button>
                            <button onClick={handleDelete} className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700">
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

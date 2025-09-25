import React, { useState, useEffect } from 'react';
import type { FormData } from '../../types';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { generateBriefingBody } from '../../utils/formatBriefing';
import { TrashIcon } from '../icons/TrashIcon';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { getBriefings, deleteBriefing } from '../../utils/api';

interface AdminDashboardProps {
    onBackToHome: () => void;
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onLogout }) => {
    const [briefings, setBriefings] = useState<FormData[]>([]);
    const [selectedBriefing, setSelectedBriefing] = useState<FormData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [briefingToDelete, setBriefingToDelete] = useState<FormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBriefings = async () => {
            setIsLoading(true);
            setError(null);
            const response = await getBriefings();
            if (response.success && response.briefings) {
                setBriefings(response.briefings);
            } else {
                setError(response.error || 'Falha ao buscar os briefings do servidor.');
                setBriefings([]); // Limpa os briefings em caso de erro
            }
            setIsLoading(false);
        };

        fetchBriefings();
    }, []);
    
    const openDeleteModal = (briefing: FormData) => {
        setBriefingToDelete(briefing);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setBriefingToDelete(null);
        setIsModalOpen(false);
    };

    const confirmDelete = async () => {
        if (!briefingToDelete) return;

        const response = await deleteBriefing(briefingToDelete.id);
        
        if (response.success) {
            const updatedBriefings = briefings.filter(b => b.id !== briefingToDelete.id);
            setBriefings(updatedBriefings);
            
            if (selectedBriefing?.id === briefingToDelete.id) {
                setSelectedBriefing(null);
            }
        } else {
            alert(response.error || 'Não foi possível excluir o briefing.');
        }

        closeDeleteModal();
    };
    
    const getDate = (briefing: FormData) => {
        return briefing.submission_date ? new Date(briefing.submission_date).toLocaleString() : new Date(briefing.id as string).toLocaleString();
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-8">
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-3xl font-bold text-slate-800">Painel Administrativo</h2>
                    <div>
                        <button
                            onClick={onBackToHome}
                            className="mr-4 rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
                        >
                            Página Inicial
                        </button>
                        <button
                            onClick={onLogout}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
                        >
                            Sair
                        </button>
                    </div>
                </div>

                {error && <div className="mb-4 rounded-md bg-red-100 p-4 text-center text-red-700">{error}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Briefing List */}
                    <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 overflow-y-auto max-h-[75vh]">
                        <h3 className="text-xl font-bold border-b pb-2 mb-4 text-slate-700">Briefings Enviados ({briefings.length})</h3>
                        {isLoading ? (
                            <div className="flex justify-center items-center p-8">
                                <LoadingSpinner className="h-8 w-8 animate-spin text-red-600" />
                            </div>
                        ) : briefings.length > 0 ? (
                            <ul className="space-y-2">
                                {briefings.map(briefing => (
                                    <li key={briefing.id} 
                                        className={`p-3 rounded-md cursor-pointer border-l-4 transition-all ${selectedBriefing?.id === briefing.id ? 'bg-red-100 border-red-500' : 'border-transparent hover:bg-slate-100'}`}
                                        onClick={() => setSelectedBriefing(briefing)}
                                    >
                                        <div className="font-bold text-slate-800">{briefing.projectName || 'Projeto sem nome'}</div>
                                        <div className="text-sm text-slate-600">{briefing.fullName}</div>
                                        <div className="text-xs text-slate-400">{getDate(briefing)}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-slate-500 text-center py-8">Nenhum briefing encontrado.</p>
                        )}
                    </div>

                    {/* Briefing Details */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 min-h-[50vh]">
                        <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-slate-700">Detalhes do Briefing</h3>
                        {selectedBriefing ? (
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-red-600">{selectedBriefing.projectName}</h4>
                                        <p className="text-slate-700"><strong>Cliente:</strong> {selectedBriefing.fullName}</p>
                                        <p className="text-slate-700"><strong>Email:</strong> <a href={`mailto:${selectedBriefing.email}`} className="text-red-600 hover:underline">{selectedBriefing.email}</a></p>
                                        <p className="text-slate-700"><strong>Data:</strong> {getDate(selectedBriefing)}</p>
                                    </div>
                                    <button 
                                        onClick={() => openDeleteModal(selectedBriefing)} 
                                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                        aria-label="Excluir briefing"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                                <pre className="mt-6 p-4 bg-slate-50 rounded-md whitespace-pre-wrap font-sans text-sm text-slate-800 max-h-[60vh] overflow-y-auto border">
                                    {generateBriefingBody(selectedBriefing)}
                                </pre>
                            </div>
                        ) : (
                             <div className="flex items-center justify-center h-full text-center text-slate-500 italic">
                                <p>Selecione um briefing na lista para ver os detalhes.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />

            {isModalOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                    onClick={closeDeleteModal}
                >
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" role="document" onClick={(e) => e.stopPropagation()}>
                        <h3 id="modal-title" className="text-xl font-bold text-slate-800">Confirmar Exclusão</h3>
                        <p className="mt-2 text-slate-600">
                            Tem certeza que deseja excluir o briefing "{briefingToDelete?.projectName}"? Esta ação não pode ser desfeita.
                        </p>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={closeDeleteModal}
                                className="rounded-md bg-slate-200 px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
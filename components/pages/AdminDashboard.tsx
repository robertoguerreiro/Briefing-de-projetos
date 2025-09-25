import React, { useState, useEffect } from 'react';
// Fix: Import GoogleGenAI to use the Gemini API for content generation.
import { GoogleGenAI } from '@google/genai';
import type { FormData } from '../../types';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { TrashIcon } from '../icons/TrashIcon';
import { DocumentDownloadIcon } from '../icons/DocumentDownloadIcon';
import { SparklesIcon } from '../icons/SparklesIcon';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { generatePdf } from '../../utils/generatePdf';
import { formatBriefing } from '../../utils/formatBriefing';

interface AdminDashboardProps {
    onBackToHome: () => void;
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onLogout }) => {
    const [briefings, setBriefings] = useState<FormData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedBriefing, setSelectedBriefing] = useState<FormData | null>(null);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [summary, setSummary] = useState('');

    useEffect(() => {
        try {
            const storedBriefings = localStorage.getItem('briefings');
            if (storedBriefings) {
                const parsedBriefings: FormData[] = JSON.parse(storedBriefings);
                // Sort by submission date, newest first
                parsedBriefings.sort((a, b) => {
                    const dateA = a.submission_date ? new Date(a.submission_date).getTime() : 0;
                    const dateB = b.submission_date ? new Date(b.submission_date).getTime() : 0;
                    return dateB - dateA;
                });
                setBriefings(parsedBriefings);
            }
        } catch (e) {
            setError('Falha ao carregar os briefings do armazenamento local.');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = (id: number | string) => {
        if (window.confirm('Tem certeza que deseja excluir este briefing? Esta ação não pode ser desfeita.')) {
            try {
                const updatedBriefings = briefings.filter(b => b.id !== id);
                setBriefings(updatedBriefings);
                localStorage.setItem('briefings', JSON.stringify(updatedBriefings));
                if (selectedBriefing?.id === id) {
                    setSelectedBriefing(null);
                    setSummary('');
                }
            } catch (e) {
                setError('Falha ao excluir o briefing.');
                console.error(e);
            }
        }
    };
    
    const handleGenerateSummary = async () => {
        if (!selectedBriefing) return;
        
        setIsSummaryLoading(true);
        setSummary('');
        setError(null);
        
        try {
            // Fix: Per guidelines, initialize GoogleGenAI with apiKey from process.env.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const briefingText = formatBriefing(selectedBriefing);
            const prompt = `Baseado no seguinte briefing, gere um resumo executivo conciso em 3 parágrafos, destacando os pontos-chave, objetivos e o escopo do projeto. O resumo deve ser profissional e direto ao ponto, ideal para uma rápida avaliação gerencial. O briefing está em português.\n\n--- INÍCIO DO BRIEFING ---\n\n${briefingText}\n\n--- FIM DO BRIEFING ---`;
            
            // Fix: Per guidelines, use ai.models.generateContent to get a response.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            // Fix: Per guidelines, access the text directly from the response object.
            setSummary(response.text);

        } catch (err) {
            console.error("Error generating summary:", err);
            const errorMessage = err instanceof Error ? err.message : 'Um erro desconhecido ocorreu.';
            setSummary(`Ocorreu um erro ao gerar o resumo: ${errorMessage}`);
            setError(`Falha na geração do resumo: ${errorMessage}`);
        } finally {
            setIsSummaryLoading(false);
        }
    };


    const renderBriefingDetails = () => {
        if (!selectedBriefing) return null;
        const briefingText = formatBriefing(selectedBriefing);

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setSelectedBriefing(null)}>
                <div className="relative w-full max-w-4xl h-[90vh] flex flex-col rounded-lg bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
                    <div className="flex-shrink-0 border-b p-6">
                        <h3 className="text-2xl font-bold text-slate-800">{selectedBriefing.projectName}</h3>
                         <p className="text-sm text-slate-500">de {selectedBriefing.fullName}</p>
                        <button onClick={() => setSelectedBriefing(null)} className="absolute top-4 right-4 text-3xl font-light text-slate-500 hover:text-slate-800">&times;</button>
                    </div>
                    <div className="flex-grow overflow-y-auto p-6">
                        <div className="mb-6 space-x-2">
                            <button onClick={() => generatePdf(selectedBriefing)} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                                <DocumentDownloadIcon className="h-4 w-4" />
                                Baixar PDF
                            </button>
                            <button onClick={handleGenerateSummary} disabled={isSummaryLoading} className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50">
                               <SparklesIcon className="h-4 w-4"/>
                               {isSummaryLoading ? 'Gerando...' : 'Gerar Resumo com IA'}
                            </button>
                        </div>

                        {isSummaryLoading && <div className="flex items-center justify-center p-8"><LoadingSpinner className="h-8 w-8 animate-spin text-purple-600"/></div>}
                        {summary && (
                            <div className="mb-6 rounded-lg border border-purple-200 bg-purple-50 p-4">
                                <h4 className="font-bold text-purple-800">Resumo Executivo (IA)</h4>
                                <p className="whitespace-pre-wrap text-sm text-slate-700">{summary}</p>
                            </div>
                        )}
                        
                        <pre className="whitespace-pre-wrap rounded-md bg-slate-100 p-4 font-mono text-sm text-slate-800">{briefingText}</pre>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Header />
            <main className="container mx-auto flex-grow px-4 py-8">
                 <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-slate-800">Painel de Briefings</h2>
                     <div>
                        <button onClick={onBackToHome} className="mr-4 rounded-md bg-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-300">Voltar</button>
                        <button onClick={onLogout} className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700">Sair</button>
                     </div>
                </div>

                {error && <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">{error}</div>}

                {loading ? (
                    <p>Carregando briefings...</p>
                ) : briefings.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg bg-white shadow-md">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Projeto</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Cliente</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Data</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Ações</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {briefings.map(briefing => (
                                    <tr key={briefing.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">{briefing.projectName}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{briefing.fullName}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{briefing.submission_date ? new Date(briefing.submission_date).toLocaleDateString('pt-BR') : 'N/A'}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <button onClick={() => { setSelectedBriefing(briefing); setSummary(''); }} className="font-semibold text-indigo-600 hover:text-indigo-900">Visualizar</button>
                                            <button onClick={() => handleDelete(briefing.id)} className="ml-4 text-red-600 hover:text-red-900">
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="mt-4 text-center text-slate-500">Nenhum briefing encontrado.</p>
                )}
            </main>
            <Footer />
            {renderBriefingDetails()}
        </div>
    );
};

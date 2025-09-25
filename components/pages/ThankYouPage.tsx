import React from 'react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { DocumentDownloadIcon } from '../icons/DocumentDownloadIcon';
import type { FormData } from '../../types';
import { generateBriefingBody } from '../../utils/formatBriefing';

// Define jspdf on the window object for global access
declare global {
    interface Window {
        jspdf: any;
    }
}

interface ThankYouPageProps {
    onBackToHome: () => void;
    formData: Omit<FormData, 'id'>;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onBackToHome, formData }) => {
    
    const handleDownloadPDF = () => {
        const { jsPDF } = window.jspdf;
        // eslint-disable-next-line new-cap
        const doc = new jsPDF();

        const title = "Briefing de Projeto - Guerreiro Art Director";
        const body = generateBriefingBody(formData as FormData);

        doc.setFontSize(18);
        doc.text(title, 14, 22);

        doc.setFontSize(11);
        const lines = doc.splitTextToSize(body, 180); // 180mm width
        doc.text(lines, 14, 35);

        const fileName = `Briefing-${formData.projectName.replace(/\s+/g, '_') || 'Novo_Projeto'}.pdf`;
        doc.save(fileName);
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
            <Header />
            <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
                <div className="rounded-lg bg-white p-6 text-center shadow-sm md:p-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircleIcon className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-slate-800">Briefing Enviado com Sucesso!</h2>
                    <p className="mt-2 text-lg text-slate-600">
                        Obrigado por preencher as informações. Em breve entraremos em contato.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-slate-200 pt-8 sm:flex-row">
                        <button
                            onClick={onBackToHome}
                            className="w-full rounded-md bg-red-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Página Inicial
                        </button>
                         <button
                            onClick={handleDownloadPDF}
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <DocumentDownloadIcon className="h-5 w-5" />
                            Baixar PDF
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
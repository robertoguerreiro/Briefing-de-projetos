import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { DocumentDownloadIcon } from '../icons/DocumentDownloadIcon';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { generateBriefingPDF } from '../../utils/generatePdf';
import type { FormData } from '../../types';

interface ThankYouPageProps {
    formData: FormData;
    onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ formData, onBackToHome }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await generateBriefingPDF(formData);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            // The generateBriefingPDF function already handles the alert.
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Header />
            <main className="flex flex-grow items-center justify-center p-4">
                <div className="w-full max-w-2xl rounded-lg bg-white p-8 text-center shadow-lg">
                    <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
                    <h1 className="mt-4 text-3xl font-bold text-slate-800">Briefing Enviado com Sucesso!</h1>
                    <p className="mt-2 text-slate-600">
                        Obrigado por preencher as informações. O próximo passo é baixar o briefing em formato PDF e nos enviar.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="inline-flex w-full items-center justify-center gap-3 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 sm:w-auto"
                        >
                            {isDownloading ? (
                                <>
                                    <LoadingSpinner className="h-5 w-5 animate-spin" />
                                    Gerando PDF...
                                </>
                            ) : (
                                <>
                                    <DocumentDownloadIcon className="h-5 w-5" />
                                    Baixar PDF
                                </>
                            )}
                        </button>
                        <button
                            onClick={onBackToHome}
                            className="w-full rounded-md bg-slate-200 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-300 sm:w-auto"
                        >
                            Página Inicial
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

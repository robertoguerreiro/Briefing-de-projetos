import React from 'react';
import type { FormData } from '../../types';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { DocumentDownloadIcon } from '../icons/DocumentDownloadIcon';
import { generatePdf } from '../../utils/generatePdf';


interface ThankYouPageProps {
    formData: FormData;
    onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ formData, onBackToHome }) => {
    
    const handleDownload = () => {
        generatePdf(formData);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-6 text-center text-white">
            <div className="max-w-2xl">
                <CheckCircleIcon className="mx-auto h-24 w-24 text-green-400" />
                <h1 className="mt-6 text-4xl font-extrabold text-white md:text-5xl">Obrigado por enviar seu briefing!</h1>
                <p className="mt-4 text-lg text-slate-300">
                    Seu briefing foi gerado com sucesso. Clique no botão abaixo para baixar o PDF e nos enviar.
                </p>
                
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <button
                        onClick={handleDownload}
                        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-red-600 px-10 py-4 text-lg font-bold text-white transition-transform duration-300 hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 sm:w-auto"
                    >
                        <DocumentDownloadIcon className="h-6 w-6" />
                        Baixar PDF
                    </button>
                     <button
                        onClick={onBackToHome}
                        className="w-full rounded-full bg-slate-700 px-10 py-4 text-lg font-bold text-white transition-colors duration-300 hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-500 focus:ring-opacity-50 sm:w-auto"
                    >
                        Voltar para o Início
                    </button>
                </div>
            </div>
        </div>
    );
};
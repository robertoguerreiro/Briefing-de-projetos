import React from 'react';
import type { FormData } from '../../types';
import { formatBriefing } from '../../utils/formatBriefing';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { EnvelopeIcon } from '../icons/EnvelopeIcon';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

interface ThankYouPageProps {
    formData: FormData;
    onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ formData, onBackToHome }) => {
    const briefingText = formatBriefing(formData);

    return (
        <div className="flex min-h-screen flex-col bg-slate-900 text-white">
            <Header />
            <main className="flex flex-grow items-center justify-center p-4">
                <div className="w-full max-w-4xl rounded-lg bg-slate-800 p-8 text-center shadow-2xl md:p-12">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                        <CheckCircleIcon className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="mt-6 text-4xl font-bold">Obrigado!</h1>
                    <p className="mt-4 text-lg text-slate-300">Seu briefing foi enviado com sucesso.</p>
                    <p className="mt-2 text-slate-400">
                        Recebemos suas informações e entraremos em contato em breve pelo email: <span className="font-semibold text-white">{formData.email}</span>.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button
                            onClick={onBackToHome}
                            className="w-full rounded-md bg-red-600 px-6 py-3 font-semibold text-white transition-transform hover:scale-105 sm:w-auto"
                        >
                            Voltar para o Início
                        </button>
                        <a
                            href={`mailto:contato@warrior.art.br?subject=Novo Briefing: ${formData.projectName}&body=${encodeURIComponent(briefingText)}`}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-600 sm:w-auto"
                        >
                            <EnvelopeIcon className="h-5 w-5" />
                            Enviar Cópia por Email
                        </a>
                    </div>
                    <div className="mt-8 border-t border-slate-700 pt-6 text-left">
                        <h3 className="text-xl font-semibold text-white">Resumo do seu Envio</h3>
                        <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-slate-900 p-4 text-sm text-slate-300">
                            <code>
                                {briefingText}
                            </code>
                        </pre>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

import React from 'react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import type { FormData } from '../../types';
import { generateBriefingBody } from '../../utils/formatBriefing';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { PaperAirplaneIcon } from '../icons/PaperAirplaneIcon';
import { EnvelopeIcon } from '../icons/EnvelopeIcon';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { SparklesIcon } from '../icons/SparklesIcon';

interface ThankYouPageProps {
    data: FormData;
    isAnalyzing: boolean;
    analysisResult: string | null;
    error: string | null;
}

const AIAnalysisDisplay: React.FC<{ result: string }> = ({ result }) => {
    return (
        <div className="mt-12 w-full text-left">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                     <SparklesIcon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-700">Análise Inteligente do Briefing</h3>
            </div>
            <div className="prose prose-slate max-w-none rounded-md bg-slate-50 p-4">
                <pre className="whitespace-pre-wrap font-sans text-base">{result}</pre>
            </div>
        </div>
    )
};


export const ThankYouPage: React.FC<ThankYouPageProps> = ({ data, isAnalyzing, analysisResult, error }) => {
    // Admin Email
    const adminBriefingDetails = generateBriefingBody(data);
    const subject = "GuerreiroArt - Novo Briefing de Projeto";
    const adminBody = `Olá, Roberto,\n\nVocê recebeu um novo briefing de projeto através do site www.warrior.art.br.\n\n---------------------------------------\n\n${adminBriefingDetails}`;
    const adminMailtoLink = `mailto:roberto.carvalho.guerreiro@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(adminBody)}`;

    // Client Email
    const clientBriefingDetails = generateBriefingBody(data);
    const clientBody = `Olá ${data.fullName || 'Cliente'},\n\nObrigado por seu interesse! Conforme solicitado, aqui está uma cópia do briefing que você preparou para a Warrior Art Director.\n\nPara finalizar o envio do briefing para nossa equipe, por favor, retorne à página anterior e clique no botão "ENVIAR BRIEFING PARA WARRIOR ART".\n\nAtenciosamente,\nEquipe Warrior Art Director\n\n---------------------------------------\n\n${clientBriefingDetails}`;
    const clientMailtoLink = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(clientBody)}`;

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
            <Header />
            <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
                <div className="rounded-lg bg-white p-6 text-center shadow-sm md:p-8">
                    {isAnalyzing && (
                        <>
                            <LoadingSpinner className="mx-auto h-16 w-16 animate-spin text-red-600" />
                            <h2 className="mt-4 text-3xl font-bold text-slate-800">Analisando seu briefing...</h2>
                            <p className="mt-4 text-lg text-slate-600">
                                Nossa IA está revisando suas respostas para fornecer um feedback inicial. Isso levará apenas um momento.
                            </p>
                        </>
                    )}

                    {!isAnalyzing && (analysisResult || error) && (
                         <>
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <CheckCircleIcon className="h-10 w-10 text-green-600" />
                            </div>
                            <h2 className="mt-4 text-3xl font-bold text-slate-800">Análise Concluída!</h2>
                           
                            {error && <p className="mt-4 text-lg text-red-600">{error}</p>}
                            
                            {analysisResult && <AIAnalysisDisplay result={analysisResult} />}

                            <div className="mt-12 w-full border-t border-slate-200 pt-8">
                                <p className="text-lg text-slate-600">
                                    O próximo passo é enviar as informações. Por favor, use os botões abaixo para abrir seu programa de e-mail e finalizar o envio.
                                </p>
                                <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center">
                                    <a 
                                        href={adminMailtoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 md:w-auto"
                                    >
                                        <PaperAirplaneIcon className="h-5 w-5" />
                                        1. Enviar Briefing para Warrior Art
                                    </a>
                                    <a 
                                        href={clientMailtoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 md:w-auto"
                                    >
                                        <EnvelopeIcon className="h-5 w-5" />
                                        2. Enviar uma Cópia para Mim
                                    </a>
                                </div>
                                <p className="mt-4 text-sm text-slate-500">
                                    Após clicar, basta confirmar o envio no seu aplicativo de e-mail.
                                </p>
                            </div>

                            <div className="mt-12 border-t border-slate-200 pt-8">
                                <a 
                                    href="https://www.warrior.art.br" 
                                    className="text-sm text-red-600 hover:underline"
                                >
                                    Retornar para a Página Inicial
                                </a>
                            </div>
                            
                            <div className="mt-8 border-t border-slate-200 pt-8 text-left">
                                <h3 className="text-xl font-bold text-slate-700">Pré-visualização do seu Briefing</h3>
                                <p className="mt-2 text-sm text-slate-500">Este é o conteúdo que será enviado.</p>
                                <pre className="mt-4 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-md bg-slate-50 p-4 font-sans text-sm text-slate-700">{adminBriefingDetails}</pre>
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

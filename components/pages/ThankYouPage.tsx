import React from 'react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import type { FormData } from '../../types';
import { generateBriefingBody } from '../../utils/formatBriefing';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { PaperAirplaneIcon } from '../icons/PaperAirplaneIcon';
import { EnvelopeIcon } from '../icons/EnvelopeIcon';

interface ThankYouPageProps {
    data: FormData;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ data }) => {
    // Admin Email
    const adminBriefingDetails = generateBriefingBody(data);
    const adminSubject = `Novo Briefing Recebido (${data.projectName || 'Sem Nome'}) - via warrior.art.br`;
    const adminBody = `Olá, Roberto,\n\nVocê recebeu um novo briefing de projeto através do site www.warrior.art.br.\n\n---------------------------------------\n\n${adminBriefingDetails}`;
    const adminMailtoLink = `mailto:roberto.carvalho.guerreiro@gmail.com?subject=${encodeURIComponent(adminSubject)}&body=${encodeURIComponent(adminBody)}`;

    // Client Email
    const clientBriefingDetails = generateBriefingBody(data);
    const clientSubject = `Cópia do seu Briefing para a Warrior Art Director`;
    const clientBody = `Olá ${data.fullName || 'Cliente'},\n\nObrigado por seu interesse! Conforme solicitado, aqui está uma cópia do briefing que você preparou para a Warrior Art Director.\n\nPara finalizar o envio do briefing para nossa equipe, por favor, retorne à página anterior e clique no botão "ENVIAR BRIEFING PARA WARRIOR ART".\n\nAtenciosamente,\nEquipe Warrior Art Director\n\n---------------------------------------\n\n${clientBriefingDetails}`;
    const clientMailtoLink = `mailto:${data.email}?subject=${encodeURIComponent(clientSubject)}&body=${encodeURIComponent(clientBody)}`;

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
            <Header />
            <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
                <div className="rounded-lg bg-white p-6 text-center shadow-sm md:p-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircleIcon className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-slate-800">Seu briefing está pronto!</h2>
                    <p className="mt-4 text-lg text-slate-600">
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
                        <p className="mt-2 text-sm text-slate-500">Este é o conteúdo que será enviado para a Warrior Art.</p>
                        <pre className="mt-4 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-md bg-slate-50 p-4 font-sans text-sm text-slate-700">{adminBriefingDetails}</pre>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
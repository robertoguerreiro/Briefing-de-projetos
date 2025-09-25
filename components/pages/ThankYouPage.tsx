import React from 'react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import type { FormData } from '../../types';
import { generateBriefingBody } from '../../utils/formatBriefing';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';

interface ThankYouPageProps {
    data: FormData;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ data }) => {
    const briefingText = generateBriefingBody(data);
    
    const clientMessage = `Olá ${data.fullName || 'Cliente'},\n\nObrigado por enviar seu briefing! Recebemos suas informações e nossa equipe entrará em contato em breve pelo e-mail (${data.email || 'informado'}).\n\nUma cópia dos dados que você enviou está abaixo para sua referência.\n\nAtenciosamente,\nEquipe Warrior Art Director`;

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
            <Header />
            <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
                <div className="rounded-lg bg-white p-6 text-center shadow-sm md:p-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircleIcon className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-slate-800">Obrigado!</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Seu briefing foi preparado para envio. Por favor, <strong>confirme o envio na janela do seu cliente de e-mail</strong> que foi aberta para finalizar o processo.
                    </p>
                    <p className="mt-2 text-slate-600">
                        Após o envio, retornaremos o contato o mais breve possível.
                    </p>
                    <div className="mt-8">
                        <a 
                            href="https://www.warrior.art.br" 
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Retornar para a Página Inicial
                        </a>
                    </div>
                    <div className="mt-12 border-t border-slate-200 pt-8 text-left">
                        <h3 className="text-xl font-bold text-slate-700">Cópia do seu Briefing</h3>
                        <p className="mt-2 text-sm text-slate-500">Para sua referência, aqui estão os detalhes que você nos enviou.</p>
                        <pre className="mt-4 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-md bg-slate-50 p-4 font-sans text-sm text-slate-700">{clientMessage}\n\n---------------------------------------\n\n{briefingText}</pre>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

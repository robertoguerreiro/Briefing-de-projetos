import React, { useState, useEffect } from 'react';
import type { FormData } from '../../types';
import { formatBriefing } from '../../utils/formatBriefing';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { SparklesIcon } from '../icons/SparklesIcon';
import { LoadingSpinner } from '../icons/LoadingSpinner';
// Fix: Import GoogleGenAI to use the Gemini API.
import { GoogleGenAI } from '@google/genai';

interface ThankYouPageProps {
    formData: FormData;
    onBackToHome: () => void;
}

// Fix: Implement the ThankYouPage component.
export const ThankYouPage: React.FC<ThankYouPageProps> = ({ formData, onBackToHome }) => {
    const [summary, setSummary] = useState('');
    const [isGenerating, setIsGenerating] = useState(true);

    useEffect(() => {
        const generateSummary = async () => {
            setIsGenerating(true);
            try {
                // Per guidelines, assume API_KEY is present in environment variables.
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                const briefingText = formatBriefing(formData);
                
                const prompt = `Baseado no seguinte briefing de projeto, gere um resumo conciso e amigável para o cliente, agradecendo pelo envio e confirmando os pontos-chave. O resumo deve ser em português do Brasil e ter no máximo 3 parágrafos curtos.\n\n---\n\n${briefingText}`;

                // Fix: Call Gemini API to generate content.
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                });
                
                // Fix: Extract text from the response correctly.
                setSummary(response.text);

            } catch (error) {
                console.error('Error generating summary with Gemini API:', error);
                setSummary('Não foi possível gerar o resumo do projeto. Entraremos em contato em breve para confirmar os detalhes.');
            } finally {
                setIsGenerating(false);
            }
        };

        generateSummary();
    }, [formData]);


    return (
        <div className="flex min-h-screen flex-col bg-slate-900">
            <Header />
            <main className="flex flex-grow items-center justify-center px-4 py-12">
                <div className="w-full max-w-3xl rounded-lg bg-slate-800 p-8 text-center shadow-2xl">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                        <CheckCircleIcon className="h-12 w-12 text-green-400" />
                    </div>
                    <h1 className="mt-6 text-4xl font-bold text-white">Obrigado!</h1>
                    <p className="mt-2 text-lg text-slate-300">Seu briefing para o projeto <span className="font-bold text-white">"{formData.projectName || formData.fullName}"</span> foi enviado com sucesso.</p>
                    <p className="mt-2 text-slate-400">Em breve entraremos em contato pelo email: <span className="font-semibold text-slate-300">{formData.email}</span>.</p>

                    <div className="my-8 rounded-lg bg-slate-900/50 p-6 text-left">
                        <h2 className="flex items-center gap-3 text-xl font-semibold text-white">
                            <SparklesIcon className="h-6 w-6 text-yellow-400" />
                            Resumo do seu Projeto (gerado por IA)
                        </h2>
                        {isGenerating ? (
                            <div className="mt-4 flex items-center justify-center gap-3 text-slate-400">
                                <LoadingSpinner className="h-6 w-6 animate-spin" />
                                <span>Gerando resumo...</span>
                            </div>
                        ) : (
                            <div className="prose prose-invert mt-4 max-w-none text-slate-300">
                                {summary.split('\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={onBackToHome}
                        className="mt-4 rounded-md bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                    >
                        Voltar para o Início
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

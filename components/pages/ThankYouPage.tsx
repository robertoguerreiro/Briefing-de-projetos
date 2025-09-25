import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { FormData } from '../../types';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { EnvelopeIcon } from '../icons/EnvelopeIcon';
import { DocumentDownloadIcon } from '../icons/DocumentDownloadIcon';
import { SparklesIcon } from '../icons/SparklesIcon';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { generateBriefingBody } from '../../utils/formatBriefing';
import { generatePdf } from '../../utils/generatePdf';

interface ThankYouPageProps {
    onBackToHome: () => void;
    formData: FormData;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onBackToHome, formData }) => {
    const [analysis, setAnalysis] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [analysisError, setAnalysisError] = useState('');

    useEffect(() => {
        const getAnalysis = async () => {
            if (!process.env.API_KEY) {
                console.warn("Gemini API key not found in process.env.API_KEY. Skipping AI analysis.");
                setIsAnalyzing(false);
                setAnalysisError("A chave da API do Gemini não foi configurada.");
                return;
            }

            setIsAnalyzing(true);
            setAnalysisError('');

            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const briefingText = generateBriefingBody(formData);
                const prompt = `Você é um diretor de arte sênior e estrategista de marca. Analise o seguinte briefing de projeto e forneça uma breve análise em português. Estruture sua resposta com os seguintes tópicos, usando "### " para cada título:
                
### Resumo do Projeto
(Um parágrafo conciso sobre o que o cliente precisa.)

### Objetivos Chave
(Uma lista de 2-3 objetivos principais extraídos do briefing.)

### Análise e Próximos Passos
(Uma breve análise e sugestões de próximos passos, como agendar uma reunião de alinhamento ou solicitar mais referências.)

BRIEFING:
---
${briefingText}`;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                });

                setAnalysis(response.text);

            } catch (err) {
                console.error("Error generating analysis with Gemini:", err);
                setAnalysisError("Não foi possível gerar a análise do projeto no momento. Por favor, tente novamente mais tarde.");
            } finally {
                setIsAnalyzing(false);
            }
        };

        getAnalysis();
    }, [formData]);

    const handleDownload = () => {
        generatePdf(formData);
    };

    const renderAnalysis = () => {
        if (!analysis) return null;
        // Split by the markdown header and filter out empty strings
        const sections = analysis.split('### ').filter(s => s.trim());
    
        return sections.map((section, index) => {
            const [title, ...contentLines] = section.split('\n');
            const content = contentLines.join('\n').trim();
    
            return (
                <div key={index} className={index > 0 ? 'mt-4' : ''}>
                    <h3 className="text-lg font-semibold text-red-400">{title.trim()}</h3>
                    <p className="mt-1 whitespace-pre-wrap text-slate-300">{content}</p>
                </div>
            );
        });
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-900 text-white">
            <Header />
            <main className="flex-grow container mx-auto flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-4xl rounded-lg bg-slate-800 p-8 md:p-12 shadow-2xl text-center">
                    <CheckCircleIcon className="mx-auto h-20 w-20 text-green-400" />
                    <h1 className="mt-6 text-4xl font-bold text-white">Obrigado!</h1>
                    <p className="mt-2 text-lg text-slate-300">Seu briefing para o projeto <strong className="font-semibold text-red-400">{formData.projectName || 'sem nome'}</strong> foi enviado com sucesso.</p>

                    <div className="mt-6 text-slate-400 flex items-center justify-center gap-2">
                        <EnvelopeIcon className="h-5 w-5" />
                        <span>Uma cópia de confirmação será enviada para <strong>{formData.email}</strong>.</span>
                    </div>

                    <div className="my-8 h-px bg-slate-700"></div>

                    <div className="text-left">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-100">
                            <SparklesIcon className="h-7 w-7 text-yellow-400" />
                            Análise Rápida com IA
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Geramos uma análise inicial do seu projeto usando a IA do Google Gemini para acelerar nosso processo.
                        </p>
                        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900 p-6 min-h-[150px] flex items-center justify-center">
                            {isAnalyzing ? (
                                <div className="flex flex-col items-center justify-center space-y-3">
                                    <LoadingSpinner className="h-8 w-8 animate-spin text-red-500" />
                                    <p className="text-slate-400">Analisando seu briefing...</p>
                                </div>
                            ) : analysisError ? (
                                <p className="text-center text-red-400">{analysisError}</p>
                            ) : (
                                <div className="w-full">{renderAnalysis()}</div>
                            )}
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={handleDownload}
                            className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-md bg-slate-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                        >
                            <DocumentDownloadIcon className="h-5 w-5" />
                            Baixar Cópia do Briefing
                        </button>
                        <button
                            onClick={onBackToHome}
                            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                        >
                            Voltar para o Início
                        </button>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};
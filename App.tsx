import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ContactInfo } from './components/sections/ContactInfo';
import { ProjectType } from './components/sections/ProjectType';
import { GeneralProjectInfo } from './components/sections/GeneralProjectInfo';
import { BrandBriefing } from './components/sections/BrandBriefing';
import { DigitalMarketing } from './components/sections/DigitalMarketing';
import { AdditionalInfo } from './components/sections/AdditionalInfo';
import { PaperAirplaneIcon } from './components/icons/PaperAirplaneIcon';
import type { FormData } from './types';
import { VideoBriefing } from './components/sections/VideoBriefing';
import { WebsiteBriefing } from './components/sections/WebsiteBriefing';
import { ThankYouPage } from './components/pages/ThankYouPage';
import { generateBriefingBody } from './utils/formatBriefing';


const App: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        projectTypes: [],
        projectName: '',
        projectSummary: '',
        projectObjectives: '',
        targetAudience: '',
        problemToSolve: '',
        keyDifferentiators: '',
        deadline: '',
        budget: '',
        hasLogo: '',
        hasBrandManual: '',
        visualStyles: [],
        otherStyle: '',
        colorPreferences: '',
        fontPreferences: '',
        hasSlogan: '',
        brandValues: '',
        brandAudienceDetails: '',
        competitors: '',
        visualReferences: '',
        visualDislikes: '',
        digitalMarketingStrategy: '',
        seoImportance: '',
        paidTraffic: '',
        socialMedia: '',
        additionalInfo: '',
        howFound: '',
        videoTypes: [],
        otherVideoType: '',
        videoDuration: '',
        videoStyleLinks: '',
        videoScriptStatus: '',
        videoAssetsStatus: '',
        videoNarration: '',
        videoSubtitles: '',
        videoDistribution: [],
        otherVideoDistribution: '',
        websiteObjectives: [],
        otherWebsiteObjective: '',
        mainUserAction: '',
        hasDomain: '',
        hasHosting: '',
        websiteSections: '',
        specificFunctionality: '',
        likedWebsites: '',
        contentProvider: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox' && name === 'projectTypes') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({
                ...prev,
                projectTypes: checked
                    ? [...prev.projectTypes, value]
                    : prev.projectTypes.filter(item => item !== value)
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }, []);

    const handleRadioChange = useCallback((name: keyof FormData, value: string) => {
      setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleCheckboxGroupChange = useCallback((name: keyof FormData, value: string) => {
        setFormData(prev => {
            const currentValues = prev[name] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];
            return { ...prev, [name]: newValues };
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setIsAnalyzing(true);
        setError(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const briefingText = generateBriefingBody(formData);
            
            const prompt = `
                Você é um diretor de arte e gerente de projetos de classe mundial. Sua tarefa é analisar o briefing de projeto de um cliente.
                Aqui está o briefing:
                ---
                ${briefingText}
                ---
                Forneça uma análise concisa e profissional deste briefing. Estruture sua resposta em três partes usando markdown simples (negrito para títulos):
                1. **Resumo dos Pontos-Chave:** Resuma brevemente a solicitação principal.
                2. **Pontos para Clarificação:** Identifique possíveis ambiguidades, informações ausentes ou áreas onde o cliente poderia fornecer mais detalhes para garantir o sucesso do projeto. Formule estas questões de forma prestativa.
                3. **Próximos Passos Sugeridos:** Sugira os próximos passos lógicos para o projeto com base no briefing fornecido.
                Mantenha o tom encorajador e profissional. A análise deve ser em português.
            `;

            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
            });

            setAnalysisResult(response.text);

        } catch (err) {
            console.error("Error calling Gemini API:", err);
            setError("Ocorreu um erro ao analisar o briefing. Por favor, tente novamente mais tarde.");
            setAnalysisResult(null);
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    if (isSubmitted) {
        return <ThankYouPage data={formData} isAnalyzing={isAnalyzing} analysisResult={analysisResult} error={error} />;
    }

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
            <Header />
            <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <ContactInfo data={formData} onChange={handleChange} />
                    <ProjectType data={formData} onChange={handleChange} />
                    <GeneralProjectInfo data={formData} onChange={handleChange} />
                    
                    {formData.projectTypes.includes('branding_visual') && (
                        <BrandBriefing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} onCheckboxChange={handleCheckboxGroupChange} />
                    )}

                    {formData.projectTypes.includes('video_animation') && (
                        <VideoBriefing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} onCheckboxChange={handleCheckboxGroupChange} />
                    )}

                    {formData.projectTypes.includes('website') && (
                        <WebsiteBriefing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} onCheckboxChange={handleCheckboxGroupChange} />
                    )}

                    <DigitalMarketing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} />
                    <AdditionalInfo data={formData} onChange={handleChange} />

                    <div className="flex justify-end pt-4">
                        <button type="submit" className="flex items-center justify-center gap-2 rounded-md bg-red-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                            Finalizar e Enviar Briefing
                            <PaperAirplaneIcon className="h-5 w-5" />
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default App;
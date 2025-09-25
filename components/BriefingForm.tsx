import React, { useState, useCallback } from 'react';
import { ContactInfo } from './sections/ContactInfo';
import { ProjectType } from './sections/ProjectType';
import { GeneralProjectInfo } from './sections/GeneralProjectInfo';
import { BrandBriefing } from './sections/BrandBriefing';
import { DigitalMarketing } from './sections/DigitalMarketing';
import { AdditionalInfo } from './sections/AdditionalInfo';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import type { FormData } from '../types';
import { VideoBriefing } from './sections/VideoBriefing';
import { WebsiteBriefing } from './sections/WebsiteBriefing';
import { ThankYouPage } from './pages/ThankYouPage';
import { LoadingSpinner } from './icons/LoadingSpinner';
import { saveBriefing } from '../utils/api';


interface BriefingFormProps {
    onBackToHome: () => void;
}

export const BriefingForm: React.FC<BriefingFormProps> = ({ onBackToHome }) => {
    const [formData, setFormData] = useState<Omit<FormData, 'id'>>({
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
    const [submittedData, setSubmittedData] = useState<Omit<FormData, 'id'> | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        setIsSubmitting(true);
        setError(null);
        
        try {
            // Salva no localStorage como backup
            try {
                const submissions = JSON.parse(localStorage.getItem('briefingSubmissions') || '[]');
                const newSubmission: FormData = { ...formData, id: new Date().toISOString() };
                submissions.push(newSubmission);
                localStorage.setItem('briefingSubmissions', JSON.stringify(submissions));
            } catch (localError) {
                 console.warn("Failed to save briefing to local storage as backup", localError);
            }

            // Envia para a API
            const response = await saveBriefing(formData);
            if(response.success) {
                setSubmittedData(formData);
                setIsSubmitted(true);
            } else {
                throw new Error(response.error || 'Ocorreu um erro desconhecido.');
            }

        } catch (error) {
            console.error("Failed to save briefing via API", error);
            setError(error instanceof Error ? error.message : "Ocorreu um erro ao enviar o briefing. Por favor, tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (isSubmitted && submittedData) {
        return <ThankYouPage onBackToHome={onBackToHome} formData={submittedData} />;
    }

    return (
        <div className="flex min-h-screen font-sans">
            {/* Left side: Form */}
            <main className="w-full overflow-y-auto bg-slate-900 p-8 text-slate-300 sm:p-12 lg:w-3/5">
                 <header className="mb-8">
                    <img 
                        src="https://warrior.art.br/wp-content/uploads/2023/07/Roberto-Guerreiro-Art-Director-Logo-1.png"
                        alt="Guerreiro Art Director Logo"
                        className="h-12 w-auto"
                    />
                     <h1 className="mt-6 text-3xl font-bold text-[#D33434]">Informações de Projetos.</h1>
                     <p className="mt-2 text-sm text-slate-400">1 – Dados da empresa | 2 – Informações do projeto | 3 – Parte técnica do projeto | 4 – Design e conteúdo | 5 – Métricas de sucesso</p>
                </header>

                <div className="mb-8 flex">
                    <button
                        type="button"
                        onClick={onBackToHome}
                        className="flex items-center gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                        aria-label="Voltar para a página inicial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    
                    {error && (
                        <div className="rounded-md bg-red-500/10 p-4 text-center">
                            <p className="text-sm font-medium text-red-400">{error}</p>
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <button 
                            type="submit" 
                            className="flex items-center justify-center gap-3 rounded-md bg-red-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-red-400"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <LoadingSpinner className="h-5 w-5 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    Finalizar e Enviar Briefing
                                    <PaperAirplaneIcon className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>

            {/* Right side: Illustration */}
            <aside className="sticky top-0 hidden h-screen w-2/5 flex-col items-center justify-center bg-black p-8 text-white lg:flex">
                <img 
                    src="https://warrior.art.br/wp-content/uploads/2025/04/AdsMetrics-Ilustra-Anima-7.svg"
                    alt="Ilustração de métricas e design"
                    className="w-full max-w-2xl"
                />
                 <img 
                    src="https://warrior.art.br/wp-content/uploads/2023/07/Roberto-Guerreiro-Art-Director-Logo-1.png"
                    alt="Guerreiro Art Director Logo"
                    className="mt-8 h-12 w-auto"
                />
                <h2 className="mt-4 text-3xl font-bold">Briefing de Projetos</h2>
                <p className="mt-1 max-w-sm text-center text-slate-300">
                    O briefing é ideal para entendermos bem o projeto e conhecer a empresa. Com ele, formamos nossa base de pesquisa e estudo para o desenvolvimento, criação e direção de arte.
                </p>
            </aside>
        </div>
    );
};
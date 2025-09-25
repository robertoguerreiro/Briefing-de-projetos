import React, { useState, useCallback } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
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
        <div className="min-h-screen bg-slate-100">
            <Header />
            <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
                <div className="mb-8 flex">
                    <button
                        type="button"
                        onClick={onBackToHome}
                        className="flex items-center gap-2 rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label="Voltar para a página inicial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar
                    </button>
                </div>
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
                    
                    {error && (
                        <div className="rounded-md bg-red-50 p-4 text-center">
                            <p className="text-sm font-medium text-red-700">{error}</p>
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
            <Footer />
        </div>
    );
};
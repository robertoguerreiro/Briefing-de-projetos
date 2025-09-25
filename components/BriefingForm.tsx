import React, { useState } from 'react';
import type { FormData } from '../types';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { ContactInfo } from './sections/ContactInfo';
import { ProjectType } from './sections/ProjectType';
import { GeneralProjectInfo } from './sections/GeneralProjectInfo';
import { BrandBriefing } from './sections/BrandBriefing';
import { VideoBriefing } from './sections/VideoBriefing';
import { WebsiteBriefing } from './sections/WebsiteBriefing';
import { DigitalMarketing } from './sections/DigitalMarketing';
import { AdditionalInfo } from './sections/AdditionalInfo';
import { LoadingSpinner } from './icons/LoadingSpinner';
import { SparklesIcon } from './icons/SparklesIcon';
import { ThankYouPage } from './pages/ThankYouPage';

interface BriefingFormProps {
    onBackToHome: () => void;
}

const initialFormData: Omit<FormData, 'id' | 'submission_date'> = {
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
};

export const BriefingForm: React.FC<BriefingFormProps> = ({ onBackToHome }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleCheckboxChange = (name: string, value: string) => {
        setFormData(prev => {
            const list = prev[name as keyof typeof prev] as string[];
            const newList = list.includes(value) ? list.filter(item => item !== value) : [...list, value];
            return { ...prev, [name]: newList };
        });
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.projectTypes.length === 0) {
            setError('Por favor, selecione pelo menos um tipo de projeto.');
            window.scrollTo(0, 0);
            return;
        }
        setError(null);
        setIsLoading(true);
        
        // Simulate a short delay for user feedback
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const submissionDate = new Date().toISOString();
            const uniqueId = Date.now().toString();

            const completeFormData: FormData = {
                ...formData,
                id: uniqueId,
                submission_date: submissionDate,
            };

            // Save to localStorage
            const existingBriefings: FormData[] = JSON.parse(localStorage.getItem('briefings') || '[]');
            existingBriefings.push(completeFormData);
            localStorage.setItem('briefings', JSON.stringify(existingBriefings));

            setSubmittedData(completeFormData);

        } catch (err) {
            setError('Ocorreu um erro ao salvar o briefing localmente. Tente novamente.');
            window.scrollTo(0, 0);
        } finally {
            setIsLoading(false);
        }
    };

    if (submittedData) {
        return <ThankYouPage formData={submittedData} onBackToHome={onBackToHome} />;
    }

    return (
        <div className="bg-slate-900">
            <Header />
            <main className="container mx-auto max-w-4xl px-4 py-10">
                <div className="mb-8 flex">
                     <button
                        type="button"
                        onClick={onBackToHome}
                        className="flex items-center gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                        aria-label="Voltar para a página inicial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar
                    </button>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    {error && (
                        <div className="mb-6 rounded-md border border-red-700 bg-red-900/50 p-4 text-center text-red-200">
                            {error}
                        </div>
                    )}

                    <ContactInfo data={formData} onChange={handleChange} />
                    <ProjectType data={formData} onChange={(e) => handleCheckboxChange('projectTypes', (e.target as HTMLInputElement).value)} />
                    <GeneralProjectInfo data={formData} onChange={handleChange} />

                    {formData.projectTypes.includes('branding_visual') && (
                        <BrandBriefing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} onCheckboxChange={handleCheckboxChange} />
                    )}

                    {formData.projectTypes.includes('video_animation') && (
                         <VideoBriefing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} onCheckboxChange={handleCheckboxChange} />
                    )}

                    {formData.projectTypes.includes('website') && (
                        <WebsiteBriefing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} onCheckboxChange={handleCheckboxChange} />
                    )}
                    
                    <DigitalMarketing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} />
                    <AdditionalInfo data={formData} onChange={handleChange} />

                    <div className="mt-10 border-t border-slate-700 pt-6 text-center">
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center justify-center gap-3 rounded-full bg-red-600 px-12 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-slate-600"
                        >
                            {isLoading ? (
                                <>
                                    <LoadingSpinner className="h-6 w-6 animate-spin" />
                                    <span>Enviando...</span>
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="h-6 w-6" />
                                    <span>Enviar e Gerar PDF</span>
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
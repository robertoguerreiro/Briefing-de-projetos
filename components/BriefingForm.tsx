import React, { useState, useRef } from 'react';

// Types
import type { FormData } from '../types';

// Section Components
import { ContactInfo } from './sections/ContactInfo';
import { ProjectType } from './sections/ProjectType';
import { GeneralProjectInfo } from './sections/GeneralProjectInfo';
import { BrandBriefing } from './sections/BrandBriefing';
import { VideoBriefing } from './sections/VideoBriefing';
import { WebsiteBriefing } from './sections/WebsiteBriefing';
import { DigitalMarketing } from './sections/DigitalMarketing';
import { AdditionalInfo } from './sections/AdditionalInfo';
import { ThankYouPage } from './pages/ThankYouPage';

// Icons
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';

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
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => {
                const currentValues = (prev[name as keyof typeof prev] as string[]) || [];
                if (checked) {
                    return { ...prev, [name]: [...currentValues, value] };
                } else {
                    return { ...prev, [name]: currentValues.filter(v => v !== value) };
                }
            });
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name: string, value: string) => {
        setFormData(prev => {
            const field = (prev[name as keyof typeof prev] as string[]) || [];
            const newField = field.includes(value)
                ? field.filter(item => item !== value)
                : [...field, value];
            return { ...prev, [name]: newField };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const completeFormData: FormData = {
            ...formData,
            id: Date.now().toString(),
            submission_date: new Date().toISOString()
        };
        
        try {
            const storedBriefings = localStorage.getItem('briefings');
            const briefings = storedBriefings ? JSON.parse(storedBriefings) : [];
            briefings.push(completeFormData);
            localStorage.setItem('briefings', JSON.stringify(briefings));
        } catch (error) {
            console.error("Failed to save briefing to local storage", error);
        }

        setSubmittedData(completeFormData);
        setIsSubmitted(true);
        window.scrollTo(0, 0);
    };

    const handleScrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (isSubmitted && submittedData) {
        return <ThankYouPage formData={submittedData} onBackToHome={onBackToHome} />;
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-900 lg:flex-row">
             {/* Left Panel - Form side */}
            <div ref={formRef} className="w-full lg:w-2/3">
                <div className="mx-auto max-w-5xl px-8 py-10">
                    <div className="mb-8 flex items-center justify-between">
                         <a href="https://warrior.art.br/" target="_blank" rel="noopener noreferrer" aria-label="Visitar o site Guerreiro Art Director">
                            <img
                                src="https://warrior.art.br/wp-content/uploads/2023/07/Roberto-Guerreiro-Art-Director-Logo-1.png"
                                alt="Guerreiro Art Director Logo"
                                className="h-12 w-auto transition-transform duration-300 hover:scale-110"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={onBackToHome}
                            className="flex items-center gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Voltar
                        </button>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-4xl font-extrabold text-white">Informações de Projetos.</h1>
                        <p className="mt-2 text-slate-300">Preencha o formulário abaixo para iniciarmos seu projeto.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <ContactInfo data={formData} onChange={handleChange} />
                        <ProjectType data={formData} onChange={handleChange} onCheckboxChange={handleCheckboxChange} />
                        
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

                        <div className="!mt-12 border-t border-slate-700 pt-8 text-center">
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-red-600 px-12 py-4 text-xl font-bold text-white transition-transform duration-300 hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 sm:w-auto"
                            >
                                <PaperAirplaneIcon className="h-6 w-6" />
                                Enviar Briefing
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Right Panel - Illustration side */}
            <div className="relative flex h-screen w-full flex-col items-center justify-center bg-black px-4 py-8 text-center text-white lg:sticky lg:top-0 lg:h-screen lg:w-1/3">
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="https://warrior.art.br/wp-content/uploads/2025/04/AdsMetrics-Ilustra-Anima-7.svg"
                        alt="Ilustração de Análise de Métricas"
                        className="w-full max-w-md"
                    />
                     <a href="https://warrior.art.br/" target="_blank" rel="noopener noreferrer" className="mt-8 transition-transform duration-300 hover:scale-110">
                        <img
                            src="https://warrior.art.br/wp-content/uploads/2023/07/Roberto-Guerreiro-Art-Director-Logo-1.png"
                            alt="Guerreiro Art Director Logo"
                            className="h-12 w-auto"
                        />
                    </a>
                    <h2 className="mt-4 text-3xl font-bold">Briefing de Projetos</h2>
                    <p className="mt-2 max-w-sm text-slate-300">
                        O briefing é ideal para entendermos bem o projeto e conhecer a empresa. Com ele, formamos nossa base de pesquisa e estudo para o desenvolvimento, criação e direção de arte.
                    </p>
                </div>

                <div className="mt-8 lg:hidden">
                    <button
                        onClick={handleScrollToForm}
                        className="rounded-full bg-red-600 px-8 py-3 font-bold text-white transition-transform hover:scale-105"
                    >
                        Preencha o briefing
                    </button>
                </div>
            </div>
        </div>
    );
};
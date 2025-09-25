import React, { useState, useCallback } from 'react';
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const briefingDetails = generateBriefingBody(formData);

        // 1. Prepare Admin Email
        const adminSubject = `Novo Briefing Recebido (${formData.projectName || 'Sem Nome'}) - via warrior.art.br`;
        const adminBody = `Olá, Roberto,\n\nVocê recebeu um novo briefing de projeto através do site www.warrior.art.br.\n\n---------------------------------------\n\n${briefingDetails}`;
        const mailtoLink = `mailto:roberto.carvalho.guerreiro@gmail.com?subject=${encodeURIComponent(adminSubject)}&body=${encodeURIComponent(adminBody)}`;
        
        // 2. Trigger mailto and redirect to Thank You page
        window.location.href = mailtoLink;
        setIsSubmitted(true);
    };
    
    if (isSubmitted) {
        return <ThankYouPage data={formData} />;
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
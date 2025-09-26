
import React, { useState, useRef } from 'react';
import type { FormData } from '../types';
import { ContactInfo } from './sections/ContactInfo';
import { ProjectType } from './sections/ProjectType';
import { GeneralProjectInfo } from './sections/GeneralProjectInfo';
import { BrandBriefing } from './sections/BrandBriefing';
import { VideoBriefing } from './sections/VideoBriefing';
import { WebsiteBriefing } from './sections/WebsiteBriefing';
import { DigitalMarketing } from './sections/DigitalMarketing';
import { AdditionalInfo } from './sections/AdditionalInfo';
import { LoadingSpinner } from './icons/LoadingSpinner';
import { ThankYouPage } from './pages/ThankYouPage';
import { Footer } from './layout/Footer';

interface BriefingFormProps {
    onBackToHome: () => void;
}

const initialFormData: Omit<FormData, 'id' | 'submission_date'> = {
    fullName: '', email: '', phone: '', company: '', role: '',
    projectTypes: [], projectName: '', projectSummary: '', projectObjectives: '',
    targetAudience: '', problemToSolve: '', keyDifferentiators: '', deadline: '',
    budget: '', hasLogo: '', hasBrandManual: '', visualStyles: [], otherStyle: '',
    colorPreferences: '', fontPreferences: '', hasSlogan: '', brandValues: '',
    brandAudienceDetails: '', competitors: '', visualReferences: '', visualDislikes: '',
    digitalMarketingStrategy: '', seoImportance: '', paidTraffic: '', socialMedia: '',
    additionalInfo: '', howFound: '', videoTypes: [], otherVideoType: '',
    videoDuration: '', videoStyleLinks: '', videoScriptStatus: '', videoAssetsStatus: '',
    videoNarration: '', videoSubtitles: '', videoDistribution: [], otherVideoDistribution: '',
    websiteObjectives: [], otherWebsiteObjective: '', mainUserAction: '', hasDomain: '',
    hasHosting: '', websiteSections: '', specificFunctionality: '', likedWebsites: '',
    contentProvider: '',
};

export const BriefingForm: React.FC<BriefingFormProps> = ({ onBackToHome }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);
    const [error, setError] = useState('');
    const formRef = useRef<HTMLDivElement>(null);

    const handleScrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => {
                const list = prev[name as keyof typeof prev] as string[];
                const newList = checked ? [...list, value] : list.filter(item => item !== value);
                return { ...prev, [name]: newList };
            });
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
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
        if (!formData.fullName || !formData.email || formData.projectTypes.length === 0 || !formData.projectSummary) {
            setError('Por favor, preencha todos os campos obrigatórios (*).');
            window.scrollTo(0, 0);
            return;
        }
        setError('');
        setIsSubmitting(true);

        try {
            const finalData: FormData = {
                ...formData,
                id: Date.now().toString(),
                submission_date: new Date().toISOString(),
            };

            const storedBriefings = localStorage.getItem('briefings');
            const briefings = storedBriefings ? JSON.parse(storedBriefings) : [];
            briefings.push(finalData);
            localStorage.setItem('briefings', JSON.stringify(briefings));

            setSubmittedData(finalData);
        } catch (err) {
            setError('Falha ao salvar o briefing localmente. Verifique as permissões do seu navegador.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submittedData) {
        return <ThankYouPage formData={submittedData} onBackToHome={onBackToHome} />;
    }

    return (
        <div className="lg:flex">
            <div className="w-full lg:w-2/3">
                <div className="flex h-screen flex-col items-center justify-center bg-black p-4 text-center text-white lg:hidden">
                    <img src="https://warrior.art.br/wp-content/uploads/2025/04/AdsMetrics-Ilustra-Anima-7.svg" alt="Ilustração de Análise de Métricas" className="w-full max-w-md" />
                    <img src="https://warrior.art.br/wp-content/uploads/2023/07/Roberto-Guerreiro-Art-Director-Logo-1.png" alt="Guerreiro Art Director Logo" className="my-8 h-16 w-auto" />
                    <h1 className="text-3xl font-bold">Briefing de Projetos</h1>
                    <p className="mt-4 max-w-sm text-slate-300">O briefing é ideal para entendermos bem o projeto e conhecer a empresa.</p>
                    <button onClick={handleScrollToForm} className="mt-8 rounded-full bg-red-600 px-8 py-3 font-bold text-white transition-transform hover:scale-105">
                        Preencha o briefing
                    </button>
                </div>

                <main ref={formRef} id="briefing-form-section" className="flex min-h-screen flex-col bg-slate-900 text-slate-300">
                    <div className="container mx-auto max-w-5xl flex-grow px-8 py-12">
                        <div className="mb-8 flex justify-between">
                             <img src="https://warrior.art.br/wp-content/uploads/2023/07/Roberto-Guerreiro-Art-Director-Logo-1.png" alt="Guerreiro Art Director Logo" className="h-12 w-auto" />
                            <button type="button" onClick={onBackToHome} className="flex items-center gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                                Voltar
                            </button>
                        </div>
                        <h1 className="text-4xl font-bold text-white">Informações de Projetos.</h1>
                        <p className="mt-2 text-slate-400">Preencha o formulário abaixo para iniciarmos seu projeto.</p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-12" noValidate>
                            {error && <div className="rounded-md border border-red-800 bg-red-900/50 p-4 text-center text-red-300">{error}</div>}
                            <ContactInfo data={formData} onChange={handleChange} />
                            <ProjectType data={formData} onChange={handleChange} />
                            <GeneralProjectInfo data={formData} onChange={handleChange} />
                            {formData.projectTypes.includes('branding_visual') && <BrandBriefing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} onCheckboxChange={handleCheckboxChange} />}
                            {formData.projectTypes.includes('video_animation') && <VideoBriefing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} onCheckboxChange={handleCheckboxChange} />}
                            {formData.projectTypes.includes('website') && <WebsiteBriefing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} onCheckboxChange={handleCheckboxChange} />}
                            <DigitalMarketing data={formData} onChange={handleChange} onRadioChange={handleRadioChange} />
                            <AdditionalInfo data={formData} onChange={handleChange} />
                            <div className="flex flex-col items-center gap-4 border-t border-slate-700 pt-8 sm:flex-row sm:justify-end">
                                <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-3 rounded-md bg-red-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-800 sm:w-auto">
                                    {isSubmitting ? <><LoadingSpinner className="h-6 w-6 animate-spin" /><span>Enviando...</span></> : 'Enviar Briefing'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <Footer />
                </main>
            </div>

            <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/3 flex-col items-center justify-center bg-black p-8 text-center text-white">
                <div className="flex flex-col items-center justify-center">
                    <img src="https://warrior.art.br/wp-content/uploads/2025/04/AdsMetrics-Ilustra-Anima-7.svg" alt="Ilustração de Análise de Métricas" className="w-full max-w-md" />
                    <img src="https://warrior.art.br/wp-content/uploads/2023/07/Roberto-Guerreiro-Art-Director-Logo-1.png" alt="Guerreiro Art Director Logo" className="my-8 h-16 w-auto" />
                    <h2 className="text-3xl font-bold">Briefing de Projetos</h2>
                    <p className="mt-4 max-w-sm px-4 text-slate-300">O briefing é ideal para entendermos bem o projeto e conhecer a empresa. Com ele, formamos nossa base de pesquisa e estudo para o desenvolvimento, criação e direção de arte.</p>
                </div>
            </aside>
        </div>
    );
};

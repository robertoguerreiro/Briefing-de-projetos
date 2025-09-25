// FIX: Import React to provide the 'React' namespace for types like React.ChangeEvent.
import type React from 'react';

export interface FormData {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    company: string;
    role: string;
    projectTypes: string[];
    projectName: string;
    projectSummary: string;
    projectObjectives: string;
    targetAudience: string;
    problemToSolve: string;
    keyDifferentiators: string;
    deadline: string;
    budget: string;
    hasLogo: string;
    hasBrandManual: string;
    visualStyles: string[];
    otherStyle: string;
    colorPreferences: string;
    fontPreferences: string;
    hasSlogan: string;
    brandValues: string;
    brandAudienceDetails: string;
    competitors: string;
    visualReferences: string;
    visualDislikes: string;
    digitalMarketingStrategy: string;
    seoImportance: string;
    paidTraffic: string;
    socialMedia: string;
    additionalInfo: string;
    howFound: string;

    // Video Briefing fields
    videoTypes: string[];
    otherVideoType: string;
    videoDuration: string;
    videoStyleLinks: string;
    videoScriptStatus: string;
    videoAssetsStatus: string;
    videoNarration: string;
    videoSubtitles: string;
    videoDistribution: string[];
    otherVideoDistribution: string;

    // Website Briefing fields
    websiteObjectives: string[];
    otherWebsiteObjective: string;
    mainUserAction: string;
    hasDomain: string;
    hasHosting: string;
    websiteSections: string;
    specificFunctionality: string;
    likedWebsites: string;
    contentProvider: string;
}

export interface FormSectionProps {
    data: Omit<FormData, 'id'>;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onRadioChange?: (name: keyof FormData, value: string) => void;
    onCheckboxChange?: (name: keyof FormData, value: string) => void;
}
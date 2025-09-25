
import React from 'react';

interface SectionProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ icon, title, children }) => {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-700">{title}</h3>
            </div>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
};

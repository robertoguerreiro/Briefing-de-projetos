
import React from 'react';

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
    return (
        <div className="py-4">
            <div className="mb-6 border-b border-slate-700 pb-2">
                <h3 className="text-xl font-bold text-red-500">{title}</h3>
            </div>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
};
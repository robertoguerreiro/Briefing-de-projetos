import React from 'react';
import { Section } from '../layout/Section';
import { CheckboxInput } from '../form/CheckboxInput';
import type { FormSectionProps } from '../../types';

const projectOptions = [
    { value: 'branding_visual', label: 'Branding, Rebranding e/ou Identidade Visual' },
    { value: 'video_animation', label: 'Vídeo / Animação (Institucional, Promocional, Motion Graphics)' },
    { value: 'website', label: 'Website (Institucional, Landing Page, E-commerce Básico)' },
];

export const ProjectType: React.FC<FormSectionProps> = ({ data, onChange }) => {
    return (
        <Section title="Qual(is) tipo(s) de projeto você precisa?">
            <fieldset>
                <legend className="text-sm font-bold text-slate-600">
                    Selecione uma ou mais opções
                    <span className="text-red-500"> *</span>
                </legend>
                <div className="mt-4 space-y-4">
                    {projectOptions.map(option => (
                        <CheckboxInput
                            key={option.value}
                            label={option.label}
                            name="projectTypes"
                            value={option.value}
                            checked={data.projectTypes.includes(option.value)}
                            onChange={onChange}
                        />
                    ))}
                </div>
            </fieldset>
        </Section>
    );
};
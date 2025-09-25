import React from 'react';
import { Section } from '../layout/Section';
import { CheckboxInput } from '../form/CheckboxInput';
import { TextAreaInput } from '../form/TextAreaInput';
import { RadioGroup } from '../form/RadioGroup';
import { TextInput } from '../form/TextInput';
import type { FormSectionProps } from '../../types';

const websiteObjectiveOptions = [
    { value: 'vender', label: 'Vender produtos/serviços diretamente' },
    { value: 'apresentar', label: 'Apresentar a empresa e seus serviços (Institucional)' },
    { value: 'leads', label: 'Gerar leads / Capturar contatos' },
    { value: 'autoridade', label: 'Construir autoridade / Fortalecer a marca' },
    { value: 'conteudo', label: 'Oferecer conteúdo / Informação (Blog, Portal)' },
];

export const WebsiteBriefing: React.FC<FormSectionProps> = ({ data, onChange, onRadioChange, onCheckboxChange }) => {
    return (
        <Section title="Briefing de Website">
            <div>
                <legend className="block text-sm font-bold text-slate-600">Quais os principais objetivos do seu novo site?</legend>
                <div className="mt-2 space-y-3">
                    {websiteObjectiveOptions.map(option => (
                        <CheckboxInput
                            key={option.value}
                            label={option.label}
                            name="websiteObjectives"
                            value={option.value}
                            checked={data.websiteObjectives.includes(option.value)}
                            onChange={(e) => onCheckboxChange!('websiteObjectives', e.target.value)}
                        />
                    ))}
                     <CheckboxInput
                        label="Outro (descrever abaixo)"
                        name="websiteObjectives"
                        value="outro"
                        checked={data.websiteObjectives.includes('outro')}
                        onChange={(e) => onCheckboxChange!('websiteObjectives', e.target.value)}
                    />
                </div>
                {data.websiteObjectives.includes('outro') && (
                    <div className="mt-2">
                        <TextInput
                            label=""
                            name="otherWebsiteObjective"
                            value={data.otherWebsiteObjective}
                            onChange={onChange}
                            placeholder="Descreva o outro objetivo..."
                        />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                 <TextInput
                    label="Qual será a principal ação/função do usuário?"
                    name="mainUserAction"
                    value={data.mainUserAction}
                    onChange={onChange}
                    placeholder="Digite qual será a principal ação/função do usuário?..."
                />
                 <TextInput
                    label="Já possui um domínio?"
                    name="hasDomain"
                    value={data.hasDomain}
                    onChange={onChange}
                    placeholder="Digite já possui um domínio?..."
                />
            </div>
            
            <TextInput
                label="Já possui hospedagem?"
                name="hasHosting"
                value={data.hasHosting}
                onChange={onChange}
                placeholder="Digite já possui hospedagem?..."
            />

            <TextAreaInput
                label="Quais seções/páginas o site deverá ter?"
                name="websiteSections"
                value={data.websiteSections}
                onChange={onChange}
                placeholder="Digite quais seções/páginas o site deverá ter?..."
            />
             <TextAreaInput
                label="Alguma funcionalidade específica?"
                name="specificFunctionality"
                value={data.specificFunctionality}
                onChange={onChange}
                placeholder="Digite alguma funcionalidade específica?..."
            />
            <TextAreaInput
                label="Sites que você gosta e não gosta."
                name="likedWebsites"
                value={data.likedWebsites}
                onChange={onChange}
                placeholder="Digite sites que você gosta e não gosta...."
            />

            <RadioGroup
                legend="Quem fornecerá o conteúdo?"
                name="contentProvider"
                selectedValue={data.contentProvider}
                onChange={onRadioChange!}
                options={[
                    { value: 'cliente_total', label: 'Eu (cliente) fornecerei todo o conteúdo' },
                    { value: 'warrior_cria', label: 'Preciso que a Warrior Art crie/adapte o conteúdo' },
                    { value: 'parcial_ajuda', label: 'Fornecerei parte, preciso de ajuda com o restante' },
                    { value: 'warrior_complementa', label: 'A Warrior Art fornecerá parte, e eu complemento' },
                ]}
            />
        </Section>
    );
};

import React from 'react';
import { Section } from '../layout/Section';
import { RadioGroup } from '../form/RadioGroup';
import { CheckboxInput } from '../form/CheckboxInput';
import { TextInput } from '../form/TextInput';
import { TextAreaInput } from '../form/TextAreaInput';
import { LightBulbIcon } from '../icons/LightBulbIcon';
import type { FormSectionProps } from '../../types';

const visualStyleOptions = [
    { value: 'moderno', label: 'Moderno / contemporâneo' },
    { value: 'minimalista', label: 'Minimalista / Clean' },
    { value: 'classico', label: 'Clássico / Elegante' },
    { value: 'divertido', label: 'Divertido / Descontraído' },
    { value: 'tecnologico', label: 'Tecnológico / Inovador' },
    { value: 'rustico', label: 'Rústico / Artesanal' },
];

export const BrandBriefing: React.FC<FormSectionProps> = ({ data, onChange, onRadioChange, onCheckboxChange }) => {
    return (
        <Section icon={<LightBulbIcon />} title="Briefing de Marca (Branding / Identidade Visual / Rebranding)">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <RadioGroup
                    legend="Sua marca já possui um logotipo?"
                    name="hasLogo"
                    selectedValue={data.hasLogo}
                    onChange={onRadioChange!}
                    options={[
                        { value: 'sim_gosto', label: 'Sim, já tenho e gosto dele' },
                        { value: 'sim_nao_gosto', label: 'Sim, já tenho, mas quero um NOVO/MELHOR' },
                        { value: 'nao_tenho', label: 'Não, ainda não tenho' },
                    ]}
                />
                <RadioGroup
                    legend="Possui manual da marca?"
                    name="hasBrandManual"
                    selectedValue={data.hasBrandManual}
                    onChange={onRadioChange!}
                    options={[
                        { value: 'sim', label: 'Sim' },
                        { value: 'nao', label: 'Não' },
                    ]}
                />
            </div>
            <div>
                <legend className="block text-sm font-bold text-slate-600">Quais estilos visuais mais te agradam?</legend>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {visualStyleOptions.map(option => (
                         <CheckboxInput
                            key={option.value}
                            label={option.label}
                            name="visualStyles"
                            value={option.value}
                            checked={data.visualStyles.includes(option.value)}
                            onChange={(e) => onCheckboxChange!('visualStyles', e.target.value)}
                        />
                    ))}
                    <div className="flex items-center gap-2">
                         <CheckboxInput
                            label="Outro (descrever abaixo)"
                            name="visualStyles"
                            value="outro"
                            checked={data.visualStyles.includes('outro')}
                            onChange={(e) => onCheckboxChange!('visualStyles', e.target.value)}
                        />
                    </div>
                </div>
                 {data.visualStyles.includes('outro') && (
                    <TextInput
                        label=""
                        name="otherStyle"
                        value={data.otherStyle}
                        onChange={onChange}
                        placeholder="Descreva o outro estilo..."
                    />
                )}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextInput
                    label="Cores que gosta ou não gosta?"
                    name="colorPreferences"
                    value={data.colorPreferences}
                    onChange={onChange}
                    placeholder="Digite cores que gosta ou não gosta?..."
                />
                <TextInput
                    label="Preferência por tipo de fonte?"
                    name="fontPreferences"
                    value={data.fontPreferences}
                    onChange={onChange}
                    placeholder="Digite preferência por tipo de fonte?..."
                />
            </div>
            <TextInput
                label="A marca possui um slogan?"
                name="hasSlogan"
                value={data.hasSlogan}
                onChange={onChange}
                placeholder="Digite a marca possui um slogan?..."
            />
            <TextAreaInput
                label="Valores e personalidade da marca?"
                name="brandValues"
                value={data.brandValues}
                onChange={onChange}
                placeholder="Digite valores e personalidade da marca?..."
            />
            <TextAreaInput
                label="Detalhes do público-alvo da MARCA."
                name="brandAudienceDetails"
                value={data.brandAudienceDetails}
                onChange={onChange}
                placeholder="Digite detalhes do público-alvo da marca...."
            />
             <TextAreaInput
                label="Concorrentes e/ou marcas que você admira."
                name="competitors"
                value={data.competitors}
                onChange={onChange}
                placeholder="Digite concorrentes e/ou marcas que você admira...."
            />
             <TextAreaInput
                label="Links de referências visuais."
                name="visualReferences"
                value={data.visualReferences}
                onChange={onChange}
                placeholder="Digite links de referências visuais...."
            />
            <TextAreaInput
                label="O que você NÃO GOSTARIA na sua identidade visual?"
                name="visualDislikes"
                value={data.visualDislikes}
                onChange={onChange}
                placeholder="Digite o que você não gostaria na sua identidade visual?..."
            />
        </Section>
    );
};
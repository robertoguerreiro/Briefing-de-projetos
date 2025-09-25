
import React from 'react';
import { Section } from '../layout/Section';
import { TextInput } from '../form/TextInput';
import { TextAreaInput } from '../form/TextAreaInput';
import { SelectInput } from '../form/SelectInput';
import type { FormSectionProps } from '../../types';

const budgetOptions = [
    { value: 'até 5k', label: 'Até R$5.000' },
    { value: '5k-10k', label: 'R$5.000 - R$10.000' },
    { value: '10k-20k', label: 'R$10.000 - R$20.000' },
    { value: 'acima de 20k', label: 'Acima de R$20.000' },
    { value: 'a definir', label: 'A definir' },
];

export const GeneralProjectInfo: React.FC<FormSectionProps> = ({ data, onChange }) => {
    return (
        <Section title="Sobre o Projeto (Geral)">
            <TextInput
                label="Dê um nome para este projeto"
                name="projectName"
                value={data.projectName}
                onChange={onChange}
                placeholder="Digite dê um nome para este projeto..."
            />
            <TextAreaInput
                label="Descreva de forma resumida o que você precisa."
                name="projectSummary"
                value={data.projectSummary}
                onChange={onChange}
                placeholder="Digite descreva de forma resumida o que você precisa...."
                required
            />
            <TextAreaInput
                label="Quais são os principais objetivos?"
                name="projectObjectives"
                value={data.projectObjectives}
                onChange={onChange}
                placeholder="Digite quais são os principais objetivos?..."
            />
            <TextAreaInput
                label="Quem é o público principal?"
                name="targetAudience"
                value={data.targetAudience}
                onChange={onChange}
                placeholder="Digite quem é o público principal?..."
            />
            <TextAreaInput
                label="Que problema(s) seu produto/serviço resolve?"
                name="problemToSolve"
                value={data.problemToSolve}
                onChange={onChange}
                placeholder="Digite que problema(s) seu produto/serviço resolve?..."
            />
            <TextAreaInput
                label="Quais são seus principais diferenciais?"
                name="keyDifferentiators"
                value={data.keyDifferentiators}
                onChange={onChange}
                placeholder="Digite quais são seus principais diferenciais?..."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextInput
                    label="Qual o seu prazo ideal?"
                    name="deadline"
                    type="date"
                    value={data.deadline}
                    onChange={onChange}
                    placeholder="dd/mm/aaaa"
                />
                <SelectInput
                    label="Qual a faixa de orçamento?"
                    name="budget"
                    value={data.budget}
                    onChange={onChange}
                    options={budgetOptions}
                />
            </div>
        </Section>
    );
};
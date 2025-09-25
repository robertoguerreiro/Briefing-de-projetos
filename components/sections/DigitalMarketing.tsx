
import React from 'react';
import { Section } from '../layout/Section';
import { TextAreaInput } from '../form/TextAreaInput';
import { RadioGroup } from '../form/RadioGroup';
import type { FormSectionProps } from '../../types';

export const DigitalMarketing: React.FC<FormSectionProps> = ({ data, onChange, onRadioChange }) => {
    return (
        <Section title="Marketing Digital (Opcional)">
            <TextAreaInput
                label="Você já utiliza alguma estratégia de marketing digital?"
                name="digitalMarketingStrategy"
                value={data.digitalMarketingStrategy}
                onChange={onChange}
                placeholder="Digite você já utiliza alguma estratégia de marketing digital?..."
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <RadioGroup
                    legend="Considera importante SEO?"
                    name="seoImportance"
                    selectedValue={data.seoImportance}
                    onChange={onRadioChange!}
                    options={[
                        { value: 'sim', label: 'Sim' },
                        { value: 'nao', label: 'Não' },
                        { value: 'nao_sei', label: 'Não sei / A definir' },
                    ]}
                />
                <RadioGroup
                    legend="Pensa em investir em tráfego pago?"
                    name="paidTraffic"
                    selectedValue={data.paidTraffic}
                    onChange={onRadioChange!}
                    options={[
                        { value: 'sim', label: 'Sim' },
                        { value: 'nao', label: 'Não' },
                        { value: 'nao_sei', label: 'Não sei / A definir' },
                    ]}
                />
            </div>
             <TextAreaInput
                label="Quais redes sociais sua marca utiliza?"
                name="socialMedia"
                value={data.socialMedia}
                onChange={onChange}
                placeholder="Digite quais redes sociais sua marca utiliza?..."
            />
        </Section>
    );
};
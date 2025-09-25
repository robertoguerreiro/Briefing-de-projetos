
import React from 'react';
import { Section } from '../layout/Section';
import { TextAreaInput } from '../form/TextAreaInput';
import { QuestionMarkCircleIcon } from '../icons/QuestionMarkCircleIcon';
import type { FormSectionProps } from '../../types';

export const AdditionalInfo: React.FC<FormSectionProps> = ({ data, onChange }) => {
    return (
        <Section icon={<QuestionMarkCircleIcon />} title="Informações Adicionais">
            <TextAreaInput
                label="Gostaria de acrescentar mais alguma informação?"
                name="additionalInfo"
                value={data.additionalInfo}
                onChange={onChange}
                placeholder="Digite gostaria de acrescentar mais alguma informação?..."
            />
            <TextAreaInput
                label="Como você encontrou a Warrior Art Director?"
                name="howFound"
                value={data.howFound}
                onChange={onChange}
                placeholder="Digite como você encontrou a warrior art director?..."
                rows={2}
            />
        </Section>
    );
};

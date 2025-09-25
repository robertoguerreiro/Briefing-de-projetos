
import React from 'react';
import { Section } from '../layout/Section';
import { TextInput } from '../form/TextInput';
import type { FormSectionProps } from '../../types';

export const ContactInfo: React.FC<FormSectionProps> = ({ data, onChange }) => {
    return (
        <Section title="Informações de Contato">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextInput 
                    label="Nome Completo"
                    name="fullName"
                    value={data.fullName}
                    onChange={onChange}
                    placeholder="Digite nome completo..."
                    required
                />
                <TextInput 
                    label="Email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={onChange}
                    placeholder="Digite email..."
                    required
                />
                 <TextInput 
                    label="Telefone/WhatsApp"
                    name="phone"
                    type="tel"
                    value={data.phone}
                    onChange={onChange}
                    placeholder="Digite telefone/whatsapp..."
                />
                 <TextInput 
                    label="Empresa"
                    name="company"
                    value={data.company}
                    onChange={onChange}
                    placeholder="Digite empresa (opcional)..."
                    optional
                />
            </div>
             <TextInput 
                label="Cargo/Função"
                name="role"
                value={data.role}
                onChange={onChange}
                placeholder="Digite cargo/função (opcional)..."
                optional
            />
        </Section>
    );
};
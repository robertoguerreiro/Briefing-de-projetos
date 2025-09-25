import React from 'react';
import { Section } from '../layout/Section';
import { CheckboxInput } from '../form/CheckboxInput';
import { SelectInput } from '../form/SelectInput';
import { TextAreaInput } from '../form/TextAreaInput';
import { RadioGroup } from '../form/RadioGroup';
import { TextInput } from '../form/TextInput';
import type { FormSectionProps } from '../../types';

const videoTypeOptions = [
    { value: 'institucional', label: 'Vídeo Institucional (Apresentação da empresa)' },
    { value: 'promocional', label: 'Vídeo Promocional (Produto/Serviço específico)' },
    { value: 'motion', label: 'Motion Graphics / Animação 2D' },
    { value: 'vinheta', label: 'Vinheta / Animação de Logo' },
    { value: 'explicativo', label: 'Vídeo Explicativo / Tutorial' },
    { value: 'depoimento', label: 'Vídeo de Depoimento de Cliente' },
];

const durationOptions = [
    { value: '', label: 'Selecione...' },
    { value: 'até 30s', label: 'Até 30 segundos' },
    { value: '30s-1m', label: '30 a 60 segundos' },
    { value: '1m-3m', label: '1 a 3 minutos' },
    { value: '3m+', label: 'Mais de 3 minutos' },
    { value: 'a definir', label: 'A definir' },
];

const distributionOptions = [
    { value: 'redes sociais', label: 'Redes Sociais (Instagram, Facebook, TikTok, etc.)' },
    { value: 'website', label: 'Website da empresa' },
    { value: 'plataformas video', label: 'Plataformas de Vídeo (YouTube, Vimeo)' },
    { value: 'eventos', label: 'Eventos / Apresentações' },
    { value: 'whatsapp', label: 'WhatsApp / Comunicação Interna' },
];

export const VideoBriefing: React.FC<FormSectionProps> = ({ data, onChange, onRadioChange, onCheckboxChange }) => {
    return (
        <Section title="Briefing de Vídeo / Animação">
            <div>
                <legend className="block text-sm font-bold text-slate-600">Que tipo(s) de vídeo/animação você precisa?</legend>
                <div className="mt-2 grid grid-cols-1 gap-y-3 gap-x-2 sm:grid-cols-2">
                    {videoTypeOptions.map(option => (
                        <CheckboxInput
                            key={option.value}
                            label={option.label}
                            name="videoTypes"
                            value={option.value}
                            checked={data.videoTypes.includes(option.value)}
                            onChange={(e) => onCheckboxChange!('videoTypes', e.target.value)}
                        />
                    ))}
                    <CheckboxInput
                        label="Outro (descrever abaixo)"
                        name="videoTypes"
                        value="outro"
                        checked={data.videoTypes.includes('outro')}
                        onChange={(e) => onCheckboxChange!('videoTypes', e.target.value)}
                    />
                </div>
                {data.videoTypes.includes('outro') && (
                    <div className="mt-2">
                        <TextInput
                            label=""
                            name="otherVideoType"
                            value={data.otherVideoType}
                            onChange={onChange}
                            placeholder="Descreva o outro tipo de vídeo..."
                        />
                    </div>
                )}
            </div>
            
            <SelectInput
                label="Qual a duração estimada?"
                name="videoDuration"
                value={data.videoDuration}
                onChange={onChange}
                options={durationOptions}
            />

            <TextAreaInput
                label="Links de vídeos com o estilo que você busca."
                name="videoStyleLinks"
                value={data.videoStyleLinks}
                onChange={onChange}
                placeholder="Digite links de vídeos com o estilo que você busca...."
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <RadioGroup
                    legend="Como está o roteiro para o vídeo?"
                    name="videoScriptStatus"
                    selectedValue={data.videoScriptStatus}
                    onChange={onRadioChange!}
                    options={[
                        { value: 'pronto', label: 'Tenho o roteiro pronto' },
                        { value: 'rascunho', label: 'Tenho um rascunho/ideia geral' },
                        { value: 'preciso de ajuda', label: 'Preciso de ajuda para criar o roteiro' },
                        { value: 'nao se aplica', label: 'Não se aplica (ex: apenas animação de logo)' },
                    ]}
                />
                <RadioGroup
                    legend="E quanto aos materiais/assets?"
                    name="videoAssetsStatus"
                    selectedValue={data.videoAssetsStatus}
                    onChange={onRadioChange!}
                    options={[
                        { value: 'tenho todos', label: 'Tenho todos os materiais (logos, imagens, vídeos brutos)' },
                        { value: 'tenho alguns', label: 'Tenho alguns materiais, mas preciso de outros' },
                        { value: 'preciso que crie', label: 'Preciso que a Warrior Art crie todos os materiais/assets' },
                    ]}
                />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <RadioGroup
                    legend="Haverá necessidade de locução?"
                    name="videoNarration"
                    selectedValue={data.videoNarration}
                    onChange={onRadioChange!}
                    options={[
                        { value: 'sim_profissional', label: 'Sim, com locutor(a) profissional' },
                        { value: 'sim_cliente', label: 'Sim, eu (cliente) ou alguém da minha equipe irá gravar' },
                        { value: 'nao_trilha_sonora', label: 'Não, será apenas com trilha sonora e/ou texto na tela' },
                        { value: 'apenas_texto', label: 'Apenas texto na tela (sem locução)' },
                    ]}
                />
                <RadioGroup
                    legend="O vídeo precisará de legendas?"
                    name="videoSubtitles"
                    selectedValue={data.videoSubtitles}
                    onChange={onRadioChange!}
                    options={[
                        { value: 'sim', label: 'Sim' },
                        { value: 'nao', label: 'Não' },
                    ]}
                />
            </div>

            <div>
                <legend className="block text-sm font-bold text-slate-600">Onde este vídeo será veiculado?</legend>
                <div className="mt-2 grid grid-cols-1 gap-y-3 gap-x-2 sm:grid-cols-2">
                    {distributionOptions.map(option => (
                        <CheckboxInput
                            key={option.value}
                            label={option.label}
                            name="videoDistribution"
                            value={option.value}
                            checked={data.videoDistribution.includes(option.value)}
                            onChange={(e) => onCheckboxChange!('videoDistribution', e.target.value)}
                        />
                    ))}
                    <CheckboxInput
                        label="Outro (especificar)"
                        name="videoDistribution"
                        value="outro"
                        checked={data.videoDistribution.includes('outro')}
                        onChange={(e) => onCheckboxChange!('videoDistribution', e.target.value)}
                    />
                </div>
                 {data.videoDistribution.includes('outro') && (
                    <div className="mt-2">
                        <TextInput
                            label=""
                            name="otherVideoDistribution"
                            value={data.otherVideoDistribution}
                            onChange={onChange}
                            placeholder="Especifique onde mais será veiculado..."
                        />
                    </div>
                )}
            </div>
        </Section>
    );
};
import type { FormData } from '../types';

export const generateBriefingBody = (data: FormData): string => {
    let body = "";

    const addSection = (title: string) => {
        body += `<h3 style="font-size: 1.1rem; color: #D33434; margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 5px;">${title}</h3>`;
    };

    const addField = (label: string, value: string | string[] | undefined | null) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            return;
        }
        
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        // Escape only the value part to prevent HTML injection from user input
        const escapedValue = displayValue.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        body += `<p style="margin: 0.5em 0;"><strong>${label}:</strong> ${escapedValue}</p>`;
    };
    
    const projectTypeMap: { [key: string]: string } = {
        'branding_visual': 'Branding, Rebranding e/ou Identidade Visual',
        'video_animation': 'Vídeo / Animação (Institucional, Promocional, Motion Graphics)',
        'website': 'Website (Institucional, Landing Page, E-commerce Básico)',
    };
    
    const mapValues = (values: string[], map: { [key: string]: string }) => {
        return values.map(v => map[v] || v);
    };

    addSection("INFORMAÇÕES DE CONTATO");
    addField("Nome Completo", data.fullName);
    addField("Email", data.email);
    addField("Telefone/WhatsApp", data.phone);
    addField("Empresa", data.company);
    addField("Cargo/Função", data.role);

    addSection("TIPO(S) DE PROJETO");
    addField("Tipos selecionados", mapValues(data.projectTypes, projectTypeMap));
    
    addSection("SOBRE O PROJETO (GERAL)");
    addField("Nome do projeto", data.projectName);
    addField("Resumo do que precisa", data.projectSummary);
    addField("Principais objetivos", data.projectObjectives);
    addField("Público principal", data.targetAudience);
    addField("Problema que resolve", data.problemToSolve);
    addField("Principais diferenciais", data.keyDifferentiators);
    addField("Prazo ideal", data.deadline);
    addField("Faixa de orçamento", data.budget);

    if (data.projectTypes.includes('branding_visual')) {
        addSection("BRIEFING DE MARCA");
        addField("Já possui um logotipo?", data.hasLogo);
        addField("Possui manual da marca?", data.hasBrandManual);
        const visualStylesText = [...data.visualStyles];
        if (data.visualStyles.includes('outro') && data.otherStyle) {
            const index = visualStylesText.indexOf('outro');
            visualStylesText[index] = `Outro: ${data.otherStyle}`;
        }
        addField("Estilos visuais", visualStylesText);
        addField("Cores que gosta/não gosta", data.colorPreferences);
        addField("Preferência por fonte", data.fontPreferences);
        addField("A marca possui um slogan?", data.hasSlogan);
        addField("Valores e personalidade", data.brandValues);
        addField("Detalhes do público-alvo", data.brandAudienceDetails);
        addField("Concorrentes/marcas que admira", data.competitors);
        addField("Referências visuais", data.visualReferences);
        addField("O que NÃO GOSTARIA", data.visualDislikes);
    }

    if (data.projectTypes.includes('video_animation')) {
        addSection("BRIEFING DE VÍDEO / ANIMAÇÃO");
        const videoTypesText = [...data.videoTypes];
        if (data.videoTypes.includes('outro') && data.otherVideoType) {
            const index = videoTypesText.indexOf('outro');
            videoTypesText[index] = `Outro: ${data.otherVideoType}`;
        }
        addField("Tipos de vídeo", videoTypesText);
        addField("Duração estimada", data.videoDuration);
        addField("Links de referência", data.videoStyleLinks);
        addField("Roteiro", data.videoScriptStatus);
        addField("Materiais/Assets", data.videoAssetsStatus);
        addField("Locução", data.videoNarration);
        addField("Legendas", data.videoSubtitles);
        const videoDistributionText = [...data.videoDistribution];
        if(data.videoDistribution.includes('outro') && data.otherVideoDistribution) {
            const index = videoDistributionText.indexOf('outro');
            videoDistributionText[index] = `Outro: ${data.otherVideoDistribution}`;
        }
        addField("Onde será veiculado", videoDistributionText);
    }

    if (data.projectTypes.includes('website')) {
        addSection("BRIEFING DE WEBSITE");
        const websiteObjectivesText = [...data.websiteObjectives];
        if(data.websiteObjectives.includes('outro') && data.otherWebsiteObjective){
            const index = websiteObjectivesText.indexOf('outro');
            websiteObjectivesText[index] = `Outro: ${data.otherWebsiteObjective}`;
        }
        addField("Principais objetivos", websiteObjectivesText);
        addField("Principal ação/função do usuário", data.mainUserAction);
        addField("Domínio", data.hasDomain);
        addField("Hospedagem", data.hasHosting);
        addField("Seções/Páginas", data.websiteSections);
        addField("Funcionalidade específica", data.specificFunctionality);
        addField("Sites que gosta e não gosta", data.likedWebsites);
        addField("Fornecimento de conteúdo", data.contentProvider);
    }

    addSection("MARKETING DIGITAL");
    addField("Estratégia de marketing digital", data.digitalMarketingStrategy);
    addField("Considera importante SEO?", data.seoImportance);
    addField("Pensa em investir em tráfego pago?", data.paidTraffic);
    addField("Redes sociais", data.socialMedia);

    addSection("INFORMAÇÕES ADICIONAIS");
    addField("Informações extras", data.additionalInfo);
    addField("Como nos encontrou?", data.howFound);

    return body;
};

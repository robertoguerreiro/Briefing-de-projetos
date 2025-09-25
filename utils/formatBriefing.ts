import type { FormData } from '../types';

export const generateBriefingBody = (data: FormData): string => {
    let body = "";

    body += "INFORMAÇÕES DE CONTATO\n";
    body += "---------------------------\n";
    body += `Nome Completo: ${data.fullName}\n`;
    body += `Email: ${data.email}\n`;
    body += `Telefone/WhatsApp: ${data.phone}\n`;
    body += `Empresa: ${data.company || 'N/A'}\n`;
    body += `Cargo/Função: ${data.role || 'N/A'}\n\n`;

    body += "TIPO(S) DE PROJETO\n";
    body += "----------------------\n";
    body += `${data.projectTypes.map(pt => {
        if (pt === 'branding_visual') return 'Branding, Rebranding e/ou Identidade Visual';
        if (pt === 'video_animation') return 'Vídeo / Animação';
        if (pt === 'website') return 'Website';
        return pt;
    }).join(', ')}\n\n`;

    body += "SOBRE O PROJETO (GERAL)\n";
    body += "---------------------------\n";
    body += `Nome do projeto: ${data.projectName}\n`;
    body += `Resumo do que precisa: ${data.projectSummary}\n`;
    body += `Principais objetivos: ${data.projectObjectives}\n`;
    body += `Público principal: ${data.targetAudience}\n`;
    body += `Problema que resolve: ${data.problemToSolve}\n`;
    body += `Principais diferenciais: ${data.keyDifferentiators}\n`;
    body += `Prazo ideal: ${data.deadline || 'N/A'}\n`;
    body += `Faixa de orçamento: ${data.budget || 'N/A'}\n\n`;

    if (data.projectTypes.includes('branding_visual')) {
        body += "BRIEFING DE MARCA\n";
        body += "---------------------\n";
        body += `Já possui um logotipo? ${data.hasLogo}\n`;
        body += `Possui manual da marca? ${data.hasBrandManual}\n`;
        body += `Estilos visuais: ${data.visualStyles.join(', ')}${data.otherStyle ? `, Outro: ${data.otherStyle}` : ''}\n`;
        body += `Cores que gosta/não gosta: ${data.colorPreferences}\n`;
        body += `Preferência por fonte: ${data.fontPreferences}\n`;
        body += `A marca possui um slogan? ${data.hasSlogan}\n`;
        body += `Valores e personalidade: ${data.brandValues}\n`;
        body += `Detalhes do público-alvo: ${data.brandAudienceDetails}\n`;
        body += `Concorrentes/marcas que admira: ${data.competitors}\n`;
        body += `Referências visuais: ${data.visualReferences}\n`;
        body += `O que NÃO GOSTARIA: ${data.visualDislikes}\n\n`;
    }

    if (data.projectTypes.includes('video_animation')) {
        body += "BRIEFING DE VÍDEO / ANIMAÇÃO\n";
        body += "--------------------------------\n";
        body += `Tipos de vídeo: ${data.videoTypes.join(', ')}${data.otherVideoType ? `, Outro: ${data.otherVideoType}` : ''}\n`;
        body += `Duração estimada: ${data.videoDuration || 'N/A'}\n`;
        body += `Links de referência: ${data.videoStyleLinks || 'N/A'}\n`;
        body += `Roteiro: ${data.videoScriptStatus || 'N/A'}\n`;
        body += `Materiais/Assets: ${data.videoAssetsStatus || 'N/A'}\n`;
        body += `Locução: ${data.videoNarration || 'N/A'}\n`;
        body += `Legendas: ${data.videoSubtitles || 'N/A'}\n`;
        body += `Onde será veiculado: ${data.videoDistribution.join(', ')}${data.otherVideoDistribution ? `, Outro: ${data.otherVideoDistribution}` : ''}\n\n`;
    }

    if (data.projectTypes.includes('website')) {
        body += "BRIEFING DE WEBSITE\n";
        body += "---------------------\n";
        body += `Principais objetivos: ${data.websiteObjectives.join(', ')}${data.otherWebsiteObjective ? `, Outro: ${data.otherWebsiteObjective}` : ''}\n`;
        body += `Principal ação/função do usuário: ${data.mainUserAction || 'N/A'}\n`;
        body += `Domínio: ${data.hasDomain || 'N/A'}\n`;
        body += `Hospedagem: ${data.hasHosting || 'N/A'}\n`;
        body += `Seções/Páginas: ${data.websiteSections || 'N/A'}\n`;
        body += `Funcionalidade específica: ${data.specificFunctionality || 'N/A'}\n`;
        body += `Sites que gosta e não gosta: ${data.likedWebsites || 'N/A'}\n`;
        body += `Fornecimento de conteúdo: ${data.contentProvider || 'N/A'}\n\n`;
    }

    body += "MARKETING DIGITAL\n";
    body += "-------------------\n";
    body += `Estratégia de marketing digital: ${data.digitalMarketingStrategy || 'N/A'}\n`;
    body += `Considera importante SEO? ${data.seoImportance || 'N/A'}\n`;
    body += `Pensa em investir em tráfego pago? ${data.paidTraffic || 'N/A'}\n`;
    body += `Redes sociais: ${data.socialMedia || 'N/A'}\n\n`;

    body += "INFORMAÇÕES ADICIONAIS\n";
    body += "------------------------\n";
    body += `Informações extras: ${data.additionalInfo || 'N/A'}\n`;
    body += `Como nos encontrou? ${data.howFound || 'N/A'}\n`;

    return body;
};

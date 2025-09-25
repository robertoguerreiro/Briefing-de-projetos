import type { FormData } from '../types';

export const formatBriefing = (data: FormData): string => {
    let content = `Briefing do Projeto - ${data.projectName || 'Não especificado'}\n`;
    content += `Data de Envio: ${data.submission_date ? new Date(data.submission_date).toLocaleDateString('pt-BR') : 'N/A'}\n\n`;

    content += "========================================\n";
    content += "INFORMAÇÕES DE CONTATO\n";
    content += "========================================\n";
    content += `Nome Completo: ${data.fullName || 'Não informado'}\n`;
    content += `Email: ${data.email || 'Não informado'}\n`;
    content += `Telefone/WhatsApp: ${data.phone || 'Não informado'}\n`;
    content += `Empresa: ${data.company || 'Não informado'}\n`;
    content += `Cargo/Função: ${data.role || 'Não informado'}\n\n`;

    content += "========================================\n";
    content += "TIPO DE PROJETO\n";
    content += "========================================\n";
    content += `${data.projectTypes.length > 0 ? data.projectTypes.join(', ') : 'Não informado'}\n\n`;

    content += "========================================\n";
    content += "SOBRE O PROJETO (GERAL)\n";
    content += "========================================\n";
    content += `Nome do Projeto: ${data.projectName || 'Não informado'}\n`;
    content += `Resumo: ${data.projectSummary || 'Não informado'}\n`;
    content += `Principais Objetivos: ${data.projectObjectives || 'Não informado'}\n`;
    content += `Público Principal: ${data.targetAudience || 'Não informado'}\n`;
    content += `Problema a ser Resolvido: ${data.problemToSolve || 'Não informado'}\n`;
    content += `Principais Diferenciais: ${data.keyDifferentiators || 'Não informado'}\n`;
    content += `Prazo Ideal: ${data.deadline ? new Date(data.deadline).toLocaleDateString('pt-BR') : 'Não informado'}\n`;
    content += `Faixa de Orçamento: ${data.budget || 'Não informado'}\n\n`;

    if (data.projectTypes.includes('branding_visual')) {
        content += "========================================\n";
        content += "BRIEFING DE MARCA\n";
        content += "========================================\n";
        content += `Possui Logotipo: ${data.hasLogo || 'Não informado'}\n`;
        content += `Possui Manual da Marca: ${data.hasBrandManual || 'Não informado'}\n`;
        content += `Estilos Visuais: ${data.visualStyles.join(', ')}${data.visualStyles.includes('outro') ? ` - ${data.otherStyle}` : ''}\n`;
        content += `Preferências de Cores: ${data.colorPreferences || 'Não informado'}\n`;
        content += `Preferências de Fontes: ${data.fontPreferences || 'Não informado'}\n`;
        content += `Possui Slogan: ${data.hasSlogan || 'Não informado'}\n`;
        content += `Valores e Personalidade: ${data.brandValues || 'Não informado'}\n`;
        content += `Detalhes do Público-Alvo da Marca: ${data.brandAudienceDetails || 'Não informado'}\n`;
        content += `Concorrentes/Marcas Admiradas: ${data.competitors || 'Não informado'}\n`;
        content += `Referências Visuais: ${data.visualReferences || 'Não informado'}\n`;
        content += `O que NÃO gostaria: ${data.visualDislikes || 'Não informado'}\n\n`;
    }

    if (data.projectTypes.includes('video_animation')) {
        content += "========================================\n";
        content += "BRIEFING DE VÍDEO / ANIMAÇÃO\n";
        content += "========================================\n";
        content += `Tipos de Vídeo: ${data.videoTypes.join(', ')}${data.videoTypes.includes('outro') ? ` - ${data.otherVideoType}` : ''}\n`;
        content += `Duração Estimada: ${data.videoDuration || 'Não informado'}\n`;
        content += `Links de Estilo: ${data.videoStyleLinks || 'Não informado'}\n`;
        content += `Status do Roteiro: ${data.videoScriptStatus || 'Não informado'}\n`;
        content += `Status dos Assets: ${data.videoAssetsStatus || 'Não informado'}\n`;
        content += `Necessidade de Locução: ${data.videoNarration || 'Não informado'}\n`;
        content += `Necessidade de Legendas: ${data.videoSubtitles || 'Não informado'}\n`;
        content += `Onde será veiculado: ${data.videoDistribution.join(', ')}${data.videoDistribution.includes('outro') ? ` - ${data.otherVideoDistribution}` : ''}\n\n`;
    }

    if (data.projectTypes.includes('website')) {
        content += "========================================\n";
        content += "BRIEFING DE WEBSITE\n";
        content += "========================================\n";
        content += `Objetivos do Site: ${data.websiteObjectives.join(', ')}${data.websiteObjectives.includes('outro') ? ` - ${data.otherWebsiteObjective}` : ''}\n`;
        content += `Principal Ação do Usuário: ${data.mainUserAction || 'Não informado'}\n`;
        content += `Possui Domínio: ${data.hasDomain || 'Não informado'}\n`;
        content += `Possui Hospedagem: ${data.hasHosting || 'Não informado'}\n`;
        content += `Seções/Páginas: ${data.websiteSections || 'Não informado'}\n`;
        content += `Funcionalidades Específicas: ${data.specificFunctionality || 'Não informado'}\n`;
        content += `Sites de Referência (Gosta/Não Gosta): ${data.likedWebsites || 'Não informado'}\n`;
        content += `Fornecedor do Conteúdo: ${data.contentProvider || 'Não informado'}\n\n`;
    }

    content += "========================================\n";
    content += "MARKETING DIGITAL\n";
    content += "========================================\n";
    content += `Estratégia Atual: ${data.digitalMarketingStrategy || 'Não informado'}\n`;
    content += `Importância de SEO: ${data.seoImportance || 'Não informado'}\n`;
    content += `Investimento em Tráfego Pago: ${data.paidTraffic || 'Não informado'}\n`;
    content += `Redes Sociais: ${data.socialMedia || 'Não informado'}\n\n`;

    content += "========================================\n";
    content += "INFORMAÇÕES ADICIONAIS\n";
    content += "========================================\n";
    content += `Informações Extras: ${data.additionalInfo || 'Não informado'}\n`;
    content += `Como nos Encontrou: ${data.howFound || 'Não informado'}\n`;

    return content;
};

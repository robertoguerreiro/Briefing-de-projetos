import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { FormData } from '../types';

export const generatePdf = (data: FormData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Briefing do Projeto: ${data.projectName || 'Não especificado'}`, pageWidth / 2, y, { align: 'center' });
    y += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const submissionDate = data.submission_date ? new Date(data.submission_date).toLocaleDateString('pt-BR') : 'Data não disponível';
    doc.text(`Data de Envio: ${submissionDate}`, pageWidth / 2, y, { align: 'center' });
    y += 10;

    const sections: { title: string; fields: { label: string; value: string | string[] }[] }[] = [];

    // Contact Info
    sections.push({
        title: 'INFORMAÇÕES DE CONTATO',
        fields: [
            { label: 'Nome Completo', value: data.fullName },
            { label: 'Email', value: data.email },
            { label: 'Telefone/WhatsApp', value: data.phone },
            { label: 'Empresa', value: data.company },
            { label: 'Cargo/Função', value: data.role },
        ],
    });

    // Project Type
    sections.push({
        title: 'TIPO DE PROJETO',
        fields: [{ label: 'Tipos', value: data.projectTypes.join(', ') }],
    });

    // General Project Info
    sections.push({
        title: 'SOBRE O PROJETO (GERAL)',
        fields: [
            { label: 'Nome do Projeto', value: data.projectName },
            { label: 'Resumo', value: data.projectSummary },
            { label: 'Principais Objetivos', value: data.projectObjectives },
            { label: 'Público Principal', value: data.targetAudience },
            { label: 'Problema a ser Resolvido', value: data.problemToSolve },
            { label: 'Principais Diferenciais', value: data.keyDifferentiators },
            { label: 'Prazo Ideal', value: data.deadline ? new Date(data.deadline).toLocaleDateString('pt-BR') : '' },
            { label: 'Faixa de Orçamento', value: data.budget },
        ],
    });

    // Brand Briefing
    if (data.projectTypes.includes('branding_visual')) {
        sections.push({
            title: 'BRIEFING DE MARCA',
            fields: [
                { label: 'Possui Logotipo', value: data.hasLogo },
                { label: 'Possui Manual da Marca', value: data.hasBrandManual },
                { label: 'Estilos Visuais', value: `${data.visualStyles.join(', ')}${data.visualStyles.includes('outro') ? ` - ${data.otherStyle}` : ''}` },
                { label: 'Preferências de Cores', value: data.colorPreferences },
                { label: 'Preferências de Fontes', value: data.fontPreferences },
                { label: 'Possui Slogan', value: data.hasSlogan },
                { label: 'Valores e Personalidade', value: data.brandValues },
                { label: 'Detalhes do Público-Alvo da Marca', value: data.brandAudienceDetails },
                { label: 'Concorrentes/Marcas Admiradas', value: data.competitors },
                { label: 'Referências Visuais', value: data.visualReferences },
                { label: 'O que NÃO gostaria', value: data.visualDislikes },
            ],
        });
    }

    // Video Briefing
    if (data.projectTypes.includes('video_animation')) {
        sections.push({
            title: 'BRIEFING DE VÍDEO / ANIMAÇÃO',
            fields: [
                { label: 'Tipos de Vídeo', value: `${data.videoTypes.join(', ')}${data.videoTypes.includes('outro') ? ` - ${data.otherVideoType}` : ''}` },
                { label: 'Duração Estimada', value: data.videoDuration },
                { label: 'Links de Estilo', value: data.videoStyleLinks },
                { label: 'Status do Roteiro', value: data.videoScriptStatus },
                { label: 'Status dos Assets', value: data.videoAssetsStatus },
                { label: 'Necessidade de Locução', value: data.videoNarration },
                { label: 'Necessidade de Legendas', value: data.videoSubtitles },
                { label: 'Onde será veiculado', value: `${data.videoDistribution.join(', ')}${data.videoDistribution.includes('outro') ? ` - ${data.otherVideoDistribution}` : ''}` },
            ],
        });
    }

    // Website Briefing
    if (data.projectTypes.includes('website')) {
        sections.push({
            title: 'BRIEFING DE WEBSITE',
            fields: [
                { label: 'Objetivos do Site', value: `${data.websiteObjectives.join(', ')}${data.websiteObjectives.includes('outro') ? ` - ${data.otherWebsiteObjective}` : ''}` },
                { label: 'Principal Ação do Usuário', value: data.mainUserAction },
                { label: 'Possui Domínio', value: data.hasDomain },
                { label: 'Possui Hospedagem', value: data.hasHosting },
                { label: 'Seções/Páginas', value: data.websiteSections },
                { label: 'Funcionalidades Específicas', value: data.specificFunctionality },
                { label: 'Sites de Referência (Gosta/Não Gosta)', value: data.likedWebsites },
                { label: 'Fornecedor do Conteúdo', value: data.contentProvider },
            ],
        });
    }
    
    // Digital Marketing
    sections.push({
        title: 'MARKETING DIGITAL',
        fields: [
            { label: 'Estratégia Atual', value: data.digitalMarketingStrategy },
            { label: 'Importância de SEO', value: data.seoImportance },
            { label: 'Investimento em Tráfego Pago', value: data.paidTraffic },
            { label: 'Redes Sociais', value: data.socialMedia },
        ],
    });

    // Additional Info
    sections.push({
        title: 'INFORMAÇÕES ADICIONAIS',
        fields: [
            { label: 'Informações Extras', value: data.additionalInfo },
            { label: 'Como nos Encontrou', value: data.howFound },
        ],
    });

    const body = sections.flatMap(section => {
        const titleRow: any = [{ content: section.title, colSpan: 2, styles: { fontStyle: 'bold', fillColor: [230, 230, 230], textColor: [0, 0, 0], halign: 'center' } }];
        const fieldRows = section.fields
            .filter(field => field.value && field.value.length > 0)
            .map(field => [field.label, Array.isArray(field.value) ? field.value.join(', ') : field.value]);
        
        if (fieldRows.length === 0) {
            return [];
        }
        return [titleRow, ...fieldRows];
    });

    autoTable(doc, {
        startY: y,
        head: [['Campo', 'Resposta']],
        body: body,
        theme: 'grid',
        headStyles: { fillColor: [204, 35, 42] }, // Guerreiro Art red
        styles: {
            cellPadding: 2,
            fontSize: 9,
        },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 50 },
            1: { cellWidth: 'auto' },
        },
    });

    const sanitizedProjectName = (data.projectName || 'projeto').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const sanitizedClientName = (data.fullName || 'cliente').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `briefing_${sanitizedProjectName}_${sanitizedClientName}.pdf`;

    doc.save(fileName);
};

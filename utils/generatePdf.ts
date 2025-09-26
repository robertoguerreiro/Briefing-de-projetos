import jsPDF from 'jspdf';
import { formatBriefing } from './formatBriefing';
import type { FormData } from '../types';

const imageUrl = 'https://warrior.art.br/wp-content/uploads/2023/07/Roberto-Guerreiro-Art-Director-Logo-2.webp';

const fetchImageAsBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const generateBriefingPDF = async (formData: FormData) => {
    try {
        const doc = new jsPDF();
        
        const logoBase64 = await fetchImageAsBase64(imageUrl);
        const imgProps = doc.getImageProperties(logoBase64);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const logoWidth = 50;
        const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
        const x = (pdfWidth - logoWidth) / 2;
        
        doc.addImage(logoBase64, 'WEBP', x, 15, logoWidth, logoHeight);

        const briefingText = formatBriefing(formData);
        
        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(briefingText, pdfWidth - 40);
        doc.text(splitText, 20, 15 + logoHeight + 15);
        
        doc.save(`Briefing-${formData.projectName.replace(/\s+/g, '_') || 'Projeto'}.pdf`);

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Não foi possível gerar o PDF. Verifique a conexão com a internet ou tente novamente.");
    }
};

// Assuming jsPDF is available in the project's dependencies
import { jsPDF } from 'jspdf';
import type { FormData } from '../types';
import { formatBriefing } from './formatBriefing';
import { logoBase64 } from './logoBase64';

export const generatePdf = (data: FormData) => {
    const doc = new jsPDF();

    // Add header with logo
    try {
      if (logoBase64 && logoBase64.startsWith('data:image')) {
        doc.addImage(logoBase64, 'PNG', 14, 10, 30, 10); // smaller logo
      }
    } catch (e) {
      console.error("Error adding logo to PDF:", e);
    }
    
    doc.setFontSize(20);
    doc.text(`Briefing de Projeto`, 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(data.projectName || 'Sem Título', 105, 28, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(14, 35, 196, 35);

    const margin = 14;
    const usableWidth = doc.internal.pageSize.getWidth() - (margin * 2);
    let yPos = 45;

    const checkPageBreak = (height: number) => {
        if (yPos + height > doc.internal.pageSize.getHeight() - 15) {
            doc.addPage();
            yPos = 20;
        }
    };

    const briefingText = formatBriefing(data);
    const sections = briefingText.split("========================================").filter(s => s.trim());

    sections.forEach(section => {
        const lines = section.trim().split('\n');
        const title = lines.shift()?.trim() || '';
        const content = lines.join('\n').trim();

        checkPageBreak(10);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(title, margin, yPos);
        yPos += 7;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const splitContent = doc.splitTextToSize(content, usableWidth);
        
        checkPageBreak(splitContent.length * 5);
        doc.text(splitContent, margin, yPos);
        yPos += (splitContent.length * 5) + 5; // Add some space after section
    });

    const safeFileName = (data.projectName || data.fullName || 'briefing').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(`Briefing-${safeFileName}.pdf`);
};

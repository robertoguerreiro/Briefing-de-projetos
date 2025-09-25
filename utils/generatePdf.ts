import type { FormData } from '../types';
import { generateBriefingBody } from './formatBriefing';

/**
 * Generates a printable HTML page for the briefing and opens the print dialog.
 * This allows users to save as PDF or print directly.
 * @param data - The form data for the briefing, including the ID.
 */
export const generatePdf = (data: FormData): void => {
    const briefingText = generateBriefingBody(data);
    const companyName = data.company || data.fullName;
    const projectName = data.projectName || 'Briefing de Projeto';

    const printableContent = `
        <html>
            <head>
                <title>Briefing - ${projectName}</title>
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                        line-height: 1.6; 
                        color: #333;
                        margin: 2rem;
                    }
                    h1, h2, h3 { 
                        color: #D33434;
                        padding-bottom: 10px;
                    }
                     h1 {
                        border-bottom: 2px solid #eee;
                     }
                    h2 {
                        font-size: 1.2rem;
                        color: #333;
                        margin-top: -10px;
                    }
                    h3 {
                        font-size: 1rem;
                        color: #555;
                        font-weight: normal;
                        margin-top: -15px;
                        margin-bottom: 20px;
                    }
                    pre { 
                        white-space: pre-wrap; 
                        background-color: #f8f8f8; 
                        padding: 15px; 
                        border-radius: 5px; 
                        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
                        font-size: 0.9rem;
                        border: 1px solid #ddd;
                    }
                </style>
            </head>
            <body>
                <h1>Briefing de Projeto: ${projectName}</h1>
                <h3>ID do Projeto: ${data.id}</h3>
                <h2>Cliente: ${companyName} (${data.email})</h2>
                <hr style="border: 0; border-top: 1px solid #eee; margin-bottom: 20px;" />
                <pre>${briefingText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
            </body>
        </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(printableContent);
        printWindow.document.close();
        printWindow.focus();
        // A slight delay helps ensure content is loaded before print dialog opens
        setTimeout(() => {
            printWindow.print();
        }, 500);
    } else {
        alert('Por favor, habilite pop-ups para imprimir ou baixar o briefing.');
    }
};
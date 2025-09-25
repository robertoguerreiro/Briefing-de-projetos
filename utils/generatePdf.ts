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
                <title>Briefing - ${projectName} (ID: ${data.id})</title>
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                        line-height: 1.6; 
                        color: #333;
                        margin: 2rem;
                    }
                    h1, h2 { 
                        color: #D33434;
                        padding-bottom: 10px;
                    }
                     h1 {
                        border-bottom: 2px solid #eee;
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                     }
                    h1 .project-id {
                        font-size: 0.6em; 
                        color: #666; 
                        font-weight: normal;
                    }
                    h2 {
                        font-size: 1.2rem;
                        color: #333;
                        margin-top: -10px;
                        margin-bottom: 20px;
                    }
                    .briefing-content p {
                        margin: 0.5rem 0;
                        font-size: 0.95rem;
                    }
                    .briefing-content strong {
                        color: #111;
                    }
                </style>
            </head>
            <body>
                <h1>
                    <span>Briefing de Projeto: ${projectName}</span>
                    <span class="project-id">ID: ${data.id}</span>
                </h1>
                <h2>Cliente: ${companyName} (${data.email})</h2>
                <div class="briefing-content">${briefingText}</div>
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

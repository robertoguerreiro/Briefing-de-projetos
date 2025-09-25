import type { FormData } from '../types';

// O caminho para o seu script de API.
// Este caminho é relativo à localização do seu index.html.
const API_ENDPOINT = 'api/save-briefing.php';

interface ApiResponse {
    success: boolean;
    error?: string;
}

export const saveBriefing = async (data: Omit<FormData, 'id'>): Promise<ApiResponse> => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();
        return result;

    } catch (error) {
        console.error('Falha ao enviar o briefing para a API:', error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Um erro inesperado ocorreu.' };
    }
};

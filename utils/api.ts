import type { FormData } from '../types';

const SAVE_API_ENDPOINT = 'api/save-briefing.php';
const GET_API_ENDPOINT = 'api/get-briefings.php';
const DELETE_API_ENDPOINT = 'api/delete-briefing.php';

interface SaveApiResponse {
    success: boolean;
    error?: string;
}

interface GetApiResponse {
    success: boolean;
    briefings?: FormData[];
    error?: string;
}

interface DeleteApiResponse {
    success: boolean;
    error?: string;
}

export const saveBriefing = async (data: Omit<FormData, 'id' | 'submission_date'>): Promise<SaveApiResponse> => {
    try {
        const response = await fetch(SAVE_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro na rede: ${response.statusText} - ${errorText}`);
        }

        const result: SaveApiResponse = await response.json();
        return result;

    } catch (error) {
        console.error('Falha ao enviar o briefing para a API:', error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Um erro inesperado ocorreu.' };
    }
};

export const getBriefings = async (): Promise<GetApiResponse> => {
     try {
        const response = await fetch(GET_API_ENDPOINT);
        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.statusText}`);
        }
        const result: GetApiResponse = await response.json();
        return result;
    } catch (error) {
        console.error('Falha ao buscar briefings da API:', error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Um erro inesperado ocorreu.' };
    }
};

export const deleteBriefing = async (id: number | string): Promise<DeleteApiResponse> => {
    try {
        const response = await fetch(DELETE_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.statusText}`);
        }

        const result: DeleteApiResponse = await response.json();
        return result;

    } catch (error) {
        console.error('Falha ao excluir briefing via API:', error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Um erro inesperado ocorreu.' };
    }
};

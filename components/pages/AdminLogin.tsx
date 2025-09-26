import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

interface AdminLoginProps {
    onLoginSuccess: () => void;
    onBackToHome: () => void;
}

const MASTER_PASSWORD = "003GuerreiroArt$";

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToHome }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isChecking, setIsChecking] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsChecking(true);
        setError('');

        // Simple direct comparison for reliability
        setTimeout(() => {
            if (password === MASTER_PASSWORD) {
                onLoginSuccess();
            } else {
                setError('Senha mestra incorreta.');
            }
            setIsChecking(false);
        }, 300); // Simulate a small delay
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <Header />
            <main className="flex flex-grow items-center justify-center">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                     <div className="mb-6 flex">
                        <button
                            type="button"
                            onClick={onBackToHome}
                            className="flex items-center gap-2 rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            aria-label="Voltar para a página inicial"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Voltar
                        </button>
                    </div>
                    <h2 className="mb-6 text-center text-3xl font-bold text-slate-800">Acesso Administrativo</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password-admin" className="block text-sm font-bold text-slate-600">
                                Senha Mestra
                            </label>
                            <input
                                type="password"
                                id="password-admin"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-slate-300 bg-slate-50 py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Digite a senha..."
                                disabled={isChecking}
                            />
                        </div>

                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                disabled={isChecking}
                                className="w-full rounded-md bg-red-600 py-3 px-4 text-lg font-semibold text-white shadow-md transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-red-800"
                            >
                                {isChecking ? 'Verificando...' : 'Entrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

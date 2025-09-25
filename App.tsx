import React, { useState } from 'react';
import { HomePage } from './components/pages/HomePage';
import { BriefingForm } from './components/BriefingForm';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { AdminLogin } from './components/pages/AdminLogin';

const App: React.FC = () => {
    const [page, setPage] = useState<'home' | 'briefing' | 'admin'>('home');
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    const navigate = (targetPage: 'home' | 'briefing' | 'admin') => {
        setPage(targetPage);
    };

    const handleLoginSuccess = () => {
        setIsAdminAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAdminAuthenticated(false);
        setPage('home');
    }

    const renderPage = () => {
        switch (page) {
            case 'briefing':
                return <BriefingForm onBackToHome={() => navigate('home')} />;
            case 'admin':
                return isAdminAuthenticated 
                    ? <AdminDashboard onBackToHome={() => navigate('home')} onLogout={handleLogout} /> 
                    : <AdminLogin onLoginSuccess={handleLoginSuccess} onBackToHome={() => navigate('home')} />;
            case 'home':
            default:
                return <HomePage onNavigate={navigate} />;
        }
    };

    return (
        <div className="font-sans text-slate-800">
            {renderPage()}
        </div>
    );
};

export default App;

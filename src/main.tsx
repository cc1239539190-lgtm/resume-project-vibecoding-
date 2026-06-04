import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ResumeProvider } from './context/ResumeContext';
import { registerTemplate } from './templates/TemplateRegistry';
import ModernTemplate from './templates/modern/ModernTemplate';

// 注册模板
registerTemplate({
    id: 'modern',
    name: '现代简约',
    render: (data) => <ModernTemplate data={data} />,
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ResumeProvider>
            <App />
        </ResumeProvider>
    </StrictMode>,
);


import React from 'react';

interface TextInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: 'text' | 'email' | 'tel' | 'date';
    required?: boolean;
    optional?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ label, name, value, onChange, placeholder, type = 'text', required = false, optional = false }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-bold text-slate-400">
                {label}
                {required && <span className="text-red-500"> *</span>}
                {optional && <span className="text-xs text-slate-500"> (Opcional)</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="mt-1 block w-full rounded-md border-slate-600 bg-slate-800 py-3 px-4 text-slate-100 shadow-sm placeholder:text-slate-400 [&:not(:placeholder-shown)]:border-blue-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
        </div>
    );
};
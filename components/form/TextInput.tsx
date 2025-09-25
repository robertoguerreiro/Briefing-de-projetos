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
            <label htmlFor={name} className="block text-sm font-bold text-slate-600">
                {label}
                {required && <span className="text-red-500"> *</span>}
                {optional && <span className="text-xs text-slate-400"> (Opcional)</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="mt-1 block w-full rounded-md border-slate-300 bg-slate-50 py-3 px-4 shadow-sm [&:not(:placeholder-shown)]:border-blue-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
        </div>
    );
};
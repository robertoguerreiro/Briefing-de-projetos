
import React from 'react';

interface TextAreaInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    rows?: number;
    required?: boolean;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, name, value, onChange, placeholder, rows = 4, required = false }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-bold text-slate-400">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows={rows}
                className="mt-1 block w-full rounded-md border-slate-600 bg-slate-800 py-3 px-4 text-slate-100 shadow-sm placeholder:text-slate-400 [&:not(:placeholder-shown)]:border-blue-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
        </div>
    );
};
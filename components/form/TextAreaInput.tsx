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
            <label htmlFor={name} className="block text-sm font-bold text-slate-600">
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
                className="mt-1 block w-full rounded-md border-slate-300 bg-slate-50 py-3 px-4 shadow-sm [&:not(:placeholder-shown)]:border-blue-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
        </div>
    );
};
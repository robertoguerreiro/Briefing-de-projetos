import React from 'react';

interface SelectInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    required?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({ label, name, value, onChange, options, required = false }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-bold text-slate-600">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="mt-1 block w-full rounded-md border-slate-300 bg-slate-50 py-3 pl-4 pr-10 text-base shadow-sm valid:border-blue-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
                <option value="" disabled>Selecione...</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};
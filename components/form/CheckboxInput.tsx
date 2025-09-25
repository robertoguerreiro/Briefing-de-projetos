
import React from 'react';

interface CheckboxInputProps {
    label: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, name, value, checked, onChange }) => {
    return (
        <label className="flex cursor-pointer items-center gap-3 rounded-md bg-slate-800 p-4 transition-all hover:bg-slate-700 has-[:checked]:bg-slate-700 has-[:checked]:ring-2 has-[:checked]:ring-red-500">
            <input
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="h-5 w-5 rounded border-red-600 text-red-600 focus:ring-red-500"
            />
            <span className="font-medium text-slate-300">{label}</span>
        </label>
    );
};
import React from 'react';

interface RadioOption {
    value: string;
    label: string;
}

interface RadioGroupProps {
    legend: string;
    name: string;
    selectedValue: string;
    onChange: (name: string, value: string) => void;
    options: RadioOption[];
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ legend, name, selectedValue, onChange, options }) => {
    return (
        <fieldset>
            <legend className="block text-sm font-bold text-slate-600">{legend}</legend>
            <div className="mt-2 space-y-2">
                {options.map(option => (
                    <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-md bg-slate-50 p-3 transition-all hover:bg-slate-100 has-[:checked]:bg-red-50 has-[:checked]:ring-2 has-[:checked]:ring-red-500">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={() => onChange(name, option.value)}
                            className="h-4 w-4 border-red-600 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm font-medium text-slate-700">{option.label}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
};
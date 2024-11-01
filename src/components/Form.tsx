import { useState, FormEvent } from 'react';
import { z } from 'zod';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validation?: z.ZodType<any>;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel: string;
}

export default function Form({ fields, onSubmit, submitLabel }: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.validation) {
        try {
          field.validation.parse(formData[field.name]);
        } catch (error) {
          if (error instanceof z.ZodError) {
            newErrors[field.name] = error.errors[0].message;
          }
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-warhammer-700"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) =>
              setFormData({ ...formData, [field.name]: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-warhammer-300 shadow-sm focus:border-warhammer-500 focus:ring-warhammer-500 sm:text-sm"
          />
          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full rounded-md bg-warhammer-600 px-4 py-2 text-white hover:bg-warhammer-700 focus:outline-none focus:ring-2 focus:ring-warhammer-500 focus:ring-offset-2"
      >
        {submitLabel}
      </button>
    </form>
  );
}
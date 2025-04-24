'use client';

import { useState } from 'react';
import { useBookingTheme } from '@/contexts/BookingThemeContext';

interface UserInfoFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
  }) => void;
}

export default function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const { theme } = useBookingTheme();

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Prosím vyplňte jméno';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Prosím vyplňte email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Prosím zadejte platný email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Prosím vyplňte telefon';
    } else if (!/^(\+420)?\s*[0-9]{3}\s*[0-9]{3}\s*[0-9]{3}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Prosím zadejte platné telefonní číslo';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Format phone number
      const formattedPhone = formData.phone.replace(/\s/g, '');
      const finalPhone = formattedPhone.startsWith('+420') ? formattedPhone : `+420${formattedPhone}`;
      
      onSubmit({
        ...formData,
        phone: finalPhone
      });
    }
  };

  const inputStyles = {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.normal,
    width: '100%',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: theme.inputStyle.borderColor,
    backgroundColor: theme.inputStyle.backgroundColor,
    color: theme.textColor,
    borderRadius: theme.borderRadius,
    padding: theme.inputStyle.padding
  };

  const labelStyles = {
    color: theme.textColor,
    fontFamily: theme.headingFontFamily,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.bold,
  };

  const buttonStyles = {
    backgroundColor: theme.primaryColor,
    color: '#FFFFFF',
    padding: theme.buttonStyle.padding,
    borderRadius: theme.buttonStyle.borderRadius,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: theme.fontWeight.medium
  };

  const errorStyles = {
    color: theme.errorColor,
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.medium,
    marginTop: theme.spacing.small,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" style={{ fontFamily: theme.fontFamily }}>
      <div>
        <label htmlFor="name" className="block mb-2" style={labelStyles}>
          Jméno a příjmení
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          style={{
            ...inputStyles,
            borderColor: errors.name ? theme.errorColor : theme.inputStyle.borderColor,
          }}
          placeholder="Jan Novák"
        />
        {errors.name && (
          <p style={errorStyles}>{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-2" style={labelStyles}>
          E-mail
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          style={{
            ...inputStyles,
            borderColor: errors.email ? theme.errorColor : theme.inputStyle.borderColor,
          }}
          placeholder="jan@example.com"
        />
        {errors.email && (
          <p style={errorStyles}>{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block mb-2" style={labelStyles}>
          Telefon
        </label>
        <div className="relative">
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            style={{
              ...inputStyles,
              borderColor: errors.phone ? theme.errorColor : theme.inputStyle.borderColor,
            }}
            placeholder="+420 777 888 999"
          />
        </div>
        {errors.phone && (
          <p style={errorStyles}>{errors.phone}</p>
        )}
        <p style={{
          ...errorStyles,
          color: theme.textColor,
          opacity: 0.7,
        }}>
          Na toto číslo vám zašleme SMS s potvrzením rezervace
        </p>
      </div>

      <button
        type="submit"
        style={buttonStyles}
        className={`hover:${theme.buttonStyle.hoverEffect === 'brightness' ? 'brightness-90' : 'opacity-90'} transition-all`}
      >
        <span>Dokončit rezervaci</span>
        <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
} 
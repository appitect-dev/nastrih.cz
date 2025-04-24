"use client";

import React, { createContext, useContext, useState } from 'react';

interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  errorColor: string;
  successColor: string;
  warningColor: string;
  borderRadius: string;
  buttonStyle: {
    hoverEffect: 'brightness' | 'opacity';
    padding: string;
    borderRadius: string;
  };
  inputStyle: {
    backgroundColor: string;
    borderColor: string;
    padding: string;
  };
  fontFamily: string;
  headingFontFamily: string;
  fontSize: {
    small: string;
    base: string;
    large: string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    bold: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  boxShadow: string;
}

const defaultTheme: Theme = {
  primaryColor: '#8B4513',
  secondaryColor: '#D2691E',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
  errorColor: '#DC2626',
  successColor: '#059669',
  warningColor: '#D97706',
  borderRadius: '0.75rem',
  buttonStyle: {
    hoverEffect: 'brightness',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem'
  },
  inputStyle: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    padding: '0.75rem'
  },
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter, system-ui, sans-serif',
  fontSize: {
    small: '0.875rem',
    base: '1rem',
    large: '1.125rem'
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    bold: '700'
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem'
  },
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
};

interface BookingThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const BookingThemeContext = createContext<BookingThemeContextType | undefined>(undefined);

export function BookingThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  return (
    <BookingThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </BookingThemeContext.Provider>
  );
}

export function useBookingTheme() {
  const context = useContext(BookingThemeContext);
  if (context === undefined) {
    throw new Error('useBookingTheme must be used within a BookingThemeProvider');
  }
  return context;
} 
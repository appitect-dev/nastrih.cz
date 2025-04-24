'use client';

import { useBookingTheme } from '@/contexts/BookingThemeContext';
import { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

type ColorKey = 'primaryColor' | 'secondaryColor' | 'backgroundColor' | 'textColor' | 'errorColor' | 'successColor' | 'warningColor';

interface GoogleFont {
  family: string;
  variants: string[];
  category: string;
}

interface StyleOption {
  label: string;
  key: string;
  options?: Array<{ label: string; value: string }>;
  customInput?: boolean;
  render?: () => JSX.Element;
}

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeCustomizer({ isOpen, onClose }: ThemeCustomizerProps) {
  const { theme, setTheme } = useBookingTheme();
  const [activeColor, setActiveColor] = useState<ColorKey | null>(null);
  const [fontSearch, setFontSearch] = useState('');

  const commonFonts = [
    { family: 'Inter', category: 'sans-serif' },
    { family: 'Roboto', category: 'sans-serif' },
    { family: 'Open Sans', category: 'sans-serif' },
    { family: 'Montserrat', category: 'sans-serif' },
    { family: 'Lato', category: 'sans-serif' },
    { family: 'Poppins', category: 'sans-serif' },
    { family: 'Source Sans Pro', category: 'sans-serif' },
    { family: 'Playfair Display', category: 'serif' },
    { family: 'Merriweather', category: 'serif' },
    { family: 'Outfit', category: 'sans-serif' }
  ];

  // Load selected Google Font
  useEffect(() => {
    if (theme.fontFamily) {
      const fontName = theme.fontFamily.split(',')[0].trim();
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, [theme.fontFamily]);

  const filteredFonts = commonFonts.filter(font => 
    font.family.toLowerCase().includes(fontSearch.toLowerCase())
  );

  const handleColorChange = (color: string) => {
    if (!activeColor) return;
    
    setTheme(prev => ({
      ...prev,
      [activeColor]: color
    }));
  };

  const colorOptions: Array<{ label: string; key: ColorKey }> = [
    { label: 'Primary Color', key: 'primaryColor' },
    { label: 'Secondary Color', key: 'secondaryColor' },
    { label: 'Background Color', key: 'backgroundColor' },
    { label: 'Text Color', key: 'textColor' },
    { label: 'Error Color', key: 'errorColor' },
    { label: 'Success Color', key: 'successColor' },
    { label: 'Warning Color', key: 'warningColor' },
  ];

  const styleOptions: StyleOption[] = [
    { 
      label: 'Border Radius',
      key: 'borderRadius',
      options: [
        { label: 'None', value: '0' },
        { label: 'Small', value: '0.25rem' },
        { label: 'Medium', value: '0.5rem' },
        { label: 'Large', value: '0.75rem' },
        { label: 'Extra Large', value: '1rem' },
        { label: 'Full', value: '9999px' },
      ]
    },
    {
      label: 'Button Hover Effect',
      key: 'buttonStyle.hoverEffect',
      options: [
        { label: 'Brighten', value: 'brightness' },
        { label: 'Fade', value: 'opacity' },
      ]
    },
    {
      label: 'Font',
      key: 'fontFamily',
      customInput: true,
      render: () => (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Search fonts..."
            value={fontSearch}
            onChange={(e) => setFontSearch(e.target.value)}
            className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300"
          />
          <select
            value={theme.fontFamily?.split(',')[0] || ''}
            onChange={(e) => {
              const selectedFont = commonFonts.find(f => f.family === e.target.value);
              if (selectedFont) {
                const fontValue = `${selectedFont.family}, ${selectedFont.category}`;
                setTheme(prev => ({
                  ...prev,
                  fontFamily: fontValue,
                  headingFontFamily: fontValue
                }));
              }
            }}
            className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300"
          >
            <option value="">Select a font...</option>
            {filteredFonts.map(font => (
              <option 
                key={font.family} 
                value={font.family}
                style={{ fontFamily: font.family }}
              >
                {font.family}
              </option>
            ))}
          </select>
        </div>
      )
    },
    {
      label: 'Text Size',
      key: 'fontSize.base',
      options: [
        { label: 'Small', value: '0.875rem' },
        { label: 'Medium', value: '1rem' },
        { label: 'Large', value: '1.125rem' },
      ]
    }
  ] as const;

  const handleStyleChange = (key: string, value: string) => {
    setTheme(prev => {
      const newTheme = { ...prev };
      if (key.includes('.')) {
        const [parent, child] = key.split('.');
        const parentKey = parent as keyof typeof theme;
        
        if (parent === 'buttonStyle') {
          newTheme.buttonStyle = {
            ...theme.buttonStyle,
            [child]: value
          };
        } else if (parent === 'inputStyle') {
          newTheme.inputStyle = {
            ...theme.inputStyle,
            [child]: value
          };
        } else if (parent === 'fontSize') {
          newTheme.fontSize = {
            ...theme.fontSize,
            [child]: value
          };
        } else if (parent === 'fontWeight') {
          newTheme.fontWeight = {
            ...theme.fontWeight,
            [child]: value
          };
        } else if (parent === 'spacing') {
          newTheme.spacing = {
            ...theme.spacing,
            [child]: value
          };
        }
      } else {
        (newTheme as any)[key] = value;
      }
      return newTheme;
    });
  };

  const resetTheme = () => {
    const defaultTheme = {
      primaryColor: '#8B4513',
      secondaryColor: '#D2691E',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      errorColor: '#DC2626',
      successColor: '#059669',
      warningColor: '#D97706',
      borderRadius: '0.75rem',
      buttonStyle: {
        hoverEffect: 'brightness' as const,
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        transition: 'all 0.2s ease-in-out'
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
    } as const;
    setTheme(defaultTheme);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl p-6 overflow-y-auto" data-theme-exclude="true">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Theme Customizer</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3 text-gray-900">Colors</h3>
          <div className="grid grid-cols-2 gap-3">
            {colorOptions.map(({ label, key }) => (
              <button
                key={key}
                onClick={() => setActiveColor(key)}
                className="flex items-center space-x-3 p-2 rounded hover:bg-gray-100"
              >
                <div
                  className="w-8 h-8 border-2 rounded-full flex-shrink-0 shadow-sm"
                  style={{ 
                    backgroundColor: theme[key],
                    borderColor: key === 'backgroundColor' ? '#E5E7EB' : theme[key]
                  }}
                />
                <span className="text-sm text-gray-700">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeColor && (
          <div>
            <h3 className="font-medium mb-3 text-gray-900">Color Picker</h3>
            <HexColorPicker
              color={theme[activeColor]}
              onChange={handleColorChange}
              className="w-full"
            />
          </div>
        )}

        <div>
          <h3 className="font-medium mb-3 text-gray-900">Styles</h3>
          <div className="space-y-4">
            {styleOptions.map(({ label, key, options, customInput, render }) => (
              <div key={key}>
                <label className="block text-sm mb-1 text-gray-700">{label}</label>
                {customInput && render ? render() : (
                  <select
                    value={key.includes('.') ? 
                      (theme[key.split('.')[0] as keyof typeof theme] as any)[key.split('.')[1]] : 
                      (theme as any)[key]
                    }
                    onChange={(e) => handleStyleChange(key, e.target.value)}
                    className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300"
                  >
                    {options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={resetTheme}
          className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}
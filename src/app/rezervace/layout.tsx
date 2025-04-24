"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SwatchIcon } from "@heroicons/react/24/outline";
import { default as ThemeCustomizer } from '@/components/ThemeCustomizer';
import { BookingThemeProvider, useBookingTheme } from "@/contexts/BookingThemeContext";
import { CheckIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';
import Link from 'next/link';

interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  errorColor: string;
  successColor: string;
  warningColor: string;
  borderRadius: string;
  animation: {
    duration: string;
    easing: string;
  };
  buttonStyle: {
    hoverEffect: 'brightness' | 'opacity';
  };
}

interface BookingSummary {
  service?: {
    name: string;
    price: string;
    duration: number;
  };
  barber?: {
    name: string;
  };
  date?: string;
  time?: string;
}

interface Step {
  id: string;
  name: string;
  href: string;
  status: 'complete' | 'current' | 'upcoming';
}

const initialSteps: Step[] = [
  { id: '01', name: 'Služby', href: '/rezervace', status: 'complete' },
  { id: '02', name: 'Termín', href: '/rezervace/termin', status: 'current' },
  { id: '03', name: 'Kontakt', href: '/rezervace/kontakt', status: 'upcoming' },
  { id: '04', name: 'Dokončení', href: '/rezervace/dokonceni', status: 'upcoming' },
];

interface BookingLayoutContentProps {
  children: ReactNode;
}

function BookingLayoutContent({ children }: BookingLayoutContentProps) {
  const pathname = usePathname();
  const { theme } = useBookingTheme();
  const [isCustomizing, setIsCustomizing] = useState(false);

  const steps = [
    { href: '/rezervace/sluzby', label: 'Služby' },
    { href: '/rezervace/termin', label: 'Termín' },
    { href: '/rezervace/shrnuti', label: 'Shrnutí' },
  ];

  const currentStepIndex = steps.findIndex(step => step.href === pathname);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.backgroundColor }}>
      <nav className="border-b" style={{ borderColor: theme.inputStyle.borderColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex space-x-8">
                {steps.map((step, index) => {
                  const isCurrent = step.href === pathname;
                  const isCompleted = index < currentStepIndex;
                  
                  return (
                    <Link
                      key={step.href}
                      href={step.href}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium
                        ${isCurrent 
                          ? 'border-b-2 text-gray-900'
                          : isCompleted
                            ? 'hover:border-gray-300'
                            : 'cursor-not-allowed'
                        }`}
                      style={{
                        borderColor: isCurrent ? theme.primaryColor : 'transparent',
                        color: isCurrent ? theme.textColor : 
                               isCompleted ? theme.textColor : 
                               `${theme.textColor}80`
                      }}
                      onClick={e => {
                        if (!isCompleted && !isCurrent) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <span className="flex items-center">
                        {isCompleted && (
                          <CheckIcon className="w-5 h-5 mr-2" style={{ color: theme.primaryColor }} />
                        )}
                        {step.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <div data-theme-exclude="true">
        {isCustomizing ? (
          <ThemeCustomizer isOpen={isCustomizing} onClose={() => setIsCustomizing(false)} />
        ) : (
          <button
            onClick={() => setIsCustomizing(true)}
            className="fixed bottom-4 right-4 text-white px-4 py-2 shadow-lg hover:bg-amber-700 transition-colors"
            style={{ 
              backgroundColor: theme.primaryColor,
              borderRadius: theme.borderRadius
            }}
          >
            <SwatchIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookingThemeProvider>
      <BookingLayoutContent>
        {children}
      </BookingLayoutContent>
    </BookingThemeProvider>
  );
} 
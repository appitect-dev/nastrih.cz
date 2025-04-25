'use client';

import { useBookingTheme } from '@/contexts/BookingThemeContext';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useBookingTheme();

  return (
    <>
      <style jsx global>{`
        /* Theme Variables */
        :root {
          --primary-color: ${theme.primaryColor};
          --secondary-color: ${theme.secondaryColor};
          --background-color: ${theme.backgroundColor};
          --text-color: ${theme.textColor};
          --error-color: ${theme.errorColor};
          --success-color: ${theme.successColor};
          --warning-color: ${theme.warningColor};
          --border-radius: ${theme.borderRadius};
          --font-family: ${theme.fontFamily};
          --heading-font-family: ${theme.headingFontFamily};
          --font-size-small: ${theme.fontSize.small};
          --font-size-base: ${theme.fontSize.base};
          --font-size-large: ${theme.fontSize.large};
        }

        /* Apply theme to booking pages only */
        [data-booking-page="true"] {
          background-color: var(--background-color);
          color: var(--text-color);
          font-family: var(--font-family);
          font-size: var(--font-size-base);
        }

        [data-booking-page="true"] h1 {
          font-family: var(--heading-font-family);
          font-size: calc(var(--font-size-base) * 2);
        }

        [data-booking-page="true"] h2 {
          font-family: var(--heading-font-family);
          font-size: calc(var(--font-size-base) * 1.5);
        }

        [data-booking-page="true"] h3 {
          font-family: var(--heading-font-family);
          font-size: calc(var(--font-size-base) * 1.25);
        }

        [data-booking-page="true"] .text-sm,
        [data-booking-page="true"] small {
          font-size: var(--font-size-small);
        }

        [data-booking-page="true"] .text-base {
          font-size: var(--font-size-base);
        }

        [data-booking-page="true"] .text-lg {
          font-size: var(--font-size-large);
        }

        /* Common elements within booking pages */
        [data-booking-page="true"] button:not([data-theme-exclude="true"]),
        [data-booking-page="true"] input:not([data-theme-exclude="true"]),
        [data-booking-page="true"] select:not([data-theme-exclude="true"]),
        [data-booking-page="true"] textarea:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .card:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .rounded:not([data-theme-exclude="true"]),
        [data-booking-page="true"] [class*="rounded-"]:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .btn:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .input:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .select:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .textarea:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .dialog:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .modal:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .dropdown:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .menu:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .popover:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .tooltip:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .alert:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .badge:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .tag:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .avatar:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .image:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .figure:not([data-theme-exclude="true"]),
        [data-booking-page="true"] .thumbnail:not([data-theme-exclude="true"]) {
          border-radius: var(--border-radius);
        }

        /* Button styles */
        [data-booking-page="true"] button:not([data-theme-exclude="true"]) {
          transition: all 0.2s ease-in-out;
          font-size: var(--font-size-base);
        }

        [data-booking-page="true"] button:not([data-theme-exclude="true"]):hover {
          filter: ${theme.buttonStyle.hoverEffect === 'brightness' ? 'brightness(1.1)' : 'none'};
          opacity: ${theme.buttonStyle.hoverEffect === 'opacity' ? '0.9' : '1'};
        }

        /* Form element styles */
        [data-booking-page="true"] input:not([data-theme-exclude="true"]),
        [data-booking-page="true"] select:not([data-theme-exclude="true"]),
        [data-booking-page="true"] textarea:not([data-theme-exclude="true"]) {
          background-color: ${theme.inputStyle.backgroundColor};
          border-color: ${theme.inputStyle.borderColor};
          padding: ${theme.inputStyle.padding};
          color: var(--text-color);
          font-size: var(--font-size-base);
        }

        /* Preserve circular elements */
        .rounded-full,
        [class*="rounded-full"],
        .circle {
          border-radius: 9999px !important;
        }

        /* Load Google Font */
        @import url('https://fonts.googleapis.com/css2?family=${theme.fontFamily.split(',')[0].trim().replace(/ /g, '+')}&display=swap');
      `}</style>
      {children}
    </>
  );
} 
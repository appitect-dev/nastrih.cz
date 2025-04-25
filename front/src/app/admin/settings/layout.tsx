"use client";

import { BookingThemeProvider } from "@/contexts/BookingThemeContext";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BookingThemeProvider>{children}</BookingThemeProvider>;
} 
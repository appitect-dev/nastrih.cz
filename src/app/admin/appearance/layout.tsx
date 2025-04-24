"use client";

import { BookingThemeProvider } from "@/contexts/BookingThemeContext";

export default function AppearanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BookingThemeProvider>{children}</BookingThemeProvider>;
} 
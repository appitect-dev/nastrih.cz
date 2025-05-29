"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import Image from "next/image";
import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white font-inter antialiased">
      {/* Background Gradient with animated noise texture */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-white to-white pointer-events-none animate-gradient" />
      <div className="fixed inset-0 bg-noise opacity-[0.015] pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-xl rounded-b-2xl border-b border-gray-100/70 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/scissors.svg"
                alt="Logo"
                width={40}
                height={40}
                className="inline-block align-middle drop-shadow-md transition-transform group-hover:-rotate-12 group-hover:scale-110 duration-300"
                priority
              />
              <span className="text-3xl font-extrabold font-outfit text-gray-900 tracking-tight group-hover:text-amber-700 transition-colors duration-300">
                nastrih.cz
              </span>
            </Link>
            {/* Divider */}
            <div className="hidden md:block h-8 w-px bg-gray-200 mx-6 rounded-full" />
            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { href: "#features", label: "Funkce" },
                { href: "#pricing", label: "Ceník" },
                { href: "#contact", label: "Kontakt" },
                { href: "/login", label: "Přihlásit se" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-gray-700 hover:text-amber-700 font-inter font-medium px-3 py-1 rounded-md transition-all duration-200 hover:bg-amber-50 group"
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Animated underline */}
                  <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-amber-600 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              ))}
              <Link
                href="/demo"
                className="group relative inline-flex items-center justify-center px-6 py-2 text-lg font-medium text-white overflow-hidden rounded-full shadow-lg transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transition-all duration-300" />
                <span className="absolute inset-0 opacity-0 bg-gradient-to-r from-amber-700 to-amber-800 group-hover:opacity-100 transition-all duration-300" />
                <span className="absolute inset-0 opacity-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] group-hover:opacity-100 transition-all duration-300" />
                <span className="relative flex items-center font-medium font-inter">
                  <span className="group-hover:opacity-0 transition-opacity duration-300">
                    Vyzkoušet zdarma
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Začít teď →
                  </span>
                </span>
              </Link>
            </div>
            {/* Hamburger for mobile */}
            <button
              className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-amber-50 transition-colors focus:outline-none"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              <svg
                className="w-8 h-8 text-amber-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-xl rounded-b-2xl border-b border-gray-100/70 px-4 py-6 space-y-4 animate-fade-in-down">
            {[
              { href: "#features", label: "Funkce" },
              { href: "#pricing", label: "Ceník" },
              { href: "#contact", label: "Kontakt" },
              { href: "/login", label: "Přihlásit se" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-lg font-semibold text-gray-700 hover:text-amber-700 px-2 py-2 rounded-md transition-all duration-200 hover:bg-amber-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/demo"
              className="block w-full text-center mt-2 px-6 py-3 text-lg font-bold text-white rounded-full bg-gradient-to-r from-amber-600 to-amber-700 shadow-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vyzkoušet zdarma
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Warm, inviting background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <motion.span
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-8 border border-amber-200/50 shadow-sm hover:shadow-md transition-all cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="relative">
                  <span className="absolute -bottom-px left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-800/50 to-transparent" />
                  Vítejte v moderním rezervačním systému
                </span>
              </motion.span>

              <h1 className="text-5xl lg:text-6xl font-bold font-outfit text-gray-900 mb-6 leading-tight tracking-tight">
                Zjednodušte si
                <span className="relative ml-2">
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                    rezervace
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600/20 to-amber-800/20 blur-sm" />
                </span>
                <br />
                pro vaše holičství
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-inter">
                Ušetřete čas, získejte více klientů a poskytněte profesionální
                zážitek z objednání. Vše na jednom místě.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/demo"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white overflow-hidden rounded-full"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transition-all duration-300" />
                    <span className="absolute inset-0 opacity-0 bg-gradient-to-r from-amber-700 to-amber-800 group-hover:opacity-100 transition-all duration-300" />
                    <span className="absolute inset-0 opacity-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] group-hover:opacity-100 transition-all duration-300" />
                    <span className="relative flex items-center">
                      Vyzkoušet zdarma
                      <svg
                        className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="#demo-video"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-amber-800 overflow-hidden rounded-full"
                  >
                    <span className="absolute inset-0 bg-amber-50 border border-amber-200/70 transition-all duration-300" />
                    <span className="absolute inset-0 opacity-0 bg-amber-100/80 border border-amber-300 group-hover:opacity-100 transition-all duration-300" />
                    <span className="absolute inset-0 opacity-0 shadow-[0_4px_12px_rgba(180,83,9,0.1)] group-hover:opacity-100 transition-all duration-300" />
                    <span className="relative flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Podívejte se jak to funguje
                    </span>
                  </Link>
                </motion.div>
              </div>

              <div className="mt-12 flex items-center justify-center gap-12 text-sm text-gray-500 font-inter">
                {[
                  {
                    text: "14 dní zdarma",
                    gradient: "from-green-50 to-green-100",
                    iconColor: "text-green-600",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    ),
                  },
                  {
                    text: "Bez platební karty",
                    gradient: "from-amber-50 to-amber-100",
                    iconColor: "text-amber-600",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    ),
                  },
                  {
                    text: "Zrušení kdykoliv",
                    gradient: "from-rose-50 to-rose-100",
                    iconColor: "text-rose-600",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ),
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-3 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <svg
                        className={`w-6 h-6 ${item.iconColor}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {item.icon}
                      </svg>
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative max-w-5xl mx-auto"
            >
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-amber-200/50 shadow-2xl bg-gradient-to-b from-white to-amber-50/30 group hover:shadow-amber-100/50 transition-shadow duration-300">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Image
                    src="/dashboard.png"
                    alt="Dashboard"
                    width={1000}
                    height={1000}
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Floating Features */}
              <motion.div
                className="absolute -right-8 top-1/4 transform translate-x-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="group bg-white/80 rounded-2xl p-4 shadow-xl border border-amber-100/50 backdrop-blur-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Rezervace potvrzena
                      </div>
                      <div className="text-xs text-gray-500">Právě teď</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-8 bottom-1/4 transform -translate-x-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="group bg-white/80 rounded-2xl p-4 shadow-xl border border-amber-100/50 backdrop-blur-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <svg
                        className="w-6 h-6 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Připomínka odeslána
                      </div>
                      <div className="text-xs text-gray-500">
                        Před 5 minutami
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gradient-to-b from-amber-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-white to-white opacity-40" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4 cursor-pointer hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Vše co potřebujete
            </motion.span>
            <h2 className="text-3xl font-bold font-outfit mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Pro vaše
              </span>
              <span className="relative ml-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                  holičství
                </span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600/20 to-amber-800/20 blur-sm" />
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Kompletní řešení pro správu rezervací, klientů a vašeho podnikání.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Online rezervace 24/7",
                description:
                  "Umožněte klientům objednat se kdykoliv a odkudkoliv. Automatické potvrzení a připomínky.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                gradient: "from-amber-50 to-amber-100",
                iconColor: "text-amber-600",
              },
              {
                title: "Vlastní vzhled",
                description:
                  "Přizpůsobte si barvy, fonty a texty podle vaší značky. Žádné kódování není potřeba.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                ),
                gradient: "from-amber-50 to-amber-100",
                iconColor: "text-amber-600",
              },
              {
                title: "SMS & Email notifikace",
                description:
                  "Automatické připomínky před termínem. Snižte počet zmeškaných návštěv.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                gradient: "from-amber-50 to-amber-100",
                iconColor: "text-amber-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/80 rounded-3xl p-8 hover:bg-white transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/50 to-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 rounded-3xl border border-amber-100/50 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg`}
                  >
                    <div className={feature.iconColor}>{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-outfit">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-gradient-to-b from-white to-amber-50/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-100/40 via-white to-white opacity-40" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4 cursor-pointer hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Proces
            </motion.span>
            <h2 className="text-3xl font-bold font-outfit mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Jak to
              </span>
              <span className="relative ml-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                  funguje
                </span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600/20 to-amber-800/20 blur-sm" />
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Začněte přijímat online rezervace během několika minut.
            </p>
          </div>

          <div className="relative">
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="h-full bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100" />
            </motion.div>
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Vytvořte účet",
                  description: "Registrace zabere jen 2 minuty",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  ),
                },
                {
                  step: "2",
                  title: "Nastavte služby",
                  description: "Přidejte své služby a ceny",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  ),
                },
                {
                  step: "3",
                  title: "Upravte vzhled",
                  description: "Přizpůsobte si design",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  ),
                },
                {
                  step: "4",
                  title: "Sdílejte odkaz",
                  description: "Začněte přijímat rezervace",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  ),
                },
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative bg-white"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="relative w-16 h-16 mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative w-full h-full rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-center justify-center text-xl font-medium font-outfit shadow-lg">
                        {step.step}
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 font-outfit">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center font-inter">
                      {step.description}
                    </p>
                    <div className="mt-4">
                      <svg
                        className="w-6 h-6 text-amber-600 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {step.icon}
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-b from-amber-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-100/40 via-white to-white opacity-40" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4 cursor-pointer hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Začněte ještě dnes
            </motion.span>
            <h2 className="text-4xl font-bold font-outfit mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Připraveni
              </span>
              <span className="relative ml-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                  začít?
                </span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600/20 to-amber-800/20 blur-sm" />
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-inter">
              Vyzkoušejte nastrih.cz zdarma po dobu 14 dní. Žádná platební karta
              není vyžadována.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/demo"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white overflow-hidden rounded-full"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transition-all duration-300" />
                  <span className="absolute inset-0 opacity-0 bg-gradient-to-r from-amber-700 to-amber-800 group-hover:opacity-100 transition-all duration-300" />
                  <span className="absolute inset-0 opacity-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] group-hover:opacity-100 transition-all duration-300" />
                  <span className="relative flex items-center">
                    Začít zdarma
                    <svg
                      className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-amber-800 overflow-hidden rounded-full"
                >
                  <span className="absolute inset-0 bg-amber-50 border border-amber-200/70 transition-all duration-300" />
                  <span className="absolute inset-0 opacity-0 bg-amber-100/80 border border-amber-300 group-hover:opacity-100 transition-all duration-300" />
                  <span className="absolute inset-0 opacity-0 shadow-[0_4px_12px_rgba(180,83,9,0.1)] group-hover:opacity-100 transition-all duration-300" />
                  <span className="relative flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Kontaktujte nás
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-amber-800/20 via-amber-900 to-amber-900" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-amber-50 mb-6 font-outfit">
                O nás
              </h3>
              <p className="text-sm font-inter text-amber-200 leading-relaxed">
                Pomáháme holičstvím a kadeřnictvím růst pomocí moderních
                technologií.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-amber-50 mb-6 font-outfit">
                Kontakt
              </h3>
              <p className="text-sm font-inter text-amber-200 leading-relaxed">
                Tel: +420 777 888 999
                <br />
                Email: sales@nastrih.cz
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-amber-50 mb-6 font-outfit">
                Odkazy
              </h3>
              <ul className="space-y-3 text-sm font-inter">
                {[
                  { text: "Blog", href: "#" },
                  { text: "Dokumentace", href: "#" },
                  { text: "Podpora", href: "#" },
                ].map((link) => (
                  <motion.li
                    key={link.text}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-amber-200 hover:text-amber-50 transition-colors"
                    >
                      {link.text}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-amber-50 mb-6 font-outfit">
                Právní
              </h3>
              <ul className="space-y-3 text-sm font-inter">
                {[
                  { text: "Obchodní podmínky", href: "#" },
                  { text: "Ochrana osobních údajů", href: "#" },
                  { text: "GDPR", href: "#" },
                ].map((link) => (
                  <motion.li
                    key={link.text}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-amber-200 hover:text-amber-50 transition-colors"
                    >
                      {link.text}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-amber-800/50 text-sm text-center font-inter"
          >
            <p className="text-amber-300">
              &copy; {new Date().getFullYear()} Nastrih.cz - Rezervační systém
              pro holičství. Všechna práva vyhrazena.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

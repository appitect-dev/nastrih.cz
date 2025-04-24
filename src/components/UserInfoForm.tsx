"use client";

import { useState } from "react";
import { useBookingTheme } from "@/contexts/BookingThemeContext";

interface FormData {
  name: string;
  email: string;
  phone: string;
  note: string;
}

interface UserInfoFormProps {
  onSubmit: (data: { name: string; email: string; phone: string }) => void;
}

export default function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const { theme } = useBookingTheme();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputStyle = {
    backgroundColor: theme.inputStyle.backgroundColor,
    borderColor: theme.inputStyle.borderColor,
    borderRadius: theme.borderRadius,
    color: theme.textColor,
    padding: theme.inputStyle.padding,
  };

  const buttonStyle = {
    backgroundColor: theme.primaryColor,
    borderRadius: theme.borderRadius,
    padding: theme.buttonStyle.padding,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: theme.fontWeight.medium,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <h2
          style={{
            color: theme.textColor,
            fontSize: `calc(${theme.fontSize.base} * 1.5)`,
            fontWeight: theme.fontWeight.bold,
            fontFamily: theme.fontFamily,
          }}
        >
          Vaše informace
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              style={{
                color: theme.textColor,
                fontSize: theme.fontSize.base,
                fontWeight: theme.fontWeight.medium,
                fontFamily: theme.fontFamily,
              }}
            >
              Jméno a příjmení
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full p-3 border"
              style={{
                borderColor: theme.inputStyle.borderColor,
                borderRadius: theme.borderRadius,
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
                fontSize: theme.fontSize.base,
                fontFamily: theme.fontFamily,
              }}
              placeholder="Jan Novák"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              style={{
                color: theme.textColor,
                fontSize: theme.fontSize.base,
                fontWeight: theme.fontWeight.medium,
                fontFamily: theme.fontFamily,
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-3 border"
              style={{
                borderColor: theme.inputStyle.borderColor,
                borderRadius: theme.borderRadius,
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
                fontSize: theme.fontSize.base,
                fontFamily: theme.fontFamily,
              }}
              placeholder="jan@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              style={{
                color: theme.textColor,
                fontSize: theme.fontSize.base,
                fontWeight: theme.fontWeight.medium,
                fontFamily: theme.fontFamily,
              }}
            >
              Telefon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full p-3 border"
              style={{
                borderColor: theme.inputStyle.borderColor,
                borderRadius: theme.borderRadius,
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
                fontSize: theme.fontSize.base,
                fontFamily: theme.fontFamily,
              }}
              placeholder="+420 123 456 789"
              required
            />
            <p className="mt-1 text-sm" style={{ color: theme.textColor }}>
              Na toto číslo vám zašleme SMS s potvrzením rezervace
            </p>
          </div>
          <div>
            <label
              htmlFor="note"
              style={{
                color: theme.textColor,
                fontSize: theme.fontSize.base,
                fontWeight: theme.fontWeight.medium,
                fontFamily: theme.fontFamily,
              }}
            >
              Poznámka (volitelné)
            </label>
            <textarea
              id="note"
              value={formData.note}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, note: e.target.value }))
              }
              className="mt-1 w-full p-3 border"
              style={{
                borderColor: theme.inputStyle.borderColor,
                borderRadius: theme.borderRadius,
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
                fontSize: theme.fontSize.base,
                fontFamily: theme.fontFamily,
              }}
              rows={4}
              placeholder="Vaše speciální požadavky nebo poznámky k rezervaci..."
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-4 transition-all"
          style={{
            backgroundColor: theme.primaryColor,
            color: "#FFFFFF",
            borderRadius: theme.borderRadius,
            fontSize: theme.fontSize.base,
            fontWeight: theme.fontWeight.medium,
            fontFamily: theme.fontFamily,
          }}
        >
          Dokončit rezervaci
        </button>
      </div>
    </form>
  );
}

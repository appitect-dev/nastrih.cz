'use client';

import { useRouter } from 'next/navigation';
import UserInfoForm from '@/components/UserInfoForm';
import { useBookingTheme } from '@/contexts/BookingThemeContext';

export default function SummaryPage() {
  const router = useRouter();
  const { theme } = useBookingTheme();

  const handleSubmit = (userData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    // Save user data to sessionStorage
    sessionStorage.setItem('userData', JSON.stringify(userData));

    // Show confirmation
    alert('Rezervace potvrzena! Na váš email a telefon jsme odeslali potvrzení.');

    // Clear booking data
    sessionStorage.clear();

    // Redirect to home
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8" style={{ color: theme.textColor }}>Dokončení rezervace</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <UserInfoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
} 
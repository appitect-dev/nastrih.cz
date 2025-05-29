'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SetupProgress from '@/components/setup/SetupProgress';
import BasicInfoStep from '@/components/setup/BasicInfoStep';
import ServicesStep from '@/components/setup/ServicesStep';
import StaffStep from '@/components/setup/StaffStep';
import BusinessHoursStep from '@/components/setup/BusinessHoursStep';
import ReviewStep from '@/components/setup/ReviewStep';

export default function SetupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: {
      name: '',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
      email: '',
    },
    services: [],
    staff: [],
    businessHours: {
      monday: { open: '09:00', close: '18:00' },
      tuesday: { open: '09:00', close: '18:00' },
      wednesday: { open: '09:00', close: '18:00' },
      thursday: { open: '09:00', close: '18:00' },
      friday: { open: '09:00', close: '18:00' },
      saturday: { open: '09:00', close: '18:00' },
      sunday: { open: '', close: '' },
    },
  });

  const steps = [
    { id: 1, title: 'Základní informace' },
    { id: 2, title: 'Služby' },
    { id: 3, title: 'Zaměstnanci' },
    { id: 4, title: 'Otevírací doba' },
    { id: 5, title: 'Shrnutí' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // In a real app, this would submit to the backend
      console.log('Setup complete:', formData);
      router.push('/admin');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (step: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: data,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep data={formData.basicInfo} onUpdate={(data) => updateFormData('basicInfo', data)} />;
      case 2:
        return <ServicesStep data={formData.services} onUpdate={(data) => updateFormData('services', data)} />;
      case 3:
        return <StaffStep data={formData.staff} onUpdate={(data) => updateFormData('staff', data)} />;
      case 4:
        return <BusinessHoursStep data={formData.businessHours} onUpdate={(data) => updateFormData('businessHours', data)} />;
      case 5:
        return <ReviewStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nastavení vaší kadeřnictví</h1>
          <p className="mt-2 text-sm text-gray-600">
            Vyplňte následující údaje pro nastavení vaší kadeřnictví
          </p>
        </div>

        <SetupProgress steps={steps} currentStep={currentStep} />

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          {renderStep()}

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Zpět
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {currentStep === steps.length ? 'Dokončit nastavení' : 'Další'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
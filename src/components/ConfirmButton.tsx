'use client';

interface ConfirmButtonProps {
  onConfirm: () => void;
}

export default function ConfirmButton({ onConfirm }: ConfirmButtonProps) {
  return (
    <button
      onClick={onConfirm}
      className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-lg flex items-center justify-center gap-2"
    >
      <span>Potvrdit rezervaci</span>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
} 
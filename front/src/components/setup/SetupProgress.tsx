interface Step {
  id: number;
  title: string;
}

interface SetupProgressProps {
  steps: Step[];
  currentStep: number;
}

export default function SetupProgress({ steps, currentStep }: SetupProgressProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 h-0.5 w-full bg-gray-200" />
      <div
        className="absolute left-0 top-1/2 h-0.5 bg-indigo-600 transition-all duration-500"
        style={{
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
        }}
      />
      <div className="relative flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                step.id <= currentStep
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-gray-300 bg-white text-gray-500'
              }`}
            >
              {step.id}
            </div>
            <div
              className={`mt-2 text-xs font-medium ${
                step.id <= currentStep ? 'text-indigo-600' : 'text-gray-500'
              }`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
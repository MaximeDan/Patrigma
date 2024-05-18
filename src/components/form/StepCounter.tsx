"use client";

type StepCounterProps = {
  step: number;
  totalSteps: number;
};

const StepCounter = ({ step, totalSteps }: StepCounterProps) => {
  return (
    <div className="mt-[30px] flex items-center gap-[5px] sm:mt-[66px]">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`size-[11px] rounded-[10px] ${
            index <= step ? "bg-slate-700" : "bg-slate-400"
          }`}
        />
      ))}
      <p className="ml-1 text-[15px] font-semibold text-slate-700">
        Étape {step + 1}/{totalSteps}
      </p>
    </div>
  );
};

export default StepCounter;

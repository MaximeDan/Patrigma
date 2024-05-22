"use client";

import { UseFormReturn } from "react-hook-form";
import { JourneyFormValues } from "../JourneyForm";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import TreasureStep from "./TreasureStep";

import { motion } from "framer-motion";

type StepsProps = {
  step: number;
  next: () => Promise<void>;
  prev: () => void;
  form: UseFormReturn<JourneyFormValues>;
  dir: "ltr" | "rtl";
};

const Steps = ({ step, next, prev, form, dir }: StepsProps) => {
  return (
    <>
      {step === 0 && (
        <motion.div
          initial={{ x: dir === "ltr" ? "50%" : "-50%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FirstStep next={next} form={form} />
        </motion.div>
      )}
      {step === 1 && (
        <motion.div
          initial={{ x: dir === "ltr" ? "50%" : "-50%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <SecondStep next={next} prev={prev} form={form} />
        </motion.div>
      )}
      {step === 2 && (
        <motion.div
          initial={{ x: dir === "ltr" ? "50%" : "-50%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ThirdStep next={next} prev={prev} form={form} />
        </motion.div>
      )}
      {step === 3 && (
        <motion.div
          initial={{ x: dir === "ltr" ? "50%" : "-50%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <TreasureStep next={next} prev={prev} form={form} />
        </motion.div>
      )}
    </>
  );
};

export default Steps;

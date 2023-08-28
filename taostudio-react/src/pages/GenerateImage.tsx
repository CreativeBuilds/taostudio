import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { aspectRatios } from "../constants/aspect-ratios";
import { motion } from "framer-motion";
import CustomSelect from "../components/inputs/CustomSelect";

const container = {
  hidden: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.5,
    },
  },
  exit: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, translateY: -25 },
  animate: {
    opacity: 1,
    translateY: 0,
  },
  exit: {
    opacity: 0,
    translateY: -25,
  },
};

const GenerateImage = () => {
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(
    aspectRatios[0]
  );
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    const imagePrompt = {
      selectedAspectRatio,
      negativePrompt,
      prompt,
    };
    localStorage.setItem("imagePrompt", JSON.stringify(imagePrompt));
    navigate("/images");
  };

  useEffect(() => {
    const previousPrompt = localStorage.getItem("prompt");
    if (previousPrompt) {
      const fields = JSON.parse(previousPrompt);
      setPrompt(fields.prompt);
      setNegativePrompt(fields.negativePrompt);
      setNegativePrompt(fields.negativePrompt);
      setSelectedAspectRatio(fields.selectedAspectRatio);
    }
  }, []);

  return (
    <main className="wrapper relative justify-center flex-1 items-center  h-full flex">
      <motion.div
        variants={container}
        initial="hidden"
        animate="animate"
        exit="exit"
        className="flex flex-col max-w-2xl gap-4 w-full"
      >
        <motion.input
          type="text"
          variants={item}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="text-[22px] font-mono text-foreground bg-transparent w-full text-center outline-none focus:border-b-4 focus:outline-none focus:border-foreground duration-300 ease-in-out"
          placeholder="Prompt"
        />
        <motion.input
          type="text"
          variants={item}
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          className="text-[22px] font-mono text-destructive placeholder:text-destructive bg-transparent w-full text-center outline-none focus:border-b-4 focus:outline-none focus:border-destructive duration-300 ease-in-out"
          placeholder="Negative Prompt"
        />
        <motion.div variants={item}>
          <CustomSelect
            onChange={(newValue) => setSelectedAspectRatio(newValue)}
            value={selectedAspectRatio}
            placeholder="Aspect Ratio"
            options={aspectRatios.map((item) => {
              return {
                label: item.label,
                value: item.value,
              };
            })}
          />
        </motion.div>
        <motion.button
          onClick={handleFormSubmit}
          variants={item}
          className="text-[28px] text-foreground mx-auto font-mono"
        >
          [ generate ]
        </motion.button>
      </motion.div>
    </main>
  );
};

export default GenerateImage;

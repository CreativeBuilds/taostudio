import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import AnimatedOutlet from "./AnimatedOutlet";
import { useLocation } from "react-router-dom";

//Using this type of routing for animation in framer motion (exit animation)

const RootContainer = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={location.pathname}
        className="bg-background min-h-screen flex flex-col font-poppins py-10"
      >
        <AnimatedOutlet />
      </motion.section>
    </AnimatePresence>
  );
};

export default RootContainer;


import { motion } from "framer-motion";

// Stagger animation for the circles
const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Bouncing animation for each circle
const circleVariants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [0, 12, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Loading({ title = "Loading" }) {
  return (
    <div className="flex w-full min-w-0 flex-col items-center justify-center gap-3 rounded-xl bg-slate-900 p-4 sm:flex-row sm:gap-4 sm:p-5 md:gap-5 md:p-6">
      {/* Bouncing circles */}
      <motion.div
        className="flex h-10 w-24 shrink-0 items-center justify-around sm:w-28"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        aria-hidden="true"
      >
        <motion.span
          className="block h-3 w-3 rounded-full bg-green-500 sm:h-4 sm:w-4"
          variants={circleVariants}
        />

        <motion.span
          className="block h-3 w-3 rounded-full bg-green-500 sm:h-4 sm:w-4"
          variants={circleVariants}
        />

        <motion.span
          className="block h-3 w-3 rounded-full bg-green-500 sm:h-4 sm:w-4"
          variants={circleVariants}
        />
      </motion.div>

      {/* Loading message */}
      <div className="min-w-0 flex-1 text-center sm:text-left">
        <h1 className="break-words text-sm font-extrabold leading-relaxed text-yellow-500 sm:text-base md:text-lg lg:text-xl">
          {title}. Please wait...
        </h1>
      </div>
    </div>
  );
}


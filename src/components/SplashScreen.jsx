//make following component responsive in all screens i.e phones,laptops,desktops ;;
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 5000);

    const navigateTimer = setTimeout(() => {
      navigate("/login");
    }, 7000);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-zinc-800 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 font-serif overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: -60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl bg-white text-black flex flex-col items-center justify-center text-center p-5 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-2xl"
      >
        {/* Application name */}
        <h1 className="font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl text-black leading-tight">
          EXPENSE TRACKER
        </h1>

        {/* Designer label */}
        <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-600 font-medium">
          Designed and Built By
        </p>

        {/* Developer name */}
        <h2 className="mt-2 font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl text-black leading-tight break-words">
          Japheth Nyarandi
        </h2>

        {/* Welcome message */}
        {showWelcome && (
          <motion.h2
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-6 w-full rounded-xl bg-teal-50 px-3 py-3 sm:px-5 sm:py-4 text-teal-700 font-bold text-base sm:text-xl md:text-2xl lg:text-3xl"
          >
            Welcome 😊
          </motion.h2>
        )}
      </motion.div>
    </div>
  );
};

export default SplashScreen;

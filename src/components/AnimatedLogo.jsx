import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedLogo({ className = "", size = "md" }) {
  const sizes = {
    sm: "h-12 w-12",
    md: "h-20 w-20",
    lg: "h-32 w-32",
    xl: "h-48 w-48",
    xxl: "h-64 w-64"
  };

  return (
    <motion.div
      className={`relative ${sizes[size]} ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo image */}
      <motion.img
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696e66398d7900c2acfeec9e/037e90960_updatedlogo.png"
        alt="Australasia Sports Academy"
        className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
        animate={{
          rotateY: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
        style={{ clipPath: 'inset(0)' }}
      />
    </motion.div>
  );
}
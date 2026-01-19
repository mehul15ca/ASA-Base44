import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedLogo({ className = "", size = "md" }) {
  const sizes = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32"
  };

  return (
    <motion.div
      className={`relative ${sizes[size]} ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Pulsing glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/30 to-yellow-500/30 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Logo image */}
      <motion.img
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_696e5689d94cc7eb9f6f27ce/df5394fe4_ChatGPTImageJan13202607_16_18PM.png"
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
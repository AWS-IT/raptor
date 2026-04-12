'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface NeonLogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function NeonLogo({ size = 'lg', animated = true }: NeonLogoProps) {
  const sizeConfig = {
    sm: { className: 'w-48 h-48', width: 8, height: 48 },
    md: { className: 'w-24 h-24', width: 96, height: 96 },
    lg: { className: 'w-64 h-64 md:w-80 md:h-80', 
  width: 220, 
  height: 220  },
  };

  const { className, width, height } = sizeConfig[size];

  const LogoImage = (
    <div className={`${className} relative neon-glow`}>
      <Image
        src="/images/reviews/raptorlogo.svg"
        alt="WebRaptor Logo"
        width={width}
        height={height}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="animate-pulse-glow"
      >
        {LogoImage}
      </motion.div>
    );
  }

  return LogoImage;
}

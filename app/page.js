'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Home() {
  return (
    <motion.div
      className="bg-white text-black dark:bg-black dark:text-white min-h-screen flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-3xl sm:text-4xl md:text-5xl text-center"
      >
        Welcome to <span>Retax</span>
      </motion.h1>
    </motion.div>
  )
}

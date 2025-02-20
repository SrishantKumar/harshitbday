"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { Heart, Cake, Gift, Music, BombIcon as Balloon, XCircle } from "lucide-react"
import Image from "next/image"

const PhotoFrame = () => (
  <motion.div
    className="relative w-64 h-64 mb-8 rounded-lg overflow-hidden shadow-lg"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
  >
    <div className="absolute inset-0 border-[10px] border-white rounded-lg z-10"></div>
    <Image src="/harshit.jpeg" alt="Harshit Benke" layout="fill" objectFit="cover" className="rounded-lg" />
  </motion.div>
)

const DancingFigure = () => (
  <motion.div className="dancing-figure" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="figure">
      <div className="head"></div>
      <div className="body"></div>
      <div className="arm left"></div>
      <div className="arm right"></div>
      <div className="leg left"></div>
      <div className="leg right"></div>
    </div>
  </motion.div>
)

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const stopCelebration = useCallback(() => {
    setShowConfetti(false)
    setIsPlaying(false)
    audioRef.current?.pause()
    if (audioRef.current) audioRef.current.currentTime = 0
  }, [])

  const startCelebration = () => {
    setShowConfetti(true)
    setIsPlaying(true)
    audioRef.current?.play()
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.addEventListener("ended", stopCelebration)
      return () => audio.removeEventListener("ended", stopCelebration)
    }
  }, [stopCelebration])

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={true} />}

      <audio ref={audioRef} src="/birthday-song.mp3" />

      <PhotoFrame />

      <motion.h1
        className="text-4xl md:text-6xl font-pacifico mb-8 text-white drop-shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        Happy Birthday Harshit! 🎉
      </motion.h1>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xl md:text-2xl text-white font-semibold">
          Wishing you an amazing day filled with joy and laughter! 😄
        </p>

        <div className="flex justify-center space-x-4">
          <AnimatedIcon Icon={Heart} color="text-red-500" />
          <AnimatedIcon Icon={Cake} color="text-yellow-500" />
          <AnimatedIcon Icon={Gift} color="text-green-500" />
          <AnimatedIcon Icon={Music} color="text-blue-500" />
          <AnimatedIcon Icon={Balloon} color="text-purple-500" />
        </div>

        <motion.button
          className="bg-white text-purple-600 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-purple-100 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isPlaying ? stopCelebration : startCelebration}
        >
          {isPlaying ? (
            <>
              <XCircle className="inline-block mr-2" />
              Stop Celebration
            </>
          ) : (
            "Click for a surprise! 🎁"
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence>{isPlaying && <DancingFigure />}</AnimatePresence>
    </main>
  )
}

const AnimatedIcon = ({ Icon, color }: { Icon: React.ElementType; color: string }) => (
  <motion.div
    className={`text-4xl ${color}`}
    whileHover={{ scale: 1.2, rotate: 360 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    <Icon />
  </motion.div>
)


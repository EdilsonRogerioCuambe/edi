'use client'
import { motion } from 'framer-motion'
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation'
import Image from 'next/image'

import edilson from '@/assets/images/edilson.jpg'

export default function Hero() {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <div className="text-[#333333] flex items-center min-h-screen justify-center w-full">
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear', duration: 0.5 }}
        className="flex flex-col md:flex-row max-w-5xl mx-auto p-4 md:py-10 md:space-x-4 space-y-2 md:space-y-0 items-center justify-center w-full"
      >
        <motion.div
          className="flex-shrink-0 hidden cursor-pointer md:flex-shrink rounded-lg border-2 border-[#f5f5f5] relative justify-center items-center md:flex h-full w-full md:w-1/3 overflow-hidden"
          whileHover={{ rotate: 2, transition: { duration: 0.5 } }}
          whileTap={{ rotate: -2, transition: { duration: 0.5 } }}
        >
          <Image
            src={edilson}
            alt="Edilson"
            className="rounded-lg object-cover h-full w-full"
            width={400}
            height={400}
          />
        </motion.div>
        <div className="w-full md:w-2/3">
          <RoughNotationGroup show={true}>
            <p className="text-2xl md:text-4xl items-center">
              Olá, sou um{' '}
              <RoughNotation type="underline" color="#ff6347">
                desenvolvedor full stack
              </RoughNotation>{' '}
              especializado em
              <RoughNotation type="circle" color="#34d399">
                {' '}
                Docker
              </RoughNotation>
              ,{' '}
              <RoughNotation type="highlight" color="#3b82f6">
                Next.js
              </RoughNotation>
              ,{' '}
              <RoughNotation type="underline" color="#f59e0b">
                TypeScript
              </RoughNotation>
              , Java, e{' '}
              <RoughNotation type="box" color="#ef4444">
                GitHub
              </RoughNotation>
              . Tenho paixão por desenvolver aplicações eficientes e escaláveis,
              utilizando as mais modernas tecnologias e metodologias ágeis.
            </p>
          </RoughNotationGroup>
        </div>
      </motion.div>
    </div>
  )
}

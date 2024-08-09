'use client'
import GitHubCalendar from 'react-github-calendar'
import { motion } from 'framer-motion'

export default function GitHubContributions() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-4">
      <h2 className="text-2xl font-bold text-[#333333] dark:text-[#f5f5f5] mb-6">
        Minhas Contribuições no GitHub
      </h2>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-[#f5f5f5] dark:bg-zinc-700 p-6 rounded-lg max-w-5xl mx-auto"
      >
        <GitHubCalendar
          username="EdilsonRogerioCuambe"
          blockSize={15}
          blockMargin={5}
          fontSize={14}
        />
      </motion.div>
    </section>
  )
}

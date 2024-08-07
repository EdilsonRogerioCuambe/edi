'use client'
import { motion } from 'framer-motion'
import {
  FaNodeJs,
  FaDocker,
  FaPython,
  FaJava,
  FaGithub,
  FaHtml5,
  FaCss3,
} from 'react-icons/fa'
import { SiNextdotjs, SiTypescript } from 'react-icons/si'
import { IoLogoJavascript } from 'react-icons/io5'

export default function TechStack() {
  const techStack = [
    {
      name: 'GitHub',
      icon: (
        <FaGithub
          size={50}
          className="text-[#f5f5f5] justify-center items-center"
        />
      ),
    },
    {
      name: 'Node.js',
      icon: (
        <FaNodeJs
          size={50}
          className="text-[#f5f5f5] justify-center items-center"
        />
      ),
    },
    {
      name: 'TypeScript',
      icon: (
        <SiTypescript
          size={50}
          className="text-[#f5f5f5] justify-center items-center"
        />
      ),
    },
    {
      name: 'Docker',
      icon: (
        <FaDocker
          size={50}
          className="text-[#f5f5f5] justify-center items-center"
        />
      ),
    },
    {
      name: 'Python',
      icon: (
        <FaPython
          size={50}
          className="text-[#f5f5f5] justify-center items-center"
        />
      ),
    },
    {
      name: 'Java',
      icon: (
        <FaJava
          size={50}
          className="text-[#f5f5f5] justify-center items-center"
        />
      ),
    },
    {
      name: 'Next.js',
      icon: (
        <SiNextdotjs
          size={50}
          className="text-[#f5f5f5] justify-center items-center"
        />
      ),
    },
    {
      name: 'JavaScript',
      icon: (
        <IoLogoJavascript
          size={50}
          className="text-[#f5f5f5] justify-center items-center"
        />
      ),
    },
    {
      name: 'HTML5',
      icon: (
        <FaHtml5
          size={50}
          className="text-[#f5f5f5] justify-center items-center"
        />
      ),
    },
    {
      name: 'CSS3',
      icon: (
        <FaCss3
          size={50}
          className="text-[#f5f5f5] justify-center items-center"
        />
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-4">
      <h2 className="text-2xl font-bold text-[#333333] dark:text-[#f5f5f5] text-start mb-4">
        Tech Stack
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              boxShadow: '0px 0px 8px rgba(51, 51, 51, 0.8)',
            }}
            whileTap={{
              scale: 0.95,
              rotate: -5,
              boxShadow: '0px 0px 12px rgba(51, 51, 51, 0.6)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            className="flex flex-col items-center justify-center p-4 bg-[#333333] dark:bg-zinc-700 shadow-md rounded-md cursor-pointer hover:bg-[#3d3d3d] dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {tech.icon}
            <p className="mt-2 text-[#f5f5f5] text-center">{tech.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

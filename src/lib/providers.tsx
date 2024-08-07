'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import { ThemeProvider } from './theme.context'

interface Props {
  children: ReactNode
}

export default function Providers(props: Props) {
  return (
    <SessionProvider>
      <ThemeProvider>{props.children}</ThemeProvider>
    </SessionProvider>
  )
}

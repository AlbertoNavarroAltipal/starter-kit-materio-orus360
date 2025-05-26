'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAuth } from 'react-oidc-context'
import CircularProgress from '@mui/material/CircularProgress'

type AuthGuardProps = {
  children: ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    // Si no está cargando y no está autenticado, redirigir a login
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push('/login')
    }
  }, [auth.isLoading, auth.isAuthenticated, router])

  // Si está cargando, mostrar spinner
  if (auth.isLoading) {
    return (
      <div className='flex justify-center items-center min-bs-[100dvh]'>
        <CircularProgress />
      </div>
    )
  }

  // Si hay un error de autenticación, redirigir a login
  if (auth.error) {
    router.push('/login')

    return (
      <div className='flex justify-center items-center min-bs-[100dvh]'>
        <CircularProgress />
      </div>
    )
  }

  // Si está autenticado, mostrar el contenido protegido
  if (auth.isAuthenticated) {
    return <>{children}</>
  }

  // Mientras se redirige, mostrar spinner
  return (
    <div className='flex justify-center items-center min-bs-[100dvh]'>
      <CircularProgress />
    </div>
  )
}

export default AuthGuard

'use client'

import type { ReactNode } from 'react'
import React from 'react'

import { AuthProvider } from 'react-oidc-context'

// Tipos
type CognitoAuthProviderProps = {
  children: ReactNode
}

const CognitoAuthProvider = ({ children }: CognitoAuthProviderProps) => {
  // Configuración de AWS Cognito
  const cognitoAuthConfig = {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_YB2r3qf9J',
    client_id: '31ttf8p3gdm9umcpv3krvcf7jg',
    redirect_uri: typeof window !== 'undefined' ? `${window.location.origin}/home` : 'http://localhost:3000/home',
    response_type: 'code',
    scope: 'email openid phone',

    // Configuración adicional para Next.js
    automaticSilentRenew: true,
    loadUserInfo: true
  }

  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>
}

export default CognitoAuthProvider

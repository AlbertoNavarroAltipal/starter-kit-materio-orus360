'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party Imports
import classnames from 'classnames'
import { useAuth } from 'react-oidc-context'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Logo from '@core/svg/Logo'
import Illustrations from '@components/Illustrations'
import Link from '@components/Link'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

const LoginV2 = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const auth = useAuth()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Iniciar sesión con Cognito
    auth.signinRedirect()
  }

  // Función para cerrar sesión (se utilizará en UserDropdown)
  // const handleSignOut = () => {
  //   const clientId = '31ttf8p3gdm9umcpv3krvcf7jg'
  //   const logoutUri = typeof window !== 'undefined' ? `${window.location.origin}/login` : 'http://localhost:3000/login'
  //   const cognitoDomain = 'https://us-east-1yb2r3qf9j.auth.us-east-1.amazoncognito.com'

  //   if (typeof window !== 'undefined') {
  //     window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`
  //   }
  // }

  // Si está cargando la autenticación
  if (auth.isLoading) {
    return (
      <div className='flex justify-center items-center min-bs-[100dvh]'>
        <CircularProgress />
      </div>
    )
  }

  // Si hay un error de autenticación
  if (auth.error) {
    return (
      <div className='flex justify-center items-center min-bs-[100dvh] flex-col gap-4'>
        <Typography variant='h6' color='error'>
          Error de autenticación
        </Typography>
        <Typography>{auth.error.message}</Typography>
        <Button variant='contained' onClick={() => auth.signinRedirect()}>
          Intentar nuevamente
        </Button>
      </div>
    )
  }

  // Si el usuario ya está autenticado
  if (auth.isAuthenticated) {
    router.push('/home')

    return (
      <div className='flex justify-center items-center min-bs-[100dvh]'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div className='plb-12 pis-12'>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[500px] max-is-full bs-auto'
          />
        </div>
        <Illustrations
          image1={{ src: '/images/illustrations/objects/tree-2.png' }}
          image2={null}
          maskImg={{ src: authBackground }}
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <div className='flex justify-center items-center gap-3 mbe-6'>
            <Logo className='text-primary' height={28} width={35} />
            <Typography variant='h4' className='font-semibold tracking-[0.15px]'>
              {themeConfig.templateName}
            </Typography>
          </div>
        </div>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography>
            <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleLogin} className='flex flex-col gap-5'>
            <TextField autoFocus fullWidth label='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <TextField
              fullWidth
              label='Password'
              type={isPasswordShown ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <div className='flex justify-between items-center flex-wrap gap-x-3 gap-y-1'>
              <FormControlLabel control={<Checkbox />} label='Remember me' />
              <Typography className='text-end' color='primary' component={Link}>
                Forgot password?
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit' disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} color='inherit' /> : 'Log In'}
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>New on our platform?</Typography>
              <Typography component={Link} color='primary'>
                Create an account
              </Typography>
            </div>
            <Divider className='gap-3'>or</Divider>
            <div className='flex justify-center items-center gap-2'>
              <Button
                fullWidth
                variant='outlined'
                onClick={() => auth.signinRedirect()}
                startIcon={<i className='ri-google-line' />}
              >
                Sign in with Cognito
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginV2

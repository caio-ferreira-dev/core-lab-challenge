import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NotesProvider } from '../../context/NotesContext'
import { UserProvider } from '../../context/User.contex'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotesProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </NotesProvider>
  )
}

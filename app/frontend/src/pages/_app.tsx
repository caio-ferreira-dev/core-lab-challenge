import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NotesProvider } from '../../context/NotesContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotesProvider>
      <Component {...pageProps} />
    </NotesProvider>
  )
}

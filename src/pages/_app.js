import '@/styles/globals.css'
import { Open_Sans } from 'next/font/google'

const open = Open_Sans({
  weight: ['400', '600'],
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return(
    <>
      <style jsx global>{`
        html {
          font-family: ${open.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
    
  )
}

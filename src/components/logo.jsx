import Image from 'next/image'
import Link from 'next/link'
export default function Logo() {
  return (
    <Link href='/'>
      <Image
        src="/img/logo.png"
        alt="Logo"
        width={100}
        height={30}
      />
    </Link>
  )
}

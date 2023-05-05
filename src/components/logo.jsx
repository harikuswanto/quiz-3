import Image from 'next/image'
export default function Logo() {
  return (
    <Image
      src="/img/logo.png"
      alt="Logo"
      width={100}
      height={30}
    />
  )
}

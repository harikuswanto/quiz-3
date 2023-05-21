import Logo from "@/components/logo"

export default function headerSingle({children}) {
  return (
    <header className="single">
      <Logo />
      {children}
    </header>
  )
}

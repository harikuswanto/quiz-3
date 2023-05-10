import Logo from "@/components/logo"
import Sorter from "@/components/sorter"

export default function Header({sort}) {
  return (
    <header>
      <Sorter sort ={sort} /> 
      <Logo />
    </header>
  )
}

import Logo from "@/components/logo"
import Sorter from "@/components/sorter"

export default function HeaderHome({sort}) {
  return (
    <header className="home">
      <Logo />
      {sort&&<Sorter sort={sort} />} 
    </header>
  )
}

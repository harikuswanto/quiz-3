import Logo from "@/components/logo"
import Sorter from "@/components/sorter"

export default function HeaderHome({setPosts}) {
  return (
    <header className="home">
      <Logo />
      <Sorter setPosts={setPosts} />
    </header>
  )
}

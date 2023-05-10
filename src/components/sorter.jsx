import { useRouter } from "next/router";

export default function Sorter({sort}) {
  const sortNew = ()=>{sort('new')};
  const sortPopular = ()=>{sort('popular')};

  const router = useRouter();
  const active = router.query.sort;
  return (
    <nav>
      <ul>
        <li className={active==='new'?'active':''} onClick={sortNew}>New</li>
        <li className={active==='popular'?'active':''} onClick={sortPopular}>Popular</li>
      </ul>
    </nav>
  )
}

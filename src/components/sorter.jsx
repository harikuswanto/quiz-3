import { linkApi } from "@/pages";
import { useRouter } from "next/router";


export default function Sorter({setPosts}) {
  async function sortPosts(sorter){
    const res = await fetch(linkApi+'/articles?sort='+sorter);
    const data = await res.json();
    setPosts(data.data);
    router.push('/?sort='+sorter,undefined,{shallow:true})
  }

  const sortNew = ()=>{sortPosts('new')};
  const sortPopular = ()=>{sortPosts('popular')};

  const router = useRouter();
  const active = router.query.sort;
  return (
    <nav>
      <ul>
        <li className={active==='popular'?'active':''} onClick={sortPopular}>Popular</li>
        <li className={active!=='popular'?'active':''} onClick={sortNew}>New</li>
      </ul>
    </nav>
  )
}

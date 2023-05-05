import Article from "@/components/article"
import Header from "@/components/header"
import { useState } from "react"

function Index({data}) {
  const [post,setPost] = useState(data);
  return (
    <>
      <Header />
      <div className="container">
        {data.map(post=>
          <Article key={post.id} post = {...post} />
          )}
      </div>
      <button>Load More</button>
      <footer></footer>
    </>
    
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://hsi-sandbox.vercel.app/api/articles`)
  const {data} = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Index
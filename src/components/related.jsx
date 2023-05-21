import useSWR from "swr";
import CardHalf from "./cardHalf";
import Link from "next/link";

async function fetcher(endpoint){
    const res = await fetch(endpoint);
    const data = await res.json();
    return data.data.slice(0,2);
}


export default function Related({category,slug,articleId}) {
    let queryString = '?excludedArticleId='+articleId;
    queryString += '&categoryId='+category.id;
    const { data, error, isLoading } = useSWR('https://hsi-sandbox.vercel.app/api/articles'+queryString,fetcher);
    return (
        <>
        <div className="related-post-title">
            <div className="title">You might also like...</div>
            <div className="more"><Link href={slug+"/related"}>More</Link></div>
        </div>
        {error&&<div>failed to load</div>}
        {isLoading&&<div>loading...</div>}
        {data&&
        <div className="post-card">
            {data.map(post=>
                <div className="half-card" key={post.id}>
                    <CardHalf 
                        title={post.title}
                        summary = {post.summary}
                        category={post.category}
                        author={post.author}
                        thumbnail={post.thumbnail}
                        slug={post.slug}
                    />  
                </div>
                )}
        </div>
        }
        </>
    )
}
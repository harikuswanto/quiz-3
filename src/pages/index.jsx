import Article from "@/components/article";
import HeaderHome from "@/components/headerHome";
import { useRouter } from "next/router";
import { useState } from "react";

export const linkApi = "https://hsi-sandbox.vercel.app/api";
export default function Index({meta,postsData}) {
    const [posts,setPosts] = useState(postsData);
    const [moreLabel, setMoreLabel] = useState('Load More')

    const router = useRouter();
    const sort = router.query.sort;
    let page = Math.ceil(posts.length/meta.pagination.perPage);
    const total = meta.pagination.totalPages;

    async function loadMore(){
        page++
        setMoreLabel('Loading...');
        const sortString = sort?`&sort=${sort}`:'';
        const res = await fetch(linkApi+`/articles?page=${page}${sortString}`);
        const {data} = await res.json();
        setPosts([...posts,...data]);
        setMoreLabel('Load More');
    }

    return (
    <>
        <HeaderHome setPosts={setPosts}/>
        <div className="container">
            {posts.map(post=>
                <Article 
                    key={post.id}
                    author = {post.author}
                    category = {post.category}
                    thumbnail = {post.thumbnail}
                    title = {post.title}
                    slug = {post.slug}
                />
                )
            }
        </div>
        {page<total&&<button id='loadMore' onClick={loadMore} >{moreLabel}</button>}
        <footer></footer>
    </>
    )
}

export async function getServerSideProps(context){
    const {query} = context;
    const {sort} = query;
    const queryString = sort?`sort=${sort}`:'';
    const res = await fetch(linkApi+'/articles?'+queryString);
    const data = await res.json();
    return {
        props: {meta:data.meta, postsData:data.data}
    }
}
import Article from "@/components/article";
import HeaderHome from "@/components/headerHome";
import { useRouter } from "next/router";
import { useState } from "react";

export default function related({meta,postsData}) {
    const [posts,setPosts] = useState(postsData);
    const router = useRouter();
    const sort = router.query.sort;
    let page = Math.ceil(posts.length/meta.pagination.perPage);
    const total = meta.pagination.totalPages;

    async function sortPosts(sorter){
        const res = await fetch('https://hsi-sandbox.vercel.app/api/articles?sort='+sorter);
        const data = await res.json();
        setPosts(data.data);
        router.push('/?sort='+sorter,undefined,{shallow:true})
    }

    async function loadMore(){
        page++
        const loadButton = document.getElementById('loadMore');
        loadButton.innerHTML='Loading...';
        const sortString = sort?`&sort=${sort}`:'';
        const res = await fetch(`https://hsi-sandbox.vercel.app/api/articles?page=${page}${sortString}`);
        const {data} = await res.json();
        setPosts([...posts,...data]);
        loadButton.innerHTML='Load More';
    }
    return (
        <>
        <HeaderHome sort={sortPosts}/>
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
        {page<total&&<button id='loadMore' onClick={loadMore} >Load More</button>}
        <footer></footer>
    </>
    )
}

export async function getServerSideProps(context){
    const {query} = context;
    const {sort,slug} = query;
    let queryString = sort?`sort=${sort}`:'';
    queryString += '&perPage=1000'
    const res = await fetch('https://hsi-sandbox.vercel.app/api/articles?'+queryString);
    const data = await res.json();
    const postData = data.data;
    const curentPost = postData.find(post=>post.slug===slug);
    if(!curentPost){return {notFound:true}};
    const categoryId = curentPost.category.id;
    const relatedPosts = postData.filter(post=>post.category.id===categoryId);
    const perPage = 4;
    const totalPages = Math.ceil(relatedPosts.length/perPage);
    const meta = {
        pagination:{
            perPage,
            totalPages
        }
    }
    
    return {
        props: {meta, postsData:relatedPosts.slice(0,4)}
    }
}
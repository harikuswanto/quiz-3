import CardFull from "@/components/cardFull";
import Header from "@/components/headerSingle";
import Image from "next/image"
import { useState } from "react";
import { linkApi } from "..";


export default function Related({currentPost,relatedPosts,meta}) {
    const [posts,setPosts] = useState(relatedPosts);
    const [moreLabel,setMoreLabel]= useState("Load More")
    const categoryId=currentPost.category.id;
    let page = Math.ceil(posts.length/meta.pagination.perPage);
    const total = meta.pagination.totalPages;

    async function loadMore(){
        page++
        setMoreLabel('Loading...');
        let urlString = '&categoryId='+categoryId;
        urlString += '&excludedArticleId='+currentPost.id;
        const res = await fetch(`${linkApi}/articles?page=${page}${urlString}`);
        const {data} = await res.json();
        setPosts([...posts,...data]);
        setMoreLabel('Load More');
    }

    return (
        <>
            <Header>
                <div className="container">
                    <div className="related-post-info">Related Post List</div>
                    <div className="current-post">
                        <div className="current-post-thumbnail">
                        <Image
                            className="featured"
                            src={currentPost.thumbnail}
                            alt={currentPost.title}
                            fill
                            objectFit="cover"
                        />
                        </div>
                        <div className="current-post-summary">
                            <h3>
                                {currentPost.title} 
                            </h3>
                            <p>
                                {currentPost.summary}
                            </p>
                        </div>
                    </div>
                </div>
            </Header>
            <main>
                <div className="container">
                    <ul className="related-post-lists">
                        {posts.map((post,index)=>
                            <li key={post.id}>
                                <CardFull
                                    order={index<9?"0"+(index+1):index+1}
                                    title={post.title}
                                    summary={post.summary}
                                    thumbnail={post.thumbnail}
                                    slug={post.slug}
                                />
                            </li>
                        )}
                    </ul>
                </div>
                {page<total&&<button id='loadMore' onClick={loadMore} >{moreLabel}</button>}
            </main>
            <footer></footer>
        </>
    )
}



export async function getServerSideProps(context){
    const {query} = context;
    const {slug} = query;
    let queryString = 'perPage=1000';
    const res = await fetch(linkApi+'/articles?'+queryString);
    const data = await res.json();
    const postData = data.data;
    const currentPost = postData.find(post=>post.slug===slug);
    if(!currentPost){return {notFound:true}};
    const categoryId = currentPost.category.id;
    let relatedPosts = postData.filter(post=>post.category.id===categoryId);
    relatedPosts = relatedPosts.filter(post=>post.id!==currentPost.id)
    const perPage = 4;
    const totalPages = Math.ceil(relatedPosts.length/perPage);
    const meta = {
        pagination:{
            perPage,
            totalPages
        }
    }
    
    return {
        props: {meta, currentPost ,relatedPosts:relatedPosts.slice(0,4)}
    }
}
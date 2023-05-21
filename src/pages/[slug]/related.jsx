import Header from "@/components/headerSingle";
import PostMeta from "@/components/postMeta";
import Image from "next/image"


export default function related({currentPost,relatedPosts,meta}) {
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
                    <ol>
                        {relatedPosts.map(post=>
                            <li key={post.id}>
                                <div>{post.title}</div>
                                <div>{post.summary}</div>
                            </li>
                        )}
                    </ol>
                </div>
            </main>
        </>
    )
}



export async function getServerSideProps(context){
    const {query} = context;
    const {slug} = query;
    let queryString = 'perPage=1000';
    const res = await fetch('https://hsi-sandbox.vercel.app/api/articles?'+queryString);
    const data = await res.json();
    const postData = data.data;
    const currentPost = postData.find(post=>post.slug===slug);
    if(!currentPost){return {notFound:true}};
    const categoryId = currentPost.category.id;
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
        props: {meta, currentPost ,relatedPosts:relatedPosts.slice(0,4)}
    }
}
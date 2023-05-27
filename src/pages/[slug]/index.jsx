import Header from "@/components/headerSingle";
import Image from "next/image"
import PostMeta from "@/components/postMeta";
import Related from "@/components/related";
import { linkApi } from "..";

export default function Slug({post}) {
    const {title,category,author,thumbnail,summary,content,slug,id} = post;

    return (
    <>
        <Header>
            <div className="container">
                <div className="heading">
                    <h2>{title}</h2>
                    <p>{summary}</p>
                    <PostMeta 
                        category={category}
                        author={author}
                    />
                </div>
            </div>
        </Header>
        <main>
            <div className="container">
                <Image
                    className="featured"
                    src={thumbnail}
                    alt={title}
                    priority
                    width={968}
                    height={600}
                />
                <p>{content}</p>
            </div>
        </main>
        <footer>
            <div className="container">
                <Related category={category} slug={slug} articleId={id}/>
            </div>
        </footer>
    </>
    )
}

export async function getStaticPaths(){
    const res = await fetch(linkApi+'/articles?perPage=100');
    const {data} = await res.json();
    const paths = data.map(post=>{
        return{params: {slug: post.slug}}
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context){
    const {params} = context;
    const {slug} = params;
    const res = await fetch(linkApi+'/articles/'+slug);
    const {data} = await res.json();
    return {
        props: {
            post:data
        }
    }
}
import Image from "next/image"
import PostMeta from "./postMeta"
import Link from "next/link"

export default function cardHalf({title,thumbnail,summary,category,author,slug}) {
    return (
        <>
            <Image
                className="card-image"
                src={thumbnail}
                alt={title}
                width={450}
                height={280}
            />
            <PostMeta
                author={author}
                category={category}
            />
            
            <h3><Link href={slug}>{title}</Link></h3>
            <p>{summary}</p>
        </>
    )
}


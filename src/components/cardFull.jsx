import Image from "next/image"
import Link from "next/link"

export default function CardFull({order,title,summary,thumbnail,slug}) {
    return (
    <div className="card-full">
        <div className="post-summary">
            <div className="post-order">
                {order}
            </div>
            <h4>
            <Link href={'/'+slug}>
                {title}
            </Link>
            </h4>
            <p>{summary}</p>
        </div>
        <div className="related-post-thumbnail">
            <Image 
                src={thumbnail}
                alt={title}
                fill
                objectFit="cover"
            />
        </div>
    </div>
    )
}

import Image from "next/image"
import Link from "next/link";
import PostMeta from "./postMeta";
import { useRouter } from "next/router";

export function rangkaiNama({firstName, middleName,lastName}){
    let name = firstName;
    if (middleName) name += " "+middleName;
    if (lastName) name += " "+lastName;
    return  name
}

export default function Article(props) {
    const {author,category,thumbnail,title,slug} = props;
    const router = useRouter();
    return (
        <article>
            <Image
                className="featured"
                src={thumbnail}
                alt={title}
                priority
                width={968}
                height={600}
            />
            <PostMeta 
                category={category}
                author={author}
            />
            <h2>
                <Link href={router.basePath+"/"+slug}>{title}</Link>
            </h2>
        </article>
    )
}

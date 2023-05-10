import Image from "next/image"
import Link from "next/link";

function rangkaiNama({firstName, middleName,lastName}){
    let name = firstName;
    if (middleName) name += " "+middleName;
    if (lastName) name += " "+lastName;
    return  name
}

export default function Article(props) {
    const {author,category,thumbnail,title,slug} = props;
    return (
        <article>
            <Image
            className="featured"
            src={thumbnail}
            alt="Thumbnail"
            priority
            width={968}
            height={600}
            />
            <span className="label">BY </span>
            <span className="value">{rangkaiNama(author)} </span>
            <span className="label">IN </span>
            <span className="value">{category.name}</span>
            <h2>
                <Link href={slug}>{title}</Link>
            </h2>
            
        </article>
    )
}

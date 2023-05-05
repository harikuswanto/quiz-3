import Image from "next/image"

function rangkaiNama({firstName, middleName,lastName}){
    let name = firstName;
    if (middleName) name += " "+middleName;
    if (lastName) name += " "+lastName;
    return  name
}

export default function Article({post}) {
    const {author,category,thumbnail,title} = post;
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
            <h2>{title}</h2>
        </article>
    )
}

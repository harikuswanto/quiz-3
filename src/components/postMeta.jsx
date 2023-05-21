
function rangkaiNama({firstName, middleName,lastName}){
    let name = firstName;
    if (middleName) name += " "+middleName;
    if (lastName) name += " "+lastName;
    return  name
}

export default function PostMeta({author,category}) {
    return (
        <div>
            <span className="label">BY </span>
            <span className="value">{rangkaiNama(author)} </span>
            <span className="label">IN </span>
            <span className="value">{category.name}</span>
        </div>
    )
}

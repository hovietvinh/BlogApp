import {formatISO9075} from "date-fns"
import {Link} from "react-router-dom"
function Post({data}) {
    // console.log("heare");
    // console.log(data,1);
    // console.log(data);
    return (
        <>
            <Link className="post" to={`posts/${data._id}`}>
                <div className="img">
                    <img src={data.cover}/>

                </div>
                <div className="texts">
                <h2>{data.title}</h2>
                <p className="info">
                    <a className="author">{data.user.username}</a>
                    <time >{formatISO9075(new Date(data.createdAt))}</time>
                </p>
                <p className="summary">{data.summary}</p>
                </div>
        
            </Link>
        </>
    );
}

export default Post;
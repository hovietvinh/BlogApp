
function Post({data}) {
    console.log("heare");
    // console.log(data,1);
    return (
        <>
            <div className="post">
                <div className="img">
                    <img src={data.cover}/>

                </div>
                <div className="texts">
                <h2>{data.title}</h2>
                <p className="info">
                    <a className="author">{data.user.username}</a>
                    <time >12-10-2024 20:32</time>
                </p>
                <p className="summary">{data.summary}</p>
                </div>
        
            </div>
        </>
    );
}

export default Post;
export default ViewArticle;

function ViewArticle(props){
    const article = props?.article
    return(
        <>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <img className="img-fluid" src={`img/${article.image}`}  alt="repas "  />
                
                      
                    
                  

        </>
    )
}


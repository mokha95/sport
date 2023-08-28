export  {ViewEvent};

function ViewEvent(props){
    const event = props?.event
    return(
        <>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <img className="img-fluid" src={`img/${event.image}`}  alt={`${event.title}`}  />  
            <p>{event.rdv}</p>          
        </>
    )
}


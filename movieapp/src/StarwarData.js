import { useEffect, useState} from 'react'
import star from './stars.png';
import { Link } from 'react-router-dom';


const StarwarData = () => {
 const [movie, setMovie] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
    fetch('https://swapi.dev/api/films')
    .then((response) => {
        if (!response.ok) {
            throw new Error (`This is an HTTP Error: The status is ${response.status}`)
        } 
        return response.json()
    })
    .then((actualData) => {
        setMovie(actualData.results)
        setError(null);
    })
    .catch((error) => {
        setError(error)
        setMovie(null);

    })
    .finally(() => {
        setLoading(false);

    })
}, []);

   const numLimit = (text, maxlength) => {
    if(text.length > maxlength) {
        return text.slice(0, maxlength).trim()+'';
    } else {
        return text
    }
}



  return (
    <div className='mainContainer'>
        {loading && <div className='loader'>A moment pleaseee....</div>}
        {error && <div> {`There is a problem fetching the data ${error}`} </div> }

        <header>
            <img src={star} alt='starwars' />
        
        </header>

        <div className='container'>
        <ul>
            {movie && movie.map((actualMovie, index) => {
             return (
                    <li key={actualMovie.episode_id} className='wrapper'>

                    <div className='titleDate'>
                   <h2>{actualMovie.title} </h2>
                   <p>{new Date(actualMovie.release_date).toLocaleDateString('en-US', {month:'long', day:'numeric',year:'numeric'})} </p>
                   </div>

                   <p>{numLimit(actualMovie.opening_crawl, 260)}</p>

                   <nav className='info'>

                   <Link to={'/' + (index + 1)}><p>More Info</p></Link>
                   </nav>
                   </li>
             );
                
            })}
        </ul>
        </div>
        

    </div>
  )
}

export default StarwarData
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import star from '../stars.png';




const StarDetails = () => {

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [character, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [species, setSpecies] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const { id } = useParams();



    useEffect(() => {
        const getMovie = async () => {
            try{
                const response = await axios.get(`https://swapi.dev/api/films/${id}`)
                  setMovie(response.data)

                  const fetchCharacter = await Promise.all(response.data.characters.map((url) => axios.get(url).then((res) => res.data) 
                  ));

                  setCharacters(fetchCharacter);

                  const fetchPlanet = await Promise.all(response.data.planets.map((url) => axios.get(url).then((res) => res.data) 
                  ));

                  setPlanets(fetchPlanet);

                  const fetchSpecie = await Promise.all(response.data.species.map((url) => axios.get(url).then((res) => res.data) 
                  ));

                  setSpecies(fetchSpecie);

                  const fetchStarship = await Promise.all(response.data.starships.map((url) => axios.get(url).then((res) => res.data) 
                  ));

                  setStarships(fetchStarship);


                  const fetchVehicle = await Promise.all(response.data.vehicles.map((url) => axios.get(url).then((res) => res.data) 
                  ));

                  setVehicles(fetchVehicle);

                setError(null);
                console.log(response.data)
            } catch (err) {
                setError(err.message);
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };
        getMovie();

    }, [id])

    // const numLimit = (text, maxlength) => {
    //             if(text.length > maxlength) {
    //                 return text.slice(0, maxlength).trim()+'';
    //             } else {
    //                 return text
    //             }
    //         }



  return (
    <div>
         {loading && <div>A moment pleaseee....</div>}
        {error && <div> {`There is a problem fetching the data ${error}`} </div> }
        

                return (
                
                   
                    <header>
            <img src={star} alt='starwars' />
        
              </header>
             

                    <div className='pageWrapper'>
                    <Link to='/' className='navBar'>Back to list</Link>
                    <div className='pageHeader'>

                        <h1>{movie.title}</h1>

                        <p>Director:{movie.director}</p>

                        <p>Producer:{movie.producer}</p>
                    </div>
                    <div>
                        <p className='subject'>Description</p>
                        <p className='essay'>{movie.opening_crawl}</p>
                    </div>
                    <div className='details'>
                        <p className='subject'>Characters</p>
                        <ul>
                            {character.map((character) => (
                             <li key={character.url}>{character.name}</li>

                ))}
                        </ul>

                    </div>
                    <div className='details'>
                        <p className='subject'>Planets</p>
                        <ul>
                            {planets.map((planet) => (
                              <li key={planet.url}>{planet.name}</li>

                            ))}
                        </ul>
    
                    </div>
                    <div className='details'>
                        <p className='subject'>Species</p>
                        <ul>
                            {species.map((specie) => (
                          <li key={specie.url}>{specie.name}</li>

                            ))}
                        </ul>
                    </div>
                    <div className='details'>
                        <p className='subject'>Starships</p>
                        <ul>
                            {starships.map((starship) => (
                              <li key={starship.url}>{starship.name}</li>

                            ))}
                        </ul>
                       
    
                    </div>
                    <div className='details'>
                        <p className='subject'>Vehicles</p>
                        <ul>
                            {vehicles.map((vehicle) => (
                              <li key={vehicle.url}>{vehicle.name}</li>

                            ))}
                        </ul>
    
                    </div>
                    </div>
            
                )
            
           
    

    </div>
  )
}

export default StarDetails
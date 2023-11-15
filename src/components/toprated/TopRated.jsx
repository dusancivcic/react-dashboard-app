import { useEffect, useState } from 'react';
import './TopRated.css'
import Spinner from '../spinner/Spinner';

const TopRated = () => {
    
    const [loading, setLoading] = useState(true)

    const [reds, setReds] = useState(null)
    const [whites, setWhites] = useState(null)
    const [rose, setRose] = useState(null)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            fetch("https://api.sampleapis.com/wines/reds").then(response => response.json()),
            fetch("https://api.sampleapis.com/wines/whites").then(response => response.json()),
            fetch("https://api.sampleapis.com/wines/rose").then(response => response.json())
        ]).then(([redsData, whitesData, roseData]) => {
            setReds(redsData);
            setWhites(whitesData);
            setRose(roseData);
            setTimeout(function(){
                setLoading(false)
            },400)
        }).catch(error => {
            console.error('Error fetching data:', error);
            setTimeout(function(){
                setLoading(false)
            },400)
        });
    }, []);

    const sortedWines = (wineList) => wineList?.sort((a, b) => {
        // Calculate a combined score based on average rating and reviews
        const scoreA = parseFloat(a.rating.average) * parseInt(a.rating.reviews);
        const scoreB = parseFloat(b.rating.average) * parseInt(b.rating.reviews);
      
        // Sort in descending order
        return scoreB - scoreA;
      });
      
      const topRed3Wines = sortedWines(reds)?.slice(0, 3);
      const topWhite3Wines = sortedWines(whites)?.slice(0, 3);
      const topRose3Wines = sortedWines(rose)?.slice(0, 3);

    return(
        <div className='wineListContainer'>
            <h2>Top 3 red wines</h2>

            <div className='wineListGrid'>
            {
                loading ? (
                    <Spinner />
                ) : (
                    
                topRed3Wines?.map((card) => (
                <div className='wineListCard'>
                    <div className='wineListCardImage'>
                        <img src={card.image} alt={card.wine} />
                    </div>
                    <div className='wineListCardText'> 
                        <h3>{card.wine}</h3>
                        <p>{card.winery}</p>
                        <p>{card.location}</p>
                        <div className='wineRating'>
                            <div>
                                <p>{card.rating.average}</p>
                            </div>
                            <p>{card.rating.reviews}</p>
                        </div>
                    </div>
                </div>   
                    ))
              
                )
            }
              </div>


            <h2>Top 3 white wines</h2>

            <div className='wineListGrid'>
            {
                loading ? (
                    <Spinner />
                ) : (
                    
                topWhite3Wines?.map((card) => (
                <div className='wineListCard'>
                    <div className='wineListCardImage'>
                        <img src={card.image} alt={card.wine} />
                    </div>
                    <div className='wineListCardText'> 
                        <h3>{card.wine}</h3>
                        <p>{card.winery}</p>
                        <p>{card.location}</p>
                        <div className='wineRating'>
                            <div>
                                <p>{card.rating.average}</p>
                            </div>
                            <p>{card.rating.reviews}</p>
                        </div>
                    </div>
                </div>   
                    ))
              
                )
            }
              </div> 

            <h2>Top 3 rose wines</h2>

            <div className='wineListGrid'>
            {
                loading ? (
                    <Spinner />
                ) : (
                    
                topRose3Wines?.map((card) => (
                <div className='wineListCard'>
                    <div className='wineListCardImage'>
                        <img src={card.image} alt={card.wine} />
                    </div>
                    <div className='wineListCardText'> 
                        <h3>{card.wine}</h3>
                        <p>{card.winery}</p>
                        <p>{card.location}</p>
                        <div className='wineRating'>
                            <div>
                                <p>{card.rating.average}</p>
                            </div>
                            <p>{card.rating.reviews}</p>
                        </div>
                    </div>
                </div>   
                    ))
              
                )
            }
              </div>

              
        </div>
    )
}

export default TopRated;
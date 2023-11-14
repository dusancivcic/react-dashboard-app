import './WineList.css'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'

const WineList = () =>{

    const {wineSort} = useParams()
    const [wineCards, setWineCards] = useState(null)

    const [limit, setLimit] = useState(21)
    const [searchWines, setSearchWines] = useState('')

    useEffect(()=>{
        fetch(`https://api.sampleapis.com/wines/${wineSort}`)
        .then(res => res.json())
        .then(data => setWineCards(data))
    }, [])

    const loadMore = () => {
        setLimit(prevState => prevState + 21)
    }

    const searchWinesHandler = e => {
        setSearchWines(e.target.value)
        console.log(searchWines);
    }


    return(
        <>
            <div className='wineListContainer'>
                <header id='header'>

                {
                    (wineSort==='reds') &&
                    <h1>Red wines</h1>
                }
                {
                    (wineSort==='whites') &&
                    <h1>White wines</h1>
                }
                {
                    (wineSort==='rose') &&
                    <h1>Rose wines</h1>
                }

                <input className='wineSearch' type="search" value={searchWines} onChange={e => searchWinesHandler(e)} />
                </header>
                <div className='wineListGrid'>
                {
                    wineCards?.slice(0, limit).filter(el => (
                        el.wine.toLowerCase().includes(searchWines.toLowerCase().trim())
                    )).map(card=>(
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
                }            
                </div>
                  <button className='loadMoreButton' onClick={loadMore}>Load more</button>
            </div>
        </>
    )
}

export default WineList
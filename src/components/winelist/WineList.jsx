import './WineList.css'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from '../spinner/Spinner'
import Select from 'react-select'

const WineList = () =>{

    const {wineSort} = useParams()
    const [wineCards, setWineCards] = useState(null)

    const [limit, setLimit] = useState(21)
    const [searchWines, setSearchWines] = useState('')
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState(null)

    const [selectedOption, setSelectedOption] = useState('average'); // Set the default value to null

    useEffect(()=>{
        setLoading(true)
        fetch(`https://api.sampleapis.com/wines/${wineSort}`)
        .then(res => res.json())
        .then(data => setWineCards(data))
        setTimeout(function(){
            setLoading(false)
        },400)
        if(wineSort==='reds'){
            setTitle('Red wines')
        }else if(wineSort==='whites'){
            setTitle('White wines')
        }else if(wineSort==='rose'){
            setTitle('Rose wines')
        }
        setSelectedOption(null)
    }, [wineSort])



    const loadMore = () => {
        setLimit(prevState => prevState + 21)
    }

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: '#242424', // Set the background color here
          border: 'none',
          width: '150px',
          fontSize: '15px',
          color: '#fff!important',
          fontFamily: 'Roboto',
          borderRadius: '5px',
          boxShadow: 'none',
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: '#242424',
        }),
        option: (provided, state) => ({
            ...provided,
            color: '#fff',
            border: 'none',
            fontFamily: 'Roboto',
            fontSize: '13px',
            boxShadow: 'none',
            backgroundColor: state.isSelected ? '#ceaf00' : '#242424', // Set the background color for the options
            '&:hover': {
              backgroundColor: '#ceaf00', // Set the background color on hover
            },
        }),
        // Add more styles as needed for other elements like option, menu, etc.
      };

    const handleChange = (e) =>{
        setSelectedOption(e);
        if(e.value === 'average'){
            const sortedByAverage = [...wineCards].sort((a, b) => {
              
                const averageA = a.rating.average;
                const averageB = b.rating.average;
              
                return averageB - averageA;
              });
            setWineCards(sortedByAverage)
        }else if(e.value === 'reviews'){
            const sortedByReviews = [...wineCards].sort((a, b) => {
                const extractNumber = (str) => {
                  const match = str.match(/\d+/);
                  return match ? parseInt(match[0], 10) : 0;
                };
              
                const reviewsA = extractNumber(a.rating.reviews);
                const reviewsB = extractNumber(b.rating.reviews);
              
                return reviewsB - reviewsA;
              });
              
              setWineCards(sortedByReviews);
        }else if(e.value === 'alphabet'){
            const sortedByAlphabet = [...wineCards].sort((a, b) => a.wine.localeCompare(b.wine))
            setWineCards(sortedByAlphabet)
        }
    }

    const searchWinesHandler = e => {
        setSearchWines(e.target.value)
    }

    const options = [
        { value: 'average', label: 'average' },
        { value: 'reviews', label: 'reviews' },
        { value: 'alphabet', label: 'alphabet' }
      ]
    
    

    return(
        <div className='wineListContainer'>
            <header id='header'>
            <h1>{title}</h1>
            <div className='search-filter-container'>
                <Select onChange={handleChange} options={options} value={selectedOption} styles={customStyles}/>
                <input className='wineSearch' type="search" value={searchWines} onChange={e => searchWinesHandler(e)} />
            </div>
            </header>
            
            {
                loading ? (
                    <Spinner />
                ) : (
                    <>
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
                    </>
                )
            }            
            
            
        </div>
    )
}

export default WineList
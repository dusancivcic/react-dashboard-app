import { useState, useEffect } from 'react';
import './Statistics.css'
import PieChart from '../piechart/PieChart';
import { Pie, Bar, Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const Statistics = () => {

    
    const [reds, setReds] = useState(null)
    const [whites, setWhites] = useState(null)
    const [rose, setRose] = useState(null)
    const [allWines, setAllWines] = useState(null)

    useEffect(() => {
        Promise.all([
            fetch("https://api.sampleapis.com/wines/reds").then(response => response.json()),
            fetch("https://api.sampleapis.com/wines/whites").then(response => response.json()),
            fetch("https://api.sampleapis.com/wines/rose").then(response => response.json())
        ]).then(([redsData, whitesData, roseData]) => {
            setReds(redsData);
            setWhites(whitesData);
            setRose(roseData);
            setAllWines(redsData,whitesData,roseData)
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);


    const wineDuplicatedLocations = allWines?.map(wine=> wine.location.split('\n')[0])
    const redWinesRating = reds?.map(wine=> wine.rating.average)
    const whiteWinesRating = whites?.map(wine=> wine.rating.average)
    const roseWinesRating = rose?.map(wine=> wine.rating.average)

    const roseRatingCount = roseWinesRating?.reduce((counts, rating) => {
        const key = rating || 'Unknown';
  
        if (!counts[key]) {
          counts[key] = 1;
        } else {
          counts[key]++;
        }
  
        return counts;
      }, {});
      const uniqueRoseRating = Object.keys(roseRatingCount || {});
  

      const whiteRatingCount = whiteWinesRating?.reduce((counts, rating) => {
        const key = rating || 'Unknown';
  
        if (!counts[key]) {
          counts[key] = 1;
        } else {
          counts[key]++;
        }
  
        return counts;
      }, {});

      const uniqueWhiteRating = Object.keys(whiteRatingCount || {});

console.log(whiteRatingCount)

    const redRatingCount = redWinesRating?.reduce((counts, rating) => {
        const key = rating || 'Unknown';
  
        if (!counts[key]) {
          counts[key] = 1;
        } else {
          counts[key]++;
        }
  
        return counts;
      }, {});
      const uniqueRedRating = Object.keys(redRatingCount || {});
      
      

    //PITAJ MARKA



    const countryCounts = wineDuplicatedLocations?.reduce((counts, country) => {
        const key = country || 'Unknown';
        if (!counts[key]) {
          counts[key] = 1;
        } else {
          counts[key]++;
        }
  
        return counts;
      }, {});
      console.log(countryCounts);
      //PITAJ MARKA OVAJ DIO SE ODNOSI NAJVISE 
      const uniqueCountries = Object.keys(countryCounts || {})

    const pieData = {
        labels: ["Red wines", "White wines", "Rose wines"],
        datasets:[{
            data: [reds?.length,whites?.length,rose?.length],
        }]
    }

    const barData = {
        labels: uniqueCountries,
        datasets:[{
            label: 'Number of wines',
            data: countryCounts,
        }]
    }

    const overallRating = [...uniqueRedRating, ...uniqueWhiteRating, ...uniqueRoseRating]
    const uniqueRating = Array.from(new Set(overallRating)).sort((a, b) => a - b);
    
    const LineData = {
        labels: uniqueRating,
        datasets: [{
          label: 'Red wines',
          data: redRatingCount,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
            label: 'White wines',
            data: whiteRatingCount,
            fill: false,
            borderColor: 'rgb(75, 92, 192)',
            tension: 0.1
        },
        {
            label: 'Rose wines',
            data: roseRatingCount,
            fill: false,
            borderColor: 'rgb(75, 192, 92)',
            tension: 0.1
        }]
      };

    return(
        <div className='wineListContainer'>
            <div className='chart-grid'>
                <div className='chart-card'>
                    <h2>Sort numbers</h2>
                    <Pie data={pieData} />
                </div>
                <div className='chart-card'>
                    <h2>Wines by country</h2>
                    <Bar data={barData} />
                </div>
                <div className='chart-card'>
                    <h2>Wine ratings</h2>
                    <Line data={LineData} />
                </div>
            </div>
        </div>
    )
}

export default Statistics;
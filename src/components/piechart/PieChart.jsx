import './PieChart.css'
import {Bar} from "react-chartjs-2"

const PieChart = ({chartData}) =>{
    return(
        <Bar data={chartData} />
    )
}

export default PieChart;
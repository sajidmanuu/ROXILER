import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPieChart } from '../features/pieChartSlice';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ month }) => {
    const dispatch = useDispatch();
    const pieChart = useSelector((state) => state.pieChart);
    const { data, status } = pieChart;

    useEffect(() => {
        dispatch(fetchPieChart(month));
    }, [dispatch, month]);

    const chartData = {
        labels: data.map((item) => item.category),
        datasets: [
            {
                label: 'Number of Items',
                data: data.map((item) => item.count),
                backgroundColor: [
                    'rgba(255,99,132,0.2)',
                    'rgba(54,162,235,0.2)',
                    'rgba(255,206,86,0.2)',
                    'rgba(75,192,192,0.2)',
                    'rgba(153,102,255,0.2)',
                    'rgba(255,159,64,0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54,162,235,1)',
                    'rgba(255,206,86,1)',
                    'rgba(75,192,192,1)',
                    'rgba(153,102,255,1)',
                    'rgba(255,159,64,1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div >
            <h3>Pie Chart Stats - {month}</h3>
            {status === 'loading' ? (
                <p>Loading...</p>
            ) : (
                <Pie style={{maxWidth:'30vw',maxHeight:'55vh',marginLeft:'100px'}} data={chartData} />
            )}
        </div>
    );
};

export default PieChart;

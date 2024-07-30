import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBarChart } from '../features/barChartSlice';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = ({ month }) => {
    const dispatch = useDispatch();
    const barChart = useSelector((state) => state.barChart);
    const { data, status } = barChart;

    useEffect(() => {
        dispatch(fetchBarChart(month));
    }, [dispatch, month]);

    const chartData = {
        labels: data.map((item) => item.range),
        datasets: [
            {
                label: 'Number of Items',
                data: data.map((item) => item.count),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{maxHeight:'80vh',marginLeft:'100px'}}>
            <h3>Bar Chart Stats - {month}</h3>
            {status === 'loading' ? (
                <p>Loading...</p>
            ) : (
                <Bar data={chartData} />
            )}
        </div>
    );
};

export default BarChart;

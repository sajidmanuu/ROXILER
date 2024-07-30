import React, { useState } from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import Statistics from '../components/Statistics';
import TransactionsTable from '../components/TransactionsTable';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const [month, setMonth] = useState('March');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    return (
        <div style={{ margin: '5px 100px' }}>
            <h1>Dashboard</h1>
            <h4 style={{marginLeft:'90px'}}>Select Months</h4>
            <select style={{borderRadius:'5px',color:'#555',width:'10vw',marginLeft:'75px'}} value={month} onChange={handleMonthChange}>
                {months.map((monthName) => (
                    <option key={monthName} value={monthName}>
                        {monthName}
                    </option>
                ))}
            </select>
            
            <BarChart month={month} />
            <div className="charts-container">
            <Statistics month={month} />
            <PieChart className="pie" month={month} />
            </div>
            <TransactionsTable />
        </div>
    );
};

export default Dashboard;

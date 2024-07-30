import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../features/statsSlice';

const Statistics = ({ month }) => {
    const dispatch = useDispatch();
    const stats = useSelector((state) => state.stats);
    const { totalSaleAmount, totalSoldItems, totalNotSoldItems, status } = stats;

    useEffect(() => {
        dispatch(fetchStats(month));
    }, [dispatch, month]);

    return (
        <div>
            <h3 style={{color:'#555'}}>Statistics - {month}</h3>
            {status === 'loading' ? (
                <p>Loading...</p>
            ) : (
                <div style={{marginLeft:'150px',color:'#555',borderRadius:'30px',backgroundColor:'yellow',width:'250px',height:'180px',textAlign:'center',alignItems:'center',marginTop:'80px',padding:'20px'}}>
                    <p>Total Sale Amount: ${totalSaleAmount}</p>
                    <p>Total Sold Items: {totalSoldItems}</p>
                    <p>Total Not Sold Items: {totalNotSoldItems}</p>
                </div>
            )}
        </div>
    );
};

export default Statistics;

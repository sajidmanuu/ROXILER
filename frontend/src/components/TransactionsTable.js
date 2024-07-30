import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../features/transactionsSlice';

const TransactionsTable = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions);
    const { transactions: data, status } = transactions;
    const [count, setCount] = useState(1);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [month, setMonth] = useState('March');
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const [expandedTitles, setExpandedTitles] = useState({});

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        dispatch(fetchTransactions({ month, search, page, perPage }));
    }, [dispatch, month, search, page, perPage]);

    const toggleDescription = (id) => {
        setExpandedDescriptions((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const toggleTitle = (id) => {
        setExpandedTitles((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length <= wordLimit) {
            return text;
        }
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    return (
        <div style={{marginTop:'100px'}}>
            <h3>Transactions Table - {month}</h3>
            <div>
            <input
                type="text"
                placeholder="Enter title, dec, price"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: '8px',color:'#555' }}
            />

                <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    style={{border:'2px solid #555',borderRadius:'5px'}}
                >
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>
            {status === 'loading' ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                        <th>S.N</th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sold</th>
                            <th>Date Of Sale</th>
                            <th>Images</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((transaction,index) => (
                            <tr key={transaction._id}>
                                <td>{index+1}</td>
                                <td>{transaction.id}</td>
                                <td>
                                    {expandedTitles[transaction._id]
                                        ? transaction.title
                                        : truncateText(transaction.title, 7)}
                                    {transaction.title.split(' ').length > 7 && (
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleTitle(transaction._id);
                                            }}
                                            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            {expandedTitles[transaction._id] ? 'Less..' : 'More..'}
                                        </a>
                                    )}
                                </td>
                                <td>
                                    {expandedDescriptions[transaction._id]
                                        ? transaction.description
                                        : truncateText(transaction.description, 15)}
                                    {transaction.description.split(' ').length > 15 && (
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleDescription(transaction._id);
                                            }}
                                            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            {expandedDescriptions[transaction._id] ? 'Less..' : 'More..'}
                                        </a>
                                    )}
                                </td>
                                <td>{transaction.price}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.sold ? 'Yes' : 'No'}</td>
                                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                                <td style={{ width: '10px', height: '10px', borderRadius: '50%' }}>
                                    <img 
                                        src={transaction.image} 
                                        style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
                                        alt="transaction"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div>
                <p >Page : {count}</p>
                <button 
                    onClick={() => {
                        setPage(page - 1);
                        setCount((pre) => pre - 1);
                    }} 
                    disabled={page === 1}
                >
                    Previous
                </button>

                <button 
                    onClick={() => {
                        setPage(page + 1);
                        setCount((pre) => pre + 1);
                    }} 
                >
                    Next
                </button>

                <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
};

export default TransactionsTable;

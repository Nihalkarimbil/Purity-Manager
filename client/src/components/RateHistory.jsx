import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMetalRates, getsearchRates } from '../lib/strore/Slices/RateSlice';

function RateHistory() {
    const dispatch = useDispatch();

    const { rates, totalPages } = useSelector((state) => state.Rate);
    const [searchTerm, setSearchTerm] = useState('');
    const METALS = ['Gold', 'Silver', 'Platinum'];
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(5);


    useEffect(() => {
        dispatch(getMetalRates({ page: currentPage, limit }));
    }, [dispatch, currentPage, limit]);


    const handleTextSearch = () => {
        setCurrentPage(1);
        if (searchTerm.trim() === '') {
            dispatch(getMetalRates({ page: 1, limit }));
        } else {
            dispatch(getsearchRates({ query: searchTerm, page: 1, limit }));
        }
    };

    const handleDropdownChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1);
        if (value === '') {
            dispatch(getMetalRates({ page: 1, limit }));
        } else {
            dispatch(getsearchRates({ query: value, page: 1, limit }));
        }
    };
    

    return (
        <div className="p-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">All Rate History</h2>
                    <div className="flex space-x-4 items-center">

                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by metal or purity..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                className="p-2 border-2 border-gray-200 rounded-2xl ml-2 hover:bg-gray-100 hover:cursor-pointer"
                                onClick={handleTextSearch}
                            >
                                Search
                            </button>
                        </div>


                        <select
                            value={searchTerm}
                            onChange={handleDropdownChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:cursor-pointer"
                        >
                            <option value="">All Metals</option>
                            {METALS.map((metal) => (
                                <option key={metal} value={metal}>
                                    {metal}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Metal</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Purity</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rate (₹/gram)</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rates.map((rate) => (
                                <tr key={rate._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-800">{rate.metal}</td>
                                    <td className="py-3 px-4 text-gray-800">{rate.purity?.purityName}</td>
                                    <td className="py-3 px-4 font-semibold text-green-600">₹{rate.rate}</td>
                                    <td className="py-3 px-4 text-gray-600">{new Date(rate.rateDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {rates.length === 0 && (
                        <div className="text-center text-gray-500 py-6">No rates found.</div>
                    )}
                </div>
                <div className="flex justify-center mt-6 space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
}

export default RateHistory;

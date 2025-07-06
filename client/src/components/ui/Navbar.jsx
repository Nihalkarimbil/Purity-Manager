import React, { useState } from 'react';
import { Coins, Menu, X, TrendingUp, Clock, Settings } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('purity');

    const currentTime = new Date().toLocaleString();

    return (
        <>
            <div className="bg-white rounded-2xl shadow-2xl mb-8 overflow-hidden border border-gray-100">
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-2 border-b border-gray-200">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {currentTime}
                            </span>
                            <span className="hidden sm:block">Live Market Data</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-600 font-medium">Online</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
                    
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div>
                        <div className="absolute top-8 -left-8 w-32 h-32 bg-white rounded-full"></div>
                        <div className="absolute bottom-4 right-1/3 w-16 h-16 bg-white rounded-full"></div>
                    </div>

                    <div className="relative z-10 p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                                        <Coins className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                                            Metal Rate Manager
                                        </h1>
                                        <p className="text-blue-100 text-sm sm:text-base mt-1">
                                            Professional Trading Platform
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-8 px-4">
                <div className="bg-white rounded-2xl shadow-xl p-3 flex flex-col sm:flex-row max-w-4xl border border-gray-100">
                    <button
                        onClick={() => {
                            setActiveTab('purity');
                            navigate('/');
                        }}
                        className={`w-full sm:w-auto text-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 mb-2 sm:mb-0 sm:mr-2 flex items-center justify-center gap-2 ${activeTab === 'purity'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                            : 'text-blue-600 hover:bg-blue-50 hover:shadow-md hover:cursor-pointer'
                            }`}
                    >
                        <Settings className="w-5 h-5" />
                        <span>Purity Management</span>
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('rates');
                            navigate('/ratemanagement');
                        }}
                        className={`w-full sm:w-auto text-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 mb-2 sm:mb-0 sm:mr-2 flex items-center justify-center gap-2 ${activeTab === 'rates'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                            : 'text-blue-600 hover:bg-blue-50 hover:shadow-md hover:cursor-pointer'
                            }`}
                    >
                        <TrendingUp className="w-5 h-5" />
                        <span>Rate Management</span>
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('history');
                            navigate('/ratehistory');
                        }}
                        className={`w-full sm:w-auto text-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'history'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                            : 'text-blue-600 hover:bg-blue-50 hover:shadow-md hover:cursor-pointer'
                            }`}
                    >
                        <Clock className="w-5 h-5" />
                        <span>Rate History</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PromoPage = () => {
    const [promos, setPromos] = useState([]);

    useEffect(() => {
        const storedPromos = JSON.parse(localStorage.getItem('promos')) || [];
        setPromos(storedPromos);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
            <div className="container mx-auto">
                <h1 className="text-5xl font-bold text-center mb-12">Promos</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {promos.map((promo, index) => (
                        <motion.div
                            key={promo.id}
                            className="bg-gray-800 rounded-lg p-6 flex flex-col"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h2 className="text-2xl font-bold mb-2">{promo.title}</h2>
                            <p className="text-gray-400 mb-4 flex-grow">{promo.description}</p>
                            <p className="text-sm text-gray-500 mb-4">Expires on: {new Date(promo.endDate).toLocaleDateString()}</p>
                            <Link
                                to={`/promo/${promo.id}`}
                                className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-center"
                            >
                                View Details
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromoPage;

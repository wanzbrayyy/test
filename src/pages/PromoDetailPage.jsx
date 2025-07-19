import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PromoDetailPage = () => {
    const { id } = useParams();
    const [promo, setPromo] = useState(null);

    useEffect(() => {
        const storedPromos = JSON.parse(localStorage.getItem('promos')) || [];
        const currentPromo = storedPromos.find(p => p.id.toString() === id);
        setPromo(currentPromo);
    }, [id]);

    if (!promo) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <h1 className="text-4xl">Promo not found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl font-bold text-center mb-4">{promo.title}</h1>
                    <p className="text-xl text-center text-gray-400 mb-8">{promo.description}</p>
                    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Claim Your Promo</h2>
                        <p className="mb-4">
                            This promo expires on: {new Date(promo.endDate).toLocaleDateString()}
                        </p>
                        {}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PromoDetailPage;

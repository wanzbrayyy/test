import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PromoHeader = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date('2024-12-31') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 text-center">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <p className="font-bold">Promo Spesial!</p>
                    <p>
                        {timerComponents.length ? timerComponents : <span>Waktu habis!</span>}
                    </p>
                </div>
                <Link
                    to="/promo"
                    className="bg-white text-purple-500 font-bold py-2 px-4 rounded"
                >
                    Lihat Detail
                </Link>
            </div>
        </div>
    );
};

export default PromoHeader;

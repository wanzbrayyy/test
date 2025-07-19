import React from 'react';
import { useParams } from 'react-router-dom';
import { testimonialsData } from './PortfolioPage'; // Assuming testimonialsData is exported from PortfolioPage
import { decryptId } from '@/lib/crypto';

const TestimonialDetailPage = () => {
    const { id } = useParams();
    const decryptedId = decryptId(id);
    const testimonial = testimonialsData.find(
        (t) => t.id.toString() === decryptedId
    );

    if (!testimonial) {
        return <div>Testimonial not found</div>;
    }

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-4xl font-bold text-center mb-8">{testimonial.title}</h1>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <img
                    src={testimonial.image}
                    alt={testimonial.title}
                    className="w-full h-96 object-cover rounded-lg mb-8"
                />
                <p className="text-lg mb-4">{testimonial.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{testimonial.price}</span>
                    <span className="text-gray-500">by {testimonial.author}</span>
                </div>
            </div>
        </div>
    );
};

export default TestimonialDetailPage;

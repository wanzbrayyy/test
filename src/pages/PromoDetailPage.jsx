import React, { useState } from 'react';

const PromoDetailPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [product, setProduct] = useState('Produk A');

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = `Halo, saya tertarik dengan promo. Nama: ${name}, Email: ${email}, Produk: ${product}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=6281234567890&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Detail Promo</h1>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Promo Spesial Akhir Tahun!</h2>
                <p className="mb-4">
                    Dapatkan diskon 50% untuk semua produk digital kami. Promo berlaku hingga 31 Desember 2024.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Nama
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="product" className="block text-gray-700 font-bold mb-2">
                            Pilih Produk
                        </label>
                        <select
                            id="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option>Produk A</option>
                            <option>Produk B</option>
                            <option>Produk C</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Beli Sekarang
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PromoDetailPage;

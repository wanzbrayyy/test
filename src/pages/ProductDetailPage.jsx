import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slugify } from '@/lib/utils';

// This would typically come from a data source or API
const products = [
    {
      name: 'free portfolio template',
      price: 'gratis',
      description: 'template portofolio dasar untuk memulai karir anda. responsif dan mudah dikustomisasi.',
      longDescription: 'This free portfolio template is perfect for developers, designers, and creatives who want a simple yet professional online presence. Built with HTML, CSS, and vanilla JavaScript, it\'s lightweight, fully responsive, and easy to customize. The code is well-commented to help you get started quickly.',
      tags: ['html', 'css', 'js'],
      file: '/files/free-portfolio.zip',
      color: 'from-green-400 to-emerald-500',
      icon: 'fa-gift',
    },
    {
      name: 'kode toko online premium',
      price: 'rp 50.000',
      description: 'source code lengkap toko online dengan react & tailwindcss. siap pakai!',
      longDescription: 'Get a head start on your e-commerce project with this premium online store source code. Built with React and Tailwind CSS, it features a modern design, product pages, a shopping cart, and a checkout process. The code is clean, modular, and ready for you to connect to your own backend.',
      tags: ['react', 'tailwind', 'shop'],
      file: '/files/premium-shop.zip',
      color: 'from-purple-400 to-pink-500',
      icon: 'fa-shopping-cart',
    },
    {
      name: 'script vps auto-install',
      price: 'rp 75.000',
      description: 'script bash untuk instalasi otomatis server vps (lemp stack). hemat waktu setup.',
      longDescription: 'Save hours of setup time with this powerful Bash script for automating the installation of a LEMP (Linux, Nginx, MySQL, PHP) stack on your VPS. The script is configurable and handles all the necessary installations and configurations, so you can get your server ready in minutes.',
      tags: ['vps', 'bash', 'server'],
      file: '/files/vps-script.zip',
      color: 'from-blue-400 to-cyan-500',
      icon: 'fa-server',
    },
    {
      name: 'panel pterodactyl modifikasi',
      price: 'rp 150.000',
      description: 'panel pterodactyl dengan tema custom dan fitur tambahan untuk hosting game.',
      longDescription: 'Supercharge your game hosting with this modified Pterodactyl panel. It includes a custom, modern theme and additional features to enhance your hosting experience. The panel is optimized for performance and includes detailed documentation for installation and configuration.',
      tags: ['pterodactyl', 'panel', 'game'],
      file: '/files/ptero-panel.zip',
      color: 'from-orange-400 to-red-500',
      icon: 'fa-gamepad',
    },
];

const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = products.find(p => slugify(p.name) === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-4xl">Product not found</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className={`w-48 h-48 bg-gradient-to-br ${product.color} rounded-full flex items-center justify-center mx-auto mb-8`}>
                <i className={`fas ${product.icon} text-white text-6xl`}></i>
              </div>
              <h1 className="text-4xl font-bold text-center mb-4">{product.name}</h1>
              <div className="flex justify-center gap-2 mb-8">
                {product.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">About this product</h2>
              <p className="text-gray-300 mb-6">{product.longDescription}</p>
              <div className="text-4xl font-bold text-cyan-400 mb-8">{product.price}</div>
              <motion.button
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 bg-gradient-to-r ${product.color}`}
                  whileHover={{ scale: 1.02, filter: 'brightness(1.2)' }}
                  whileTap={{ scale: 0.98 }}
              >
                  <i className={`fas ${product.price === 'gratis' ? 'fa-download' : 'fa-credit-card'} mr-2`}></i>
                  {product.price === 'gratis' ? 'Download Now' : 'Buy Now'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

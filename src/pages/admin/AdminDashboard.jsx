import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

// Mock data, in a real app this would come from a database
const initialTestimonials = [
  {
    id: 1,
    title: 'Website Toko Baju Online',
    description: 'Toko online dengan desain modern, fitur lengkap, dan sangat mudah digunakan. Penjualan meningkat drastis setelah launching!',
    price: 'Rp500.000',
    status: 'Selesai',
    author: 'Wanzofc',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 2,
    title: 'Landing Page Event Musik',
    description: 'Landing page interaktif dengan animasi GSAP yang memukau. Informasi event tersampaikan dengan sangat baik dan menarik.',
    price: 'Rp100.000',
    status: 'Selesai',
    author: 'Wanzofc',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
];

const AdminDashboard = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    title: '',
    description: '',
    price: '',
    status: 'selesai',
    author: 'wanzofc',
    image: ''
  });

  const [promos, setPromos] = useState([]);
  const [newPromo, setNewPromo] = useState({
    title: '',
    description: '',
    endDate: '',
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedTestimonials = JSON.parse(localStorage.getItem('testimonials'));
    if (storedTestimonials && storedTestimonials.length > 0) {
      setTestimonials(storedTestimonials);
    } else {
      localStorage.setItem('testimonials', JSON.stringify(initialTestimonials));
      setTestimonials(initialTestimonials);
    }

    const storedPromos = JSON.parse(localStorage.getItem('promos'));
    if (storedPromos) {
      setPromos(storedPromos);
    }
  }, []);

  const handleInputChange = (e, setState) => {
    setState({ ...newTestimonial, [e.target.name]: e.target.value });
  };

  const handlePromoInputChange = (e) => {
    setNewPromo({ ...newPromo, [e.target.name]: e.target.value });
  }

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    if (!newTestimonial.title || !newTestimonial.description || !newTestimonial.price) {
      toast({
        title: "gagal menambahkan",
        description: "harap isi semua field yang diperlukan.",
        variant: "destructive"
      });
      return;
    }

    const newEntry = {
      id: Date.now(), // Use timestamp for unique ID
      ...newTestimonial,
      image: newTestimonial.image || `https://source.unsplash.com/random/800x600?tech,website&sig=${Date.now()}`
    };
    const updatedTestimonials = [...testimonials, newEntry];
    setTestimonials(updatedTestimonials);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    setNewTestimonial({ title: '', description: '', price: '', status: 'selesai', author: 'wanzofc', image: '' });
    toast({
      title: "berhasil!",
      description: "portofolio baru telah ditambahkan.",
    });
  };

  const handleDeleteTestimonial = (id) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    setTestimonials(updatedTestimonials);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    toast({
      title: "berhasil!",
      description: "portofolio telah dihapus.",
      variant: "destructive"
    });
  };

  const handleAddPromo = (e) => {
    e.preventDefault();
    if (!newPromo.title || !newPromo.description || !newPromo.endDate) {
      toast({
        title: "gagal menambahkan",
        description: "harap isi semua field yang diperlukan.",
        variant: "destructive"
      });
      return;
    }

    const updatedPromos = [...promos, { ...newPromo, id: Date.now() }];
    setPromos(updatedPromos);
    localStorage.setItem('promos', JSON.stringify(updatedPromos));
    setNewPromo({ title: '', description: '', endDate: '' });
    toast({
      title: "berhasil!",
      description: "promo baru telah ditambahkan.",
    });
  };

  const handleDeletePromo = (id) => {
    const updatedPromos = promos.filter(p => p.id !== id);
    setPromos(updatedPromos);
    localStorage.setItem('promos', JSON.stringify(updatedPromos));
    toast({
      title: "berhasil!",
      description: "promo telah dihapus.",
      variant: "destructive"
    });
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "logout berhasil!",
      description: "anda telah keluar dari dashboard admin.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 lowercase">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">admin dashboard</h1>
          <Button onClick={handleLogout} variant="destructive">
            <i className="fas fa-sign-out-alt mr-2"></i> logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">kelola portofolio</h2>
            <form onSubmit={handleAddTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input type="text" name="title" value={newTestimonial.title} onChange={(e) => handleInputChange(e, setNewTestimonial)} placeholder="judul proyek" className="bg-gray-700 p-3 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none" required />
              <input type="text" name="price" value={newTestimonial.price} onChange={(e) => handleInputChange(e, setNewTestimonial)} placeholder="harga (e.g., rp500.000)" className="bg-gray-700 p-3 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none" required />
              <textarea name="description" value={newTestimonial.description} onChange={(e) => handleInputChange(e, setNewTestimonial)} placeholder="deskripsi proyek" className="md:col-span-2 bg-gray-700 p-3 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none" rows="3" required></textarea>
              <input type="text" name="image" value={newTestimonial.image} onChange={(e) => handleInputChange(e, setNewTestimonial)} placeholder="url gambar (opsional)" className="bg-gray-700 p-3 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none" />
              <select name="status" value={newTestimonial.status} onChange={(e) => handleInputChange(e, setNewTestimonial)} className="bg-gray-700 p-3 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none">
                <option value="selesai">selesai</option>
                <option value="dp">dp</option>
              </select>
              <Button type="submit" className="md:col-span-2 bg-cyan-600 hover:bg-cyan-700">tambah portofolio</Button>
            </form>
            <div className="h-64 overflow-y-auto pr-2">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-700 p-3 rounded-md mb-3 flex justify-between items-center">
                  <span>{testimonial.title}</span>
                  <Button onClick={() => handleDeleteTestimonial(testimonial.id)} variant="destructive" size="sm">hapus</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">kelola promo</h2>
            <form onSubmit={handleAddPromo} className="grid grid-cols-1 gap-4 mb-6">
              <input type="text" name="title" value={newPromo.title} onChange={handlePromoInputChange} placeholder="judul promo" className="bg-gray-700 p-3 rounded-md focus:ring-2 focus:ring-purple-500 outline-none" required />
              <textarea name="description" value={newPromo.description} onChange={handlePromoInputChange} placeholder="deskripsi promo" className="bg-gray-700 p-3 rounded-md focus:ring-2 focus:ring-purple-500 outline-none" rows="2" required></textarea>
              <input type="date" name="endDate" value={newPromo.endDate} onChange={handlePromoInputChange} className="bg-gray-700 p-3 rounded-md focus:ring-2 focus:ring-purple-500 outline-none" required />
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">tambah promo</Button>
            </form>
            <div className="h-64 overflow-y-auto pr-2">
              {promos.map((promo) => (
                <div key={promo.id} className="bg-gray-700 p-3 rounded-md mb-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold">{promo.title}</p>
                    <p className="text-sm text-gray-400">berakhir: {promo.endDate}</p>
                  </div>
                  <Button onClick={() => handleDeletePromo(promo.id)} variant="destructive" size="sm">hapus</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
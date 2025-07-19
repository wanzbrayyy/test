import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Toaster } from '@/components/ui/toaster';
import LoadingScreen from '@/components/LoadingScreen';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import PricingPage from '@/pages/PricingPage';
import PortfolioPage from '@/pages/PortfolioPage';
import DigitalProductsPage from '@/pages/DigitalProductsPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import PromoDetailPage from '@/pages/PromoDetailPage';
import TestimonialDetailPage from '@/pages/TestimonialDetailPage';
import ProductDetailPage from '@/pages/ProductDetailPage';

function App() {
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      setLoading(false);
      NProgress.done();
    }, 2000);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, []);

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location.pathname]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <Helmet>
        <title>wanzofc tech - jasa create website profesional</title>
        <meta name="description" content="jasa pembuatan website profesional oleh wanzofc. paket lengkap untuk umkm, startup, dan bisnis online. teknologi modern, desain menarik, dan fitur canggih." />
        <link href="https://fonts.googleapis.com/css2?family=poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:id" element={<TestimonialDetailPage />} />
            <Route path="/digital-products" element={<DigitalProductsPage />} />
            <Route path="/digital-products/:slug" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/promo" element={<PromoDetailPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>

      <Toaster />
    </AuthProvider>
  );
}

export default App;
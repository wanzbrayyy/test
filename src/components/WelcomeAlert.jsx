import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const WelcomeAlert = () => {
  useEffect(() => {
    MySwal.fire({
      title: 'Selamat Datang!',
      text: 'Terima kasih telah mengunjungi website kami.',
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
      }
    });
  }, []);

  return null;
};

export default WelcomeAlert;

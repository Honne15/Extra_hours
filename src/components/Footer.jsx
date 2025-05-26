import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-10">
      <div className="mx-auto text-center">
        <div className="flex justify-center space-x-5 mb-2 text-gray-600">
          <a href="https://www.facebook.com/AmadeusITGroup/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="w-5 h-5 hover:text-blue-600 transition-colors" />
          </a>
          <a href="https://www.instagram.com/amadeusitgroup/#" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-5 h-5 hover:text-pink-500 transition-colors" />
          </a>
          <a href="https://x.com/AmadeusITGroup" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-5 h-5 hover:text-sky-500 transition-colors" />
          </a>
          <a href="https://www.linkedin.com/company/amadeus" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="w-5 h-5 hover:text-blue-700 transition-colors" />
          </a>
          <a href="https://www.youtube.com/user/AmadeusITGroup" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="w-5 h-5 hover:text-red-600 transition-colors" />
          </a>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Amadeus IT Group SA. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

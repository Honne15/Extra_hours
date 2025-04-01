import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center border-t border-gray-300 pt-4">
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Amadeus IT Group SA</p>
        
        <div className="flex space-x-4 text-gray-600">
          <a href="https://www.facebook.com/AmadeusITGroup/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="w-5 h-5 hover:text-blue-500 transition-colors" />
          </a>
          <a href="https://www.instagram.com/amadeusitgroup/#" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-5 h-5 hover:text-pink-500 transition-colors" />
          </a>
          <a href="https://x.com/AmadeusITGroup" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-5 h-5 hover:text-blue-400 transition-colors" />
          </a>
          <a href="https://www.linkedin.com/company/amadeus" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="w-5 h-5 hover:text-blue-700 transition-colors" />
          </a>
          <a href="https://www.youtube.com/user/AmadeusITGroup" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="w-5 h-5 hover:text-red-500 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Service Manager</h3>
            <p className="text-gray-300">Your trusted partner for wellness and beauty services.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white">Home</Link>
              <Link to="/services" className="block text-gray-300 hover:text-white">Services</Link>
              <Link to="/blog" className="block text-gray-300 hover:text-white">Blog</Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <p className="text-gray-300 mb-2">+91 90449 06426</p>
            <p className="text-gray-300 mb-2">info@servicemanager.com</p>
            <p className="text-gray-300">Lucknow, India</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2025 Service Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
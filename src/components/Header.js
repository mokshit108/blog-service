import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'react-feather';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            Service Manager
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-purple-600 transition">Services</Link>
            <Link to="/blog" className="text-gray-700 hover:text-purple-600 transition">Blog</Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition">Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <Link to="/" className="block py-2 text-gray-700 hover:text-purple-600">Home</Link>
            <Link to="/services" className="block py-2 text-gray-700 hover:text-purple-600">Services</Link>
            <Link to="/blog" className="block py-2 text-gray-700 hover:text-purple-600">Blog</Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-purple-600">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
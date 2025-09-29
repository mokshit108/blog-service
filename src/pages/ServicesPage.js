import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import servicesData from '../data/services.json';
import { Search } from 'react-feather';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    // Simulate API call
    setServices(servicesData);
    setFilteredServices(servicesData);
  }, []);

  useEffect(() => {
    let filtered = services;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter(service => service.category === categoryFilter);
    }

    // Price filter
    if (priceFilter) {
      filtered = filtered.filter(service => {
        const price = parseInt(service.price.replace('₹', '').replace(',', ''));
        if (priceFilter === 'low') return price < 2000;
        if (priceFilter === 'medium') return price >= 2000 && price < 2500;
        if (priceFilter === 'high') return price >= 2500;
        return true;
      });
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, categoryFilter, priceFilter]);

  const categories = [...new Set(services.map(service => service.category))];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="low">Under ₹2000</option>
              <option value="medium">₹2000 - ₹2500</option>
              <option value="high">Above ₹2500</option>
            </select>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;

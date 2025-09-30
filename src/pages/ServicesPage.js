import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import { fetchServicesFromWP } from '../services/wordpressApi';
import servicesData from '../data/services.json';
import { CONFIG } from '../config';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (CONFIG.USE_WORDPRESS) {
          // Fetch from WordPress
          const wpServices = await fetchServicesFromWP();
          
          if (wpServices.length > 0) {
            setServices(wpServices);
            setFilteredServices(wpServices);
          } else {
            // Fallback to JSON if WordPress returns empty
            setServices(servicesData);
            setFilteredServices(servicesData);
            setError('Using local data as fallback');
          }
        } else {
          // Use local JSON data
          setServices(servicesData);
          setFilteredServices(servicesData);
        }
      } catch (err) {
        console.error('Error loading services:', err);
        setError('Failed to load services. Using local data.');
        setServices(servicesData);
        setFilteredServices(servicesData);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
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
        const price = parseInt(service.price.replace(/[^0-9]/g, ''));
        switch (priceFilter) {
          case 'low':
            return price < 2000;
          case 'medium':
            return price >= 2000 && price < 3000;
          case 'high':
            return price >= 3000;
          default:
            return true;
        }
      });
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, categoryFilter, priceFilter]);

  const categories = [...new Set(services.map(service => service.category))];

  if (loading) {
    return (
      <div className="container mx-auto px-4" style={{ padding: '2rem 0', textAlign: 'center' }}>
        <h2 className="text-2xl font-semibold mb-2">Loading services...</h2>
        <p className="text-gray-600">Please wait while we fetch the latest services.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4" style={{ padding: '2rem 0' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Our Services</h1>
          <p className="text-gray-600 mt-1">Explore our curated offerings tailored for you</p>
        </div>
        {CONFIG.USE_WORDPRESS && (
          <span className="inline-flex items-center bg-green-600 text-white px-3 py-1 rounded-md text-sm shadow">
            <span className="mr-1">✓</span> Live from WordPress
          </span>
        )}
      </div>

      {error && (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 text-yellow-800 p-4 mb-6">
          ⚠️ {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Prices</option>
              <option value="low">Under ₹2000</option>
              <option value="medium">₹2000 - ₹3000</option>
              <option value="high">Above ₹3000</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
          <span>Showing {filteredServices.length} of {services.length} services</span>
          {(searchTerm || categoryFilter || priceFilter) && (
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter(''); setPriceFilter(''); }}
              className="text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* 2 cards per row grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          <p className="text-lg">No services found matching your criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setCategoryFilter(''); setPriceFilter(''); }}
            className="mt-3 inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
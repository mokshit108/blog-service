import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchServiceBySlug } from '../services/wordpressApi';
import servicesData from '../data/services.json';
import { CONFIG } from '../config';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        if (CONFIG.USE_WORDPRESS) {
          const wpService = await fetchServiceBySlug(slug);
          if (wpService) {
            setService(wpService);
          } else {
            const local = servicesData.find(s => s.slug === slug || String(s.id) === String(slug));
            setService(local || null);
            if (!local) setError('Service not found');
          }
        } else {
          const local = servicesData.find(s => s.slug === slug || String(s.id) === String(slug));
          setService(local || null);
          if (!local) setError('Service not found');
        }
      } catch (e) {
        console.error('Error loading service:', e);
        setError('Failed to load service');
        const local = servicesData.find(s => s.slug === slug || String(s.id) === String(slug));
        setService(local || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4" style={{ padding: '2rem 0', textAlign: 'center' }}>
        <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4" style={{ padding: '2rem 0', textAlign: 'center' }}>
        <h2 className="text-2xl font-semibold mb-2">Service not found</h2>
        <p className="text-gray-600">{error}</p>
        <Link to="/services" className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4" style={{ padding: '2rem 0' }}>
      <Link to="/services" className="inline-block mb-4 text-blue-600 hover:underline">← Back to Services</Link>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <img
          src={service.image || 'https://via.placeholder.com/1200x500?text=Service+Image'}
          alt={service.title || 'Service image'}
          className="w-full max-h-[420px] object-cover"
        />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold">{service.title}</h1>
            <span className="text-purple-700 font-bold text-xl shrink-0">
              {service.price ? service.price : <span className="text-gray-400">No price</span>}
            </span>
          </div>
          <div className="mt-2">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              {service.category ? service.category : <span className="text-gray-400">No category</span>}
            </span>
          </div>
          <p className="text-gray-700 mt-4 text-lg">{service.description}</p>
          {service.content && (
            <div className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: service.content }} />
          )}
          <div className="mt-6">
            <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;



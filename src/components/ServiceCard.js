const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <img 
        src={service.image} 
        alt={service.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{service.title}</h3>
          <span className="text-purple-600 font-bold">{service.price}</span>
        </div>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
            {service.category}
          </span>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.jsx';
import { useProperties } from '../context/useProperties.jsx';

const PropertyCard = ({ property }) => {
  const { isLoggedIn } = useAuth();
  const { toggleSave, savedProperties = [] } = useProperties();
  const isSaved = savedProperties.includes(property.id);

  const handleSave = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please login to save favorites");
      return;
    }
    toggleSave(property.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={handleSave}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2.5 rounded-full shadow transition-all active:scale-90"
        >
           <span className="text-xl">{isSaved ? '❤️' : '♡'}</span>
        </button>

        {/* Premium Badge */}
        {property.premium && (
          <div className="absolute top-3 left-3 bg-linear-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow flex items-center gap-1">
            ⭐ PREMIUM
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow">
          {property.bhk}
        </div>
        {property.possession === 'Ready' && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            Ready to Move
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg leading-tight mb-1 line-clamp-2">
          {property.name}
        </h3>
        
        <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
          📍 {property.location}
        </p>

        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {formatPrice(property.price)}
            </p>
            <p className="text-xs text-gray-500">₹{Math.round(property.price/100000)} Lakh</p>
          </div>
          <p className="text-sm text-gray-600">{property.area}</p>
        </div>

        <div className="flex gap-2 flex-wrap mb-5">
          {property.amenities.slice(0, 3).map((amenity, i) => (
            <span key={i} className="text-xs bg-gray-100 px-3 py-1 rounded-full">
              {amenity}
            </span>
          ))}
        </div>

        <Link 
          to={`/property/${property.id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;

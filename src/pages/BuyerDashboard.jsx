import { useProperties } from '../context/useProperties.jsx';
import PropertyCard from '../components/PropertyCard';

const BuyerDashboard = () => {
  const { savedProperties, properties } = useProperties();

  const savedItems = properties.filter((p) => savedProperties.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Saved Properties ({savedItems.length})</h2>
        {savedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">You haven't saved any properties yet. ❤️ Click heart icon on any property.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Scheduled Appointments</h2>
        <p className="text-gray-500">No appointments yet (Mock)</p>
      </div>
    </div>
  );
};

export default BuyerDashboard;

import { useProperties } from '../context/useProperties.jsx';
import { useToast } from '../context/useToast.jsx';

const AdminPanel = () => {
  const { properties, setProperties } = useProperties();
  const { showToast } = useToast();

  const approveProperty = (id) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, approved: true } : p)));
    showToast(`Property ID ${id} Approved!`, 'success');
  };

  const rejectProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    showToast(`Property ID ${id} Rejected`, 'error');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10">Admin Panel</h1>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Property</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-t">
                <td className="p-4">{property.name}</td>
                <td className="p-4 text-gray-600">{property.location}</td>
                <td className="p-4 font-medium">Rs.{(property.price / 100000).toFixed(0)} Lakh</td>
                <td className="p-4">
                  {property.approved ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Approved</span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">Pending</span>
                  )}
                </td>
                <td className="p-4 text-center space-x-3">
                  {!property.approved && (
                    <button
                      onClick={() => approveProperty(property.id)}
                      className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => rejectProperty(property.id)}
                    className="bg-red-600 text-white px-5 py-2 rounded-xl text-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;

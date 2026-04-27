import { useProperties } from '../context/useProperties.jsx';
import { useToast } from '../context/useToast.jsx';
import { useAuth } from '../context/useAuth.jsx';

const AdminPanel = () => {
  const { properties, setProperties, appointments, approveAppointment } = useProperties();
  const { showToast } = useToast();
  const { registeredUsers } = useAuth();
  const registeredBuyers = registeredUsers.filter((user) => user.role === 'buyer');
  const registeredSellers = registeredUsers.filter((user) => user.role === 'seller');

  const approveProperty = (id) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, approved: true } : p)));
    showToast(`Property ID ${id} Approved!`, 'success');
  };

  const rejectProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    showToast(`Property ID ${id} Rejected`, 'error');
  };

  const handleApproveAppointment = (appointmentId) => {
    approveAppointment(appointmentId);
    showToast('Appointment approved successfully.', 'success');
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

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm mt-10">
        <div className="p-5 border-b">
          <h2 className="text-2xl font-semibold">Scheduled Appointments</h2>
        </div>

        {appointments.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Buyer</th>
                <th className="p-4 text-left">Property</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Date & Time</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-t">
                  <td className="p-4">{appointment.buyerName}</td>
                  <td className="p-4">{appointment.propertyName}</td>
                  <td className="p-4 capitalize">{appointment.type}</td>
                  <td className="p-4">
                    {appointment.date} {appointment.time}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        appointment.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {appointment.status !== 'approved' ? (
                      <button
                        onClick={() => handleApproveAppointment(appointment.id)}
                        className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-green-700 text-sm font-medium">Approved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-5 text-gray-500">No appointments yet.</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 border-b">
            <h2 className="text-2xl font-semibold">Registered Buyers</h2>
          </div>
          {registeredBuyers.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Buyer ID</th>
                  <th className="p-4 text-left">Buyer Name</th>
                </tr>
              </thead>
              <tbody>
                {registeredBuyers.map((buyer) => (
                  <tr key={buyer.id} className="border-t">
                    <td className="p-4">{buyer.id}</td>
                    <td className="p-4">{buyer.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-5 text-gray-500">No registered buyers yet.</p>
          )}
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 border-b">
            <h2 className="text-2xl font-semibold">Registered Sellers</h2>
          </div>
          {registeredSellers.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Seller ID</th>
                  <th className="p-4 text-left">Display Name</th>
                </tr>
              </thead>
              <tbody>
                {registeredSellers.map((seller) => (
                  <tr key={seller.id} className="border-t">
                    <td className="p-4">{seller.id}</td>
                    <td className="p-4">{seller.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-5 text-gray-500">No registered sellers yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

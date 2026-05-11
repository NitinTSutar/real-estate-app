import { useSelector } from 'react-redux';
import PropertyCard from '../components/PropertyCard';

const BuyerDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const savedProperties = useSelector((state) => state.property.savedProperties);
  const properties = useSelector((state) => state.property.properties);
  const appointments = useSelector((state) => state.property.appointments);

  const savedItems = properties.filter((p) => savedProperties.includes(p.id));
  const myAppointments = appointments.filter((appointment) => appointment.buyerId === user?.id);

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
          <p className="text-gray-500 text-lg">You haven't saved any properties yet.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Scheduled Appointments</h2>
        {myAppointments.length > 0 ? (
          <div className="space-y-4">
            {myAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-2xl p-5 border">
                <p className="font-semibold">{appointment.propertyName}</p>
                <p className="text-sm text-gray-600 capitalize">
                  {appointment.type} call on {appointment.date} at {appointment.time}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                    appointment.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No appointments scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;

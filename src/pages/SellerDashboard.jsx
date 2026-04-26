import { useState } from "react";
import { useAuth } from "../context/useAuth.jsx";
import { useProperties } from "../context/useProperties.jsx";
import { useToast } from "../context/useToast.jsx";

const SellerDashboard = () => {
  const { user } = useAuth();
  const { properties, setProperties } = useProperties();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    location: "",
    city: "Mumbai",
    bhk: "2BHK",
    possession: "Ready",
    area: "",
    description: "",
    premium: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProperty = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      amenities: ["Gym", "Parking", "Lift"],
      image: "https://picsum.photos/id/237/600/400",
      video: "https://www.youtube.com/embed/dQw4w9wgxcq",
      sellerId: user.id,
    };

    setProperties((prev) => [...prev, newProperty]); // Add to list
    showToast(
      "Property added successfully! (Pending Admin Approval)",
      "success",
    );

    // Reset form
    setFormData({
      name: "",
      price: "",
      location: "",
      city: "Mumbai",
      bhk: "2BHK",
      possession: "Ready",
      area: "",
      description: "",
      premium: false,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Seller Dashboard</h1>
      <p className="text-gray-600 mb-10">Welcome, {user?.name}</p>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Add New Property</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Property Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="p-4 border rounded-2xl"
            />
            <input
              type="number"
              placeholder="Price (in INR)"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
              className="p-4 border rounded-2xl"
            />
          </div>

          <input
            type="text"
            placeholder="Full Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
            className="w-full p-4 border rounded-2xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select
              value={formData.bhk}
              onChange={(e) =>
                setFormData({ ...formData, bhk: e.target.value })
              }
              className="p-4 border rounded-2xl"
            >
              <option>1BHK</option>
              <option>2BHK</option>
              <option>3BHK</option>
              <option>4BHK</option>
            </select>
            <select
              value={formData.possession}
              onChange={(e) =>
                setFormData({ ...formData, possession: e.target.value })
              }
              className="p-4 border rounded-2xl"
            >
              <option>Ready</option>
              <option>6 months</option>
              <option>1 year</option>
            </select>
            <input
              type="text"
              placeholder="Area (sq.ft)"
              value={formData.area}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
              className="p-4 border rounded-2xl"
            />
          </div>

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-4 border rounded-2xl h-32"
          />

          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={formData.premium}
              onChange={(e) =>
                setFormData({ ...formData, premium: e.target.checked })
              }
            />
            Mark as Premium Listing
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold"
          >
            Add Property (Premium Toggle - Mock)
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">
          My Listed Properties (
          {properties.filter((p) => p.sellerId === user.id).length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties
            .filter((p) => p.sellerId === user.id)
            .map((property) => (
              <div
                key={property.id}
                className="bg-white p-6 rounded-2xl shadow-sm border"
              >
                <h3 className="font-semibold">{property.name}</h3>
                <p className="text-gray-600">
                  ₹{(property.price / 100000).toFixed(0)} Lakh •{" "}
                  {property.location}
                </p>
                <p className="text-sm text-amber-600 mt-2">
                  Pending Admin Approval
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

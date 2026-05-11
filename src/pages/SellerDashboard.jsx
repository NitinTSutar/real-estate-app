import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProperty } from "../store/propertySlice";
import { showToast } from "../store/toastSlice";

const initialForm = {
  name: "",
  price: "",
  location: "",
  city: "Mumbai",
  state: "Maharashtra",
  bhk: "2BHK",
  possession: "Ready",
  area: "",
  description: "",
  premium: false,
  sampleFlatVideoUrl: "",
  buildingLocalityVideoUrl: "",
};

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const properties = useSelector((state) => state.property.properties);
  const inquiries = useSelector((state) => state.property.inquiries);
  const appointments = useSelector((state) => state.property.appointments);

  const [isRegistrationPaid, setIsRegistrationPaid] = useState(false);
  const [selectedVideoFileName, setSelectedVideoFileName] = useState("");
  const [formData, setFormData] = useState(initialForm);

  const myProperties = useMemo(
    () => properties.filter((property) => property.sellerId === user.id),
    [properties, user.id],
  );
  const myPropertyIds = useMemo(
    () => new Set(myProperties.map((property) => property.id)),
    [myProperties],
  );
  const myInquiries = useMemo(
    () => inquiries.filter((inquiry) => inquiry.sellerId === user.id),
    [inquiries, user.id],
  );
  const myAppointments = useMemo(
    () =>
      appointments.filter((appointment) =>
        myPropertyIds.has(appointment.propertyId),
      ),
    [appointments, myPropertyIds],
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isRegistrationPaid) {
      dispatch(
        showToast({
          message: "Please complete mock seller registration payment first.",
          type: "error",
        }),
      );
      return;
    }

    const newProperty = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      amenities: ["Gym", "Parking", "Lift"],
      image: "https://picsum.photos/id/237/600/400",
      videos: [
        formData.sampleFlatVideoUrl || "",
        formData.buildingLocalityVideoUrl || "",
      ],
      videoFileName: selectedVideoFileName,
      sellerId: user.id,
      approved: false,
    };

    dispatch(addProperty(newProperty));
    dispatch(
      showToast({
        message: "Property added successfully (pending admin approval).",
        type: "success",
      }),
    );

    setFormData(initialForm);
    setSelectedVideoFileName("");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Seller Dashboard</h1>
      <p className="text-gray-600 mb-10">Welcome, {user?.name}</p>

      <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Seller Registration Fee (Mock)
        </h2>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isRegistrationPaid}
            onChange={(event) => setIsRegistrationPaid(event.target.checked)}
          />
          I have completed the registration fee payment (mock).
        </label>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Add New Property</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Property Name"
              value={formData.name}
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
              required
              className="p-2 border rounded-2xl"
            />
            <input
              type="number"
              placeholder="Price (INR)"
              value={formData.price}
              onChange={(event) =>
                setFormData({ ...formData, price: event.target.value })
              }
              required
              className="p-2 border rounded-2xl"
            />
          </div>

          <input
            type="text"
            placeholder="Full Location"
            value={formData.location}
            onChange={(event) =>
              setFormData({ ...formData, location: event.target.value })
            }
            required
            className="w-full p-2 border rounded-2xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(event) =>
                setFormData({ ...formData, city: event.target.value })
              }
              className="p-2 border rounded-2xl"
            />
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(event) =>
                setFormData({ ...formData, state: event.target.value })
              }
              className="p-2 border rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select
              value={formData.bhk}
              onChange={(event) =>
                setFormData({ ...formData, bhk: event.target.value })
              }
              className="p-2 border rounded-2xl"
            >
              <option>1BHK</option>
              <option>2BHK</option>
              <option>3BHK</option>
              <option>4BHK</option>
            </select>
            <select
              value={formData.possession}
              onChange={(event) =>
                setFormData({ ...formData, possession: event.target.value })
              }
              className="p-2 border rounded-2xl"
            >
              <option>Ready</option>
              <option>6 months</option>
              <option>1 year</option>
            </select>
            <input
              type="text"
              placeholder="Area (sq.ft)"
              value={formData.area}
              onChange={(event) =>
                setFormData({ ...formData, area: event.target.value })
              }
              className="p-2 border rounded-2xl"
            />
          </div>

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(event) =>
              setFormData({ ...formData, description: event.target.value })
            }
            className="w-full p-2 border rounded-2xl h-32"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="url"
              placeholder="Sample Flat Video URL (YouTube embed link)"
              value={formData.sampleFlatVideoUrl}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  sampleFlatVideoUrl: event.target.value,
                })
              }
              className="p-2 border rounded-2xl"
            />
            <input
              type="url"
              placeholder="Building & Locality Video URL (YouTube embed link)"
              value={formData.buildingLocalityVideoUrl}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  buildingLocalityVideoUrl: event.target.value,
                })
              }
              className="p-2 border rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-1">
            <input
              type="file"
              accept="video/*"
              onChange={(event) =>
                setSelectedVideoFileName(event.target.files?.[0]?.name ?? "")
              }
              className="p-3 border rounded-2xl"
            />
          </div>

          {selectedVideoFileName && (
            <p className="text-sm text-gray-600">
              Selected file: {selectedVideoFileName}
            </p>
          )}

          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={formData.premium}
              onChange={(event) =>
                setFormData({ ...formData, premium: event.target.checked })
              }
            />
            Mark as Premium Listing
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 disabled:bg-blue-300 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold"
            disabled={!isRegistrationPaid}
          >
            Add Property
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">
          Buyer Inquiries ({myInquiries.length})
        </h2>
        <div className="space-y-4">
          {myInquiries.length > 0 ? (
            myInquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white p-5 rounded-2xl border">
                <p className="font-semibold">{inquiry.propertyName}</p>
                <p className="text-sm text-gray-600">
                  From: {inquiry.buyerName}
                </p>
                <p className="text-gray-700 mt-2">{inquiry.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No buyer inquiries yet.</p>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">
          Scheduled Appointments ({myAppointments.length})
        </h2>
        <div className="space-y-4">
          {myAppointments.length > 0 ? (
            myAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white p-5 rounded-2xl border"
              >
                <p className="font-semibold">{appointment.propertyName}</p>
                <p className="text-sm text-gray-600">
                  {appointment.buyerName} - {appointment.type} call on{" "}
                  {appointment.date} at {appointment.time}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                    appointment.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No scheduled appointments yet.</p>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">
          My Listed Properties ({myProperties.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white p-6 rounded-2xl shadow-sm border"
            >
              <h3 className="font-semibold">{property.name}</h3>
              <p className="text-gray-600">
                Rs.{(property.price / 100000).toFixed(0)} Lakh -{" "}
                {property.location}
              </p>
              <p
                className={`text-sm mt-2 ${property.approved ? "text-green-600" : "text-amber-600"}`}
              >
                {property.approved
                  ? "Approved by Admin"
                  : "Pending Admin Approval"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

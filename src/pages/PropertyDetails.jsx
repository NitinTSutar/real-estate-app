import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProperties } from "../context/useProperties.jsx";
import { useAuth } from "../context/useAuth.jsx";
import { useToast } from "../context/useToast.jsx";

const PropertyDetails = () => {
  const { id } = useParams();
  const { properties, scheduleAppointment, addInquiry } = useProperties();
  const { isLoggedIn, user } = useAuth();
  const { showToast } = useToast();

  const property = properties.find((p) => p.id === parseInt(id, 10));
  const [sampleFlatVideo, buildingLocalityVideo] = Array.isArray(property?.videos)
    ? property.videos
    : [property?.video || "", ""];

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [appointmentType, setAppointmentType] = useState("video");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Property Not Found</h2>
        <Link to="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleSchedule = () => {
    if (!isLoggedIn) {
      alert("Please login first to schedule a call or visit.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    scheduleAppointment({
      propertyId: property.id,
      propertyName: property.name,
      buyerId: user.id,
      buyerName: user.name,
      type: appointmentType,
      date: selectedDate,
      time: selectedTime,
    });

    showToast(
      `${appointmentType.toUpperCase()} appointment scheduled for ${selectedDate} at ${selectedTime}.`,
      "success",
    );

    setShowScheduleModal(false);
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleInquiry = () => {
    if (!isLoggedIn) {
      alert("Please login first to send an inquiry.");
      return;
    }

    const message = window.prompt(
      "Write your inquiry message",
      "I am interested in this property.",
    );
    if (!message) return;

    addInquiry({
      propertyId: property.id,
      propertyName: property.name,
      sellerId: property.sellerId,
      buyerId: user.id,
      buyerName: user.name,
      message,
    });

    showToast("Inquiry sent to seller.", "success");
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          <div>
            <img
              src={property.image}
              alt={property.name}
              className="w-full rounded-3xl shadow-xl h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Sample Flat Video</p>
              {sampleFlatVideo ? (
                <iframe
                  width="100%"
                  height="220"
                  src={sampleFlatVideo}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  title="Flat Video"
                  className="rounded-2xl"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="bg-gray-200 border-2 border-dashed border-gray-400 h-[220px] rounded-2xl flex items-center justify-center text-gray-500">
                  Sample Flat Video (Placeholder)
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">
                Building and Locality
              </p>
              {buildingLocalityVideo ? (
                <iframe
                  width="100%"
                  height="220"
                  src={buildingLocalityVideo}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  title="Building and Locality Video"
                  className="rounded-2xl"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="bg-gray-200 border-2 border-dashed border-gray-400 h-[220px] rounded-2xl flex items-center justify-center text-gray-500">
                  Building and Locality Video (Placeholder)
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
            <p className="text-gray-600 text-xl">{property.location}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-4xl font-bold text-blue-600 mb-1">
              {formatPrice(property.price)}
            </p>
            <p className="text-gray-500">
              Rs.{Math.round(property.price / 100000)} Lakh - {property.area}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">
              Possession:{" "}
              <span className="font-semibold">{property.possession}</span>
            </p>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <button
              onClick={() => window.open("tel:9876543210", "_self")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold"
            >
              Call Owner
            </button>

            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold"
            >
              Schedule Video Call / Site Visit
            </button>

            <button
              onClick={handleInquiry}
              className="flex-1 bg-gray-800 hover:bg-black text-white py-4 rounded-2xl font-semibold"
            >
              Send Inquiry
            </button>
          </div>
        </div>
      </div>

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-semibold mb-6">
              Schedule Appointment
            </h3>

            <div className="space-y-6">
              <div>
                <p className="font-medium mb-2">Type</p>
                <div className="flex gap-3">
                  {["video", "site"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setAppointmentType(type)}
                      className={`flex-1 py-3 rounded-2xl capitalize ${appointmentType === type ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                    >
                      {type === "video" ? "Video Call" : "Site Visit"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-4 border rounded-2xl"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Select Time</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-4 border rounded-2xl"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSchedule}
                className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-semibold"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;



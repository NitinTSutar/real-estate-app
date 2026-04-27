const MapView = ({ properties }) => {
  return (
    <div className="bg-[#f1f5f9] border border-gray-300 rounded-3xl h-130 relative overflow-hidden shadow-inner">
      <div className="absolute inset-0 bg-[linear-gradient(#e2e8f0_1px,transparent_1px),linear-gradient(90deg,#e2e8f0_1px,transparent_1px)] bg-size-[40px_40px]"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">Mumbai and Thane Map</h3>
        <p className="text-gray-600 text-lg max-w-md text-center px-6">
          Properties are shown as pins on the map.
          <br />
          (Placeholder for Google Maps or Leaflet)
        </p>
      </div>

      {properties.slice(0, 6).map((property, index) => (
        <button
          key={property.id}
          type="button"
          className="absolute w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-semibold shadow-xl cursor-pointer transition-all hover:scale-125 z-20"
          style={{
            top: `${25 + (index % 3) * 18}%`,
            left: `${20 + Math.floor(index / 3) * 22}%`,
          }}
          title={`${property.name} - Rs.${(property.price / 100000).toFixed(0)} Lakh`}
          onClick={() => window.open(`/property/${property.id}`, '_blank')}
        >
          PIN
        </button>
      ))}

      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-5 py-3 rounded-2xl shadow text-sm font-medium flex items-center gap-2">
        <span className="text-red-500">*</span>
        {properties.length} Properties in this area
      </div>
    </div>
  );
};

export default MapView;

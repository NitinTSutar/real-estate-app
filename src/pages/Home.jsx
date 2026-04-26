import { useState, useEffect } from "react";
import { useProperties } from "../context/useProperties.jsx";
import PropertyCard from "../components/PropertyCard";
import FilterSidebar from "../components/FilterSidebar";
import MapView from "../components/MapView";

const Home = () => {
  const { filteredProperties, filterProperties } = useProperties();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBHK, setSelectedBHK] = useState("");
  const [budgetMin, setBudgetMin] = useState(0);
  const [budgetMax, setBudgetMax] = useState(50000000);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'map'

  // Real-time filtering
  useEffect(() => {
    filterProperties(searchTerm, selectedBHK, budgetMin, budgetMax);
  }, [searchTerm, selectedBHK, budgetMin, budgetMax, filterProperties]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Hero Search Bar */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">
        <h1 className="text-4xl font-bold text-center mb-2">
          Find Your Dream Home
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Search properties in Mumbai, Thane & nearby
        </p>

        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search by City, Locality or Project Name (e.g. Andheri, Bandra...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-72 shrink-0">
          <FilterSidebar
            selectedBHK={selectedBHK}
            setSelectedBHK={setSelectedBHK}
            budgetMin={budgetMin}
            setBudgetMin={setBudgetMin}
            budgetMax={budgetMax}
            setBudgetMax={setBudgetMax}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {filteredProperties.length} Properties Found
            </h2>

            <div className="flex border rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-5 py-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white"}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-5 py-2 ${viewMode === "map" ? "bg-blue-600 text-white" : "bg-white"}`}
              >
                Map View
              </button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <MapView properties={filteredProperties} />
          )}

          {filteredProperties.length === 0 && (
            <p className="text-center text-gray-500 py-20">
              No properties found. Try changing filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

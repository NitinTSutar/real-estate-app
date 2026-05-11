import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import MapView from '../components/MapView';
import { filterProperties } from '../store/propertySlice';

const Home = () => {
  const dispatch = useDispatch();
  const filteredProperties = useSelector((state) => state.property.filteredProperties);

  const [query, setQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    bhk: '',
    possession: '',
    minPrice: 0,
    maxPrice: 50000000,
  });
  const [draftFilters, setDraftFilters] = useState(appliedFilters);
  const [view, setView] = useState('grid');

  useEffect(() => {
    dispatch(filterProperties({
      query,
      bhk: appliedFilters.bhk,
      minPrice: appliedFilters.minPrice,
      maxPrice: appliedFilters.maxPrice,
      possession: appliedFilters.possession,
    }));
  }, [query, appliedFilters, dispatch]);

  useEffect(() => {
    if (!isFilterModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFilterModalOpen]);

  const openFilters = () => {
    setDraftFilters(appliedFilters);
    setIsFilterModalOpen(true);
  };

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
    setIsFilterModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-white rounded-3xl shadow p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="sm:flex-1">
            <input
              type="text"
              placeholder="City, locality, state..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openFilters}
              className="h-11 px-5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-sm font-medium"
            >
              Filters
            </button>

            <div className="flex border rounded-xl overflow-hidden h-11">
              <button
                onClick={() => setView('grid')}
                className={`px-4 text-sm ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-white'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setView('map')}
                className={`px-4 text-sm ${view === 'map' ? 'bg-blue-600 text-white' : 'bg-white'}`}
              >
                Map
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <MapView properties={filteredProperties} />
        )}

        {filteredProperties.length === 0 && (
          <p className="text-center text-gray-500 py-20">No properties found. Try changing filters.</p>
        )}
      </div>

      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold">Filter Properties</h3>
              <p className="text-sm text-gray-500 mt-1">Choose filters and click Apply to update results.</p>
            </div>

            <div className="p-6">
              <FilterSidebar
                bhk={draftFilters.bhk}
                setBhk={(value) => setDraftFilters((prev) => ({ ...prev, bhk: value }))}
                possession={draftFilters.possession}
                setPossession={(value) => setDraftFilters((prev) => ({ ...prev, possession: value }))}
                minPrice={draftFilters.minPrice}
                setMinPrice={(value) => setDraftFilters((prev) => ({ ...prev, minPrice: value }))}
                maxPrice={draftFilters.maxPrice}
                setMaxPrice={(value) => setDraftFilters((prev) => ({ ...prev, maxPrice: value }))}
                sticky={false}
              />
            </div>

            <div className="p-6 border-t flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

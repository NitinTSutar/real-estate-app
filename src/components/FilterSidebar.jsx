const FilterSidebar = ({
  bhk,
  setBhk,
  possession,
  setPossession,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  horizontal = false,
  sticky = true,
}) => {
  const bhkOptions = ['1BHK', '2BHK', '3BHK', '4BHK'];
  const possessionOptions = ['Ready', '6 months', '1 year'];

  return (
    <div className={`bg-white p-4 rounded-2xl shadow-sm ${sticky && !horizontal ? 'sticky top-24' : ''}`}>
      <h3 className={`font-semibold text-lg ${horizontal ? 'mb-4' : 'mb-6'}`}>Filters</h3>

      <div className={`grid gap-4 ${horizontal ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1'}`}>
        <div>
          <p className="font-medium mb-3">Property Configuration</p>
          <div className="flex flex-wrap gap-2">
            {bhkOptions.map((option) => (
              <button
                key={option}
                onClick={() => setBhk(bhk === option ? '' : option)}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  bhk === option ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-3">Possession Period</p>
          <div className="flex flex-wrap gap-2">
            {possessionOptions.map((option) => (
              <button
                key={option}
                onClick={() => setPossession(possession === option ? '' : option)}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  possession === option ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-3">Budget Range</p>
          <div className="space-y-4">
            <div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={minPrice / 100000}
                onChange={(event) => setMinPrice(Number(event.target.value) * 100000)}
                className="w-full accent-blue-600"
              />
              <p className="text-right text-sm">Rs.{minPrice / 100000} Lakh</p>
            </div>

            <div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={maxPrice / 100000}
                onChange={(event) => setMaxPrice(Number(event.target.value) * 100000)}
                className="w-full accent-blue-600"
              />
              <p className="text-right text-sm">Rs.{maxPrice / 100000} Lakh</p>
            </div>
          </div>
        </div>

        <div className="flex md:justify-end md:items-end">
          <button
            onClick={() => {
              setBhk('');
              setPossession('');
              setMinPrice(0);
              setMaxPrice(50000000);
            }}
            className="w-full md:w-auto px-4 py-2 text-sm text-gray-500 hover:text-red-600 border border-gray-200 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;

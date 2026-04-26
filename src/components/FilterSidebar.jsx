const FilterSidebar = ({ 
  selectedBHK, setSelectedBHK, 
  selectedPossession, setSelectedPossession,
  budgetMin, setBudgetMin, 
  budgetMax, setBudgetMax 
}) => {
  const bhkOptions = ['1BHK', '2BHK', '3BHK', '4BHK'];
  const possessionOptions = ['Ready', '6 months', '1 year'];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
      <h3 className="font-semibold text-lg mb-6">Filters</h3>

      {/* BHK Filter */}
      <div className="mb-8">
        <p className="font-medium mb-3">Property Configuration</p>
        <div className="flex flex-wrap gap-2">
          {bhkOptions.map(bhk => (
            <button
              key={bhk}
              onClick={() => setSelectedBHK(selectedBHK === bhk ? '' : bhk)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                selectedBHK === bhk 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {bhk}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="font-medium mb-3">Possession Period</p>
        <div className="flex flex-wrap gap-2">
          {possessionOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedPossession(selectedPossession === option ? '' : option)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                selectedPossession === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Filter */}
      <div>
        <p className="font-medium mb-3">Budget Range</p>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Min Price (₹ Lakh)</label>
            <input 
              type="range" 
              min="0" 
              max="500" 
              step="10"
              value={budgetMin / 100000}
              onChange={(e) => setBudgetMin(Number(e.target.value) * 100000)}
              className="w-full accent-blue-600"
            />
            <p className="text-right text-sm">₹{budgetMin / 100000} Lakh</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-600">Max Price (₹ Lakh)</label>
            <input 
              type="range" 
              min="50" 
              max="500" 
              step="10"
              value={budgetMax / 100000}
              onChange={(e) => setBudgetMax(Number(e.target.value) * 100000)}
              className="w-full accent-blue-600"
            />
            <p className="text-right text-sm">₹{budgetMax / 100000} Lakh</p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => {
          setSelectedBHK('');
          setSelectedPossession('');
          setBudgetMin(0);
          setBudgetMax(50000000);
        }}
        className="mt-8 w-full text-sm text-gray-500 hover:text-red-600"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;

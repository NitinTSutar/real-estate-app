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
  const minLimitLakh = 0;
  const maxLimitLakh = 500;
  const stepLakh = 10;

  const rawMinLakh = Math.max(minLimitLakh, Math.min(maxLimitLakh, Math.floor((minPrice || 0) / 100000)));
  const rawMaxLakh = maxPrice === Infinity
    ? maxLimitLakh
    : Math.max(minLimitLakh, Math.min(maxLimitLakh, Math.floor((maxPrice || 0) / 100000)));
  const minLakh = Math.max(minLimitLakh, Math.min(rawMinLakh, rawMaxLakh - stepLakh));
  const maxLakh = Math.min(maxLimitLakh, Math.max(rawMaxLakh, minLakh + stepLakh));

  const selectedRangePercent = {
    left: (minLakh / maxLimitLakh) * 100,
    right: 100 - (maxLakh / maxLimitLakh) * 100,
  };

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
            <div className="relative pt-6">
              <div className="absolute left-0 right-0 top-[2.2rem] h-1.5 rounded-full bg-gray-200" />
              <div
                className="absolute top-[2.2rem] h-1.5 rounded-full bg-blue-500"
                style={{
                  left: `${selectedRangePercent.left}%`,
                  right: `${selectedRangePercent.right}%`,
                }}
              />
              <input
                type="range"
                min={minLimitLakh}
                max={maxLimitLakh}
                step={stepLakh}
                value={minLakh}
                onChange={(event) => {
                  const nextMinLakh = Number(event.target.value);
                  const allowedMinLakh = Math.min(nextMinLakh, maxLakh - stepLakh);
                  setMinPrice(allowedMinLakh * 100000);
                }}
                className="dual-range-slider min-range absolute top-6 left-0 w-full appearance-none bg-transparent pointer-events-none z-20"
              />
              <input
                type="range"
                min={minLimitLakh}
                max={maxLimitLakh}
                step={stepLakh}
                value={maxLakh}
                onChange={(event) => {
                  const nextMaxLakh = Number(event.target.value);
                  const clampedMaxLakh = Math.max(nextMaxLakh, minLakh + stepLakh);
                  setMaxPrice(clampedMaxLakh === maxLimitLakh ? Infinity : clampedMaxLakh * 100000);
                }}
                className="dual-range-slider max-range absolute top-6 left-0 w-full appearance-none bg-transparent pointer-events-none z-30"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <p>Rs.{minLakh} Lakh</p>
              <p>{maxPrice === Infinity ? 'Rs.500 Lakh+' : `Rs.${maxLakh} Lakh`}</p>
            </div>
          </div>
        </div>

        <div className="flex md:justify-end md:items-end">
          <button
            onClick={() => {
              setBhk('');
              setPossession('');
              setMinPrice(0);
              setMaxPrice(Infinity);
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

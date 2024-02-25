"use client";

const InvestmentBox = ({
  onChangeMonthlyContribution,
  onBlurMonthlyContribution,
  onChangeInterestRate,
  onBlurInterestRate,
  onChangeYears,
  monthlyContribution,
  interestRate,
  years,
}) => {
  const handleChangeMonthlyContribution = (e) => {
    onChangeMonthlyContribution(e);
  };

  const handleBlurMonthlyContribution = () => {
    onBlurMonthlyContribution();
  };

  const handleChangeInterestRate = (e) => {
    onChangeInterestRate(e);
  };

  const handleBlurInterestRate = () => {
    onBlurInterestRate();
  };

  const handleChangeYears = (e) => {
    onChangeYears(e);
  };

  return (
    <div className="mb-4 rounded-md border-gray-100 border-2 border-dashed p-2">
      <div>
        <label className="block text-sm md:text-md font-medium text-gray-100">
          Deposit Bulanan
        </label>
        <div className="flex mt-2 mb-4 w-auto">
          <span className="inline-flex items-center px-3 text-xs md:text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md">
            RM
          </span>
          <input
            type="number"
            className="inline-flex flex-1 items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-0 border-gray-300 rounded-e-md"
            placeholder="0.00"
            value={monthlyContribution}
            onChange={(e) => {
              handleChangeMonthlyContribution(e);
            }}
            onBlur={() => {
              handleBlurMonthlyContribution();
            }}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm md:text-md font-medium text-gray-100">
          Kadar Faedah / Dividen Tahunan
        </label>
        <div className="flex mt-2 mb-4 w-auto">
          <span className="inline-flex items-center px-3 text-xs md:text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md">
            %
          </span>
          <input
            type="number"
            className="inline-flex flex-1 items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-0 border-gray-300 rounded-e-md"
            placeholder="0.00"
            value={interestRate}
            onChange={(e) => {
              handleChangeInterestRate(e);
            }}
            onBlur={() => {
              handleBlurInterestRate();
            }}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm md:text-md font-medium text-gray-100">
          Tempoh Pelaburan
        </label>
        <div className="flex mt-2 mb-4 w-auto">
          <input
            type="number"
            className="inline-flex flex-1 items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md w-auto"
            placeholder="0"
            value={years}
            onChange={(e) => {
              handleChangeYears(e);
            }}
          />
          <span className="inline-flex items-center px-3 text-xs md:text-sm text-gray-900 bg-gray-200 border rounded-l-0 border-gray-300 rounded-e-md">
            Tahun
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentBox;

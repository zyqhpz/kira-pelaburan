"use client";

import { useEffect, useState } from "react";

const SimpleForm = () => {
  const [initialSavings, setInitialSavings] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [years, setYears] = useState("");
  const [balance, setBalance] = useState("");
  const [calculationList, setCalculationList] = useState([]);
  const [totalFutureValue, setTotalFutureValue] = useState(null);

  const handleCalculate = () => {
    console.log(initialSavings, interestRate, monthlyContribution, years)
    const totalFutureValue = calculateFutureValueRecursive(
      initialSavings,
      monthlyContribution,
      interestRate,
      years
    );
    setTotalFutureValue(totalFutureValue);
  };

  const handleReset = () => {
    // Reset all the input fields
    setInitialSavings("");
    setInterestRate("");
    setMonthlyContribution("");
    setYears("");
    setBalance("");
    setCalculationList([]);
    setTotalFutureValue(null);
  };

  const calculateFutureValueRecursive = (
    principal,
    monthlyDeposit,
    annualInterestRate,
    years
  ) => {
    const annualInterestRateDecimal = annualInterestRate / 100;

    for (let year = 1; year <= years; year++) {
      // Deposit at the beginning of the year
      principal = parseFloat(principal) + parseFloat(monthlyDeposit) * 12;

      // Calculate interest for the current year
      const interest = principal * annualInterestRateDecimal;
      principal += interest;
    }

    // force convert to 2 decimal places
    return parseFloat(principal).toFixed(2);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Kira Pelaburan</h1>
      <form className="max-w-md mx-auto">
        <div>
          <label className="block text-md font-medium text-gray-100">
            Jumlah Permulaan / Simpanan Semasa
          </label>
          <div className="flex mt-2 mb-4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md">
              RM
            </span>
            <input
              type="number"
              className="inline-flex flex-1 items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-0 border-gray-300 rounded-e-md"
              placeholder="0.00"
              value={initialSavings}
              onChange={(e) => {
                // Allow any input while typing
                setInitialSavings(e.target.value);
              }}
              onBlur={() => {
                // On blur, format the value
                const sanitizedValue = initialSavings.replace(/[^0-9.-]/g, "");
                const nonNegativeValue = Math.max(
                  0,
                  parseFloat(sanitizedValue)
                );
                setInitialSavings(nonNegativeValue.toFixed(2));
              }}
            />
          </div>
        </div>
        <div className="mb-4 rounded-md border-gray-100 border-2 border-dashed p-2">
          <div>
            <label className="block text-md font-medium text-gray-100">
              Deposit Bulanan
            </label>
            <div className="flex mt-2 mb-4">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md">
                RM
              </span>
              <input
                type="number"
                className="inline-flex flex-1 items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-0 border-gray-300 rounded-e-md"
                placeholder="0.00"
                value={monthlyContribution}
                onChange={(e) => {
                  // Allow any input while typing
                  setMonthlyContribution(e.target.value);
                }}
                onBlur={() => {
                  // On blur, format the value
                  const sanitizedValue = monthlyContribution.replace(
                    /[^0-9.-]/g,
                    ""
                  );
                  const nonNegativeValue = Math.max(
                    0,
                    parseFloat(sanitizedValue)
                  );
                  setMonthlyContribution(nonNegativeValue.toFixed(2));
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-md font-medium text-gray-100">
              Kadar Faedah / Dividen Tahunan
            </label>
            <div className="flex mt-2 mb-4">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md">
                %
              </span>
              <input
                type="number"
                className="inline-flex flex-1 items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-0 border-gray-300 rounded-e-md"
                placeholder="0.00"
                value={interestRate}
                onChange={(e) => {
                  // Allow any input while typing
                  setInterestRate(e.target.value);
                }}
                onBlur={() => {
                  // On blur, format the value
                  const sanitizedValue = interestRate.replace(/[^0-9.-]/g, "");
                  const nonNegativeValue = Math.max(
                    0,
                    parseFloat(sanitizedValue)
                  );
                  setInterestRate(nonNegativeValue.toFixed(2));
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-md font-medium text-gray-100">
              Tempoh Pelaburan
            </label>
            <div className="flex mt-2 mb-4">
              <input
                type="number"
                className="inline-flex flex-1 items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md"
                placeholder="0"
                value={years}
                onChange={(e) => {
                  // Allow only numeric characters
                  const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");

                  // Update state with the formatted value
                  setYears(sanitizedValue);
                }}
              />
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-0 border-gray-300 rounded-e-md">
                Tahun
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Tambah
          </button>
          <button
            type="button"
            className="bg-red-600 text-white p-2 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
          >
            Padam
          </button>
        </div>
        <hr className="my-4" />
        <div className="flex flex-row gap-2">
          <button
            type="button"
            onClick={handleCalculate}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Kira
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
          >
            Set Semula
          </button>
        </div>
      </form>

      {totalFutureValue !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Total Future Value:</h2>
          <p className="text-lg">{`RM ${totalFutureValue}`}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleForm;

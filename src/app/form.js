"use client";

import { useEffect, useState } from "react";

const SimpleForm = () => {
  const [initialSavings, setInitialSavings] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [years, setYears] = useState("");
  const [balance, setBalance] = useState("");
  const [totalFutureValue, setTotalFutureValue] = useState(null);

  const handleCalculate = () => {
    const totalFutureValue = calculateFutureValue();
    setTotalFutureValue(totalFutureValue);
  };

  // const set/

  const handleReset = () => {
    // Reset all the input fields
    setInitialSavings("");
    setInterestRate("");
    setMonthlyContribution("");
    setYears("");
    setBalance("");
    setTotalFutureValue(null);
  };

  // formula: FV = P * (((1 + r)**(n*t) - 1) / (r/n)) + b, P = monthlyContribution, b = balance, r = interestRate, n = 12, t = years
  const calculateFutureValue = () => {
    let balance = initialSavings;
    const P = parseFloat(monthlyContribution);
    const b = parseFloat(balance);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = 12;
    const t = parseFloat(years);

    const totalFutureValue = P * (((1 + r) ** (n * t) - 1) / (r / n)) + b;

    return totalFutureValue;
  };

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
              onChange={(e) => setInitialSavings(e.target.value)}
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
                onChange={(e) => setMonthlyContribution(e.target.value)}
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
                onChange={(e) => setInterestRate(e.target.value)}
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
                onChange={(e) => setYears(e.target.value)}
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
          <p className="text-lg">{`RM ${totalFutureValue.toFixed(2)}`}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleForm;

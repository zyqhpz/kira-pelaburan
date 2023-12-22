"use client";

import { useEffect, useState } from "react";
import InvestmentBox from "./components/investmentBox";

const SimpleForm = () => {
  const [initialSavings, setInitialSavings] = useState("");
  const [calculationList, setCalculationList] = useState([]);
  const [totalFutureValue, setTotalFutureValue] = useState(null);

  const handleCalculate = () => {
    let totalFutureValue = parseFloat(initialSavings);
    calculationList.forEach((calculation) => {
      const { monthlyContribution, interestRate, years } = calculation;
      totalFutureValue = calculateFutureValue(
        totalFutureValue,
        monthlyContribution,
        interestRate,
        years
      );
    });

    // force convert to 2 decimal places
    let result = parseFloat(totalFutureValue).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setTotalFutureValue(result);
  };

  const handleReset = () => {
    // Reset all the input fields
    setInitialSavings("");

    // Clear and set the calculation list with a new array
    setCalculationList([
      {
        monthlyContribution: "",
        interestRate: "",
        years: "",
      },
    ]);

    setTotalFutureValue(null);
  };

  const handleAddCalculation = () => {
    const newCalculationList = [...calculationList];
    newCalculationList.push({
      monthlyContribution: "",
      interestRate: "",
      years: "",
    });
    setCalculationList(newCalculationList);
  };

  const handleRemoveCalculation = () => {
    const newCalculationList = [...calculationList];
    // check if there is at least 1 item in the list
    if (newCalculationList.length === 1) {
      return;
    }
    newCalculationList.pop();
    setCalculationList(newCalculationList);
  };

  const calculateFutureValue = (
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

    return principal;
  };

  useEffect(() => {
    // set calculation list to 1 item by default
    setCalculationList([
      {
        monthlyContribution: "",
        interestRate: "",
        years: "",
      },
    ]);
  }, []);

  return (
    <div className="container mx-auto p-1 md:p-4">
      <h1 className="text-lg md:text-3xl font-bold mb-4 text-center">Kira Pelaburan</h1>
      <form className="max-w-md mx-auto">
        <div>
          <label className="block text-sm md:text-md font-medium text-gray-100">
            Jumlah Permulaan / Simpanan Semasa
          </label>
          <div className="flex mt-2 mb-4">
            <span className="inline-flex items-center px-3 text-xs md:text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md">
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
                if (initialSavings === "") {
                  return;
                }
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
        {calculationList.map((_, index) => (
          <div key={index}>
            <InvestmentBox
              onChangeMonthlyContribution={(e) => {
                const newCalculationList = [...calculationList];
                newCalculationList[index].monthlyContribution = e.target.value;
                setCalculationList(newCalculationList);
              }}
              onBlurMonthlyContribution={() => {
                const newCalculationList = [...calculationList];
                if (newCalculationList[index].monthlyContribution === "") {
                  return;
                }
                const sanitizedValue = newCalculationList[
                  index
                ].monthlyContribution.replace(/[^0-9.-]/g, "");
                const nonNegativeValue = Math.max(
                  0,
                  parseFloat(sanitizedValue)
                );
                newCalculationList[index].monthlyContribution =
                  nonNegativeValue.toFixed(2);
                setCalculationList(newCalculationList);
              }}
              onChangeInterestRate={(e) => {
                const newCalculationList = [...calculationList];
                newCalculationList[index].interestRate = e.target.value;
                setCalculationList(newCalculationList);
              }}
              onBlurInterestRate={() => {
                const newCalculationList = [...calculationList];
                if (newCalculationList[index].interestRate === "") {
                  return;
                }
                const sanitizedValue = newCalculationList[
                  index
                ].interestRate.replace(/[^0-9.-]/g, "");
                const nonNegativeValue = Math.max(
                  0,
                  parseFloat(sanitizedValue)
                );
                newCalculationList[index].interestRate = nonNegativeValue;
                setCalculationList(newCalculationList);
              }}
              onChangeYears={(e) => {
                const newCalculationList = [...calculationList];
                const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
                newCalculationList[index].years = sanitizedValue;
                setCalculationList(newCalculationList);
              }}
              monthlyContribution={calculationList[index].monthlyContribution}
              interestRate={calculationList[index].interestRate}
              years={calculationList[index].years}
            />
          </div>
        ))}

        <div className="flex flex-row gap-2">
          <button
            type="button"
            onClick={() => {
              handleAddCalculation();
            }}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Tambah
          </button>
          <button
            type="button"
            onClick={() => {
              handleRemoveCalculation();
            }}
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
        <div className="text-center mt-8 rounded-md shadow-md bg-gray-700 px-4 py-2 w-full">
          <h2 className="text-xl font-semibold">Unjuran Jumlah Pelaburan:</h2>
          <p className="text-lg">{`RM ${totalFutureValue}`}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleForm;

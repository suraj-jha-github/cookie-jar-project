import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { getDateSevenDaysAgo } from "../libs";

const DateRange = () => {
  const sevenDaysAgo = getDateSevenDaysAgo();

  const [searchParams, setSearchParams] = useSearchParams();

  const [dateFrom, setDateFrom] = useState(() => {
    const df = searchParams.get("df");

    return df && new Date(df).getTime() <= new Date().getTime
      ? df
      : sevenDaysAgo || new Date().toISOString().split("T")[0];
  });

  const [dateTo, setDateTo] = useState(() => {
    const dt = searchParams.get("dt");

    return dt && new Date(dt).getTime() >= new Date(dateFrom).getTime()
      ? dt
      : new Date().toISOString().split("T")[0];
  });

  useEffect(() => {
    setSearchParams({ df: dateFrom, dt: dateTo });
  }, [dateFrom, dateTo]);

  const handleDateFromChange = (e) => {
    const df = e.target.value;

    setDateFrom(df);

    if (new Date(df).getTime() > new Date(dateTo).getTime()) {
      setDateTo(df);
    }
  };

  const handleDateToChange = (e) => {
    const dt = e.target.value;

    setDateTo(dt);

    if (new Date(dt).getTime() < new Date(dateFrom).getTime()) {
      setDateFrom(dt);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <label
          className="block text-gray-700 dark:text-gray-400 text-sm mb-2"
          htmlFor="dateFrom"
        >
          Filter
        </label>
        <input
          className="bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-500 outline-none focus:ring-1 ring-blue-500 dark:placeholder:text-gray-700"
          name="dateFrom"
          type="date"
          max={dateTo}
          value={dateFrom}
          onChange={handleDateFromChange}
        />{" "}
      </div>

      <div className="flex items-center gap-1">
        <label
          className="block text-gray-700 dark:text-gray-400 text-sm mb-2"
          htmlFor="dateFrom"
        >
          To
        </label>

        <input
          className="bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-500 outline-none focus:ring-1 ring-blue-500 dark:placeholder:text-gray-700"
          name="dateFrom"
          type={"date"}
          value={dateTo}
          min={dateFrom}
          onChange={handleDateToChange}
        />
      </div>
    </div>
  );
};

export default DateRange;

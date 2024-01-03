import React, { useState } from "react";

type FilterProductProps = {
  getProductFilterValue: (filterValue: string) => void;
};

/**
 * Filters PRODUCTS
 *
 * @param {FilterProductProps} props
 *
 * @returns {React.JSX.Element} component
 */
export const FilterProduct = ({
  getProductFilterValue,
}: FilterProductProps) => {
  const [filterProductVal, setFilterProductVal] = useState("all");

  /**
   * Filter PRODUCTS
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleFilterProductsChanges = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterProductVal(e.target.value);
    getProductFilterValue(e.target.value);
  };

  return (
    <div className="p-4">
      <select
        onChange={handleFilterProductsChanges}
        value={filterProductVal}
        className="text-black/70 bg-white px-3 py-2 transition-all cursor-pointer hover:border-blue-600/30 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus-visible:shadow-none0 w-64"
      >
        <option value="all">All</option>
        <option value="isAvailable">Is Available</option>
      </select>
    </div>
  );
};

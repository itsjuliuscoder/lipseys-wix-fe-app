"use client";
import { LipseysProduct } from "@/types/lipseys";
import Image from "next/image";
import { useState } from "react";

import { FC } from "react";

interface TableTwoProps {
  data: LipseysProduct[];
}

//const TableTwo: FC<TableTwoProps> = ({ data }) => {
const TableTwo: FC<TableTwoProps> = ({ data }) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const paginatedData = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Lipsey Products
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              SKU
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Price
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Quantity
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Type
            </h5>
          </div>
        </div>
        <>
          {paginatedData.map((tableData, index) => (
            <div key={tableData.upc} className="grid grid-cols-3 border-b border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
              <div className="flex items-left p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{tableData.upc}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{tableData.description1}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">${tableData.price}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{tableData.quantity}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{tableData.type}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-4 mb-3">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-green-500 text-black-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage * itemsPerPage >= data.length}
              className="px-4 py-2 bg-green-500 text-black-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default TableTwo;

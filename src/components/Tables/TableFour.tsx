"use client";
import { TRADE } from "../../types/trades";
import Image from "next/image";
import { useState } from "react";
import api from "@/lib/api";
import { FC } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

interface TableFourProps {
  data: TRADE[];
}

//const TableFour: FC<TableFourProps> = ({ data }) => {
const TableFour: FC<TableFourProps> = ({ data }) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const router = useRouter();

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
        Signal Details
      </h4>
      <ToastContainer />
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
          <div className="p-2.2 xl:p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              S/N
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Symbol
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Interval
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Units
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Amount
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Direction
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>
        <>
          {paginatedData.map((tableData, index) => (
            <div key={index} className="grid grid-cols-3 border-b border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
              <div className="flex items-left p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{(currentPage - 1) * itemsPerPage + index + 1}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{tableData.signalDetails.symbol}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{tableData.interval}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  {tableData.units ? tableData.units : "N/A"}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-3">
                  {tableData.amount ? tableData.amount : "N/A"}
                </p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-3">
                  {tableData.direction ? tableData.direction : "N/A"}
                </p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className={`text-meta-3 rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${tableData.status === "ongoing" ? "text-yellow-500" : tableData.status === "win" ? "text-green-500" : tableData.status === "loss" ? "text-red-500" : ""}`}>
                  {tableData.status ? tableData.status : "N/A"}
                </p>
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

export default TableFour;

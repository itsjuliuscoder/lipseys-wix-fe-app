"use client";
import { DEPOSIT } from "../../types/deposits";
import Image from "next/image";
import { useState } from "react";
import api from "@/lib/api";
import { FC } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TableOneProps {
  data: DEPOSIT[];
}

//const TableOne: FC<TableOneProps> = ({ data }) => {
const TableOne: FC<TableOneProps> = ({ data }) => {
    const itemsPerPage = 10;
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

    const handleApproveTransaction = async (transactionId: string) => {
        const payload =  {
            transactionId: transactionId,
            status: "approved"
        };

        try {
            await api.approveWithdrawal(payload);
            toast.success("Withdrawal Transaction approved successfully");
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error) {
            console.error("Error approving transaction:", error);
            toast.error("Failed to approve transaction");
        }
    };

    const handleDeclineTransaction = async (transactionId: string) => {

        console.log("transactionId: ", transactionId);
        const payload = {
          transactionId: transactionId
        }

        try {
            await api.declineWithdrawal(payload);
            toast.success("Withdrawal Transaction declined successfully");
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error) {
            console.error("Error declining transaction:", error);
            toast.error("Failed to decline transaction");
        }
    };

  return (
    
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Withdrawal Transactions
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
              UserId
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Transaction Type
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Amount
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Status
            </h5>
          </div>
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Proof
            </h5>
          </div> */}
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
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
                <p className="text-black dark:text-white">{tableData.walletId}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  {tableData.type ? tableData.type : "N/A"}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                    {tableData.amount ? tableData.amount : "N/A"}
                </p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                    <span className={`text-meta-3 rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${tableData.status === "pending" ? "text-yellow-500 rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium" : tableData.status === "approved" ? "text-green-500 rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium" : tableData.status === "declined" ? "text-red-500  rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium" : ""}`}>
                        {tableData.status ? tableData.status : "N/A"}
                    </span>
                </p>
              </div>
              {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <div className="flex items-center space-x-3.5">
                <Link href={tableData.proof} legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer" className="text-primary">
                        View Proof
                    </a>
                </Link>
                </div>
              </div> */}
              <div>
                    <button
                        onClick={() => handleApproveTransaction(tableData._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => handleDeclineTransaction(tableData._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded ml-2"
                    >
                        Decline
                    </button>
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

export default TableOne;

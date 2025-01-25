"use client";
import { BRAND } from "../../types/brand";
import Image from "next/image";
import { useState } from "react";
import api from "@/lib/api";
import { FC } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

interface TableOneProps {
  data: BRAND[];
}

//const TableOne: FC<TableOneProps> = ({ data }) => {
const TableOne: FC<TableOneProps> = ({ data }) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);

    const router = useRouter();

    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };

    const [formData, setFormData] = useState({
            userId: '',
            transType: '',
            amount: '',
    });

    const [payload, setPayload] = useState<{ userId: string; }>({
            userId: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = event.target;
            setFormData({
                ...formData,
                [name]: value,
                userId: payload.userId,
            });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Form Data Submitted:', formData);
      // Add your form submission logic here
      try {
          const response = await api.updateWalletBalance(formData);
          if (response){
              toast.success('Manually Updated Wallet Balance Successfully');
          }
          console.log('Wallet Balance updated:', response);
          setFormData({
              userId: '',
              transType: '',
              amount: '',
          });
          setOpenModal(false);
          setTimeout(() => {
              router.push('/trades');
          }, 3000);
      } catch (error) {
          toast.error('An error occurred while updating wallet balance');
          setFormData({
              userId: '',
              transType: '',
              amount: '',
          });
      }
  };

    const handleBlockUser = async (userId: string) => {
      console.log("user id", userId);
      try {
        await api.blockUser(userId);
        toast.success("User blocked successfully");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        console.error("Error blocking user:", error);
        toast.error("Failed to block user");
      }
    };

    const handleTrade = (id: string) => {
     
      setOpenModal(true);
      const payload = {
          userId: id
      }
        setPayload(payload);
    }

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
        User Details
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
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Account Type
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Account Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
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
                <p className="text-black dark:text-white">{tableData.name}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{tableData.email}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  {tableData.accountType ? tableData.accountType : "N/A"}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                    <span className={tableData.isVerified ? "bg-success text-success rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium" : "bg-danger text-danger rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium"}>
                    {tableData.isVerified ? "Verified" : "Not Verified"}
                    </span>
                </p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                    <span className={tableData.blocked ? "bg-danger text-danger rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium" : "bg-success text-success rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium"}>
                    {tableData.blocked ? "Blocked" : "Active"}
                    </span>
                </p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <div className="flex items-center space-x-3.5">
                  <button className="hover:text-primary" onClick={() => handleBlockUser(tableData._id)}>
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z"
                        fill=""
                      />
                    </svg>
                  </button>
                  {/* </button> */}
                  <button className="hover:text-primary" onClick={() => handleTrade(tableData._id)}>
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.59 13.41L9.17 12L14.83 6.34L16.24 7.76L10.59 13.41ZM3 12C3 7.58 6.58 4 11 4C12.66 4 14.21 4.53 15.45 5.46L13.41 7.5C12.76 7.18 12.02 7 11 7C8.24 7 6 9.24 6 12C6 14.76 8.24 17 11 17C12.02 17 12.76 16.82 13.41 16.5L15.45 18.54C14.21 19.47 12.66 20 11 20C6.58 20 3 16.42 3 12ZM21 12C21 16.42 17.42 20 13 20C11.34 20 9.79 19.47 8.55 18.54L10.59 16.5C11.24 16.82 11.98 17 13 17C15.76 17 18 14.76 18 12C18 9.24 15.76 7 13 7C11.98 7 11.24 7.18 10.59 7.5L8.55 5.46C9.79 4.53 11.34 4 13 4C17.42 4 21 7.58 21 12Z"
                          fill="currentColor"
                        />
                      </svg>                  
                  </button>
                  <button className="hover:text-primary">
                    <svg
                      className="fill-current text-black"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                      d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm2.92-2.92l9.06-9.06 3.75 3.75-9.06 9.06H5.92v-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                      fill="black"
                      />
                    </svg>
                  </button>
                </div>
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
          {openModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Update User Wallet Balance</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                                Amount
                            </label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select name="transType" value={formData.transType} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select Transaction Type</option>
                                <option value="debit">Debit</option>
                                <option value="credit">Credit</option>
                                {/* Add more services as needed */}
                            </select>
                        </div>
                        <div className="flex items-center mt-4 justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Update Wallet
                                </button>
                                <button
                                            type="button"
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            onClick={() => setOpenModal(false)}
                                        >
                                    Cancel
                                </button>
                        </div>
                    </form>
                </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default TableOne;

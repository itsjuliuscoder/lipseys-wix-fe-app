"use client";
import React, {useState, useEffect} from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import api from "@/lib/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const MakeWithdrawal = () => {

    const [amount, setAmount] = useState('');
    const router = useRouter();

    const submitTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            userId,
            walletId,
            amount,
        };

        console.log("this is the payload", data);
        
        try {
            const response = await api.requestWidthdrawal(data);
            toast.success("Withdrawal Request Successfully");
            setTimeout(() => {
              router.push("/");
            }, 4000);
            console.log("Signal created successfully:", response);
        } catch (error) {
            console.error("Error creating signal:", error);
            toast.error("Signal Creation Failed --> " + error);
        }
    }

    const [walletId, setWalletId] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchWalletDetails = async () => {
            try {
                const response = await api.getWalletDetails();
                setWalletId(response._id);
                setUserId(response.user._id);
                // console.log("this is the wallet details -->", response);
            } catch (error) {
                console.error("Error fetching wallet details:", error);
                toast.error("Failed to fetch wallet details");
            }
        };

        fetchWalletDetails();
    }, []);

  return (
    
    <DefaultLayout>
      <Breadcrumb pageName="Make Withdrawal" />
      <ToastContainer />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Make Withdraw Form
              </h3>
            </div>
            <form onSubmit={submitTransaction}>
              <div className="p-6.5">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter the amount"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* <div className="p-6.5">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Wallet
                </label>
                <select
                  name="wallet"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select Wallet</option>
                        {Array.isArray(walletDetails) && walletDetails.map((wallet: any) => (
                            <option key={wallet._id} value={wallet._id}>
                                {wallet.balance}
                            </option>
                        ))}
                </select>
              </div> */}

              <div className="px-6.5 mb-3">
                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Make Withdrawal
                  </button>
              </div>
            </form>
          
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MakeWithdrawal;

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

const CreateSignal = () => {

  const [amount, setAmount] = useState('');
  const [direction, setDirection] = useState('buy');
  const [symbol, setSymbol] = useState('');
  const [interval, setInterval] = useState('');
  const [units, setUnits] = useState('');

  const router = useRouter();

  const submitSignal = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = {
        symbol,
        interval,
        units,
        amount,
        direction,
      };

      console.log("this is the payload", data);
      
      try {
        const response = await api.createSignal(data);
        toast.success("Signal created successfully!");
        setTimeout(() => {
          router.push("/signals");
        }, 4000);
        console.log("Signal created successfully:", response);
      } catch (error) {
        console.error("Error creating signal:", error);
        toast.error("Signal Creation Failed --> " + error);
      }
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Signal" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Signal Form
              </h3>
            </div>
            <form onSubmit={submitSignal}>
              <div className="p-6.5">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Symbol
                </label>
                <input
                  type="text"
                  name="symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="Enter the symbol"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="p-6.5">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Interval
                </label>
                <input
                  type="text"
                  name="interval"
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  placeholder="Enter the interval"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="p-6.5">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Unit
                </label>
                <input
                  type="text"
                  name="unit"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  placeholder="Enter the unit"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
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
              <div className="p-6.5">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Direction
                </label>
                <select
                  name="direction"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              <div className="px-6.5 mb-3">
                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Create Signal
                  </button>
              </div>
            </form> 
          

          
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateSignal;

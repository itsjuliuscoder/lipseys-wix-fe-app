"use client";
import React, { use, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableSeven from "@/components/Tables/TableSeven";
import api from "@/lib/api";
import { DEPOSIT } from "@/types/deposits";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const AllDeposits = () => {

  const [allUsers, setAllUsers] = useState([])
  const [withdrawalTrans, setWithdrawalTrans] = useState<DEPOSIT[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getAllUsers();
        setAllUsers(response.users);
        console.log("Total users ", response.totalUsers);
      } catch (error) {
        console.error("Error fetching Wix products: ", error);
      }
    };

    const fetchWithdrawalTransactions = async () => {
        try {
          const response = await api.getWithdrawalTransactions();
          setWithdrawalTrans(response.withdrawals);
          console.log("Total withdrawal ", response);
        } catch (error) {
          console.error("Error fetching Wix products: ", error);
        }
    }
    fetchWithdrawalTransactions();
    fetchUsers();
  } , []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Withdrawals" />
      <div className="flex flex-col gap-10">
        <TableSeven data={withdrawalTrans} />
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default AllDeposits;

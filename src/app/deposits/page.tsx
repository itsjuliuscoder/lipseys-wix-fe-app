"use client";
import React, { use, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableSix from "@/components/Tables/TableSix";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import api from "@/lib/api";
import { DEPOSIT } from "@/types/deposits";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const AllDeposits = () => {

  const [allUsers, setAllUsers] = useState([])
  const [depositTrans, setDepositTrans] = useState<DEPOSIT[]>([]);
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

    const fetchDepositTransactions = async () => {
        try {
          const response = await api.getDepositTransactions();
          setDepositTrans(response.deposits);
          console.log("Total deposits ", response.deposits.length);
        } catch (error) {
          console.error("Error fetching Wix products: ", error);
        }
    }
    fetchDepositTransactions();
    fetchUsers();
  } , []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Deposits" />
      <div className="flex flex-col gap-10">
        <TableSix data={depositTrans} />
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default AllDeposits;

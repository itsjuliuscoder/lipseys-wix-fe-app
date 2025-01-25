"use client";
import React, { use, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import api from "@/lib/api";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const TablesPage = () => {

  const [allUsers, setAllUsers] = useState([])
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
    fetchUsers();
  } , []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <div className="flex flex-col gap-10">
        <TableOne data={allUsers} />
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

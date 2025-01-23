"use client";
import React, { use, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import api from "@/lib/api";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const TablesPage = () => {

  const [wixProducts, setWixProducts] = useState([]);

  useEffect(() => {
    const fetchWixProducts = async () => {
      try {
        const response = await api.getWixProducts();
        console.log("Wix products length: ", response.length);
        setWixProducts(response);
      } catch (error) {
        console.error("Error fetching Wix products: ", error);
      }
    };
    fetchWixProducts();
  } , []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Inventories" />

      <div className="flex flex-col gap-10">
        <TableOne data={wixProducts} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

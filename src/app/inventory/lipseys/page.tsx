"use client";
import React, { use, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import api from "@/lib/api";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const TablesPage = () => {

  const [lipseysProducts, setLipseysProducts] = useState([]);

  useEffect(() => {
    const fetchLipseysProducts = async () => {
        try {
          const response = await api.getLipseysCatalog();
          console.log("Lipseys products ", response);
          setLipseysProducts(response);
        } catch (error) {
          console.error("Error fetching Lipseys products: ", error);
        }
    }
  
    fetchLipseysProducts();
  } , []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <TableTwo data={lipseysProducts} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

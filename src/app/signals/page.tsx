"use client";
import React, { use, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import api from "@/lib/api";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const TablesPage = () => {

  
  const [signals, setSignals] = useState([]);
  useEffect(() => {
    const fetchSignals = async () => {
        try {
            const data = await api.getAllSignals();
            setSignals(data);
        } catch (error) {
            console.error('Error fetching signals:', error);
        }
    };
    fetchSignals();
  } , []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Signals" />
      <div className="flex flex-col gap-10">
        <TableThree data={signals} />
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

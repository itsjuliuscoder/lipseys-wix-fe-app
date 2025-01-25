"use client";
import React, { use, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableFour from "@/components/Tables/TableFour";
import TableTwo from "@/components/Tables/TableTwo";
import api from "@/lib/api";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const TradesPage = () => {
  
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
        try {
            const data = await api.getAllTrade();
            setTrades(data);
        } catch (error) {
            console.error('Error fetching trades:', error);
        }
    };
    fetchTrades();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Trades" />
      <div className="flex flex-col gap-10">
        <TableFour data={trades} />
      </div>
    </DefaultLayout>
  );
};

export default TradesPage;

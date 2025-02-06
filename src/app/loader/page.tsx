"use client";
import React, { use, useEffect, useState } from "react";
import api from "@/lib/api";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from 'next/navigation';


const Loader: React.FC = () => {
    const router = useRouter();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        router.push('/');
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [router]);
  
    return (
      <DefaultLayout>
        <h2>Page refreshing........</h2>
      </DefaultLayout>
    );
};

export default Loader;

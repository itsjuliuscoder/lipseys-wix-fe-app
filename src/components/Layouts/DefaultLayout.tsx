"use client";
import React, { useState, useEffect, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {useRouter} from "next/navigation";
import api from "@/lib/api";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("userDetails");
    const userDetails = user ? JSON.parse(user) : null;
    if(user && userDetails) {
        setUserData(userDetails);
    } else {
        router.push('/auth/signin');
    }
    // const fetchUserData = async () => {
    //   try {
    //     // const response = await api.("/user");
    //     if (response.data) {
    //       setUserData(response.data);
    //       localStorage.setItem("userData", JSON.stringify(response.data));
    //     }
    //   } catch (error) {
    //     console.error("Error fetching user data: ", error);
    //   }
    // };
    // fetchUserData();

  }, [router]);


  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} data={userData} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}

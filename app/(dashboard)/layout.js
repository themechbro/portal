import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "../components/sidebar";
import DashboardHeader from "../components/Dasboard-header";

async function fetchAuthData() {
  const cookieStore = await cookies();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_IP}/protected`,
      {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      return { isAuthenticated: false, user: null };
    }

    const data = await response.json();
    return { isAuthenticated: data.isAuthenticated, user: data.userdata };
  } catch (error) {
    console.error("Auth check failed:", error);
    return { isAuthenticated: false, user: null };
  }
}

export default async function AuthLayout({ children }) {
  const authData = await fetchAuthData();
  if (!authData.isAuthenticated) {
    redirect("/Login?error=notLoggedIn");
  }
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar className="w-[200px] bg-gray-800" />
      <main className="flex-1 overflow-y-auto bg-gray-200">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}

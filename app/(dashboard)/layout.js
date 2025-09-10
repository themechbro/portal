import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

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
    redirect("/");
  }
  return <div className="flex h-screen w-full overflow-hidden">{children}</div>;
}

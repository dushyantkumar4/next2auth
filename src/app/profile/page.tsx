"use client";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data.data);
      setData(res.data.data._id);
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.error || "can't get user detail");
      }
      if(error instanceof Error){
        toast.error(error.message);
      }
      else{
        console.log("something went wrong");
      }
    }
  };
  const logout = async () => {
    try {
       await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Logout failed");
      }
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("something went wrong");
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Profile Page</h1>
      <hr />
      <h2 className="">
        {data === "nothing" ? (
          ""
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white 
      font-bold py-2 px-4 rounded cursor-pointer"
        onClick={logout}
      >
        Log Out
      </button>
      <button
        className="bg-green-500 mt-4 hover:bg-green-700 text-white 
      font-bold py-2 px-4 rounded cursor-pointer"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}

export default ProfilePage;

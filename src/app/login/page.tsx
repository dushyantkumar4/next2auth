"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserBody {
  email: string;
  password: string;
}

const Loginage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserBody>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const btnDisable = user.email.length === 0 || user.password.length === 0;

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log("Login successfully", res.data);
      router.push("/profile");
      toast.success("Login successfull");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Login failed");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">{loading ? "processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grya-600 text-black bg-white"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grya-600 text-black bg-white"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grya-60 cursor-pointer"
        disabled={btnDisable}
        onClick={onLogin}
      >
        {btnDisable ? "No Login" : "Login"}
      </button>
      <Link href={"/signup"}>visit to SignUp</Link>
    </div>
  );
};

export default Loginage;

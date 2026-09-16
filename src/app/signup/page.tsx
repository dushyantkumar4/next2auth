"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserBody {
  email: string;
  password: string;
  userName: string;
}

const SignUpage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserBody>({
    email: "",
    password: "",
    userName: "",
  });
  // const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const btnDisable =
    user.email.length === 0 ||
    user.password.length === 0 ||
    user.userName.length === 0;

  const onSignUp = async () => {
    try {
      setLoading(true);
      
      const res = await axios.post("/api/users/signup", user);
      console.log("signup successfully", res.data);
      router.push("/login");
      toast.success("signUp successfull");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        console.log("signup failed");
      }
    }
  };

  // useEffect(() => {
  //   if (
  //     user.email.length > 0 &&
  //     user.password.length > 0 &&
  //     user.userName.length > 0
  //   ) {
  //     setBtnDisable(false);
  //   } else {
  //     setBtnDisable(true);
  //   }
  // }, [user]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{loading ? "processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grya-600 text-black bg-white"
        type="text"
        id="username"
        value={user.userName}
        onChange={(e) => setUser({ ...user, userName: e.target.value })}
        placeholder="username"
      />
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
        onClick={onSignUp}
      >
        {btnDisable ? "No signup" : "SignUp"}
      </button>
      <Link href={"/login"}>visit to login</Link>
    </div>
  );
};

export default SignUpage;

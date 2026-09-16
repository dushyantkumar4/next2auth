"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // useEffect(() => {
  //    const urlToken = searchParams.get("token");

  //   if (urlToken) {
  //     setToken(urlToken);
  //   }

  //   // below is the nextjs utilization method to get token better than above for this we can provide the dependency if there is any changes in url
  //   // const {query} = router;
  //   // const urltokenTwo = query.token;
  // }, [searchParams]);

  useEffect(() => {
    if (!token) return;

    const verifyUserEmail = async () => {
      setError(false);
      try {
        await axios.post("/api/users/verifyemail", {
          token,
        });

        setVerified(true);
        setError(false);
      } catch (err: unknown) {
        setError(true);

        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.error || "Verification failed");
        } else if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    };

    verifyUserEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-5">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? token : "No token"}
      </h2>
      {!token && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">
            Invalid verification link
          </h2>
        </div>
      )}

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>

          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">
            Verification Failed
          </h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;

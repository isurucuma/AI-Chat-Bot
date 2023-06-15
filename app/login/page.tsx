"use client";
import Button from "@/components/micro_items/Button";
import React from "react";
import { FaUserClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {};

function Login({}: Props) {
  const router = useRouter();
  const verifyLogin = () => {
    console.log("verifyLogin");
    router.push("/admin");
  };
  return (
    <section>
      <motion.div
        initial={{
          opacity: 0,
          y: -300,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.2 }}
        className="fixed h-screen w-screen top-0 left-0 bg-slate-100 z-10 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
      >
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <FaUserClock className="text-6xl text-slate-900" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to admin account
          </h2>

          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <a
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {" "}
                    Forgot password?{" "}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                  ></input>
                </div>
              </div>
              <div>
                <Button
                  className="transition duration-200 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={verifyLogin}
                  name="Admin Login"
                />
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default Login;

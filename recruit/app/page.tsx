"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import TextLoader from "@/components/ui/TextLoader";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../lib/useAuth";

type Inputs = {
  email: string;
  password: string;
};

const login = async (inputData: Inputs) => {
  try {
    const { data } = await axios.post("/api/login", inputData);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export default function Login() {
  useAuth({ redirectIfFound: true });

  const router = useRouter();

  const [status, setStatus] = useState({
    error: false,
    text: "",
  });

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data: any) => {
      if (data.success) router.push("/dashboard");

      if (data.error)
        setStatus({
          error: true,
          text: data.error,
        });
    },
  });

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => mutate(data);

  return (
    <div id="parallax" className="text-center p-6 m-auto min-h-[80vh]">
      <div className="w-full p-6 mt-[7rem] rounded-lg max-w-[450px] mx-auto">
        <h1
          className="text-[2.5rem] font-bold mx-auto my-3 text-white"
          style={{
            textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          Login
        </h1>

        <div className="max-w-[500px] m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
              />
            </div>

            <div className="mt-5 drop-shadow-lg">
              <button
                className="bg-primary text-[1.3rem] text-white rounded-lg p-2 border border-black shadow-stone-800 shadow-lg"
                type="submit"
              >
                {!isLoading && "Login"}
                {isLoading && <TextLoader loadingText="Login" />}
              </button>
            </div>

            {status.text && (
              <p
                className={`${
                  status.error === true ? "text-red-600" : "text-green-600"
                } text-[1.3rem] p-2 font-bold my-1`}
              >
                {status.text}
              </p>
            )}
          </form>

          <div className="my-5">
            <Link
              href={"/register"}
              className="text-[1.3rem] underline text-primary font-bold shadow-stone-800 shadow-lg"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

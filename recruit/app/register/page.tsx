"use client";

import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import TextLoader from "@/components/ui/TextLoader";
import { useMutation } from "@tanstack/react-query";

type Inputs = {
  email: string;
  password: string;
  confirm_password: string;
  readerID: string;
};

const InputError = ({ text }: { text: string }) => (
  <p className="text-lg text-red-600 italic font-bold text-left">{text}</p>
);

const registerUser = async (inputData: Inputs) => {
  try {
    const readerID = inputData.readerID;

    const { data } = await axios.post(
      `/api/register/?r_id=${readerID}`,
      inputData
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export default function Register() {
  const searchParams = useSearchParams();
  const readerID = searchParams.get("r_id");

  const [status, setStatus] = useState({
    error: false,
    text: "",
  });

  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: (data: any) => {
      if (data.success)
        setStatus({
          error: false,
          text: data.success,
        });

      if (data.error)
        setStatus({
          error: true,
          text: data.error,
        });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  if (!readerID)
    return (
      <div id="parallax" className="text-center p-6 m-auto min-h-[80vh]">
        <div className="w-full p-6 mt-[7rem] rounded-lg max-w-[450px] mx-auto">
          <h1
            className="text-[2.5rem] font-bold mx-auto my-3 text-white"
            style={{
              textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            Invalid reader
          </h1>
        </div>
      </div>
    );

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    mutate({ ...data, readerID });

  return (
    <div id="parallax" className="text-center p-6 m-auto min-h-[80vh]">
      <div className="w-full p-6 mt-[7rem] rounded-lg max-w-[450px] mx-auto">
        <h1
          className="text-[2.5rem] font-bold mx-auto my-3 text-white"
          style={{
            textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          Register
        </h1>

        <div className="max-w-[500px] m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                autoComplete="off"
                type="email"
                placeholder="Email*"
                {...register("email", { required: true })}
                className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
              />
              {errors.email && errors.email.type === "required" && (
                <InputError text={"* Email is required"} />
              )}
            </div>

            <div>
              <input
                autoComplete="off"
                type="password"
                placeholder="Password*"
                {...register("password", { required: true })}
                className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
              />
              {errors.password && errors.password.type === "required" && (
                <InputError text={"* Password is required"} />
              )}
            </div>

            <div>
              <input
                autoComplete="off"
                type="password"
                placeholder="Confirm password*"
                {...register("confirm_password", { required: true })}
                className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
              />
              {errors.confirm_password &&
                errors.confirm_password.type === "required" && (
                  <InputError text={"* Confirm password is required"} />
                )}
            </div>

            <div className="mt-5 drop-shadow-lg">
              <button
                className="bg-primary text-[1.3rem] text-white rounded-lg p-2 border border-black shadow-stone-800 shadow-lg"
                type="submit"
              >
                {!isLoading && "Register"}
                {isLoading && <TextLoader loadingText="Register" />}
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
              href={"/"}
              className="text-[1.3rem] underline text-primary font-bold shadow-stone-800 shadow-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

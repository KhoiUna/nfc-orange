import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import Layout from "../containers/Layout";

export default function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    setRegisterInfo((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();

      const { success, error } = await (
        await fetch("/api/register", {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
          }),
          body: JSON.stringify(registerInfo),
        })
      ).json();

      if (error) throw error;

      return true;
    } catch (error) {
      console.error("Error registering");
      return false;
    }
  };

  return (
    <Layout title="Register">
      <div className="text-center bg-slate-50 p-20 m-auto min-h-[80vh]">
        <h1 className="text-[2.5rem] font-bold mx-auto my-3">Register</h1>

        <div className="max-w-[500px] m-auto">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                onChange={handleChange}
                className="border-2 m-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                type="email"
                name="email"
                placeholder="Email"
                value={registerInfo.email}
              />
            </div>

            <div>
              <input
                onChange={handleChange}
                className="border-2 m-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                type="password"
                name="password"
                placeholder="Password"
                value={registerInfo.password}
              />
            </div>

            <div>
              <input
                onChange={handleChange}
                className="border-2 m-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
                value={registerInfo.confirm_password}
              />
            </div>

            <div className="my-5 drop-shadow-lg">
              <button
                className="bg-primary text-[1.3rem] text-white rounded-lg p-2 border border-black"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="my-5">
            <Link href={"/login"}>
              <a className="text-[1.3rem] underline text-primary font-bold">
                Login
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

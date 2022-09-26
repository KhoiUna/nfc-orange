import Link from "next/link";
import { SyntheticEvent } from "react";
import Layout from "../containers/Layout";

export default function Register() {
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <Layout title="Register">
      <div className="text-center bg-slate-50 p-20 m-auto">
        <h1 className="text-[2.5rem] font-bold mx-auto my-3">Register</h1>

        <div className="max-w-[500px] m-auto">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className="border-2 m-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>

            <div>
              <input
                className="border-2 m-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>

            <div>
              <input
                className="border-2 m-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
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

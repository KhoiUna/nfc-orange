import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import TextLoader from "../components/ui/TextLoader";
import Layout from "../containers/Layout";
import useAuth from "../lib/useAuth";

const loginInfoInitialState = {
  email: "",
  password: "",
};

export default function Login() {
  useAuth({ redirectIfFound: true });

  const router = useRouter();

  const [loginInfo, setLoginInfo] = useState(loginInfoInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({
    error: false,
    text: "",
  });

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setStatus({
      error: false,
      text: "",
    });
    setLoginInfo((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      setIsLoading(true);

      const { success, error } = await (
        await fetch("/api/login", {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
          }),
          body: JSON.stringify(loginInfo),
        })
      ).json();

      if (error) throw error;

      if (success) router.push("/profile");

      return true;
    } catch (error) {
      console.error("Error logging in");
      setIsLoading(false);
      setStatus({
        error: true,
        text: error as string,
      });
      return false;
    }
  };

  return (
    <Layout title="Login">
      <div className="text-center bg-slate-50 p-20 m-auto min-h-[80vh]">
        <h1 className="text-[2.5rem] font-bold mx-auto my-3">Login</h1>

        <div className="max-w-[500px] m-auto">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                onChange={handleChange}
                value={loginInfo.email}
                className="border-2 m-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>

            <div>
              <input
                onChange={handleChange}
                value={loginInfo.password}
                className="border-2 m-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>

            <div className="mt-5 drop-shadow-lg">
              <button
                className="bg-primary text-[1.3rem] text-white rounded-lg p-2 border border-black"
                type="submit"
              >
                {!isLoading && "Login"}
                {isLoading && <TextLoader loadingText="Login" />}
              </button>
            </div>

            {status.text && (
              <p
                className={`${
                  status.error === true ? "text-red-800" : "text-green-800"
                } text-[1.3rem] p-2 font-bold my-1`}
              >
                {status.text}
              </p>
            )}
          </form>

          <div className="my-5">
            <Link href={"/register"}>
              <a className="text-[1.3rem] underline text-primary font-bold">
                Register
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import TextLoader from "../components/ui/TextLoader";
import Layout from "../containers/Layout";

export type RegisterInfo = {
  email: string;
  password: string;
  confirm_password: string;
};

const registerInfoInitialState = {
  email: "",
  password: "",
  confirm_password: "",
};

interface RegisterProps {
  showForm: boolean;
}

export default function Register({ showForm }: RegisterProps) {
  const router = useRouter();

  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>(
    registerInfoInitialState
  );

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
    setRegisterInfo((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      setIsLoading(true);

      const { success, error } = await (
        await fetch(`/api/register?c_id=${router.query.c_id}`, {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
          }),
          body: JSON.stringify(registerInfo),
        })
      ).json();

      if (error) throw error;

      setStatus({
        error: false,
        text: success,
      });
      setRegisterInfo(registerInfoInitialState);
      setIsLoading(false);

      return true;
    } catch (error: any) {
      console.error("Error registering");
      setIsLoading(false);
      setStatus({
        error: true,
        text: error,
      });
      return false;
    }
  };

  if (!showForm)
    return (
      <Layout title="Register">
        <div className="text-center bg-slate-50 p-20 m-auto min-h-[80vh]">
          <h1 className="text-[2.5rem] font-bold mx-auto my-3">Register</h1>
          <h2 className="text-[1.8rem]">You should get our NFC card first</h2>

          <div className="my-2">
            <Link href={"/login"}>
              <a className="text-[1.3rem] underline text-primary font-bold">
                Login
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    );

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
                className="bg-primary text-[1.3rem] text-white rounded-lg p-2 border border-black flex m-auto"
                type="submit"
              >
                {!isLoading && "Submit"}
                {isLoading && <TextLoader loadingText="Submitting" />}
              </button>

              {status.text && (
                <p
                  className={`${
                    status.error === true ? "text-red-800" : "text-green-800"
                  } text-[1.3rem] p-2 font-bold my-1`}
                >
                  {status.text}
                </p>
              )}
            </div>
          </form>

          <div>
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

export async function getServerSideProps(context: any) {
  // Only show form if c_id query exists in URL
  if (!context.query.c_id)
    return {
      props: {
        showForm: false,
      },
    };

  return {
    props: {
      showForm: true,
    },
  };
}

import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import TextLoader from "@/components/ui/TextLoader";
import Layout from "@/containers/Layout";
import axios from "axios";

export type RegisterInfo = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  major: string;
  password: string;
  confirm_password: string;
};

const registerInfoInitialState: RegisterInfo = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  major: "",
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

      const { data } = await axios.post(`/api/register?c_id=${router.query.c_id}`, registerInfo)

      if (data.success) {
        setStatus({
          error: false,
          text: data.success,
        });
        setRegisterInfo(registerInfoInitialState);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      setStatus({
        error: true,
        text: error.response.data.error,
      });
    }
  };

  if (!showForm)
    return (
      <Layout title="Register">
        <div
          id="parallax"
          className="text-center bg-slate-50 p-6 m-auto min-h-[80vh]"
        >
          <div className="w-full p-6 mt-[7rem] rounded-lg text-white">
            <h1
              className="text-[2.5rem] font-bold mx-auto my-3"
              style={{
                textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Register
            </h1>
            <h2
              className="text-[1.8rem]"
              style={{
                textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Tap your NFC Orange card on any NFC-enabled mobile phone to register
            </h2>
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout title="Register">
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
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  onChange={handleChange}
                  className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                  type="text"
                  name="first_name"
                  placeholder="First Name*"
                  value={registerInfo.first_name}
                />
              </div>
              <div>
                <input
                  onChange={handleChange}
                  className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                  type="text"
                  name="middle_name"
                  placeholder="Middle Name"
                  value={registerInfo.middle_name}
                />
              </div>
              <div>
                <input
                  onChange={handleChange}
                  className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                  type="text"
                  name="last_name"
                  placeholder="Last Name*"
                  value={registerInfo.last_name}
                />
              </div>

              <div>
                <input
                  onChange={handleChange}
                  className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                  type="email"
                  name="email"
                  placeholder="School email .edu*"
                  value={registerInfo.email}
                />
              </div>

              <div>
                <input
                  onChange={handleChange}
                  className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                  type="text"
                  name="major"
                  placeholder="Major*"
                  value={registerInfo.major}
                />
              </div>

              <div>
                <input
                  onChange={handleChange}
                  className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                  type="password"
                  name="password"
                  placeholder="Password*"
                  value={registerInfo.password}
                />
              </div>

              <div>
                <input
                  onChange={handleChange}
                  className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm password*"
                  value={registerInfo.confirm_password}
                />
              </div>

              <div className="my-5 drop-shadow-lg">
                <button
                  className="bg-primary text-[1.3rem] text-white rounded-lg p-2 border border-black flex m-auto shadow-stone-800 shadow-lg"
                  type="submit"
                >
                  {!isLoading && "Submit"}
                  {isLoading && <TextLoader loadingText="Submitting" />}
                </button>

                {status.text && (
                  <p
                    className={`${status.error === true ? "text-red-600" : "text-green-600"
                      } text-[1.3rem] p-2 font-bold my-1 `}
                  >
                    {status.text}
                  </p>
                )}
              </div>
            </form>

            <div>
              <Link
                href={"/login"}
                className="text-[1.3rem] underline text-primary font-bold shadow-stone-800 shadow-lg">
                Login
              </Link>
            </div>
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

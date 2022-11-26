import Image from "next/image";
import Layout from "../containers/Layout";
import productImage from "../public/images/product.png";
import { Icon } from "@iconify/react";
import { SyntheticEvent, useState } from "react";
import TextLoader from "../components/ui/TextLoader";

export type OrderInfo = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  shipping_address: string;
};

const orderFormInitialState: OrderInfo = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  shipping_address: "",
};

const Shop = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const toggleOrderForm = () => {
    if (!showOrderForm)
      (document.querySelector("html") as HTMLHtmlElement).scrollTop = 0;
    setShowOrderForm(!showOrderForm);
  };

  const [orderForm, setOrderForm] = useState(orderFormInitialState);
  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setStatus({
      error: false,
      text: "",
    });
    setOrderForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({
    error: false,
    text: "",
  });
  const handleSubmit = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      setIsLoading(true);

      const { error, success } = await (
        await fetch("/api/submit-order", {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
          }),
          body: JSON.stringify(orderForm),
        })
      ).json();

      if (error) throw error;

      setStatus({
        error: false,
        text: success,
      });
      setIsLoading(false);
      setOrderForm(orderFormInitialState);

      return true;
    } catch (error: any) {
      console.error(error);
      setStatus({
        error: true,
        text: error,
      });
      setIsLoading(false);
      return false;
    }
  };

  return (
    <Layout title="Pricing">
      <div id="parallax" className="text-center p-6 m-auto min-h-[80vh]">
        <div className="bg-slate-50 opacity-[0.9] w-fit p-6 mt-[7rem] rounded-lg mx-auto">
          <h1 className="text-[2.5rem] font-bold mx-auto my-3 mb-6">Product</h1>

          <div>
            <Image
              src={productImage}
              alt="NFC Orange product image"
              className="rounded-lg"
              width={500}
              height={500}
            />
          </div>

          <p className="mt-2 text-[1.3rem] font-bold text-red-600">
            *Limited time offer 40% off
          </p>
          <button
            className="flex items-center justify-around text-[1.5rem] bg-[#ffa463] w-fit py-2 px-6 text-black rounded-[100px] cursor-pointer mt-2 mx-auto hover:shadow-lg"
            onClick={toggleOrderForm}
          >
            <span className="border-r-2 border-black px-4 font-bold">
              $15{" "}
              <span className="text-lg line-through text-red-600">
                <span className="text-red">$25</span>
              </span>{" "}
              / card
            </span>
            <Icon className="ml-3" icon="material-symbols:add-shopping-cart" />
          </button>
        </div>
      </div>

      {/* Order Form */}
      {showOrderForm && (
        <>
          <div
            className="absolute top-0 z-10 left-0 w-full h-full bg-black opacity-50 cursor-pointer"
            onClick={toggleOrderForm}
          ></div>
          <div className="text-center bg-slate-50 p-6 rounded-lg mx-auto w-full absolute z-20 top-[6rem]">
            <p className="text-[2.5rem] mb-4 font-bold">Order Form</p>

            <form className="text-lg" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label hidden className="font-bold" htmlFor="first_name">
                  First Name
                </label>
                <div>
                  <input
                    className="mt-1 p-2 border-2 rounded-lg"
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name*"
                    value={orderForm.first_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label hidden className="font-bold" htmlFor="middle_name">
                  Middle Name
                </label>
                <div>
                  <input
                    className="mt-1 p-2 border-2 rounded-lg"
                    type="text"
                    name="middle_name"
                    id="middle_name"
                    placeholder="Middle Name"
                    value={orderForm.middle_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label hidden className="font-bold" htmlFor="last_name">
                  Last Name
                </label>
                <div>
                  <input
                    className="mt-1 p-2 border-2 rounded-lg"
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name*"
                    value={orderForm.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label hidden className="font-bold" htmlFor="email">
                  Email
                </label>
                <div>
                  <input
                    className="mt-1 p-2 border-2 rounded-lg"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email*"
                    value={orderForm.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label hidden className="font-bold" htmlFor="phone_number">
                  Phone Number
                </label>
                <div>
                  <input
                    className="mt-1 p-2 border-2 rounded-lg"
                    type="tel"
                    name="phone_number"
                    id="phone_number"
                    placeholder="Phone Number*"
                    value={orderForm.phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label hidden className="font-bold" htmlFor="shipping_address">
                  Shipping Address
                </label>
                <div>
                  <input
                    className="mt-1 p-2 border-2 rounded-lg"
                    type={"text"}
                    name="shipping_address"
                    id="shipping_address"
                    placeholder="Shipping Address*"
                    value={orderForm.shipping_address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="font-bold bg-primary w-fit py-2 px-6 text-white rounded-[100px] cursor-pointer mt-4 mx-auto hover:shadow-lg"
                >
                  {!isLoading && "Submit my order"}
                  {isLoading && <TextLoader loadingText="Submitting" />}
                </button>

                {status.text && (
                  <p
                    className={`${
                      status.error === true ? "text-red-800" : "text-green-800"
                    } text-[1rem] p-2 font-bold mt-2`}
                  >
                    {status.text}
                  </p>
                )}
              </div>
            </form>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Shop;

import Image from "next/image";
import Layout from "../containers/Layout";
import productImage from "../public/images/product.png";
import { Icon } from "@iconify/react";

const Shop = () => {
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

          <button className="flex items-center justify-around text-[1.5rem] bg-primary w-fit py-2 px-6 text-white rounded-[100px] cursor-pointer mt-4 mx-auto hover:shadow-lg">
            <span className="border-r-2 px-4 font-bold">$15 / card</span>
            <Icon className="ml-3" icon="material-symbols:add-shopping-cart" />
          </button>

          {/* <p className="text-[1.2rem] mt-2 font-semibold italic">
            Contact us to purchase
          </p> */}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;

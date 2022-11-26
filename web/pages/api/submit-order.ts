import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import createDiscordAlert from "../../lib/createDiscordAlert";
import { OrderInfo } from "../shop";
import { ApiResponse } from "./register";

const isValid = async (orderInfo: OrderInfo) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().trim().min(1).required(),
    middle_name: Joi.string().trim().allow(null, ""),
    last_name: Joi.string().trim().min(1).required(),
    email: Joi.string().email().trim().required(),
    phone_number: Joi.string().min(10).required(),
    shipping_address: Joi.string().min(10).required(),
  });

  try {
    const value = await schema.validateAsync(orderInfo);
  } catch (error: any) {
    return { success: false, error: error.details[0].message };
  }

  return { success: true, error: false };
};

export default async function view(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    if (req.method !== "POST")
      return res
        .status(403)
        .json({ success: false, error: "Method not allowed" });

    // Validate req.body from user
    const { success, error } = await isValid(req.body);
    if (error) return res.status(400).json({ success: false, error });

    // TODO: Send to Discord
    if (!(await createDiscordAlert(JSON.stringify(req.body, null, 2))))
      throw new Error("Internal server error");

    return res.status(200).json({
      success:
        "Submitted successfully! We will process your order and send you a secure payment link to your email (it may end up in your spam folder)!",
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

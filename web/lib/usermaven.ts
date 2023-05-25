import { UsermavenClient, usermavenClient } from "@usermaven/sdk-js";

const usermaven: UsermavenClient = usermavenClient({
    key: process.env.NEXT_PUBLIC_USERMAVEN_API_KEY as string,
    tracking_host: "https://events.usermaven.com",
});

export default usermaven
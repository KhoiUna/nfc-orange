import axios from "axios";

const createDiscordAlert = async (message: string) => {
  try {
    if (process.env.NODE_ENV === "development") return true;

    const res = await axios.post(process.env.DISCORD_WEBHOOK_URL as string, {
      content: `@everyone ${"```\n" + message + "\n```"}`,
    });
    console.log(`Status Code: ${res.status}`);

    return true;
  } catch (err) {
    console.error("Error creating discord alert");
    return false;
  }
};

export default createDiscordAlert;

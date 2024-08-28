import axios from "axios";

async function name(image: string) {
  return await axios.post(
    "https://api.gemini.com/v1/images",
    { image },
    {
      headers: {
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
}

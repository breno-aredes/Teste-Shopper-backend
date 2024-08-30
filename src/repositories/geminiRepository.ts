import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { geminiResponse } from "protocols/measure";

export async function geminiImage(image: string): Promise<geminiResponse> {
  const mimeType = "image/jpeg";
  const base64Data = image.replace(/^data:image\/(png|jpeg);base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const tempFilePath = "/tmp/temp-image" + ".jpg";
  fs.writeFileSync(tempFilePath, buffer);

  const apiKey = process.env.GEMINI_API_KEY;
  const uploadFileManager = new GoogleAIFileManager(apiKey);
  const fileManager = new GoogleGenerativeAI(apiKey);
  const model = fileManager.getGenerativeModel({ model: "gemini-1.5-flash" });

  const uploadResponse = await uploadFileManager.uploadFile(tempFilePath, {
    mimeType: mimeType,
    displayName: "water or gas reading",
  });

  const prompt = "What number is in the image?";

  const PronpResponse = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    { text: prompt },
  ]);

  const numberResult = PronpResponse.response.text().match(/\d+/)?.[0] ?? "";

  const imageUrl = uploadResponse.file.uri;

  return { image_url: imageUrl, measure_value: Number(numberResult) };
}

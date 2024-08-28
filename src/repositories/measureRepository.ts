import { Measure } from "@prisma/client";
import prisma from "database";
import { geminiImg, uploadType } from "protocols/upload";

async function getMeasure(data: uploadType): Promise<any> {
  const measureDate = new Date(data.measure_datetime);
  const startOfMonth = new Date(
    measureDate.getFullYear(),
    measureDate.getMonth(),
    1
  );

  const endOfMonth = new Date(
    measureDate.getFullYear(),
    measureDate.getMonth() + 1,
    0
  );

  const response = await prisma.measure.findFirst({
    where: {
      customer_code: data.customer_code,
      measure_type: data.measure_type,
      measure_datetime: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
  });

  return response;
}

async function createMeasure(data: uploadType, img?: geminiImg) {
  img = {
    measure_value: 2,
    image_url: "",
    has_confirmed: true,
  };

  const newMeasure = await prisma.measure.create({
    data: {
      customer_code: data.customer_code,
      measure_datetime: new Date(data.measure_datetime),
      measure_type: data.measure_type,
      measure_value: img.measure_value,
      image_url: img.image_url,
      has_confirmed: img.has_confirmed,
    },
  });

  return {
    image_url: newMeasure.image_url,
    measure_value: newMeasure.measure_value,
    measure_uuid: newMeasure.measure_uuid,
  };
}

export default {
  getMeasure,
  createMeasure,
};

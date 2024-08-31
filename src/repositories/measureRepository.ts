import { Measure, MeasureType } from "@prisma/client";
import prisma from "../database";
import {
  attMeasure,
  CreateMeasure,
  geminiResponse,
  getCostumerMeasure,
  getMeasureResponse,
  promiseGetMeasure,
  uploadType,
} from "../protocols/measure";

async function getMeasure(data: uploadType): Promise<Measure | null> {
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

async function createMeasure(
  data: uploadType,
  geminiData: geminiResponse
): Promise<CreateMeasure> {
  const newMeasure = await prisma.measure.create({
    data: {
      customer_code: data.customer_code,
      measure_datetime: new Date(data.measure_datetime),
      measure_type: data.measure_type,
      measure_value: geminiData.measure_value,
      image_url: geminiData.image_url,
      has_confirmed: false,
    },
  });

  return {
    image_url: newMeasure.image_url,
    measure_value: newMeasure.measure_value,
    measure_uuid: newMeasure.measure_uuid,
  };
}

async function getMeasureByCustomer(
  data: getCostumerMeasure
): Promise<promiseGetMeasure> {
  const { customer_code, measure_type } = data;

  const measures = await prisma.measure.findMany({
    where: {
      customer_code: customer_code,
      ...(measure_type && { measure_type: measure_type as MeasureType }),
    },
    orderBy: {
      measure_datetime: "desc",
    },
  });
  const formattedMeasures: getMeasureResponse[] = measures.map((measure) => ({
    measure_uuid: measure.measure_uuid,
    measure_datetime: measure.measure_datetime,
    measure_type: measure.measure_type,
    has_confirmed: measure.has_confirmed,
    image_url: measure.image_url,
  }));

  return {
    customer_code,
    measures: formattedMeasures,
  };
}

async function getMeasureByUuid(data: attMeasure): Promise<Measure | null> {
  const response = await prisma.measure.findFirst({
    where: {
      measure_uuid: data.measure_uuid,
      measure_value: data.confirmed_value,
    },
  });

  return response;
}

async function patchMeasure(measure_uuid: string) {
  await prisma.measure.update({
    where: {
      measure_uuid: measure_uuid,
    },
    data: {
      has_confirmed: true,
    },
  });
}

export default {
  getMeasure,
  createMeasure,
  getMeasureByCustomer,
  getMeasureByUuid,
  patchMeasure,
};

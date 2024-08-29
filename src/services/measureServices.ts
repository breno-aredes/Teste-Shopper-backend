import { MeasureType } from "@prisma/client";
import errors from "errors";
import {
  getCostumerMeasure,
  promiseMeasure,
  uploadType,
} from "protocols/measure";
import measureRepository from "repositories/measureRepository";

async function uploadMeasure(data: uploadType): Promise<any> {
  const existingMeasure = await measureRepository.getMeasure(data);

  if (existingMeasure) {
    throw errors.conflictsError("Leitura do mês já realizada");
  }

  return await measureRepository.createMeasure(data);
}

async function getMeasureByCustomerId(
  data: getCostumerMeasure
): Promise<promiseMeasure> {
  const validMeasureTypes = ["WATER", "GAS"];

  if (data.measure_type && !validMeasureTypes.includes(data.measure_type)) {
    throw errors.invalidTypeError("Tipo de medição não permitida");
  }

  const response = await measureRepository.getMeasureByCustomerId(data);

  if (response.measures.length === 0) {
    throw errors.NotFoundError("Nenhuma leitura encontrada");
  }

  return response;
}

export default {
  uploadMeasure,
  getMeasureByCustomerId,
};

import errors from "../errors";
import {
  attMeasure,
  CreateMeasure,
  getCostumerMeasure,
  promiseGetMeasure,
  uploadType,
} from "../protocols/measure";
import { geminiImage } from "../repositories/geminiRepository";
import measureRepository from "../repositories/measureRepository";

async function uploadMeasure(data: uploadType): Promise<CreateMeasure> {
  const existingMeasure = await measureRepository.getMeasure(data);

  if (existingMeasure) {
    throw errors.conflictsError("Leitura do mês já realizada");
  }

  const geminiData = await geminiImage(data.image);

  return await measureRepository.createMeasure(data, geminiData);
}

async function getMeasureByCustomer(
  data: getCostumerMeasure
): Promise<promiseGetMeasure> {
  const validMeasureTypes = ["WATER", "GAS"];

  if (data.measure_type && !validMeasureTypes.includes(data.measure_type)) {
    throw errors.invalidTypeError("Tipo de medição não permitida");
  }

  const response = await measureRepository.getMeasureByCustomer(data);

  if (response.measures.length === 0) {
    throw errors.NotFoundError("Nenhuma leitura encontrada");
  }

  return response;
}

async function confirmMeasure(data: attMeasure) {
  const existingMeasure = await measureRepository.getMeasureByUuid(data);

  if (!existingMeasure) {
    throw errors.NotFoundError("Nenhuma leitura encontrada");
  }

  if (existingMeasure.has_confirmed) {
    throw errors.conflictsDuplicateError("Leitura do mês já confirmada");
  }

  await measureRepository.patchMeasure(data.measure_uuid);
}

export default {
  uploadMeasure,
  getMeasureByCustomer,
  confirmMeasure,
};

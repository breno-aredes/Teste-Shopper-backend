import errors from "errors";
import { uploadType } from "protocols/upload";
import measureRepository from "repositories/measureRepository";

async function uploadMeasure(data: uploadType): Promise<any> {
  const existingMeasure = await measureRepository.getMeasure(data);

  //   if (existingMeasure) {
  //     throw errors.conflictsError("Leitura do mês já realizada");
  //   }

  return await measureRepository.createMeasure(data);
}

export default {
  uploadMeasure,
};

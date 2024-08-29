import { MeasureType } from "@prisma/client";

export type uploadType = {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
};

export type geminiImg = {
  measure_value: number;
  image_url: string;
  has_confirmed: boolean;
};

export type getCostumerMeasure = {
  customer_code: string;
  measure_type?: string | undefined;
};

export interface getMeasureResponse {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: MeasureType;
  has_confirmed: boolean;
  image_url: string;
}

export interface promiseMeasure {
  customer_code: string;
  measures: getMeasureResponse[];
}

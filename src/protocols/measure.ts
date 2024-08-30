import { MeasureType } from "@prisma/client";

export type uploadType = {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
};

export type geminiResponse = {
  image_url: string;
  measure_value: number;
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

export interface promiseGetMeasure {
  customer_code: string;
  measures: getMeasureResponse[];
}

export interface attMeasure {
  measure_uuid: string;
  confirmed_value: number;
}

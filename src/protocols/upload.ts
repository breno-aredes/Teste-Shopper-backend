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

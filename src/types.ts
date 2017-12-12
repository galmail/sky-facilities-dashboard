// types.ts

export interface DataPoint {
  date: Date;
  value: number;
}

export interface FilterDates {
  fromDate?: Date | null;
  toDate?: Date | null;
}

export interface Indicators {
  min?: number;
  max?: number;
  avg?: number;
}




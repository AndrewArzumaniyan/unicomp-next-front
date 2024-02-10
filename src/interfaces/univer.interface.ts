export interface Univer {
  _id: string;
  name: string;
  visibleName: string;
  price: string;
  campus: string;
  ENTgrants: string;
  lang: string;
  internalGrants: string;
  magistracy: string;
  doctoral: string;
  univerType: string;
  exchangeStudy: string;
  priceMagistracy: string;
  city: string;
  address: string;
  tel: string;
  mail: string;
  img: string;
  subscipt: boolean;
  coordinates: number[];
}

export interface UniverData {
  universities: Univer[];
}
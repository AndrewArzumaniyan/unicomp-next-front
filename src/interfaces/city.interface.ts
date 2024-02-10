interface CategoryElementType {
  title: string;
  info: string;
}

interface CityElement {
  [key: string]: CategoryElementType;
}

interface CityCategory {

}

export interface City {
  _id: string;
  name: string;
  img: string;
  // common_description: 
}
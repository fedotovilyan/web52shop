export interface ICategory {
  sub_categories: {
    id: number;
    name: string;
  }[];
  main_categories: {
    id: number;
    name: string;
  }[];
  id: number;
  name: string;
}
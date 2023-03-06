import { ICategory, IModel } from "../dto";

/* eslint-disable camelcase */
export type IUser = {
  nome: string;
  telefone: string;
};

export type OrderNavigationIndication = {
  quemIndicou: string;
  id: string;
};

interface Item {
  category: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: IUser;
      login: undefined;
      item: Item;
      buy: IModel;
      cart: IModel;
    }
  }
}

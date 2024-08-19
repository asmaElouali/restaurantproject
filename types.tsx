import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }

}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Restaurant: { id: any ,firstname:any,lastname:any};
  DinningTable: { id: any, name: any,firstname:any,lastname:any };
  Menus: { id: any, table: any,firstname:any,lastname:any };
  Details: { id: any, name: any, description: any, image: any, price: any, table: any,rvc:any };
  Cart: { table: any ,rvcid:any};
  Tab: {screen:any , params:any};
  Order:{tableId:any}
  Payment:{amount:any,rvcId:any,table:any}
  Setting:{rvcId:any,tableId:any,firstname:any,lastname:any}
  MainTab:{screen:any,params:any}
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;


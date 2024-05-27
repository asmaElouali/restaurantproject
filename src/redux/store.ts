import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuData from '../data/MenuData';
import { COLORS } from '../theme/theme';
//import AsyncStorage from '@react-native-community/async-storage';


export const useStore = create(
  persist(
    (set, get) => ({
      Item: MenuData,
      CartPrice: 0,
      CartList: [],
      FavoriteList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            console.log("cartlist", state.CartList[0]);
            console.log("cartitem:", cartItem);
            console.log("cartprice", state.CartPrice);
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].index === cartItem.index) {
                found = true;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  /* if (
                     state.CartList[i].prices[j].price == cartItem.prices.price
                   ) {*/
                  state.CartList[i].prices[0].quantity++;
                  break;
                  //}
                }
              }
            }
            if (found === false) {
              state.CartList.push(cartItem);
            }
          })
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalprice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempprice = 0;
              tempprice = tempprice + parseFloat(state.CartList[i].prices[0].price) * state.CartList[i].prices[0].quantity;

              state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
              totalprice = totalprice + tempprice;
            }
            state.CartPrice = totalprice.toFixed(2).toString();
          }),
        ),
      incrementCartItemQuantity: (index: number) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].index == index) {
                //  for (let j = 0; j < state.CartList[i].prices.length; j++) {
                if (state.CartList[i].prices[0].quantity >= 1) {
                  state.CartList[i].prices[0].quantity++;
                  console.log("plusss")
                }
                console.log("quantity :", state.CartList[0].prices[0].quantity)
                //}
              }
            }
          })
        ),
      decrementCartItemQuantity: (index: number) => {
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].index == index) {
                if (state.CartList[i].prices[0].quantity > 1) {
                  state.CartList[i].prices[0].quantity--;
                  console.log("errorr")
                } else {
                  state.CartList.splice(i, 1);
                  console.log("elseee")
                }
              }
            }
          })
        )
      },
      addToFavoriteList: (index: number) => {
        set(
          produce(state => {
            for (let i = 0; i < state.Item.length; i++) {
              for (let j = 0; j < state.Item[i].subcategories.length; j++) {
                for (let k = 0; k < state.Item[i].subcategories[j].items.length; k++) {
                  if (state.Item[i].subcategories[j].items[k].index == index) {
                    if (state.Item[i].subcategories[j].items[k].favourite == false) {
                      state.Item[i].subcategories[j].items[k].favourite = true;
                      state.FavoriteList.unshift(state.Item[i].subcategories[j].items[k])
                    } else {
                      state.Item[i].subcategories[j].items[k].favourite = false;
                    }
                    break;
                  }
                }
              }
            }
          }

          )
        )
      },
      deleteFromFavoriteList: (index: number) => {
        set(
          produce(state => {
            for (let i = 0; i < state.Item.length; i++) {
              for (let j = 0; j < state.Item[i].subcategories.length; j++) {
                for (let k = 0; k < state.Item[i].subcategories[j].items.length; k++) {
                  if (state.Item[i].subcategories[j].items[k].index == index) {
                    if (state.Item[i].subcategories[j].items[k].favourite == true) {
                      state.Item[i].subcategories[j].items[k].favourite = false;
                      state.FavoriteList.unshift(state.Item[i].subcategories[j].items[k])
                    } else {
                      state.Item[i].subcategories[j].items[k].favourite = true;
                    }
                  }
                  break;
                }
              }
              break;
            }
            let spliceIndex = -1;
            console.log("favo", state.FavoriteList);
            for (let i = 0; i < state.FavoriteList.length; i++) {
              console.log("list", state.FavoriteList)
              if (state.FavoriteList[i].index == index) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoriteList.splice(spliceIndex, 1);
          })
        )
      },
      resetStore: () => {
        AsyncStorage.clear().then(() => {
          set({
            Item: MenuData,
            CartPrice: 0,
            CartList: [],
            FavoriteList: []
          });
        });
      },
      addToOrderHistoryListFromCart: ()=>{
        set(
          produce(state => {
            let temp = state.CartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );
            if (state.OrderHistoryList.length > 0){
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +' '+ new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice : temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate:
                 new Date().toDateString() + ' '+ new Date().toLocaleTimeString(),
                CartList : state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartList = [];
          }),
        )
      }
    }),
    {
      name: 'menu-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
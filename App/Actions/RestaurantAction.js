import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import AuthModule from '../Modules/AuthModule/Auth';
import LocationModule from '../Modules/System/LocationModule';
import RestaurantModule from '../Modules/RestaurantModule/RestaurantModule';
import AddressModule from '../Modules/AddressModule/AddressModule';

export default {
    async getRestaurant(){
      try{
          const token = await AuthModule.getToken();
          const userloc = await LocationModule.getCurrentPosition();
          const reqData = {token,userloc}
          const data = await RestaurantModule.getRestaurantData(reqData)
          const addressList = await AddressModule.getAddress(token);
          console.log(data)
          dispatch({
              actionType: AppConstants.GET_RESTAURANT_SUCCESS, data
          })
      }catch (e){

      }

    },
    getMenuSuccess(menu){
      dispatch({
          actionType: AppConstants.GET_MENU_SUCCESS, menu
      })
    },
    async getMenu(rid){
      try{
          const token = await AuthModule.getToken();
          const reqData = {rid,token}
          const menuData = await RestaurantModule.getMenu(reqData)
          dispatch({
              actionType: AppConstants.GET_MENU_SUCCESS, menuData
          })
      }catch (e){
      }
    },
    async beforCheckout(rid,pretax,navigator,startAmount){
      try{
          const token = await AuthModule.getToken();
          const reqData = {rid,pretax,token,startAmount}
          const result = await RestaurantModule.beforCheckout(reqData)
          // const addressList = await AddressModule.getAddress(token);
          const data = {result,navigator,rid}
          console.log("restaurantAction",data)
          dispatch({
              actionType: AppConstants.BEFORE_CHECKOUT, data
          })
      }catch (e){
      }
    },
    updateDltype(type){
      const data = {type};
      dispatch({
          actionType: AppConstants.UPDATE_DLTYPE,data
      })
    },
    async calculateDeliveryFee(){
      try{
        const token = await AuthModule.getToken();
        const reqData = {token};
        const data = await RestaurantModule.calculateDeliveryFee(reqData);
        dispatch({
            actionType: AppConstants.CALCULATE_DELIVERY_FEE, data
        })
      }catch (e){
      }
    },
    async checkout(){
      try{
        const token = await AuthModule.getToken();
        const reqData = {token};
        const data = await RestaurantModule.checkout(reqData);
        console.log(data)
        dispatch({
            actionType: AppConstants.CHECKOUT, data
        })
      }catch (e){
      }
    },
     updateAdderss(){
      dispatch({
          actionType: AppConstants.UPDATE_ADDRESS
      })
    }
}

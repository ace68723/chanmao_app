import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import HistoryModule from '../Modules/HistoryModule/HistoryModule';
import AuthService from '../Services/AuthService';

export default {
    getHistorySuccess(data){
      dispatch({
          actionType: AppConstants.GET_HISTORY_SUCCESS, data
      })
    },
    async getOrderData(){
      try{
        const token = await AuthService.getToken();
        const orderData = await HistoryModule.getOrderData(token);
        dispatch({
            actionType: AppConstants.GET_ORDERS, orderData
        })
      }catch (e){
        console.log(e);
      }
    },
    async getVerifyCode(oid){
      try{
        const token = await AuthService.getToken();
        const data = {oid,token};
        HistoryModule.getVerifyCode(data)
      }catch (e){
        console.log(e);
      }
    },
    async getHistoryDetail(oid){
      try{
        const token = await AuthService.getToken();
        const io_data = {oid,token};
        const data = await HistoryModule.getHistoryDetail(io_data)
        dispatch({
            actionType: AppConstants.GET_HISTORY_DETAIL, data
        })
      }catch (e){
        console.log(e);
      }
    },
    async verifyPhone(code,oid){
      try{
        const token = await AuthService.getToken();
        const io_data = {code,oid,token};
        const data = await HistoryModule.verifyPhone(io_data)
        dispatch({
            actionType: AppConstants.VERIFY_PHONE, data
        })
      }catch (e){
        console.log(e);
      }
    }


}

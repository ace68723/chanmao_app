import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import HomeModule from '../Modules/HomeModule/HomeModule';
import LocationModule from '../Modules/System/LocationModule';
import AuthModule from '../Modules/AuthModule/Auth';

export default {
     async getHomeData(){
        try{
          const token = await AuthModule.getToken();
          const homeData = await HomeModule.getHomeData(token);

          const userloc = await LocationModule.getCurrentPosition();
          const reqData = {token,userloc}
          const areaList = await HomeModule.getAreaList(reqData);
          const res = {homeData,areaList}

          dispatch({
              actionType: AppConstants.GET_HOME_DATA, res
          })
        }catch (e){
          console.error(e);
        }
      },


}

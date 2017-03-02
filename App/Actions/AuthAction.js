import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import Auth from '../Modules/AuthModule/Auth';
import Alert from '../Components/General/Alert';

export default {
    async doLogin(io_data){
      try{
        const {username,password,deviceToken} = io_data
        const data                            = {username,password,deviceToken}
        const res                             = await Auth.AppLogin(data)
        dispatch({
            actionType: AppConstants.LOGIN_SUCCESS, res
        })
      }catch(error){
        dispatch({
            actionType: AppConstants.LOGIN_FAIL, error
        })
        setTimeout( () => {
           Alert.errorAlert(error.message || '未知错误')
        }, 1000);
      }
    },
    async doWechatAuth(io_data){
      try{
        const deviceToken = io_data.deviceToken;
        const resCode     = io_data.resCode;
        const data        = {deviceToken,resCode}
        const res         = await Auth.AppDoWechatAuth(data)
        dispatch({
            actionType: AppConstants.LOGIN_SUCCESS, res
        })
      }catch(error){
        console.log(error)
      }
    },
    loginSuccess(res){
      dispatch({
          actionType: AppConstants.LOGIN_SUCCESS, res
      })
    },
    loginFail(errorMessage){
      dispatch({
          actionType: AppConstants.LOGIN_FAIL, errorMessage
      })
    },
    logout(){
      Auth.logout()
      dispatch({
          actionType: AppConstants.LOGOUT,
      })
    },
}

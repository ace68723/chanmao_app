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
              console.log(res)
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

'use strict';

import Auth from '../Modules/AuthModule/Auth';
import AuthAction from '../Actions/AuthAction';
import Alert from '../Components/General/Alert';
let _token = ""
const AuthService = {
    async doLogin(io_data){
            try{
              const username    = io_data.username;
              const password    = io_data.password;
              const deviceToken = io_data.deviceToken;
              const data        = {username,password,deviceToken}
              const res         = await Auth.AppLogin(data)
              console.log(res)
              AuthAction.loginSuccess(res);
            }catch(error){
              // AuthAction.loginFail(error.message);
              Alert.errorAlert(error.message || '未知错误')
            }
    },
    async doAuth(){
          try{
            const res = await Auth.doAuth()
            if(res.result == 0){
               AuthAction.loginSuccess(res);
            }else{
              console.log(res)
              const errorMessage = res.message  || '验证失效,未知错误'
              throw errorMessage
            }
          }catch(error){
            console.log(error)
            // Alert.errorAlert(error.message || '验证失败'+JSON.stringify(error))
          }
    },
    async doWechatAuth(io_data){
        try{
          const deviceToken = io_data.deviceToken;
          const resCode     = io_data.resCode;
          const data        = {deviceToken,resCode}
          const res         = await Auth.AppDoWechatAuth(data)
          AuthAction.loginSuccess(res);
        }catch(error){
          AuthAction.loginFail(error.message);
          Alert.errorAlert(error.message || '未知错误')
        }
    },
    getToken(){
      return new Promise((resolve, reject) => {
            Auth.getToken()
              .then(token =>{
                resolve(token)
              })
              .catch(error => {
                  Alert.errorAlert(error.message || '未知错误')
              })
      })
    }
}

module.exports = AuthService;

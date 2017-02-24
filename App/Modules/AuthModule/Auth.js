'use strict';


const  AuthApi        = require( './AuthApi');
const  AuthConstants  = require( './AuthConstants');
const  AuthStore      = require( './AuthStore');
const  AppConstants   = require('../../Constants/AppConstants')
const  DeviceInfo     = require('react-native-device-info');
const  Alert          = require('../System/Alert');
// version
const VERSION         = AppConstants.CMVERSION;
//constants
const ERROR_STORE     = AuthConstants.ERROR_STORE;
const ERROR_NETWORK   = AuthConstants.ERROR_NETWORK;
const ERROR_PASSWORD  = AuthConstants.ERROR_PASSWORD;
const ERROR_AUTH      = AuthConstants.ERROR_AUTH;
const SUCCESS         = AuthConstants.SUCCESS;
const FAIL            = AuthConstants.FAIL;
const SUCCESS_LOGIN   = AuthConstants.SUCCESS_LOGIN;
const TOKEN           = AuthConstants.TOKEN;
const UID             = AuthConstants.UID;
const STARTED         = AuthConstants.STARTED;
// message
const ERROR_NETWORK_MESSAGE   = AuthConstants.ERROR_NETWORK_MESSAGE;
const ERROR_PASSWORD_MESSAGE  = AuthConstants.ERROR_PASSWORD_MESSAGE;
const ERROR_AUTH_MESSAGE      = AuthConstants.ERROR_AUTH_MESSAGE;
const ERROR_STORE_MESSAGE     = AuthConstants.ERROR_STORE_MESSAGE;

let _token = "";
let loginStarted = false;
let authStarted = false;
const AuthModule = {

    doAuth(){
      if(!authStarted){
        return new Promise((resolve, reject) => {
          authStarted = true;
          AuthStore.getData([TOKEN, UID])
            .then(formatAuth)
            .then(AuthApi.AppAuth)
            .then(authResult)
            .then(() => {authStarted = false; resolve(getSuccess())})
            .catch(error => {authStarted = false; reject(error)})
        })
      }else{
          console.log("正在执行")
      }
    },

    AppLogin(io_data){
        if(!loginStarted){
            loginStarted = true;
            const username = io_data.username;
            const password = io_data.password;
            const deviceToken = io_data.deviceToken;
            const data = {username,password,deviceToken}
            return new Promise((resolve, reject) => {

              const userInfo = formatLogin(data)
                AuthApi.AppLogin(userInfo)
                .then(loginResult)
                .then(AuthStore.saveData)
                .then(() => {loginStarted = false; resolve(getSuccess())})
                .catch(error => {loginStarted = false; console.log(error);reject(error)});

             })
        }else{
            throw STARTED
        }
    },

    AppDoWechatAuth(io_data){
      const deviceToken = io_data.deviceToken;
      const resCode     = io_data.resCode;
      return new Promise((resolve, reject) => {
        authStarted = true;
          const userInfo = formatWecahtAuth(resCode,deviceToken)
          AuthApi.AppAuth(userInfo)
          .then(loginResult)
          .then(AuthStore.saveData)
          .then(() => {authStarted = false; resolve(getSuccess())})
          .catch(error => {authStarted = false; reject(error)})
      })
    },

    getToken() {
      return new Promise((resolve, reject) => {
        if (_token) {
          resolve(_token)
        }else{
          AuthStore.getData([TOKEN, UID])
            .then((data) => {
               resolve(data[TOKEN])
            })
            .catch((error) =>{
              reject (error);
            })
        }
       })
    },
    async logout(){
        const result = await AuthStore.removeData([TOKEN, UID]);
        _token = '';
        return result
    }
}

const loginResult = (res) => {
        if(res.result == FAIL){
            throw res
         }else{
            let la_data = [
              [TOKEN, res.token],
              [UID, res.uid]
            ]
            return la_data
         }
}
const getSuccess = () => {
    const success = Object.assign({},{
      result: SUCCESS,
      message: SUCCESS_LOGIN
    });
    return success
}
const getError = (error) => {
  switch (error) {
    case ERROR_NETWORK:
      error = Object.assign({},{
        result: FAIL,
        message: ERROR_NETWORK_MESSAGE
      });
      return error
      break
    case ERROR_PASSWORD:
      error = Object.assign({},{
        result: FAIL,
        message: ERROR_PASSWORD_MESSAGE
      });
      return error
      break
    case ERROR_STORE:
      error = Object.assign({},{
        result: FAIL,
        message: ERROR_STORE_MESSAGE
      });
      return error
      break
    case STARTED:
      error = Object.assign({},{
        result: FAIL,
        message: STARTED
      });
      return error
      break
      case ERROR_AUTH:
        error = Object.assign({},{
          result: FAIL,
          message: ERROR_AUTH_MESSAGE
        });
        return error
        break

    default:

    }
}
const formatLogin = (io_data) => {
  const userInfo = Object.assign({},{
    os:    DeviceInfo.getModel() +" | " +
           DeviceInfo.getSystemName() +" | " +
           DeviceInfo.getSystemVersion() +" | " +
           DeviceInfo.getDeviceName(),
    deviceToken:io_data.deviceToken,
    username:io_data.username,
    password:io_data.password,
    uuid: DeviceInfo.getUniqueID(),
    version : VERSION
  });

  return userInfo
}
const formatAuth = (data) => {
  const userInfo = Object.assign({},{
    os:  DeviceInfo.getModel() +" | " +
           DeviceInfo.getSystemName() +" | " +
           DeviceInfo.getSystemVersion() +" | " +
           DeviceInfo.getDeviceName(),
    token: data.userToken,
    uuid: DeviceInfo.getUniqueID(),
    version : VERSION
  });

  return userInfo
}
const formatWecahtAuth = (resCode,deviceToken) => {
  const userInfo = Object.assign({},{
    deviceToken:deviceToken,
    os:  DeviceInfo.getModel() +" | " +
           DeviceInfo.getSystemName() +" | " +
           DeviceInfo.getSystemVersion() +" | " +
           DeviceInfo.getDeviceName(),
    rescode: resCode,
    uuid: DeviceInfo.getUniqueID(),
    version : VERSION
  });
  return userInfo
}
const authResult = (res) => {
  return new Promise((resolve, reject) => {
    console.log(res)
      if(res.result == FAIL){
        AuthStore.removeData([TOKEN, UID])
          .then(()=>{
              reject(res)
          })
          .catch((error)=>{
             reject(error)
          })
      }else{
        resolve()
      }

  })


}
const getToken = () => {
  return new Promise((resolve, reject) => {
    AuthStore.getData([TOKEN, UID])
      .then((data) => {
         resolve(data)
      })
      .catch((error) =>{
        reject (error);
      })
   })
}

// const doRequest = (port) =>{
//
// }
module.exports = AuthModule;
